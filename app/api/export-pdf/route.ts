import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

import { generateResumeHTML as generateTemplateHTML, TemplateId } from '~/lib/pdf-templates';
import { sanitizeFilename } from '~/lib/pdf-templates/utils';
import fs from 'fs';

export async function POST(request: NextRequest) {
  try {
    const { resumeData, template = 'modern' } = await request.json();
    console.log('PDF export request received for:', resumeData.personalInfo.fullName || 'Unknown User');
    console.log('Using template:', template);

    // 启动无头浏览器 - 统一使用生产环境配置
    let executablePath;
    let args;

    // 首先尝试本地 Chrome（开发环境）
    const possiblePaths = [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
      '/usr/bin/google-chrome',
      '/usr/bin/chromium-browser',
    ];

    executablePath = possiblePaths.find((path) => {
      try {
        return fs.existsSync(path);
      } catch {
        return false;
      }
    });

    if (executablePath) {
      console.log('Using local Chrome:', executablePath);
      args = ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--disable-web-security'];
    } else {
      // 如果本地 Chrome 不可用，尝试使用 chromium（生产环境）
      try {
        executablePath = await chromium.executablePath();
        args = chromium.args;
        console.log('Using chromium executable');
      } catch {
        throw new Error('No Chrome executable found. Please install Chrome or set PUPPETEER_EXECUTABLE_PATH');
      }
    }

    const browser = await puppeteer.launch({
      headless: true,
      args,
      executablePath,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 794, height: 1123 }); // A4 size

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
