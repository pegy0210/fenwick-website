import { FormEvent, useMemo, useState } from 'react';

type Lang = 'tc' | 'sc';
type Answers = { reserve: number; income: number; mortgage: number; children: number; retirement: number; review: number };

const whatsappNumber = '85267265788';
const xhsUrl = 'https://xhslink.cn/m/3zoimXXlrdy';

const copy = {
  tc: {
    nav: ['常見問題', '家庭檢查', 'Fenwick 方法', '小紅書', '聯絡'],
    tag: '給正在養家、供樓，也開始想到退休的香港家庭',
    hero: '養家、供樓、儲退休，唔應該每樣都靠估。',
    heroText: '先看清楚家庭現況、已有安排與真正缺口，再決定下一步。這裡不會催你買甚麼，只幫你把問題整理得更清楚。',
    heroPrimary: '先看常見家庭問題', heroSecondary: '做 3 分鐘家庭檢查',
    situationsTitle: '你可能正處於這個階段',
    situations: ['收入不算低，但每月總是剩不多。','有供樓、有小朋友，不確定保障是否足夠。','開始擔心退休，但不知道應該先處理甚麼。','已經買過保險或投資，卻不清楚整體是否協調。'],
    articlesTitle: '先由一個真正困擾你的問題開始',
    articles: [
      ['有樓，為甚麼仍然可能沒有退休安全感？','物業是資產，但未必能在需要時提供穩定現金流。先分清楚「有資產」和「有可用收入」。'],
      ['家庭每月有收入，為甚麼仍需要應急儲備？','真正的壓力通常不是日常開支，而是收入突然中斷時，家庭還能維持多久。'],
      ['四十歲後才準備退休，第一步不是買產品','先整理時間、每月可承受金額和已有資產，再談工具，會比急著追回進度更實際。']
    ],
    quizKicker: '免費自我檢查', quizTitle: '3 分鐘家庭安全感檢查', quizText: '不用留下電話。完成後只會看到三個方向：現金流、家庭風險集中度及退休準備清晰度。',
    qs: ['如果主要收入暫停，現有儲備可維持多久？','家庭收入主要依賴幾多人？','目前是否有供樓壓力？','家庭是否有需要照顧的小朋友？','距離預期退休還有多久？','過去兩年有否整體檢視保障及資產安排？'],
    opts: [['少於3個月','3至6個月','多於6個月'],['主要靠一人','兩人但差距很大','來源較平均'],['壓力明顯','可應付但佔比高','壓力不大或沒有'],['有','未來可能有','沒有'],['少於10年','10至20年','20年以上'],['沒有','只看過個別項目','有整體檢視']],
    resultTitle: '你的檢查結果', resultLabels: ['現金流穩定度','家庭風險集中度','退休準備清晰度'],
    priorities: ['先建立可維持至少3至6個月的應急緩衝。','先降低家庭對單一收入來源的依賴。','先把供樓、保障與退休儲蓄放在同一張圖上。','先確認主要照顧者及收入中斷時的家庭安排。','先整理退休年期、已有資產及每月可承受金額。','先做一次整體檢視，避免每個項目各自為政。'],
    methodTitle: 'Fenwick 怎樣開始一段對話', methodIntro: '不是先推一個方案，而是先把你已有的東西、真正擔心的事情和先後次序整理好。',
    methods: [['01','先聽清楚現況'],['02','整理已有安排'],['03','找出缺口與次序'],['04','有需要才討論方案']],
    xhsTitle: '短篇內容，先幫你想清楚一件事', xhsText: '在小紅書「酤悦（古月）｜在港家庭儲備筆記」分享香港家庭保障、退休準備、資產整理及生活選擇。', xhsButton: '查看小紅書主頁',
    otherTitle: '其他自我探索工具', energyTitle: '30 秒個人能量數字', energyText: '只作個人探索及交流參考，與財務評估分開。', birth: '出生日期', energyButton: '查看核心數字', energyResult: '你的核心數字是',
    contactTitle: '你未必需要完整規劃，可能只想先問清楚一件事。', contactText: '留下稱呼和問題即可。沒有推銷流程，也不需要先準備任何文件。', name: '怎樣稱呼你', question: '你最想先問清楚甚麼？', send: 'WhatsApp 問一個問題', noPressure: '不需要承諾，也不會加入推銷名單。',
  },
  sc: {
    nav: ['常见问题', '家庭检查', 'Fenwick 方法', '小红书', '联系'],
    tag: '给正在养家、供楼，也开始想到退休的香港家庭',
    hero: '养家、供楼、储退休，不应该每件事都靠猜。',
    heroText: '先看清楚家庭现况、已有安排与真正缺口，再决定下一步。这里不会催你买什么，只帮你把问题整理得更清楚。',
    heroPrimary: '先看常见家庭问题', heroSecondary: '做 3 分钟家庭检查',
    situationsTitle: '你可能正处于这个阶段',
    situations: ['收入不算低，但每月总是剩不多。','有供楼、有小朋友，不确定保障是否足够。','开始担心退休，但不知道应该先处理什么。','已经买过保险或投资，却不清楚整体是否协调。'],
    articlesTitle: '先从一个真正困扰你的问题开始',
    articles: [
      ['有楼，为什么仍然可能没有退休安全感？','物业是资产，但未必能在需要时提供稳定现金流。先分清楚“有资产”和“有可用收入”。'],
      ['家庭每月有收入，为什么仍需要应急储备？','真正的压力通常不是日常开支，而是收入突然中断时，家庭还能维持多久。'],
      ['四十岁后才准备退休，第一步不是买产品','先整理时间、每月可承受金额和已有资产，再谈工具，会比急着追回进度更实际。']
    ],
    quizKicker: '免费自我检查', quizTitle: '3 分钟家庭安全感检查', quizText: '不用留下电话。完成后只会看到三个方向：现金流、家庭风险集中度及退休准备清晰度。',
    qs: ['如果主要收入暂停，现有储备可维持多久？','家庭收入主要依赖多少人？','目前是否有供楼压力？','家庭是否有需要照顾的小朋友？','距离预期退休还有多久？','过去两年有否整体检视保障及资产安排？'],
    opts: [['少于3个月','3至6个月','多于6个月'],['主要靠一人','两人但差距很大','来源较平均'],['压力明显','可应付但占比高','压力不大或没有'],['有','未来可能有','没有'],['少于10年','10至20年','20年以上'],['没有','只看过个别项目','有整体检视']],
    resultTitle: '你的检查结果', resultLabels: ['现金流稳定度','家庭风险集中度','退休准备清晰度'],
    priorities: ['先建立可维持至少3至6个月的应急缓冲。','先降低家庭对单一收入来源的依赖。','先把供楼、保障与退休储蓄放在同一张图上。','先确认主要照顾者及收入中断时的家庭安排。','先整理退休年期、已有资产及每月可承受金额。','先做一次整体检视，避免每个项目各自为政。'],
    methodTitle: 'Fenwick 怎样开始一段对话', methodIntro: '不是先推一个方案，而是先把你已有的东西、真正担心的事情和先后次序整理好。',
    methods: [['01','先听清楚现况'],['02','整理已有安排'],['03','找出缺口与次序'],['04','有需要才讨论方案']],
    xhsTitle: '短篇内容，先帮你想清楚一件事', xhsText: '在小红书“酤悦（古月）｜在港家庭储备笔记”分享香港家庭保障、退休准备、资产整理及生活选择。', xhsButton: '查看小红书主页',
    otherTitle: '其他自我探索工具', energyTitle: '30 秒个人能量数字', energyText: '只作个人探索及交流参考，与财务评估分开。', birth: '出生日期', energyButton: '查看核心数字', energyResult: '你的核心数字是',
    contactTitle: '你未必需要完整规划，可能只想先问清楚一件事。', contactText: '留下称呼和问题即可。没有推销流程，也不需要先准备任何文件。', name: '怎样称呼你', question: '你最想先问清楚什么？', send: 'WhatsApp 问一个问题', noPressure: '不需要承诺，也不会加入推销名单。',
  }
};

const reduceNumber = (n: number): number => n > 9 ? reduceNumber(String(n).split('').reduce((s, d) => s + Number(d), 0)) : n;

export default function App() {
  const [lang, setLang] = useState<Lang>('tc');
  const [answers, setAnswers] = useState<Answers>({ reserve: -1, income: -1, mortgage: -1, children: -1, retirement: -1, review: -1 });
  const [showResult, setShowResult] = useState(false);
  const [contact, setContact] = useState({ name: '', question: '' });
  const [birth, setBirth] = useState('');
  const [energy, setEnergy] = useState<number | null>(null);
  const t = copy[lang];
  const fontClass = useMemo(() => lang === 'sc' ? 'font-sc' : 'font-tc', [lang]);
  const values = Object.values(answers);
  const complete = values.every((v) => v >= 0);
  const score = values.reduce((s, v) => s + Math.max(v, 0), 0);
  const metrics = [Math.min(100, 30 + (answers.reserve + answers.mortgage) * 18), Math.min(100, 30 + (answers.income + answers.children) * 18), Math.min(100, 30 + (answers.retirement + answers.review) * 18)];
  const priorityIndex = values.findIndex((v) => v === Math.min(...values.filter((v) => v >= 0)));

  const updateAnswer = (index: number, value: number) => {
    const keys: (keyof Answers)[] = ['reserve','income','mortgage','children','retirement','review'];
    setAnswers((prev) => ({ ...prev, [keys[index]]: value }));
    setShowResult(false);
  };

  const submitContact = (e: FormEvent) => {
    e.preventDefault();
    const msg = lang === 'tc' ? `你好 Fenwick，我想先問一個問題。\n稱呼：${contact.name}\n問題：${contact.question}` : `你好 Fenwick，我想先问一个问题。\n称呼：${contact.name}\n问题：${contact.question}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  const calculateEnergy = (e: FormEvent) => {
    e.preventDefault();
    if (!birth) return;
    setEnergy(reduceNumber(Number(birth.replaceAll('-', ''))));
  };

  return <main className={fontClass}>
    <header className="topbar">
      <a className="brand" href="#top"><span className="brand-mark">F</span><span><b>Fenwick</b><small>{lang === 'tc' ? '香港家庭儲備筆記' : '香港家庭储备笔记'}</small></span></a>
      <nav>{t.nav.map((item, i) => <a key={item} href={i === 0 ? '#questions' : i === 1 ? '#check' : i === 2 ? '#method' : i === 3 ? xhsUrl : '#contact'} target={i === 3 ? '_blank' : undefined} rel={i === 3 ? 'noreferrer' : undefined}>{item}</a>)}</nav>
      <div className="lang-switch"><button className={lang === 'tc' ? 'active' : ''} onClick={() => setLang('tc')}>繁</button><button className={lang === 'sc' ? 'active' : ''} onClick={() => setLang('sc')}>简</button></div>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy"><span className="eyebrow">{t.tag}</span><h1>{t.hero}</h1><p>{t.heroText}</p><div className="actions"><a className="btn primary" href="#questions">{t.heroPrimary}</a><a className="btn ghost" href="#check">{t.heroSecondary}</a></div></div>
      <div className="hero-note"><small>FENWICK NOTE 01</small><blockquote>{lang === 'tc' ? '「家庭規劃，不是一次買甚麼，而是先看清楚目前缺甚麼。」' : '“家庭规划，不是一次买什么，而是先看清楚目前缺什么。”'}</blockquote><span>{lang === 'tc' ? '先理解，再安排。' : '先理解，再安排。'}</span></div>
    </section>

    <section className="situations" id="questions"><div className="section-kicker">01</div><h2>{t.situationsTitle}</h2><div className="situation-list">{t.situations.map((x, i) => <div key={x}><span>0{i+1}</span><p>{x}</p></div>)}</div></section>

    <section className="articles"><div className="section-head"><div><span>02</span><h2>{t.articlesTitle}</h2></div></div><div className="article-list">{t.articles.map((a, i) => <article key={a[0]}><span>0{i+1}</span><div><h3>{a[0]}</h3><p>{a[1]}</p></div></article>)}</div></section>

    <section className="safety-check" id="check">
      <div className="check-intro"><span>{t.quizKicker}</span><h2>{t.quizTitle}</h2><p>{t.quizText}</p></div>
      <div className="questions">{t.qs.map((q, i) => <fieldset key={q}><legend><b>{String(i+1).padStart(2,'0')}</b>{q}</legend><div>{t.opts[i].map((o, v) => <button key={o} type="button" className={values[i] === v ? 'selected' : ''} onClick={() => updateAnswer(i, v)}>{o}</button>)}</div></fieldset>)}</div>
      <button className="btn primary check-button" disabled={!complete} onClick={() => setShowResult(true)}>{t.resultTitle}</button>
      {showResult && <div className="check-result"><div className="score"><small>{lang === 'tc' ? '整體清晰度' : '整体清晰度'}</small><strong>{Math.round((score / 12) * 100)}%</strong></div><div className="metrics">{metrics.map((m, i) => <div key={t.resultLabels[i]}><span><b>{t.resultLabels[i]}</b><em>{m}%</em></span><i><u style={{width:`${m}%`}} /></i></div>)}</div><p><b>{lang === 'tc' ? '最值得先處理：' : '最值得先处理：'}</b>{t.priorities[Math.max(priorityIndex,0)]}</p></div>}
    </section>

    <section className="method" id="method"><div><span>03</span><h2>{t.methodTitle}</h2><p>{t.methodIntro}</p></div><div className="method-steps">{t.methods.map((m) => <article key={m[0]}><small>{m[0]}</small><h3>{m[1]}</h3></article>)}</div></section>

    <section className="xhs-band"><div><small>小紅書 / 小红书</small><h2>{t.xhsTitle}</h2><p>{t.xhsText}</p></div><a href={xhsUrl} target="_blank" rel="noreferrer"><span className="xhs-icon">小</span><b>Fenwick276878</b><strong>{t.xhsButton} →</strong></a></section>

    <section className="other-tool" id="energy-tool"><details><summary><span><small>{t.otherTitle}</small><b>{t.energyTitle}</b><em>{t.energyText}</em></span><strong>＋</strong></summary><form onSubmit={calculateEnergy}><label>{t.birth}<input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} required /></label><button className="btn ghost" type="submit">{t.energyButton}</button>{energy && <p>{t.energyResult} <b>{energy}</b></p>}</form></details></section>

    <section className="contact" id="contact"><div><span>04</span><h2>{t.contactTitle}</h2><p>{t.contactText}</p><small>{t.noPressure}</small></div><form onSubmit={submitContact}><label>{t.name}<input required value={contact.name} onChange={(e) => setContact({...contact,name:e.target.value})} /></label><label>{t.question}<textarea required rows={5} value={contact.question} onChange={(e) => setContact({...contact,question:e.target.value})} /></label><button className="btn primary" type="submit">{t.send}</button></form></section>

    <footer><div><b>Fenwick</b><span>{lang === 'tc' ? '香港家庭儲備筆記' : '香港家庭储备笔记'}</span></div><small>© 2026 Fenwick. All rights reserved.</small></footer>
  </main>;
}
