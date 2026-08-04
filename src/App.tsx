import { FormEvent, ReactNode, useMemo, useState } from 'react';

type Lang = 'tc' | 'sc';
type Answers = { reserve: number; income: number; mortgage: number; retirement: number };

type Situation = { label: string; title: string; text: string; art: 'wallet' | 'home' | 'retirement' };

const whatsappNumber = '85267265788';
const xhsUrl = 'https://xhslink.cn/m/3zoimXXlrdy';

const copy = {
  tc: {
    nav: ['常見問題', '家庭檢查', '關於 Fenwick', '聯絡'],
    tag: '給正在養家、供樓，也開始想到退休的香港家庭',
    hero: '養家、供樓、儲退休，唔應該每樣都靠估。',
    heroText: '用一個較容易理解的方法，把保障、現金流與退休方向放回同一張圖上。這裡不急着推方案，只先幫你找出最值得處理的一件事。',
    primary: '做 3 分鐘家庭檢查', secondary: '先看常見問題',
    trust: ['不先談產品', '不需要準備文件', '結果即時顯示'],
    situationsTitle: '你係咪正處於以下其中一種情況？',
    situations: [
      { label: '現金流', title: '收入唔算低，但每月總係剩唔多', text: '人工入帳後，很快被固定責任、供樓及日常開支分走。', art: 'wallet' },
      { label: '家庭保障', title: '有供樓、有小朋友，唔知保障是否足夠', text: '萬一收入中斷，家庭現有安排可以維持幾耐？', art: 'home' },
      { label: '退休方向', title: '開始擔心退休，但唔知應該由邊度開始', text: '怕準備得太遲，又怕一開始就做錯決定。', art: 'retirement' }
    ] as Situation[],
    checkKicker: '免費自我檢查', checkTitle: '3 分鐘家庭安全感檢查', checkText: '完成 4 條問題，即時看到目前最值得先處理的方向。',
    progress: '完成進度', resultButton: '查看我的整理結果', resultTitle: '你的初步結果',
    qs: ['如果主要收入暫停，現有儲備可維持多久？','家庭收入主要依賴幾多人？','目前供樓或固定支出壓力如何？','距離預期退休還有多久？'],
    opts: [['少於3個月','3至6個月','多於6個月'],['主要靠一人','兩人但差距很大','來源較平均'],['壓力明顯','可應付但佔比高','壓力不大或沒有'],['少於10年','10至20年','20年以上']],
    priorities: ['先建立3至6個月的家庭應急緩衝。','先降低家庭對單一收入來源的依賴。','先把供樓、保障及儲蓄放在同一張圖上。','先整理退休年期、已有資產及每月可承受金額。'],
    resultRows: ['現金流穩定度','家庭風險集中度','退休準備清晰度'],
    aboutTitle: 'Fenwick 是誰？',
    aboutText: 'Fenwick 曾從事地產相關工作，後來轉向家庭保障、退休及資產整理。比起先談產品，他更重視先聽清楚家庭現況、整理已有安排，再決定真正需要處理甚麼。',
    aboutPoints: ['先理解現況','整理已有安排','再決定下一步'],
    xhsTitle: '在小紅書，Fenwick 會分享…', xhs: '前往小紅書',
    contactTitle: '未必需要完整規劃，可能只係想先問清楚一件事。',
    contactText: '直接在 WhatsApp 留低問題即可，不需要先準備文件，也不需要承諾進一步安排。',
    name: '怎樣稱呼你', question: '你最想先問清楚甚麼？', send: 'WhatsApp 問一個問題', note: '不需要承諾，也不會加入推銷名單。'
  },
  sc: {
    nav: ['常见问题', '家庭检查', '关于 Fenwick', '联系'],
    tag: '给正在养家、供楼，也开始想到退休的香港家庭',
    hero: '养家、供楼、储退休，不应该每件事都靠猜。',
    heroText: '用一个较容易理解的方法，把保障、现金流与退休方向放回同一张图上。这里不急着推方案，只先帮你找出最值得处理的一件事。',
    primary: '做 3 分钟家庭检查', secondary: '先看常见问题',
    trust: ['不先谈产品', '不需要准备文件', '结果即时显示'],
    situationsTitle: '你是否正处于以下其中一种情况？',
    situations: [
      { label: '现金流', title: '收入不算低，但每月总是剩不多', text: '收入到账后，很快被固定责任、供楼及日常开支分走。', art: 'wallet' },
      { label: '家庭保障', title: '有供楼、有小朋友，不知道保障是否足够', text: '万一收入中断，家庭现有安排可以维持多久？', art: 'home' },
      { label: '退休方向', title: '开始担心退休，但不知道应该从哪里开始', text: '怕准备得太迟，又怕一开始就做错决定。', art: 'retirement' }
    ] as Situation[],
    checkKicker: '免费自我检查', checkTitle: '3 分钟家庭安全感检查', checkText: '完成 4 条问题，即时看到目前最值得先处理的方向。',
    progress: '完成进度', resultButton: '查看我的整理结果', resultTitle: '你的初步结果',
    qs: ['如果主要收入暂停，现有储备可维持多久？','家庭收入主要依赖多少人？','目前供楼或固定支出压力如何？','距离预期退休还有多久？'],
    opts: [['少于3个月','3至6个月','多于6个月'],['主要靠一人','两人但差距很大','来源较平均'],['压力明显','可应付但占比高','压力不大或没有'],['少于10年','10至20年','20年以上']],
    priorities: ['先建立3至6个月的家庭应急缓冲。','先降低家庭对单一收入来源的依赖。','先把供楼、保障及储蓄放在同一张图上。','先整理退休年期、已有资产及每月可承受金额。'],
    resultRows: ['现金流稳定度','家庭风险集中度','退休准备清晰度'],
    aboutTitle: 'Fenwick 是谁？',
    aboutText: 'Fenwick 曾从事地产相关工作，后来转向家庭保障、退休及资产整理。比起先谈产品，他更重视先听清楚家庭现况、整理已有安排，再决定真正需要处理什么。',
    aboutPoints: ['先理解现况','整理已有安排','再决定下一步'],
    xhsTitle: '在小红书，Fenwick 会分享…', xhs: '前往小红书',
    contactTitle: '未必需要完整规划，可能只想先问清楚一件事。',
    contactText: '直接在 WhatsApp 留下问题即可，不需要先准备文件，也不需要承诺进一步安排。',
    name: '怎样称呼你', question: '你最想先问清楚什么？', send: 'WhatsApp 问一个问题', note: '不需要承诺，也不会加入推销名单。'
  }
};

function IconBadge({ children }: { children: ReactNode }) {
  return <span className="icon-badge">{children}</span>;
}

function FamilyScene() {
  return <div className="family-scene" aria-hidden="true">
    <div className="city-lights" />
    <div className="house-visual"><div className="roof"/><div className="house-body"><div className="window a"/><div className="window b"/><div className="door"/><div className="shield">✓</div></div></div>
    <div className="family-figures"><i className="adult one"/><i className="adult two"/><i className="child one"/><i className="child two"/></div>
    <div className="holo-panel main"><span>家庭全貌</span><b>保障・現金流・退休</b><div className="mini-chart"><i/><i/><i/><i/><i/></div></div>
    <div className="holo-panel cash"><small>每月現金流</small><strong>+8,450</strong></div>
    <div className="holo-panel risk"><small>保障概要</small><strong>良好 78%</strong></div>
    <div className="scene-ring" />
  </div>;
}

function SituationArt({ type }: { type: Situation['art'] }) {
  if (type === 'wallet') return <div className="situation-art wallet-art"><span className="wallet">$</span><span className="calculator">123</span><i className="coin c1"/><i className="coin c2"/></div>;
  if (type === 'home') return <div className="situation-art home-art"><span className="mini-home"><i/></span><span className="mini-family">♟♟♟</span></div>;
  return <div className="situation-art retirement-art"><span className="sun"/><span className="bench">▰</span><span className="couple">♟ ♟</span></div>;
}

function SituationCard({ item }: { item: Situation }) {
  return <article className="situation-card">
    <div className="situation-copy"><small>{item.label}</small><h3>{item.title}</h3><p>{item.text}</p></div>
    <SituationArt type={item.art} />
  </article>;
}

function ProgressHeader({ current, label }: { current: number; label: string }) {
  return <div className="progress-header"><span>{label}</span><strong>{current}/4</strong><div className="progress-track"><i style={{ width: `${current * 25}%` }} /></div></div>;
}

function SocialCard({ type, title, subtitle, href }: { type: 'xhs' | 'wa'; title: string; subtitle: string; href: string }) {
  return <a className={`social-card ${type}`} href={href} target="_blank" rel="noreferrer"><IconBadge>{type === 'xhs' ? '小' : 'W'}</IconBadge><span><small>{subtitle}</small><b>{title}</b></span><strong>→</strong></a>;
}

export default function App() {
  const [lang, setLang] = useState<Lang>('tc');
  const [answers, setAnswers] = useState<Answers>({ reserve: -1, income: -1, mortgage: -1, retirement: -1 });
  const [showResult, setShowResult] = useState(false);
  const [contact, setContact] = useState({ name: '', question: '' });
  const t = copy[lang];
  const fontClass = useMemo(() => lang === 'sc' ? 'font-sc' : 'font-tc', [lang]);
  const values = Object.values(answers);
  const completed = values.filter((v) => v >= 0).length;
  const complete = completed === 4;
  const priorityIndex = complete ? values.indexOf(Math.min(...values)) : 0;
  const metrics = complete ? [48 + values[0] * 20, 44 + values[1] * 20, 46 + values[3] * 20] : [56, 52, 48];

  const updateAnswer = (index: number, value: number) => {
    const keys: (keyof Answers)[] = ['reserve', 'income', 'mortgage', 'retirement'];
    setAnswers((prev) => ({ ...prev, [keys[index]]: value }));
    setShowResult(false);
  };

  const submitContact = (e: FormEvent) => {
    e.preventDefault();
    const message = lang === 'tc'
      ? `你好 Fenwick，我想先問一個問題。\n稱呼：${contact.name}\n問題：${contact.question}`
      : `你好 Fenwick，我想先问一个问题。\n称呼：${contact.name}\n问题：${contact.question}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return <main className={fontClass}>
    <header className="topbar">
      <a className="brand" href="#top"><span className="brand-mark">F</span><span><b>Fenwick</b><small>家庭保障與退休規劃</small></span></a>
      <nav>{t.nav.map((item, i) => <a key={item} href={['#situations','#check','#about','#contact'][i]}>{item}</a>)}</nav>
      <div className="header-actions"><a className="header-cta" href="#contact">{lang === 'tc' ? '問一個問題' : '问一个问题'}</a><div className="lang-switch"><button className={lang === 'tc' ? 'active' : ''} onClick={() => setLang('tc')}>繁</button><button className={lang === 'sc' ? 'active' : ''} onClick={() => setLang('sc')}>简</button></div></div>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy"><span className="eyebrow">{t.tag}</span><h1>{t.hero}</h1><p>{t.heroText}</p><div className="actions"><a className="btn primary" href="#check">{t.primary}</a><a className="btn ghost" href="#situations">{t.secondary}</a></div><div className="trust-strip">{t.trust.map((item, i) => <span key={item}><IconBadge>{['✓','▣','↯'][i]}</IconBadge>{item}</span>)}</div></div>
      <FamilyScene />
    </section>

    <section className="situations" id="situations">
      <div className="center-heading"><span>REAL FAMILY QUESTIONS</span><h2>{t.situationsTitle}</h2></div>
      <div className="situation-grid">{t.situations.map((item) => <SituationCard key={item.title} item={item} />)}</div>
    </section>

    <section className="safety-check" id="check">
      <div className="check-shell">
        <div className="check-intro"><span>{t.checkKicker}</span><h2>{t.checkTitle}</h2><p>{t.checkText}</p><ProgressHeader current={completed} label={t.progress} /></div>
        <div className="question-panel">{t.qs.map((q, i) => <fieldset key={q}><legend><b>0{i + 1}</b><span>{q}</span></legend><div>{t.opts[i].map((option, value) => <button type="button" className={values[i] === value ? 'selected' : ''} onClick={() => updateAnswer(i, value)} key={option}>{option}</button>)}</div></fieldset>)}<button className="btn light check-button" disabled={!complete} onClick={() => setShowResult(true)}>{t.resultButton}</button></div>
        <aside className="result-panel"><small>{t.resultTitle}</small>{t.resultRows.map((row, i) => <div className="result-row" key={row}><span>{row}</span><b>{metrics[i]}%</b><i><u style={{ width: `${metrics[i]}%` }} /></i></div>)}<div className="result-focus"><small>{lang === 'tc' ? '目前最值得先處理' : '目前最值得先处理'}</small><strong>{showResult ? t.priorities[priorityIndex] : lang === 'tc' ? '完成檢查後即時顯示' : '完成检查后即时显示'}</strong></div></aside>
      </div>
    </section>

    <section className="about-xhs" id="about">
      <div className="about-panel"><div className="avatar-visual"><span>F</span></div><div><span className="section-kicker">ABOUT</span><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p><div className="about-points">{t.aboutPoints.map((point, i) => <span key={point}><IconBadge>{['◎','▣','↗'][i]}</IconBadge>{point}</span>)}</div></div></div>
      <div className="xhs-panel"><div><span className="section-kicker">SOCIAL NOTES</span><h2>{t.xhsTitle}</h2><p>{lang === 'tc' ? '家庭保障、退休準備、資產整理及生活選擇。' : '家庭保障、退休准备、资产整理及生活选择。'}</p><a href={xhsUrl} target="_blank" rel="noreferrer">{t.xhs} →</a></div><div className="phone-visual"><i/><i/><i/></div></div>
    </section>

    <section className="contact" id="contact">
      <div className="contact-copy"><span className="section-kicker">PRIVATE MESSAGE</span><h2>{t.contactTitle}</h2><p>{t.contactText}</p><div className="social-stack"><SocialCard type="wa" title="WhatsApp" subtitle="+852 6726 5788" href={`https://wa.me/${whatsappNumber}`} /><SocialCard type="xhs" title={t.xhs} subtitle="Fenwick276878" href={xhsUrl} /></div><small>{t.note}</small></div>
      <form onSubmit={submitContact}><label>{t.name}<input required value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} /></label><label>{t.question}<textarea required rows={5} value={contact.question} onChange={(e) => setContact({ ...contact, question: e.target.value })} /></label><button className="btn primary" type="submit">{t.send}</button></form>
    </section>

    <footer><div><b>Fenwick</b><span>家庭保障與退休規劃</span></div><nav><a href="#about">About</a><a href="#check">Check</a><a href={xhsUrl}>Xiaohongshu</a><a href="#contact">Contact</a></nav><small>© 2026 Fenwick</small></footer>
  </main>;
}
