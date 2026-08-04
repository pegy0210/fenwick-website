import { FormEvent, useMemo, useState } from 'react';

type Lang = 'tc' | 'sc';
type Answers = { reserve: number; income: number; mortgage: number; retirement: number };

const whatsappNumber = '85267265788';
const xhsUrl = 'https://xhslink.cn/m/3zoimXXlrdy';

const copy = {
  tc: {
    nav: ['常見問題', '家庭檢查', '關於 Fenwick', '聯絡'],
    tag: '給正在養家、供樓，也開始想到退休的香港家庭',
    hero: '先把家庭現況看清楚，再決定下一步。',
    heroText: 'Fenwick 以真實家庭角度，協助你整理保障、現金流與退休方向。這裡不催你買甚麼，只先把問題說清楚。',
    primary: '做 3 分鐘家庭檢查', secondary: '先看常見問題',
    issuesTitle: '你可能正遇到的三個問題',
    issues: [
      ['收入不算低，為甚麼每月仍然剩不多？','真正要看的不是收入數字，而是固定責任、供樓壓力及家庭緩衝是否平衡。'],
      ['有樓，為甚麼退休仍可能沒有安全感？','物業是資產，但生活需要可持續現金流。兩者不能當成同一件事。'],
      ['已經買過保險及投資，為甚麼仍然不知道夠不夠？','因為個別安排未必連成整體。先把已有項目、目標和時序放在同一張圖上。']
    ],
    checkKicker: '免費自我檢查', checkTitle: '3 分鐘家庭安全感檢查', checkText: '不用留下電話。完成後只會看到目前最值得先處理的方向。',
    qs: ['如果主要收入暫停，現有儲備可維持多久？','家庭收入主要依賴幾多人？','目前供樓或固定支出壓力如何？','距離預期退休還有多久？'],
    opts: [['少於3個月','3至6個月','多於6個月'],['主要靠一人','兩人但差距很大','來源較平均'],['壓力明顯','可應付但佔比高','壓力不大或沒有'],['少於10年','10至20年','20年以上']],
    resultTitle: '最值得先處理的方向',
    priorities: ['先建立3至6個月的家庭應急緩衝。','先降低家庭對單一收入來源的依賴。','先把供樓、保障及儲蓄放在同一張圖上。','先整理退休年期、已有資產及每月可承受金額。'],
    aboutTitle: '關於 Fenwick',
    aboutText: 'Fenwick 曾從事地產相關工作，後來轉向家庭保障、退休及資產整理。比起先談產品，他更重視先聽清楚家庭現況、整理已有安排，再決定真正需要處理甚麼。',
    aboutPoints: ['真實家庭視角','先整理，再討論','不以一次成交作起點'],
    xhs: '查看小紅書內容',
    contactTitle: '有一件事想先問清楚？',
    contactText: '直接在 WhatsApp 留低問題即可，不需要先準備文件，也不需要承諾進一步安排。',
    name: '怎樣稱呼你', question: '你最想先問清楚甚麼？', send: 'WhatsApp 問一個問題', note: '不會加入推銷名單。'
  },
  sc: {
    nav: ['常见问题', '家庭检查', '关于 Fenwick', '联系'],
    tag: '给正在养家、供楼，也开始想到退休的香港家庭',
    hero: '先把家庭现况看清楚，再决定下一步。',
    heroText: 'Fenwick 以真实家庭角度，协助你整理保障、现金流与退休方向。这里不催你买什么，只先把问题说清楚。',
    primary: '做 3 分钟家庭检查', secondary: '先看常见问题',
    issuesTitle: '你可能正遇到的三个问题',
    issues: [
      ['收入不算低，为什么每月仍然剩不多？','真正要看的不是收入数字，而是固定责任、供楼压力及家庭缓冲是否平衡。'],
      ['有楼，为什么退休仍可能没有安全感？','物业是资产，但生活需要可持续现金流。两者不能当成同一件事。'],
      ['已经买过保险及投资，为什么仍然不知道够不够？','因为个别安排未必连成整体。先把已有项目、目标和时序放在同一张图上。']
    ],
    checkKicker: '免费自我检查', checkTitle: '3 分钟家庭安全感检查', checkText: '不用留下电话。完成后只会看到目前最值得先处理的方向。',
    qs: ['如果主要收入暂停，现有储备可维持多久？','家庭收入主要依赖多少人？','目前供楼或固定支出压力如何？','距离预期退休还有多久？'],
    opts: [['少于3个月','3至6个月','多于6个月'],['主要靠一人','两人但差距很大','来源较平均'],['压力明显','可应付但占比高','压力不大或没有'],['少于10年','10至20年','20年以上']],
    resultTitle: '最值得先处理的方向',
    priorities: ['先建立3至6个月的家庭应急缓冲。','先降低家庭对单一收入来源的依赖。','先把供楼、保障及储蓄放在同一张图上。','先整理退休年期、已有资产及每月可承受金额。'],
    aboutTitle: '关于 Fenwick',
    aboutText: 'Fenwick 曾从事地产相关工作，后来转向家庭保障、退休及资产整理。比起先谈产品，他更重视先听清楚家庭现况、整理已有安排，再决定真正需要处理什么。',
    aboutPoints: ['真实家庭视角','先整理，再讨论','不以一次成交作起点'],
    xhs: '查看小红书内容',
    contactTitle: '有一件事想先问清楚？',
    contactText: '直接在 WhatsApp 留下问题即可，不需要先准备文件，也不需要承诺进一步安排。',
    name: '怎样称呼你', question: '你最想先问清楚什么？', send: 'WhatsApp 问一个问题', note: '不会加入推销名单。'
  }
};

export default function App() {
  const [lang, setLang] = useState<Lang>('tc');
  const [answers, setAnswers] = useState<Answers>({ reserve: -1, income: -1, mortgage: -1, retirement: -1 });
  const [showResult, setShowResult] = useState(false);
  const [contact, setContact] = useState({ name: '', question: '' });
  const t = copy[lang];
  const fontClass = useMemo(() => lang === 'sc' ? 'font-sc' : 'font-tc', [lang]);
  const values = Object.values(answers);
  const complete = values.every((v) => v >= 0);
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
      <div className="lang-switch"><button className={lang === 'tc' ? 'active' : ''} onClick={() => setLang('tc')}>繁</button><button className={lang === 'sc' ? 'active' : ''} onClick={() => setLang('sc')}>简</button></div>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy"><span className="eyebrow">{t.tag}</span><h1>{t.hero}</h1><p>{t.heroText}</p><div className="actions"><a className="btn primary" href="#check">{t.primary}</a><a className="btn ghost" href="#issues">{t.secondary}</a></div></div>
      <aside className="hero-note"><small>FENWICK</small><blockquote>「先理解家庭目前承受甚麼，再討論應該增加甚麼。」</blockquote><span>家庭保障・現金流・退休方向</span></aside>
    </section>

    <section className="issues" id="issues">
      <div className="section-heading"><span>01</span><h2>{t.issuesTitle}</h2></div>
      <div className="issue-list">{t.issues.map((item, i) => <article key={item[0]}><span>0{i + 1}</span><div><h3>{item[0]}</h3><p>{item[1]}</p></div></article>)}</div>
    </section>

    <section className="safety-check" id="check">
      <div className="check-intro"><span>{t.checkKicker}</span><h2>{t.checkTitle}</h2><p>{t.checkText}</p></div>
      <div className="questions">{t.qs.map((q, i) => <fieldset key={q}><legend><b>0{i + 1}</b>{q}</legend><div>{t.opts[i].map((option, value) => <button type="button" className={values[i] === value ? 'selected' : ''} onClick={() => updateAnswer(i, value)} key={option}>{option}</button>)}</div></fieldset>)}</div>
      <button className="btn light check-button" disabled={!complete} onClick={() => setShowResult(true)}>{t.resultTitle}</button>
      {showResult && <div className="check-result"><small>{t.resultTitle}</small><strong>{t.priorities[priorityIndex]}</strong><p>{lang === 'tc' ? '這只是自我整理結果，不構成財務建議。' : '这只是自我整理结果，不构成财务建议。'}</p></div>}
    </section>

    <section className="about" id="about">
      <div className="section-heading"><span>02</span><h2>{t.aboutTitle}</h2></div>
      <div className="about-grid"><p>{t.aboutText}</p><div className="about-points">{t.aboutPoints.map((point) => <span key={point}>{point}</span>)}</div></div>
    </section>

    <section className="contact" id="contact">
      <div className="contact-copy"><span>03</span><h2>{t.contactTitle}</h2><p>{t.contactText}</p><div className="social-links"><a href={xhsUrl} target="_blank" rel="noreferrer"><i>小</i><span><small>Fenwick276878</small><b>{t.xhs}</b></span></a><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer"><i>W</i><span><small>+852 6726 5788</small><b>WhatsApp</b></span></a></div><small className="no-pressure">{t.note}</small></div>
      <form onSubmit={submitContact}><label>{t.name}<input required value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} /></label><label>{t.question}<textarea required rows={5} value={contact.question} onChange={(e) => setContact({ ...contact, question: e.target.value })} /></label><button className="btn primary" type="submit">{t.send}</button></form>
    </section>

    <footer><div><b>Fenwick</b><span>Family clarity before financial decisions</span></div><small>© 2026 Fenwick</small></footer>
  </main>;
}
