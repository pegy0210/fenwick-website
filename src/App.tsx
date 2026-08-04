import { FormEvent, useMemo, useState } from 'react';

type Lang = 'tc' | 'sc';
type Answers = { reserve: number; income: number; mortgage: number; retirement: number };

const whatsappNumber = '85267265788';
const xhsUrl = 'https://xhslink.cn/m/3zoimXXlrdy';

const copy = {
  tc: {
    nav: ['常見問題', '家庭檢查', '關於 Fenwick', '聯絡'],
    tag: '給正在養家、供樓，也開始想到退休的香港家庭',
    hero: '先看清楚家庭全貌，才決定下一步。',
    heroText: '用一個較容易理解的方法，把保障、現金流與退休方向放回同一張圖上。這裡不急着推方案，只先幫你找出最值得處理的一件事。',
    primary: '開始家庭檢查', secondary: '先看常見問題',
    heroPanel: ['現金流緩衝', '家庭風險', '退休方向'], panelStatus: '3 個方向，一次整理', panelNote: '約 3 分鐘・毋須留下電話',
    trust: ['不先談產品', '不需要準備文件', '結果即時顯示'],
    issuesKicker: '從真實困擾開始', issuesTitle: '三個最常見，但很少被放在一起看的問題',
    issues: [
      ['現金流', '收入不算低，為甚麼每月仍然剩不多？','真正要看的不是收入數字，而是固定責任、供樓壓力及家庭緩衝是否平衡。'],
      ['退休', '有樓，為甚麼退休仍可能沒有安全感？','物業是資產，但生活需要可持續現金流。兩者不能當成同一件事。'],
      ['整體安排', '已經買過保險及投資，為甚麼仍然不知道夠不夠？','因為個別安排未必連成整體。先把已有項目、目標和時序放在同一張圖上。']
    ],
    checkKicker: '免費自我檢查', checkTitle: '3 分鐘家庭安全感檢查', checkText: '完成 4 條問題，即時看到目前最值得先處理的方向。', progress: '完成進度',
    qs: ['如果主要收入暫停，現有儲備可維持多久？','家庭收入主要依賴幾多人？','目前供樓或固定支出壓力如何？','距離預期退休還有多久？'],
    opts: [['少於3個月','3至6個月','多於6個月'],['主要靠一人','兩人但差距很大','來源較平均'],['壓力明顯','可應付但佔比高','壓力不大或沒有'],['少於10年','10至20年','20年以上']],
    resultButton: '查看我的整理結果', resultTitle: '最值得先處理的方向',
    priorities: ['先建立3至6個月的家庭應急緩衝。','先降低家庭對單一收入來源的依賴。','先把供樓、保障及儲蓄放在同一張圖上。','先整理退休年期、已有資產及每月可承受金額。'],
    resultSteps: ['看清現況', '找出缺口', '決定次序'], disclaimer: '這只是自我整理結果，不構成財務建議。',
    aboutKicker: '不是另一個產品介紹頁', aboutTitle: '關於 Fenwick',
    aboutText: 'Fenwick 曾從事地產相關工作，後來轉向家庭保障、退休及資產整理。比起先談產品，他更重視先聽清楚家庭現況、整理已有安排，再決定真正需要處理甚麼。',
    aboutPoints: ['真實家庭視角','先整理，再討論','不以一次成交作起點'], aboutQuote: '「清晰本身，就是一種安全感。」',
    xhs: '查看小紅書內容', contactKicker: '先問清楚一件事', contactTitle: '未需要完整規劃，也可以先開始一段對話。',
    contactText: '直接在 WhatsApp 留低問題即可，不需要先準備文件，也不需要承諾進一步安排。',
    name: '怎樣稱呼你', question: '你最想先問清楚甚麼？', send: 'WhatsApp 問一個問題', note: '不會加入推銷名單。'
  },
  sc: {
    nav: ['常见问题', '家庭检查', '关于 Fenwick', '联系'],
    tag: '给正在养家、供楼，也开始想到退休的香港家庭',
    hero: '先看清楚家庭全貌，再决定下一步。',
    heroText: '用一个较容易理解的方法，把保障、现金流与退休方向放回同一张图上。这里不急着推方案，只先帮你找出最值得处理的一件事。',
    primary: '开始家庭检查', secondary: '先看常见问题',
    heroPanel: ['现金流缓冲', '家庭风险', '退休方向'], panelStatus: '3 个方向，一次整理', panelNote: '约 3 分钟・无需留下电话',
    trust: ['不先谈产品', '不需要准备文件', '结果即时显示'],
    issuesKicker: '从真实困扰开始', issuesTitle: '三个最常见，但很少被放在一起看的问题',
    issues: [
      ['现金流', '收入不算低，为什么每月仍然剩不多？','真正要看的不是收入数字，而是固定责任、供楼压力及家庭缓冲是否平衡。'],
      ['退休', '有楼，为什么退休仍可能没有安全感？','物业是资产，但生活需要可持续现金流。两者不能当成同一件事。'],
      ['整体安排', '已经买过保险及投资，为什么仍然不知道够不够？','因为个别安排未必连成整体。先把已有项目、目标和时序放在同一张图上。']
    ],
    checkKicker: '免费自我检查', checkTitle: '3 分钟家庭安全感检查', checkText: '完成 4 条问题，即时看到目前最值得先处理的方向。', progress: '完成进度',
    qs: ['如果主要收入暂停，现有储备可维持多久？','家庭收入主要依赖多少人？','目前供楼或固定支出压力如何？','距离预期退休还有多久？'],
    opts: [['少于3个月','3至6个月','多于6个月'],['主要靠一人','两人但差距很大','来源较平均'],['压力明显','可应付但占比高','压力不大或没有'],['少于10年','10至20年','20年以上']],
    resultButton: '查看我的整理结果', resultTitle: '最值得先处理的方向',
    priorities: ['先建立3至6个月的家庭应急缓冲。','先降低家庭对单一收入来源的依赖。','先把供楼、保障及储蓄放在同一张图上。','先整理退休年期、已有资产及每月可承受金额。'],
    resultSteps: ['看清现况', '找出缺口', '决定次序'], disclaimer: '这只是自我整理结果，不构成财务建议。',
    aboutKicker: '不是另一个产品介绍页', aboutTitle: '关于 Fenwick',
    aboutText: 'Fenwick 曾从事地产相关工作，后来转向家庭保障、退休及资产整理。比起先谈产品，他更重视先听清楚家庭现况、整理已有安排，再决定真正需要处理什么。',
    aboutPoints: ['真实家庭视角','先整理，再讨论','不以一次成交作起点'], aboutQuote: '“清晰本身，就是一种安全感。”',
    xhs: '查看小红书内容', contactKicker: '先问清楚一件事', contactTitle: '未需要完整规划，也可以先开始一段对话。',
    contactText: '直接在 WhatsApp 留下问题即可，不需要先准备文件，也不需要承诺进一步安排。',
    name: '怎样称呼你', question: '你最想先问清楚什么？', send: 'WhatsApp 问一个问题', note: '不会加入推销名单。'
  }
};

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function SparkIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M18.5 16l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z" fill="currentColor" /></svg>;
}

export default function App() {
  const [lang, setLang] = useState<Lang>('tc');
  const [answers, setAnswers] = useState<Answers>({ reserve: -1, income: -1, mortgage: -1, retirement: -1 });
  const [showResult, setShowResult] = useState(false);
  const [contact, setContact] = useState({ name: '', question: '' });
  const t = copy[lang];
  const fontClass = useMemo(() => lang === 'sc' ? 'font-sc' : 'font-tc', [lang]);
  const values = Object.values(answers);
  const answered = values.filter((value) => value >= 0).length;
  const complete = answered === values.length;
  const priorityIndex = complete ? values.indexOf(Math.min(...values)) : 0;

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
      <a className="brand" href="#top"><span className="brand-mark">F</span><span><b>Fenwick</b><small>Family clarity before financial decisions</small></span></a>
      <nav>{t.nav.map((item, i) => <a key={item} href={['#issues','#check','#about','#contact'][i]}>{item}</a>)}</nav>
      <div className="top-actions"><a className="mini-cta" href="#contact">{lang === 'tc' ? '問一個問題' : '问一个问题'}</a><div className="lang-switch"><button className={lang === 'tc' ? 'active' : ''} onClick={() => setLang('tc')}>繁</button><button className={lang === 'sc' ? 'active' : ''} onClick={() => setLang('sc')}>简</button></div></div>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy"><span className="eyebrow"><SparkIcon />{t.tag}</span><h1>{t.hero}</h1><p>{t.heroText}</p><div className="actions"><a className="btn primary" href="#check">{t.primary}<ArrowIcon /></a><a className="btn ghost" href="#issues">{t.secondary}</a></div><div className="trust-row">{t.trust.map((item) => <span key={item}>✓ {item}</span>)}</div></div>
      <div className="hero-product" aria-label={t.panelStatus}>
        <div className="product-glow" />
        <div className="product-head"><span className="product-icon"><SparkIcon /></span><div><small>FENWICK CLARITY CHECK</small><strong>{t.panelStatus}</strong></div><span className="live-dot">LIVE</span></div>
        <div className="orbit"><div className="orbit-core"><b>3</b><span>{lang === 'tc' ? '核心方向' : '核心方向'}</span></div>{t.heroPanel.map((item, index) => <span className={`orbit-chip chip-${index + 1}`} key={item}><i />{item}</span>)}</div>
        <div className="product-footer"><span>{t.panelNote}</span><div className="mini-bars"><i /><i /><i /></div></div>
      </div>
    </section>

    <section className="issues" id="issues">
      <div className="section-heading"><div><span>{t.issuesKicker}</span><h2>{t.issuesTitle}</h2></div><small>01 — 03</small></div>
      <div className="issue-grid">{t.issues.map((item, i) => <article key={item[1]}><div className="issue-top"><span className="issue-icon">{['↗','◌','≋'][i]}</span><small>0{i + 1}</small></div><em>{item[0]}</em><h3>{item[1]}</h3><p>{item[2]}</p><a href="#check">{lang === 'tc' ? '由這裡開始整理' : '从这里开始整理'}<ArrowIcon /></a></article>)}</div>
    </section>

    <section className="safety-wrap" id="check">
      <div className="safety-check">
        <div className="check-intro"><span>{t.checkKicker}</span><h2>{t.checkTitle}</h2><p>{t.checkText}</p><div className="progress-box"><div><small>{t.progress}</small><strong>{answered}/4</strong></div><i><u style={{ width: `${answered * 25}%` }} /></i></div></div>
        <div className="questions">{t.qs.map((q, i) => <fieldset key={q}><legend><b>0{i + 1}</b><span>{q}</span></legend><div>{t.opts[i].map((option, value) => <button type="button" className={values[i] === value ? 'selected' : ''} onClick={() => updateAnswer(i, value)} key={option}><span>{option}</span><i>{values[i] === value ? '✓' : ''}</i></button>)}</div></fieldset>)}</div>
        <button className="btn light check-button" disabled={!complete} onClick={() => setShowResult(true)}>{t.resultButton}<ArrowIcon /></button>
        {showResult && <div className="check-result"><div className="result-mark"><SparkIcon /></div><div><small>{t.resultTitle}</small><strong>{t.priorities[priorityIndex]}</strong><div className="result-steps">{t.resultSteps.map((step, index) => <span key={step}><b>0{index + 1}</b>{step}</span>)}</div><p>{t.disclaimer}</p></div></div>}
      </div>
    </section>

    <section className="about" id="about">
      <div className="about-visual"><div className="portrait-shape"><span>F</span><small>FENWICK</small></div><div className="quote-card">{t.aboutQuote}</div></div>
      <div className="about-copy"><span>{t.aboutKicker}</span><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p><div className="about-points">{t.aboutPoints.map((point, index) => <div key={point}><b>0{index + 1}</b><span>{point}</span></div>)}</div></div>
    </section>

    <section className="contact" id="contact">
      <div className="contact-copy"><span>{t.contactKicker}</span><h2>{t.contactTitle}</h2><p>{t.contactText}</p><div className="social-links"><a href={xhsUrl} target="_blank" rel="noreferrer"><i className="xhs">小</i><span><small>Fenwick276878</small><b>{t.xhs}</b></span><ArrowIcon /></a><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer"><i className="wa">W</i><span><small>+852 6726 5788</small><b>WhatsApp</b></span><ArrowIcon /></a></div><small className="no-pressure">✓ {t.note}</small></div>
      <form onSubmit={submitContact}><div className="form-head"><span>PRIVATE MESSAGE</span><small>{lang === 'tc' ? '通常由一個問題開始' : '通常从一个问题开始'}</small></div><label>{t.name}<input required value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} /></label><label>{t.question}<textarea required rows={5} value={contact.question} onChange={(e) => setContact({ ...contact, question: e.target.value })} /></label><button className="btn primary" type="submit">{t.send}<ArrowIcon /></button></form>
    </section>

    <footer><div><b>Fenwick</b><span>Family clarity before financial decisions</span></div><div className="footer-links"><a href="#issues">{t.nav[0]}</a><a href="#check">{t.nav[1]}</a><a href={xhsUrl} target="_blank" rel="noreferrer">小紅書</a></div><small>© 2026 Fenwick</small></footer>
  </main>;
}
