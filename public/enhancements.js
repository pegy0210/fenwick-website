const XHS_ACCOUNT = 'Fenwick276878';
const XHS_URL = 'https://xhslink.cn/m/3zoimXXlrdy';

function isSimplified() {
  return Boolean(document.querySelector('main.font-sc'));
}

function syncDocumentLanguage() {
  document.documentElement.lang = isSimplified() ? 'zh-Hans' : 'zh-Hant';
}

function xhsIcon() {
  return `
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="4" y="7" width="40" height="34" rx="11" fill="#ff2442" />
      <path d="M13 17h22M15 24h18M18 31h12" stroke="white" stroke-width="3.2" stroke-linecap="round" />
    </svg>`;
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
  link.setAttribute('aria-label', `Open Xiaohongshu profile ${XHS_ACCOUNT}`);
  link.innerHTML = `${xhsIcon()}
    <span>
      <small>小紅書 / 小红书</small>
      <b>${XHS_ACCOUNT}</b>
      <span class="xhs-copy-note">查看 Web 主頁 →</span>
    </span>`;

  actions.appendChild(link);
  contact.appendChild(actions);
}

function injectXiaohongshuFeature() {
  const focus = document.querySelector('#focus');
  if (!focus || document.querySelector('#xiaohongshu')) return;

  const simplified = isSimplified();
  const section = document.createElement('section');
  section.id = 'xiaohongshu';
  section.className = 'xhs-feature';
  section.innerHTML = `
    <div class="xhs-feature-copy">
      <span class="xhs-kicker">${simplified ? '小红书内容' : '小紅書內容'}</span>
      <h2>${simplified ? '先从一篇真实、易懂的家庭储备笔记开始' : '先從一篇真實、易懂的家庭儲備筆記開始'}</h2>
      <p>${simplified
        ? 'Fenwick 以「酤悦（古月）｜在港家庭储备笔记」分享香港家庭保障、退休准备、资产整理及生活选择。网站负责系统整理，小红书负责短篇切入。'
        : 'Fenwick 以「酤悦（古月）｜在港家庭儲備筆記」分享香港家庭保障、退休準備、資產整理及生活選擇。網站負責系統整理，小紅書負責短篇切入。'}</p>
      <a class="xhs-primary-link" href="${XHS_URL}" target="_blank" rel="noopener noreferrer">
        ${xhsIcon()}
        <span><small>${simplified ? '小红书账号' : '小紅書帳號'}</small><b>${XHS_ACCOUNT}</b></span>
        <strong>${simplified ? '查看主页' : '查看主頁'} →</strong>
      </a>
    </div>
    <div class="xhs-feature-visual" aria-hidden="true">
      <span class="xhs-quote">“</span>
      <p>${simplified ? '家庭规划，不是一次买什么，而是先看清楚目前缺什么。' : '家庭規劃，不是一次買甚麼，而是先看清楚目前缺甚麼。'}</p>
      <small>${simplified ? '在港家庭储备笔记' : '在港家庭儲備筆記'}</small>
    </div>`;

  focus.insertAdjacentElement('afterend', section);
}

function updateSecondaryHeroLink() {
  const secondary = document.querySelector('.hero .actions .ghost');
  if (!secondary || secondary.dataset.xhsReady === '1') return;
  secondary.href = XHS_URL;
  secondary.target = '_blank';
  secondary.rel = 'noopener noreferrer';
  secondary.textContent = isSimplified() ? '看小红书内容' : '看小紅書內容';
  secondary.dataset.xhsReady = '1';
}

function refreshLocalizedEnhancements() {
  const oldFeature = document.querySelector('#xiaohongshu');
  if (oldFeature) oldFeature.remove();
  const secondary = document.querySelector('.hero .actions .ghost');
  if (secondary) delete secondary.dataset.xhsReady;
  injectXiaohongshuFeature();
  updateSecondaryHeroLink();
}

function enhancePage() {
  syncDocumentLanguage();
  injectXiaohongshuContact();
  if (!document.querySelector('#xiaohongshu')) injectXiaohongshuFeature();
  updateSecondaryHeroLink();
}

window.addEventListener('DOMContentLoaded', enhancePage);

let lastLanguage = '';
const observer = new MutationObserver(() => {
  enhancePage();
  const language = isSimplified() ? 'sc' : 'tc';
  if (lastLanguage && lastLanguage !== language) refreshLocalizedEnhancements();
  lastLanguage = language;
});
observer.observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['class'] });
