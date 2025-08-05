import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { Resume } from '~/lib/types/resume';

export async function POST(request: NextRequest) {
  try {
    const resumeData: Resume = await request.json();

    // 启动无头浏览器
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();

    // 设置页面大小为 A4
    await page.setViewport({ width: 794, height: 1123 });

    // 生成简历 HTML
    const html = generateResumeHTML(resumeData);

    // 设置页面内容
    await page.setContent(html, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    // 生成 PDF
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      }
    });

    await browser.close();

    // 返回 PDF
    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${resumeData.personalInfo.fullName || 'resume'}.pdf"`,
      },
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}

function generateResumeHTML(data: Resume): string {
  const { personalInfo, workExperience, education, skills, projects, certifications, languages } = data;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' });
  };

  return `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${personalInfo.fullName || '简历'}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
          line-height: 1.6;
          color: #334155;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }

        .resume {
          max-width: 210mm;
          margin: 0 auto;
          padding: 25px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .header {
          position: relative;
          padding: 25px;
          margin-bottom: 30px;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .name {
          font-size: 32px;
          font-weight: bold;
          background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 15px;
        }
        
        .contact-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          font-size: 14px;
          color: #64748b;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }

        .summary {
          margin-top: 20px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          color: #475569;
          line-height: 1.7;
        }
        
        .section {
          margin-bottom: 25px;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: bold;
          color: #1f2937;
          border-bottom: 1px solid #d1d5db;
          padding-bottom: 8px;
          margin-bottom: 15px;
        }
        
        .experience-item, .education-item, .project-item {
          border-left: 2px solid #e5e7eb;
          padding-left: 15px;
          margin-bottom: 20px;
          position: relative;
        }
        
        .experience-item::before, .education-item::before, .project-item::before {
          content: '';
          position: absolute;
          left: -5px;
          top: 5px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #3b82f6;
        }
        
        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }
        
        .item-title {
          font-weight: 600;
          color: #1f2937;
          font-size: 16px;
        }
        
        .item-company {
          color: #3b82f6;
          font-weight: 500;
        }
        
        .item-date {
          font-size: 12px;
          color: #6b7280;
          text-align: right;
        }
        
        .item-description {
          color: #4b5563;
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 8px;
        }
        
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        
        .skill-category {
          margin-bottom: 15px;
        }
        
        .skill-category-title {
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .skill-level {
          background: #f3f4f6;
          color: #6b7280;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 11px;
        }
        
        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        
        .skill-tag, .tech-tag {
          background: #e5e7eb;
          color: #374151;
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 12px;
        }
        
        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin: 8px 0;
        }
        
        .two-column {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }
        
        .cert-item, .lang-item {
          margin-bottom: 12px;
          font-size: 14px;
        }
        
        .cert-name, .lang-name {
          font-weight: 600;
          color: #1f2937;
        }
        
        .cert-issuer {
          color: #6b7280;
        }
        
        .cert-date {
          color: #9ca3af;
          font-size: 12px;
        }
        
        .lang-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .lang-proficiency {
          background: #f3f4f6;
          color: #6b7280;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 11px;
        }
        
        @media print {
          body { -webkit-print-color-adjust: exact; }
          .resume { margin: 0; padding: 15px; }
        }
      </style>
    </head>
    <body>
      <div class="resume">
        <!-- 个人信息头部 -->
        <div class="header">
          <h1 class="name">${personalInfo.fullName || '姓名'}</h1>
          
          <div class="contact-info">
            <div>
              ${personalInfo.email ? `<div class="contact-item">📧 ${personalInfo.email}</div>` : ''}
              ${personalInfo.phone ? `<div class="contact-item">📱 ${personalInfo.phone}</div>` : ''}
              ${personalInfo.location ? `<div class="contact-item">📍 ${personalInfo.location}</div>` : ''}
            </div>
            <div>
              ${personalInfo.website ? `<div class="contact-item">🌐 ${personalInfo.website}</div>` : ''}
              ${personalInfo.github ? `<div class="contact-item">💻 ${personalInfo.github}</div>` : ''}
              ${personalInfo.linkedin ? `<div class="contact-item">💼 ${personalInfo.linkedin}</div>` : ''}
            </div>
          </div>
          
          ${personalInfo.summary ? `<div class="summary">${personalInfo.summary}</div>` : ''}
        </div>

        <!-- 工作经历 -->
        ${workExperience.length > 0 ? `
          <div class="section">
            <h2 class="section-title">工作经历</h2>
            ${workExperience.map(work => `
              <div class="experience-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${work.position}</div>
                    <div class="item-company">${work.company}</div>
                  </div>
                  <div class="item-date">
                    📅 ${formatDate(work.startDate)} - ${work.current ? '至今' : formatDate(work.endDate || '')}<br>
                    📍 ${work.location}
                  </div>
                </div>
                <div class="item-description">${work.description}</div>
                ${work.achievements.length > 0 ? `
                  <ul style="margin-left: 20px; color: #6b7280; font-size: 13px;">
                    ${work.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                  </ul>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- 教育背景 -->
        ${education.length > 0 ? `
          <div class="section">
            <h2 class="section-title">教育背景</h2>
            ${education.map(edu => `
              <div class="education-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${edu.school}</div>
                    <div class="item-company">${edu.degree} - ${edu.major}</div>
                    ${edu.gpa ? `<div style="font-size: 13px; color: #6b7280;">GPA: ${edu.gpa}</div>` : ''}
                  </div>
                  <div class="item-date">
                    📅 ${formatDate(edu.startDate)} - ${edu.current ? '至今' : formatDate(edu.endDate || '')}
                  </div>
                </div>
                ${edu.honors.length > 0 ? `
                  <div style="font-size: 13px; color: #6b7280;">荣誉: ${edu.honors.join(', ')}</div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- 技能 -->
        ${skills.length > 0 ? `
          <div class="section">
            <h2 class="section-title">技能</h2>
            <div class="skills-grid">
              ${skills.map(skillCategory => `
                <div class="skill-category">
                  <div class="skill-category-title">
                    ${skillCategory.category}
                    <span class="skill-level">${skillCategory.level}</span>
                  </div>
                  <div class="skill-tags">
                    ${skillCategory.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- 项目经历 -->
        ${projects.length > 0 ? `
          <div class="section">
            <h2 class="section-title">项目经历</h2>
            ${projects.map(project => `
              <div class="project-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${project.name}</div>
                    ${(project.url || project.github) ? `
                      <div style="font-size: 12px; color: #3b82f6;">
                        ${project.url ? `🔗 ${project.url}` : ''}
                        ${project.github ? `💻 ${project.github}` : ''}
                      </div>
                    ` : ''}
                  </div>
                  <div class="item-date">
                    📅 ${formatDate(project.startDate)} - ${project.current ? '至今' : formatDate(project.endDate || '')}
                  </div>
                </div>
                <div class="item-description">${project.description}</div>
                ${project.technologies.length > 0 ? `
                  <div class="tech-tags">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                  </div>
                ` : ''}
                ${project.achievements.length > 0 ? `
                  <ul style="margin-left: 20px; color: #6b7280; font-size: 13px;">
                    ${project.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                  </ul>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- 证书和语言 -->
        ${(certifications.length > 0 || languages.length > 0) ? `
          <div class="two-column">
            ${certifications.length > 0 ? `
              <div class="section">
                <h2 class="section-title">证书</h2>
                ${certifications.map(cert => `
                  <div class="cert-item">
                    <div class="cert-name">${cert.name}</div>
                    <div class="cert-issuer">${cert.issuer}</div>
                    <div class="cert-date">${formatDate(cert.date)}</div>
                    ${cert.url ? `<div style="font-size: 11px; color: #3b82f6;">${cert.url}</div>` : ''}
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${languages.length > 0 ? `
              <div class="section">
                <h2 class="section-title">语言能力</h2>
                ${languages.map(lang => `
                  <div class="lang-item">
                    <span class="lang-name">${lang.language}</span>
                    <span class="lang-proficiency">${lang.proficiency}</span>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        ` : ''}
      </div>
    </body>
    </html>
  `;
}
