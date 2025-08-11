import { NextRequest, NextResponse } from 'next/server';
import { generateResumeHTML as generateTemplateHTML, TemplateId } from '~/lib/pdf-templates';
import { sanitizeFilename } from '~/lib/pdf-templates/utils';

export const runtime = 'nodejs';

// 定义最小化接口以避免引入不同包的类型冲突
interface MinimalPage {
  setViewport: (options: { width: number; height: number }) => Promise<void>;
  setDefaultTimeout: (ms: number) => void;
  setDefaultNavigationTimeout: (ms: number) => void;
  goto: (url: string, options: { waitUntil: 'networkidle0' | 'networkidle2'; timeout: number }) => Promise<void>;
  evaluateHandle: (expr: string) => Promise<unknown>;
  pdf: (options: { format: 'A4' | string; printBackground: boolean; margin: { top: string; right: string; bottom: string; left: string }; timeout: number }) => Promise<Buffer>;
}

interface MinimalBrowser {
  newPage: () => Promise<MinimalPage>;
  close: () => Promise<void>;
}

type LaunchOptions = {
  headless?: boolean;
  args?: string[];
  executablePath?: string;
  timeout?: number;
};

type PuppeteerLike = {
  launch: (options?: LaunchOptions) => Promise<unknown>;
};

export async function POST(request: NextRequest) {
  try {
    const { resumeData, template = 'minimal' } = await request.json();

    // 依据环境动态选择 puppeteer 与 chromium
    const isVercel = Boolean(process.env.VERCEL || process.env.VERCEL_ENV);

    let puppeteer: PuppeteerLike;
    let executablePath: string | undefined;
    let args: string[] = [];
    let headless = true;

    if (isVercel) {
      const chromium = (await import('@sparticuz/chromium')).default;
      const { launch } = await import('puppeteer-core');
      puppeteer = { launch };
      executablePath = await chromium.executablePath();
      args = chromium.args;
      headless = true;
    } else {
      const p = await import('puppeteer');
      puppeteer = { launch: p.launch } as PuppeteerLike;

      // 1) 优先使用自定义环境变量
      const envLocalChrome = process.env.localChromeExecutablepath;
      if (envLocalChrome && typeof envLocalChrome === 'string' && envLocalChrome.trim().length > 0) {
        executablePath = envLocalChrome;
        console.log('Using custom Chrome path:', executablePath);
      }

      // 2) 尝试常见的系统 Chrome 路径
      if (!executablePath) {
        const { existsSync } = await import('fs');
        const commonPaths =
          process.platform === 'win32'
            ? ['C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe']
            : process.platform === 'darwin'
              ? ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']
              : ['/usr/bin/google-chrome', '/usr/bin/chromium-browser', '/snap/bin/chromium'];

        for (const path of commonPaths) {
          if (existsSync(path)) {
            executablePath = path;
            console.log('Found system Chrome at:', executablePath);
            break;
          }
        }
      }

      // 3) 最后尝试 Puppeteer 自带的 Chromium
      if (!executablePath) {
        try {
          // 不指定 executablePath，让 Puppeteer 使用默认的
          console.log('Using Puppeteer bundled Chromium');
        } catch (error) {
          console.log('Failed to find Puppeteer Chromium:', error);
        }
      }

      // 开发环境稳定参数（Windows 友好）
      args = [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
      ];
      headless = true;
    }

    console.log('Launching browser with config:', {
      headless,
      executablePath: executablePath || 'default',
      argsCount: args.length,
      isVercel,
    });

    const browser = (await puppeteer.launch({
      headless,
      args,
      executablePath,
      timeout: 30000,
    })) as unknown as MinimalBrowser;

    console.log('Browser launched successfully');

    const page = await browser.newPage();

    // 设置页面配置
    await page.setViewport({ width: 794, height: 1123 }); // A4 size
    page.setDefaultTimeout(30000);
    page.setDefaultNavigationTimeout(30000);

    try {
      // 生成简历 HTML
      const html = generateTemplateHTML(template as TemplateId, resumeData);
      // 使用 goto 方法加载 HTML，避免字符编码问题
      const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(html)}`;
      await page.goto(dataUrl, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });

      // 等待字体加载
      await page.evaluateHandle('document.fonts.ready');

      // 生成 PDF
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '15mm',
          bottom: '20mm',
          left: '15mm',
        },
        timeout: 30000,
      });

      await browser.close();

      // 返回 PDF
      const filename = sanitizeFilename(resumeData.personalInfo.fullName || 'resume');

      return new NextResponse(Buffer.from(pdf), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}.pdf"`,
        },
      });
    } catch (error) {
      console.error('Error during PDF generation:', error);
      try {
        await browser.close();
      } catch (closeError) {
        console.error('Error closing browser:', closeError);
      }
      throw error;
    }
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate PDF',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
