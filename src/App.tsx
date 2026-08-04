import { FormEvent, useMemo, useState } from 'react';

type Lang = 'tc' | 'sc';

type Copy = {
  nav: string[];
  heroTag: string;
  heroTitle: string;
  heroText: string;
  primary: string;
  secondary: string;
  aboutTitle: string;
  aboutText: string;
  focusTitle: string;
  focusIntro: string;
  resourcesTitle: string;
  resourcesText: string;
  formTitle: string;
  name: string;
  phone: string;
  channel: string;
  topic: string;
  concern: string;
  submit: string;
  contactTitle: string;
  contactText: string;
  videoPlaceholder: string;
  learnMore: string;
  areas: { title: string; text: string; video: string }[];
  topics: string[];
};

const copy: Record<Lang, Copy> = {
  tc: {
    nav: ['關於 Fenwick', '4大範疇', '免費清單', '聯絡'],
    heroTag: '家庭保障｜退休規劃｜資產配置｜香港物業',
    heroTitle: '先理清方向，再為家庭作出更穩妥的安排',
    heroText: 'Fenwick 以真實家庭視角，分享退休、保障、資產配置及物業現金流內容，讓你先建立清晰框架，再決定下一步。',
    primary: '免費領取規劃清單',
    secondary: '先看內容',
    aboutTitle: '關於 Fenwick',
    aboutText: 'Fenwick 曾從事地產相關工作，之後逐步轉向家庭保障、退休規劃及資產配置。網站以容易理解的方式整理重點，讓你先了解，再按需要進一步交流。',
    focusTitle: '4大內容範疇',
    focusIntro: '每個範疇會配合一條影片及一份實用清單，方便你按自己的需要開始。',
    resourcesTitle: '免費規劃清單',
    resourcesText: '選擇最想了解的主題，填寫基本資料後，WhatsApp 會自動開啟並帶入你的需要。',
    formTitle: '立即索取資料',
    name: '姓名',
    phone: '手機／WhatsApp',
    channel: '微信／電郵（選填）',
    topic: '最想了解的主題',
    concern: '現階段最關注',
    submit: '透過 WhatsApp 索取',
    contactTitle: '直接聯絡 Fenwick',
    contactText: '如你已經有明確問題，可以直接透過 WhatsApp 聯絡。',
    videoPlaceholder: 'YouTube 影片預留位置',
    learnMore: '了解更多',
    areas: [
      { title: '退休規劃', text: '退休現金流、收入部署及長遠生活安排。', video: '退休前要先想清楚的3件事' },
      { title: '家庭保障', text: '醫療、家庭風險及子女未來的保障缺口。', video: '有小朋友家庭最常忽略的保障位' },
      { title: '資產配置', text: '以家庭需要出發，整理資產配置先後次序。', video: '家庭資產配置應該由哪裡開始' },
      { title: '物業與現金流', text: '自住、收租、供樓壓力與現金流平衡。', video: '有樓未必代表財務穩陣' },
    ],
    topics: ['退休規劃', '家庭保障', '資產配置', '香港物業與現金流'],
  },
  sc: {
    nav: ['关于 Fenwick', '4大范畴', '免费清单', '联系'],
    heroTag: '家庭保障｜退休规划｜资产配置｜香港物业',
    heroTitle: '先理清方向，再为家庭作出更稳妥的安排',
    heroText: 'Fenwick 以真实家庭视角，分享退休、保障、资产配置及物业现金流内容，让你先建立清晰框架，再决定下一步。',
    primary: '免费领取规划清单',
    secondary: '先看内容',
    aboutTitle: '关于 Fenwick',
    aboutText: 'Fenwick 曾从事地产相关工作，之后逐步转向家庭保障、退休规划及资产配置。网站以容易理解的方式整理重点，让你先了解，再按需要进一步交流。',
    focusTitle: '4大内容范畴',
    focusIntro: '每个范畴会配合一条影片及一份实用清单，方便你按自己的需要开始。',
    resourcesTitle: '免费规划清单',
    resourcesText: '选择最想了解的主题，填写基本资料后，WhatsApp 会自动开启并带入你的需要。',
    formTitle: '立即索取资料',
    name: '姓名',
    phone: '手机／WhatsApp',
    channel: '微信／电邮（选填）',
    topic: '最想了解的主题',
    concern: '现阶段最关注',
    submit: '通过 WhatsApp 索取',
    contactTitle: '直接联系 Fenwick',
    contactText: '如果你已经有明确问题，可以直接通过 WhatsApp 联系。',
    videoPlaceholder: 'YouTube 影片预留位置',
    learnMore: '了解更多',
    areas: [
      { title: '退休规划', text: '退休现金流、收入部署及长远生活安排。', video: '退休前要先想清楚的3件事' },
      { title: '家庭保障', text: '医疗、家庭风险及子女未来的保障缺口。', video: '有小朋友家庭最常忽略的保障位' },
      { title: '资产配置', text: '以家庭需要出发，整理资产配置先后次序。', video: '家庭资产配置应该从哪里开始' },
      { title: '物业与现金流', text: '自住、收租、供楼压力与现金流平衡。', video: '有楼未必代表财务稳妥' },
    ],
    topics: ['退休规划', '家庭保障', '资产配置', '香港物业与现金流'],
  },
};

const icons = ['◔', '◇', '↗', '⌂'];
const whatsappNumber = '85267265788';

export default function App() {
  const [lang, setLang] = useState<Lang>('tc');
  const t = copy[lang];
  const [form, setForm] = useState({ name: '', phone: '', channel: '', topic: t.topics[0], concern: '' });

  const fontClass = useMemo(() => (lang === 'sc' ? 'font-sc' : 'font-tc'), [lang]);

  const switchLang = (next: Lang) => {
    const currentIndex = Math.max(0, t.topics.indexOf(form.topic));
    setLang(next);
    setForm((prev) => ({ ...prev, topic: copy[next].topics[currentIndex] ?? copy[next].topics[0] }));
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const message = lang === 'tc'
      ? `你好 Fenwick，我想索取規劃資料。\n姓名：${form.name}\n聯絡電話：${form.phone}\n其他聯絡：${form.channel || '沒有'}\n主題：${form.topic}\n關注事項：${form.concern || '未填寫'}`
      : `你好 Fenwick，我想索取规划资料。\n姓名：${form.name}\n联系电话：${form.phone}\n其他联系：${form.channel || '没有'}\n主题：${form.topic}\n关注事项：${form.concern || '未填写'}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className={fontClass}>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Fenwick home">
          <span className="brand-mark">F</span>
          <span><b>Fenwick</b><small>{t.heroTag}</small></span>
        </a>
        <nav>
          <a href="#about">{t.nav[0]}</a><a href="#focus">{t.nav[1]}</a><a href="#resources">{t.nav[2]}</a><a href="#contact">{t.nav[3]}</a>
        </nav>
        <div className="lang-switch"><button className={lang === 'tc' ? 'active' : ''} onClick={() => switchLang('tc')}>繁</button><button className={lang === 'sc' ? 'active' : ''} onClick={() => switchLang('sc')}>简</button></div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <span className="eyebrow">{t.heroTag}</span>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>
          <div className="actions"><a className="btn primary" href="#resources">{t.primary}</a><a className="btn ghost" href="#focus">{t.secondary}</a></div>
        </div>
        <div className="hero-visual" aria-label="Fenwick visual placeholder">
          <div className="portrait-placeholder"><span>F</span><strong>Fenwick</strong><small>Photo / Brand visual</small></div>
          <div className="floating-note"><b>先理解</b><span>再安排</span></div>
          <div className="floating-video"><span>▶</span><small>{t.videoPlaceholder}</small></div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="section-title"><span>01</span><h2>{t.aboutTitle}</h2></div>
        <p>{t.aboutText}</p>
        <div className="trust-line"><span>先看內容</span><i></i><span>取得工具</span><i></i><span>按需要交流</span></div>
      </section>

      <section className="focus" id="focus">
        <div className="section-heading"><div><span>02</span><h2>{t.focusTitle}</h2></div><p>{t.focusIntro}</p></div>
        <div className="focus-grid">
          {t.areas.map((area, index) => (
            <article key={area.title}>
              <div className="area-icon">{icons[index]}</div>
              <div className="video-placeholder"><span>▶</span><small>{t.videoPlaceholder}</small></div>
              <h3>{area.title}</h3><p>{area.text}</p><strong>{area.video}</strong><a href="#resources">{t.learnMore} →</a>
            </article>
          ))}
        </div>
      </section>

      <section className="conversion" id="resources">
        <div className="conversion-intro"><span>03</span><h2>{t.resourcesTitle}</h2><p>{t.resourcesText}</p><div className="resource-strip">{t.areas.map((a, i) => <div key={a.title}><b>{icons[i]}</b><span>{a.title}</span></div>)}</div></div>
        <form onSubmit={submit}>
          <h3>{t.formTitle}</h3>
          <div className="two-cols"><label>{t.name}<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label><label>{t.phone}<input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label></div>
          <div className="two-cols"><label>{t.channel}<input value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })} /></label><label>{t.topic}<select value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>{t.topics.map((topic) => <option key={topic}>{topic}</option>)}</select></label></div>
          <label>{t.concern}<textarea rows={4} value={form.concern} onChange={(e) => setForm({ ...form, concern: e.target.value })} /></label>
          <button className="btn primary full" type="submit">{t.submit}</button>
        </form>
        <div className="direct-contact" id="contact"><div><small>{t.contactTitle}</small><p>{t.contactText}</p></div><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp<br/><b>+852 6726 5788</b></a></div>
      </section>

      <footer><div><b>Fenwick</b><span>{t.heroTag}</span></div><small>© 2026 Fenwick. All rights reserved.</small></footer>
    </main>
  );
}
