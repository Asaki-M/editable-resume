import { Resume } from '~/lib/types/resume';
import { formatDate, generateBaseHTML } from './utils';

/**
 * 极简风格简历模板
 */
export function generateMinimalTemplate(data: Resume): string {
  const { personalInfo, workExperience, education, skills, projects, certifications, languages, moduleOrder } = data;

  const css = `
    .header {
      margin-bottom: 40px;
      text-align: left;
    }

    .name {
      font-size: 32px;
      font-weight: 300;
      color: #000;
      margin-bottom: 10px;
      letter-spacing: -0.5px;
    }
    
    .contact-info {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      font-size: 12px;
      color: #666;
      margin-bottom: 20px;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .contact-icon {
      width: 12px;
      height: 12px;
      fill: currentColor;
      flex-shrink: 0;
    }

    .summary {
      color: #333;
      line-height: 1.8;
      font-size: 14px;
      margin-top: 20px;
      max-width: 80%;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    
    .section {
      margin-bottom: 40px;
    }
    
    .section-title {
      font-size: 14px;
      font-weight: 600;
      color: #000;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 20px;
      padding-bottom: 5px;
      border-bottom: 1px solid #000;
    }
    
    .experience-item, .education-item, .project-item {
      margin-bottom: 25px;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
    }
    
    .experience-item:last-child, 
    .education-item:last-child, 
    .project-item:last-child {
      border-bottom: none;
    }
    
    .item-header {
      margin-bottom: 8px;
    }

    .item-title {
      font-weight: 600;
      color: #000;
      font-size: 16px;
      margin-bottom: 3px;
    }

    .item-company {
      color: #666;
      font-size: 14px;
      margin-bottom: 3px;
    }

    .item-date {
      font-size: 12px;
      color: #999;
      font-style: italic;
    }

    .item-description {
      color: #444;
      font-size: 13px;
      line-height: 1.6;
      margin-top: 10px;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    
    .skills-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 30px;
    }
    
    .skill-category {
      margin-bottom: 20px;
    }
    
    .skill-category-title {
      font-weight: 600;
      color: #000;
      margin-bottom: 10px;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .skill-level {
      background: #000;
      color: white;
      padding: 1px 6px;
      border-radius: 2px;
      font-size: 9px;
      margin-left: 8px;
    }
    
    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    
    .skill-tag, .tech-tag {
      background: none;
      color: #666;
      padding: 0;
      border: none;
      font-size: 12px;
      border-bottom: 1px solid #ddd;
    }
  `;

  // 各模块渲染函数
  const renderWorkExperience = () =>
    workExperience.length > 0
      ? `
    <div class="section">
      <h2 class="section-title">工作经历</h2>
      ${workExperience
        .map(
          (work) => `
        <div class="experience-item">
          <div class="item-header">
            <div class="item-title">${work.position}</div>
            <div class="item-company">${work.company}, ${work.location}</div>
            <div class="item-date">
              ${formatDate(work.startDate)} - ${work.current ? 'Present' : formatDate(work.endDate || '')}
            </div>
          </div>
          <div class="item-description">${work.description}</div>
        </div>
      `
        )
        .join('')}
    </div>
  `
      : '';

  const renderEducation = () =>
    education.length > 0
      ? `
    <div class="section">
      <h2 class="section-title">教育背景</h2>
      ${education
        .map(
          (edu) => `
        <div class="education-item">
          <div class="item-header">
            <div class="item-title">${edu.school}</div>
            <div class="item-company">${edu.degree} in ${edu.major}</div>
            <div class="item-date">
              ${formatDate(edu.startDate)} - ${edu.current ? 'Present' : formatDate(edu.endDate || '')}
            </div>
          </div>
        </div>
      `
        )
        .join('')}
    </div>
  `
      : '';

  const renderSkills = () =>
    skills.length > 0
      ? `
    <div class="section">
      <h2 class="section-title">技能</h2>
      <div class="skills-grid">
        ${skills
          .map(
            (skillCategory) => `
          <div class="skill-category">
            <div class="skill-category-title">
              ${skillCategory.category}
              <span class="skill-level">${skillCategory.level}</span>
            </div>
            <div class="skill-tags">
              ${skillCategory.skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join(' · ')}
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  `
      : '';

  const renderProjects = () =>
    projects.length > 0
      ? `
    <div class="section">
      <h2 class="section-title">项目经历</h2>
      ${projects
        .map(
          (project) => `
        <div class="project-item">
          <div class="item-header">
            <div class="item-title">${project.name}</div>
            <div class="item-date">
              ${formatDate(project.startDate)} - ${project.current ? 'Present' : formatDate(project.endDate || '')}
            </div>
          </div>
          <div class="item-description">${project.description}</div>
        </div>
      `
        )
        .join('')}
    </div>
  `
      : '';

  const renderCertifications = () =>
    certifications.length > 0
      ? `
    <div class="section">
      <h2 class="section-title">证书</h2>
      ${certifications
        .map(
          (cert) => `
        <div class="education-item">
          <div class="item-header">
            <div class="item-title">${cert.name}</div>
            <div class="item-company">${cert.issuer}</div>
            <div class="item-date">
              ${formatDate(cert.date)}${cert.expiryDate ? ` - 有效期至 ${formatDate(cert.expiryDate)}` : ''}
            </div>
          </div>
        </div>
      `
        )
        .join('')}
    </div>
  `
      : '';

  const renderLanguages = () =>
    languages.length > 0
      ? `
    <div class="section">
      <h2 class="section-title">语言</h2>
      <div class="skills-grid">
        ${languages
          .map(
            (lang) => `
          <div class="skill-category">
            <div class="skill-category-title">
              ${lang.language}
              <span class="skill-level">${lang.proficiency}</span>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  `
      : '';

  // 根据模块ID渲染对应模块
  const renderModule = (moduleId: string) => {
    switch (moduleId) {
      case 'workExperience':
        return renderWorkExperience();
      case 'education':
        return renderEducation();
      case 'skills':
        return renderSkills();
      case 'projects':
        return renderProjects();
      case 'certifications':
        return renderCertifications();
      case 'languages':
        return renderLanguages();
      default:
        return '';
    }
  };

  const content = `
    <!-- 个人信息头部 -->
    <div class="header">
      <h1 class="name">${personalInfo.fullName || '姓名'}</h1>

      <div class="contact-info">
        ${
          personalInfo.email
            ? `
          <div class="contact-item">
            <svg class="contact-icon" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
            </svg>
            ${personalInfo.email}
          </div>
        `
            : ''
        }
        ${
          personalInfo.phone
            ? `
          <div class="contact-item">
            <svg class="contact-icon" viewBox="0 0 16 16">
              <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122L9.98 10.98a.678.678 0 0 1-.725-.332l-.81-1.214a.678.678 0 0 1 .332-.725l1.548-.516a.678.678 0 0 0 .122-.58L8.653 5.306a.678.678 0 0 0-1.015-.063L6.604 6.277a.678.678 0 0 1-.725.332L4.665 6.097a.678.678 0 0 1-.332-.725l.516-1.548a.678.678 0 0 0-.122-.58L3.654 1.328z"/>
            </svg>
            ${personalInfo.phone}
          </div>
        `
            : ''
        }
        ${
          personalInfo.location
            ? `
          <div class="contact-item">
            <svg class="contact-icon" viewBox="0 0 16 16">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
            </svg>
            ${personalInfo.location}
          </div>
        `
            : ''
        }
        ${
          personalInfo.website
            ? `
          <div class="contact-item">
            <svg class="contact-icon" viewBox="0 0 16 16">
              <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
            </svg>
            ${personalInfo.website}
          </div>
        `
            : ''
        }
        ${
          personalInfo.github
            ? `
          <div class="contact-item">
            <svg class="contact-icon" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            ${personalInfo.github}
          </div>
        `
            : ''
        }
        ${
          personalInfo.linkedin
            ? `
          <div class="contact-item">
            <svg class="contact-icon" viewBox="0 0 16 16">
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
            </svg>
            ${personalInfo.linkedin}
          </div>
        `
            : ''
        }
      </div>

      ${personalInfo.summary ? `<div class="summary">${personalInfo.summary}</div>` : ''}
    </div>

    <!-- 动态渲染模块 -->
    ${
      moduleOrder
        ?.filter((module) => module.enabled)
        .map((module) => renderModule(module.id))
        .join('') || ''
    }
  `;

  return generateBaseHTML(personalInfo.fullName || '简历', css, content);
}
