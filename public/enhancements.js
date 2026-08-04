const XHS_ACCOUNT = 'Fenwick276878';

function syncDocumentLanguage() {
  const root = document.querySelector('main');
  if (!root) return;
  const isSimplified = root.classList.contains('font-sc');
  document.documentElement.lang = isSimplified ? 'zh-Hans' : 'zh-Hant';
}

function injectXiaohongshuContact() {
  const contact = document.querySelector('.direct-contact');
  if (!contact || contact.querySelector('.xhs-contact')) return;

  const whatsappLink = contact.querySelector('a');
  const actions = document.createElement('div');
  actions.className = 'contact-actions';

  if (whatsappLink) actions.appendChild(whatsappLink);

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'xhs-contact';
  button.setAttribute('aria-label', `Copy Xiaohongshu account ${XHS_ACCOUNT}`);
  button.innerHTML = `
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="4" y="7" width="40" height="34" rx="11" fill="#ff2442" />
      <path d="M13 17h22M15 24h18M18 31h12" stroke="white" stroke-width="3.2" stroke-linecap="round" />
    </svg>
    <span>
      <small>小紅書 / 小红书</small>
      <b>${XHS_ACCOUNT}</b>
      <span class="xhs-copy-note">按一下複製帳號</span>
    </span>`;

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(XHS_ACCOUNT);
      const note = button.querySelector('.xhs-copy-note');
      if (note) {
        const oldText = note.textContent;
        note.textContent = '已複製帳號';
        window.setTimeout(() => { note.textContent = oldText; }, 1800);
      }
    } catch {
      window.prompt('請複製小紅書帳號：', XHS_ACCOUNT);
    }
  });

  actions.appendChild(button);
  contact.appendChild(actions);
}

function enhancePage() {
  syncDocumentLanguage();
  injectXiaohongshuContact();
}

window.addEventListener('DOMContentLoaded', enhancePage);

const observer = new MutationObserver(enhancePage);
observer.observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['class'] });
