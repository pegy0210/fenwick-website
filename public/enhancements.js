const XHS_ACCOUNT = 'Fenwick276878';
const XHS_URL = 'https://xhslink.cn/m/3zoimXXlrdy';

function isSimplified() {
  return Boolean(document.querySelector('main.font-sc'));
}

function syncDocumentLanguage() {
  document.documentElement.lang = isSimplified() ? 'zh-Hans' : 'zh-Hant';
}

function xhsIcon() {
  return `<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="4" y="7" width="40" height="34" rx="11" fill="#ff2442"/><path d="M13 17h22M15 24h18M18 31h12" stroke="white" stroke-width="3.2" stroke-linecap="round"/></svg>`;
}

function rebuildNavigation() {
  const nav = document.querySelector('.topbar nav');
  if (!nav) return;
  const sc = isSimplified();
  nav.innerHTML = `
    <a href="#about">${sc ? '关于 Fenwick' : '關於 Fenwick'}</a>
    <a href="#energy-quiz">${sc ? '能量测试' : '能量測驗'}</a>
    <a href="${XHS_URL}" target="_blank" rel="noopener noreferrer">${sc ? '小红书' : '小紅書'}</a>
    <a href="#contact">${sc ? '联系' : '聯絡'}</a>
    <a class="nav-cta" href="#resources">${sc ? '免费清单' : '免費清單'}</a>`;
}

function simplifyFocusSection() {
  const focus = document.querySelector('#focus');
  if (!focus) return;
  const sc = isSimplified();
  const heading = focus.querySelector('.section-heading h2');
  const intro = focus.querySelector('.section-heading p');
  if (heading) heading.textContent = sc ? '服务方向' : '服務方向';
  if (intro) intro.textContent = sc ? '先了解方向，详细内容会按实际需要逐步展开。' : '先了解方向，詳細內容會按實際需要逐步展開。';

  focus.querySelectorAll('.focus-grid article').forEach((article, index) => {
    const labels = sc
      ? ['退休规划', '家庭保障', '资产配置', '物业与现金流']
      : ['退休規劃', '家庭保障', '資產配置', '物業與現金流'];
    const h3 = article.querySelector('h3');
    if (h3) h3.textContent = labels[index] || h3.textContent;
  });
}

function injectXiaohongshuContact() {
  const contact = document.querySelector('.direct-contact');
  if (!contact || contact.querySelector('.xhs-contact')) return;
  const whatsappLink = contact.querySelector('a');
  const actions = document.createElement('div');
  actions.className = 'contact-actions';
  if (whatsappLink) actions.appendChild(whatsappLink);
  const link = document.createElement('a');
  link.className = 'xhs-contact';
  link.href = XHS_URL;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.innerHTML = `${xhsIcon()}<span><small>小紅書 / 小红书</small><b>${XHS_ACCOUNT}</b><span class="xhs-copy-note">Web 主頁 →</span></span>`;
  actions.appendChild(link);
  contact.appendChild(actions);
}

function injectXiaohongshuFeature() {
  const focus = document.querySelector('#focus');
  if (!focus || document.querySelector('#xiaohongshu')) return;
  const sc = isSimplified();
  const section = document.createElement('section');
  section.id = 'xiaohongshu';
  section.className = 'xhs-feature';
  section.innerHTML = `
    <div>
      <span class="xhs-kicker">${sc ? '小红书内容' : '小紅書內容'}</span>
      <h2>${sc ? '在港家庭储备笔记' : '在港家庭儲備筆記'}</h2>
      <p>${sc ? '用短篇内容分享香港家庭保障、退休准备、资产整理及生活选择。' : '用短篇內容分享香港家庭保障、退休準備、資產整理及生活選擇。'}</p>
    </div>
    <a class="xhs-primary-link" href="${XHS_URL}" target="_blank" rel="noopener noreferrer">${xhsIcon()}<span><small>${sc ? '小红书账号' : '小紅書帳號'}</small><b>${XHS_ACCOUNT}</b></span><strong>${sc ? '查看主页' : '查看主頁'} →</strong></a>`;
  focus.insertAdjacentElement('afterend', section);
}

function updateSecondaryHeroLink() {
  const secondary = document.querySelector('.hero .actions .ghost');
  if (!secondary) return;
  secondary.href = XHS_URL;
  secondary.target = '_blank';
  secondary.rel = 'noopener noreferrer';
  secondary.textContent = isSimplified() ? '看小红书内容' : '看小紅書內容';
}

function enhancePage() {
  syncDocumentLanguage();
  rebuildNavigation();
  simplifyFocusSection();
  injectXiaohongshuContact();
  injectXiaohongshuFeature();
  updateSecondaryHeroLink();
}

window.addEventListener('DOMContentLoaded', enhancePage);
let lastLanguage = '';
const observer = new MutationObserver(() => {
  const language = isSimplified() ? 'sc' : 'tc';
  if (language !== lastLanguage) {
    const feature = document.querySelector('#xiaohongshu');
    if (feature) feature.remove();
    enhancePage();
    lastLanguage = language;
  }
});
observer.observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['class'] });
