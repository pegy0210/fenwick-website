import { FormEvent, useMemo, useState } from 'react';

type Lang = 'tc' | 'sc';
type EnergyResult = { birth: string; life: number; dayMonth: string; yearCode: string; annual: number };

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
  quiz: {
    label: string; title: string; intro: string; date: string; nickname: string; nicknamePlaceholder: string;
    button: string; core: string; outer: string; inner: string; blindspot: string; annual: string;
    unlockTitle: string; unlockItems: string[]; unlockButton: string; disclaimer: string; invalid: string;
  };
};

const energyProfiles: Record<number, { tc: string[]; sc: string[] }> = {
  1: { tc: ['開拓者', '你有主見、重視自主，面對重要事情時習慣先行一步。', '果斷與主導力是優勢，但有時會太快把責任攬上身。'], sc: ['开拓者', '你有主见、重视自主，面对重要事情时习惯先行一步。', '果断与主导力是优势，但有时会太快把责任揽上身。'] },
  2: { tc: ['協調者', '你重視關係與感受，擅長察覺別人的需要。', '同理心很強，但容易為了和諧而延後自己的決定。'], sc: ['协调者', '你重视关系与感受，擅长察觉别人的需要。', '同理心很强，但容易为了和谐而延后自己的决定。'] },
  3: { tc: ['表達者', '你重視創意與表達，通常能為身邊的人帶來活力。', '靈感很多，但需要更穩定的節奏將想法落實。'], sc: ['表达者', '你重视创意与表达，通常能为身边的人带来活力。', '灵感很多，但需要更稳定的节奏将想法落实。'] },
  4: { tc: ['實踐者', '你重視秩序、安全感及可持續的安排。', '規劃力很強，但面對變動時可能會過度保守。'], sc: ['实践者', '你重视秩序、安全感及可持续的安排。', '规划力很强，但面对变动时可能会过度保守。'] },
  5: { tc: ['自由者', '你適應力強，喜歡探索新方向及保持選擇空間。', '反應很快，但長期承諾及持續執行可能較吃力。'], sc: ['自由者', '你适应力强，喜欢探索新方向及保持选择空间。', '反应很快，但长期承诺及持续执行可能较吃力。'] },
  6: { tc: ['守護者', '你重視家庭、責任及照顧身邊的人。', '責任感很強，但容易忽略自己的長期需要。'], sc: ['守护者', '你重视家庭、责任及照顾身边的人。', '责任感很强，但容易忽略自己的长期需要。'] },
  7: { tc: ['探求者', '你重視深度、邏輯與真相，習慣先分析再行動。', '思考周詳，但可能因為想得太多而延遲決定。'], sc: ['探求者', '你重视深度、逻辑与真相，习惯先分析再行动。', '思考周详，但可能因为想得太多而延迟决定。'] },
  8: { tc: ['實幹家', '你重視成果、效率與掌控感，面對重要事情時通常會自然承擔主導角色。', '你很擅長處理目標和結果，但可能把太多責任放在自己身上。'], sc: ['实干家', '你重视成果、效率与掌控感，面对重要事情时通常会自然承担主导角色。', '你很擅长处理目标和结果，但可能把太多责任放在自己身上。'] },
  9: { tc: ['夢想家', '你重視理想、意義及對他人的影響，包容力通常很高。', '視野宏大，但需要把理想轉化成更具體的行動。'], sc: ['梦想家', '你重视理想、意义及对他人的影响，包容力通常很高。', '视野宏大，但需要把理想转化成更具体的行动。'] },
};

const annualText: Record<number, { tc: string; sc: string }> = {
  1: { tc: '適合啟動新方向，先聚焦最重要的一件事。', sc: '适合启动新方向，先聚焦最重要的一件事。' },
  2: { tc: '適合建立合作與耐心，重大決定毋須急於一步到位。', sc: '适合建立合作与耐心，重大决定无需急于一步到位。' },
  3: { tc: '適合表達、連結及探索創意，但要避免過度分散。', sc: '适合表达、连接及探索创意，但要避免过度分散。' },
  4: { tc: '今年適合重新整理生活、工作及財務架構，把混亂逐步制度化。', sc: '今年适合重新整理生活、工作及财务架构，把混乱逐步制度化。' },
  5: { tc: '適合調整與嘗試新方法，同時保留基本安全底線。', sc: '适合调整与尝试新方法，同时保留基本安全底线。' },
  6: { tc: '家庭、責任與關係是重點，安排時要預留自己的空間。', sc: '家庭、责任与关系是重点，安排时要预留自己的空间。' },
  7: { tc: '適合沉澱、研究及重新審視方向，不必為追趕而勉強行動。', sc: '适合沉淀、研究及重新审视方向，不必为追赶而勉强行动。' },
  8: { tc: '成果、資源及責任會更突出，宜清楚衡量風險與回報。', sc: '成果、资源及责任会更突出，宜清楚衡量风险与回报。' },
  9: { tc: '適合完成、整理及放下不再合適的安排，為下一階段騰出空間。', sc: '适合完成、整理及放下不再合适的安排，为下一阶段腾出空间。' },
};

const copy: Record<Lang, Copy> = {
  tc: {
    nav: ['關於 Fenwick', '4大範疇', '能量測驗', '免費清單', '聯絡'], heroTag: '家庭保障｜退休規劃｜資產配置｜香港物業',
    heroTitle: '先理清方向，再為家庭作出更穩妥的安排', heroText: 'Fenwick 以真實家庭視角，分享退休、保障、資產配置及物業現金流內容，讓你先建立清晰框架，再決定下一步。',
    primary: '免費領取規劃清單', secondary: '先看內容', aboutTitle: '關於 Fenwick', aboutText: 'Fenwick 曾從事地產相關工作，之後逐步轉向家庭保障、退休規劃及資產配置。網站以容易理解的方式整理重點，讓你先了解，再按需要進一步交流。',
    focusTitle: '4大內容範疇', focusIntro: '每個範疇會配合一條影片及一份實用清單，方便你按自己的需要開始。', resourcesTitle: '免費規劃清單', resourcesText: '選擇最想了解的主題，填寫基本資料後，WhatsApp 會自動開啟並帶入你的需要。',
    formTitle: '立即索取資料', name: '姓名', phone: '手機／WhatsApp', channel: '微信／電郵（選填）', topic: '最想了解的主題', concern: '現階段最關注', submit: '透過 WhatsApp 索取', contactTitle: '直接聯絡 Fenwick', contactText: '如你已經有明確問題，可以直接透過 WhatsApp 聯絡。', videoPlaceholder: 'YouTube 影片預留位置', learnMore: '了解更多',
    areas: [{ title: '退休規劃', text: '退休現金流、收入部署及長遠生活安排。', video: '退休前要先想清楚的3件事' }, { title: '家庭保障', text: '醫療、家庭風險及子女未來的保障缺口。', video: '有小朋友家庭最常忽略的保障位' }, { title: '資產配置', text: '以家庭需要出發，整理資產配置先後次序。', video: '家庭資產配置應該由哪裡開始' }, { title: '物業與現金流', text: '自住、收租、供樓壓力與現金流平衡。', video: '有樓未必代表財務穩陣' }],
    topics: ['退休規劃', '家庭保障', '資產配置', '香港物業與現金流'],
    quiz: { label: '30秒個人探索', title: '你的個人能量數字，透露了甚麼？', intro: '輸入出生日期，即時查看核心性格、內外模式及今年提示。免費結果只顯示精華，保留真正值得進一步交流的部分。', date: '出生日期', nickname: '稱呼（選填）', nicknamePlaceholder: '方便完整解讀時稱呼你', button: '立即解讀我的數字', core: '核心數字', outer: '外在行動密碼', inner: '內在潛意識密碼', blindspot: '一個容易忽略的盲點', annual: '2026年提示', unlockTitle: '你的完整解讀還包括', unlockItems: ['社交面具與真實內心的落差', '事業及壓力下的行為模式', '容易重複出現的人生盲點', '今年適合整理的生活及財務方向'], unlockButton: 'WhatsApp 領取個人化解讀', disclaimer: '數字分析只作自我探索及交流參考，不構成投資、保險、醫療或其他專業建議。', invalid: '請輸入有效出生日期。' },
  },
  sc: {
    nav: ['关于 Fenwick', '4大范畴', '能量测试', '免费清单', '联系'], heroTag: '家庭保障｜退休规划｜资产配置｜香港物业',
    heroTitle: '先理清方向，再为家庭作出更稳妥的安排', heroText: 'Fenwick 以真实家庭视角，分享退休、保障、资产配置及物业现金流内容，让你先建立清晰框架，再决定下一步。',
    primary: '免费领取规划清单', secondary: '先看内容', aboutTitle: '关于 Fenwick', aboutText: 'Fenwick 曾从事地产相关工作，之后逐步转向家庭保障、退休规划及资产配置。网站以容易理解的方式整理重点，让你先了解，再按需要进一步交流。',
    focusTitle: '4大内容范畴', focusIntro: '每个范畴会配合一条影片及一份实用清单，方便你按自己的需要开始。', resourcesTitle: '免费规划清单', resourcesText: '选择最想了解的主题，填写基本资料后，WhatsApp 会自动开启并带入你的需要。',
    formTitle: '立即索取资料', name: '姓名', phone: '手机／WhatsApp', channel: '微信／电邮（选填）', topic: '最想了解的主题', concern: '现阶段最关注', submit: '通过 WhatsApp 索取', contactTitle: '直接联系 Fenwick', contactText: '如果你已经有明确问题，可以直接通过 WhatsApp 联系。', videoPlaceholder: 'YouTube 影片预留位置', learnMore: '了解更多',
    areas: [{ title: '退休规划', text: '退休现金流、收入部署及长远生活安排。', video: '退休前要先想清楚的3件事' }, { title: '家庭保障', text: '医疗、家庭风险及子女未来的保障缺口。', video: '有小朋友家庭最常忽略的保障位' }, { title: '资产配置', text: '以家庭需要出发，整理资产配置先后次序。', video: '家庭资产配置应该从哪里开始' }, { title: '物业与现金流', text: '自住、收租、供楼压力与现金流平衡。', video: '有楼未必代表财务稳妥' }],
    topics: ['退休规划', '家庭保障', '资产配置', '香港物业与现金流'],
    quiz: { label: '30秒个人探索', title: '你的个人能量数字，透露了什么？', intro: '输入出生日期，即时查看核心性格、内外模式及今年提示。免费结果只显示精华，保留真正值得进一步交流的部分。', date: '出生日期', nickname: '称呼（选填）', nicknamePlaceholder: '方便完整解读时称呼你', button: '立即解读我的数字', core: '核心数字', outer: '外在行动密码', inner: '内在潜意识密码', blindspot: '一个容易忽略的盲点', annual: '2026年提示', unlockTitle: '你的完整解读还包括', unlockItems: ['社交面具与真实内心的落差', '事业及压力下的行为模式', '容易重复出现的人生盲点', '今年适合整理的生活及财务方向'], unlockButton: 'WhatsApp 领取个人化解读', disclaimer: '数字分析只作自我探索及交流参考，不构成投资、保险、医疗或其他专业建议。', invalid: '请输入有效出生日期。' },
  },
};

const icons = ['◔', '◇', '↗', '⌂'];
const whatsappNumber = '85267265788';
const reduce = (value: number): number => value > 9 ? reduce(String(value).split('').reduce((sum, digit) => sum + Number(digit), 0)) : value;
const digitSum = (value: string) => value.split('').reduce((sum, digit) => sum + Number(digit), 0);

function calculateEnergy(dateValue: string): EnergyResult | null {
  const [yearText, monthText, dayText] = dateValue.split('-');
  const year = Number(yearText); const month = Number(monthText); const day = Number(dayText);
  const date = new Date(`${dateValue}T00:00:00`);
  if (!year || !month || !day || Number.isNaN(date.getTime()) || date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) return null;
  const dayValue = reduce(digitSum(String(day))); const monthValue = reduce(digitSum(String(month)));
  const firstYear = reduce(digitSum(yearText.slice(0, 2))); const secondYear = reduce(digitSum(yearText.slice(2)));
  const currentYear = reduce(digitSum('2026'));
  return { birth: dateValue, life: reduce(digitSum(`${yearText}${monthText}${dayText}`)), dayMonth: `${dayValue}${monthValue}${reduce(dayValue + monthValue)}`, yearCode: `${firstYear}${secondYear}${reduce(firstYear + secondYear)}`, annual: reduce(dayValue + monthValue + currentYear) };
}

export default function App() {
  const [lang, setLang] = useState<Lang>('tc'); const t = copy[lang];
  const [form, setForm] = useState({ name: '', phone: '', channel: '', topic: t.topics[0], concern: '' });
  const [quiz, setQuiz] = useState({ nickname: '', birth: '' }); const [energy, setEnergy] = useState<EnergyResult | null>(null); const [quizError, setQuizError] = useState('');
  const fontClass = useMemo(() => lang === 'sc' ? 'font-sc' : 'font-tc', [lang]);
  const switchLang = (next: Lang) => { const currentIndex = Math.max(0, t.topics.indexOf(form.topic)); setLang(next); setForm((prev) => ({ ...prev, topic: copy[next].topics[currentIndex] ?? copy[next].topics[0] })); };
  const submit = (event: FormEvent) => { event.preventDefault(); const message = lang === 'tc' ? `你好 Fenwick，我想索取規劃資料。\n姓名：${form.name}\n聯絡電話：${form.phone}\n其他聯絡：${form.channel || '沒有'}\n主題：${form.topic}\n關注事項：${form.concern || '未填寫'}` : `你好 Fenwick，我想索取规划资料。\n姓名：${form.name}\n联系电话：${form.phone}\n其他联系：${form.channel || '没有'}\n主题：${form.topic}\n关注事项：${form.concern || '未填写'}`; window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer'); };
  const runQuiz = (event: FormEvent) => { event.preventDefault(); const result = calculateEnergy(quiz.birth); if (!result) { setQuizError(t.quiz.invalid); setEnergy(null); return; } setQuizError(''); setEnergy(result); };
  const profile = energy ? energyProfiles[energy.life][lang] : null;
  const energyWhatsApp = energy ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lang === 'tc' ? `你好 Fenwick，我剛完成個人能量數字測驗。\n稱呼：${quiz.nickname || '未填寫'}\n出生日期：${energy.birth}\n本命數字：${energy.life}\n日月密碼：${energy.dayMonth}\n年份密碼：${energy.yearCode}\n想了解完整個人化解讀。` : `你好 Fenwick，我刚完成个人能量数字测试。\n称呼：${quiz.nickname || '未填写'}\n出生日期：${energy.birth}\n本命数字：${energy.life}\n日月密码：${energy.dayMonth}\n年份密码：${energy.yearCode}\n想了解完整个人化解读。`)}` : '#energy-quiz';

  return <main className={fontClass}>
    <header className="topbar"><a className="brand" href="#top"><span className="brand-mark">F</span><span><b>Fenwick</b><small>{t.heroTag}</small></span></a><nav><a href="#about">{t.nav[0]}</a><a href="#focus">{t.nav[1]}</a><a href="#energy-quiz">{t.nav[2]}</a><a href="#resources">{t.nav[3]}</a><a href="#contact">{t.nav[4]}</a></nav><div className="lang-switch"><button className={lang === 'tc' ? 'active' : ''} onClick={() => switchLang('tc')}>繁</button><button className={lang === 'sc' ? 'active' : ''} onClick={() => switchLang('sc')}>简</button></div></header>
    <section className="hero" id="top"><div className="hero-copy"><span className="eyebrow">{t.heroTag}</span><h1>{t.heroTitle}</h1><p>{t.heroText}</p><div className="actions"><a className="btn primary" href="#resources">{t.primary}</a><a className="btn ghost" href="#focus">{t.secondary}</a></div></div><div className="hero-visual"><div className="portrait-placeholder"><span>F</span><strong>Fenwick</strong><small>Photo / Brand visual</small></div><div className="floating-note"><b>先理解</b><span>再安排</span></div><div className="floating-video"><span>▶</span><small>{t.videoPlaceholder}</small></div></div></section>
    <section className="about" id="about"><div className="section-title"><span>01</span><h2>{t.aboutTitle}</h2></div><p>{t.aboutText}</p><div className="trust-line"><span>先看內容</span><i></i><span>取得工具</span><i></i><span>按需要交流</span></div></section>
    <section className="focus" id="focus"><div className="section-heading"><div><span>02</span><h2>{t.focusTitle}</h2></div><p>{t.focusIntro}</p></div><div className="focus-grid">{t.areas.map((area, index) => <article key={area.title}><div className="area-icon">{icons[index]}</div><div className="video-placeholder"><span>▶</span><small>{t.videoPlaceholder}</small></div><h3>{area.title}</h3><p>{area.text}</p><strong>{area.video}</strong><a href="#resources">{t.learnMore} →</a></article>)}</div></section>

    <section className="energy-quiz" id="energy-quiz"><div className="quiz-heading"><span>{t.quiz.label}</span><h2>{t.quiz.title}</h2><p>{t.quiz.intro}</p></div><form className="quiz-form" onSubmit={runQuiz}><label>{t.quiz.date}<input type="date" required value={quiz.birth} max="2026-12-31" onChange={(e) => setQuiz({ ...quiz, birth: e.target.value })} /></label><label>{t.quiz.nickname}<input value={quiz.nickname} placeholder={t.quiz.nicknamePlaceholder} onChange={(e) => setQuiz({ ...quiz, nickname: e.target.value })} /></label><button className="btn primary" type="submit">{t.quiz.button}</button>{quizError && <p className="quiz-error">{quizError}</p>}</form>
      {energy && profile && <div className="quiz-result"><div className="result-core"><small>{t.quiz.core}</small><strong>{energy.life}</strong><h3>{energy.life}{lang === 'tc' ? '號人' : '号人'}｜{profile[0]}</h3><p>{profile[1]}</p></div><div className="result-grid"><div><small>{t.quiz.outer}</small><b>{energy.dayMonth}</b><p>{lang === 'tc' ? '你在人前的行動、情緒及表達模式。' : '你在人前的行动、情绪及表达模式。'}</p></div><div><small>{t.quiz.inner}</small><b>{energy.yearCode}</b><p>{lang === 'tc' ? '你面對壓力、責任及安全感時的內在模式。' : '你面对压力、责任及安全感时的内在模式。'}</p></div><div><small>{t.quiz.blindspot}</small><p>{profile[2]}</p></div><div><small>{t.quiz.annual}</small><b>{energy.annual}{lang === 'tc' ? '號流年' : '号流年'}</b><p>{annualText[energy.annual][lang]}</p></div></div><div className="unlock"><div><small>{t.quiz.unlockTitle}</small><ul>{t.quiz.unlockItems.map((item) => <li key={item}>{item}</li>)}</ul></div><a className="btn primary" href={energyWhatsApp} target="_blank" rel="noreferrer">{t.quiz.unlockButton}</a></div></div>}
      <p className="quiz-disclaimer">{t.quiz.disclaimer}</p>
    </section>

    <section className="conversion" id="resources"><div className="conversion-intro"><span>04</span><h2>{t.resourcesTitle}</h2><p>{t.resourcesText}</p><div className="resource-strip">{t.areas.map((a, i) => <div key={a.title}><b>{icons[i]}</b><span>{a.title}</span></div>)}</div></div><form onSubmit={submit}><h3>{t.formTitle}</h3><div className="two-cols"><label>{t.name}<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label><label>{t.phone}<input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label></div><div className="two-cols"><label>{t.channel}<input value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })} /></label><label>{t.topic}<select value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>{t.topics.map((topic) => <option key={topic}>{topic}</option>)}</select></label></div><label>{t.concern}<textarea rows={4} value={form.concern} onChange={(e) => setForm({ ...form, concern: e.target.value })} /></label><button className="btn primary full" type="submit">{t.submit}</button></form><div className="direct-contact" id="contact"><div><small>{t.contactTitle}</small><p>{t.contactText}</p></div><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp<br/><b>+852 6726 5788</b></a></div></section>
    <footer><div><b>Fenwick</b><span>{t.heroTag}</span></div><small>© 2026 Fenwick. All rights reserved.</small></footer>
  </main>;
}
