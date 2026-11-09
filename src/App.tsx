import { useEffect, useReducer, useRef, useState } from 'react';
import { scenarios } from './content/scenarios';
import type { Language } from './content/scenarios';
import { interfaceText } from './content/interface';
import { Illustration } from './components/Illustration';
import { Icon } from './components/Icon';
import { flowReducer } from './state';

export function App({ offlineStatus = 'loading' }: { offlineStatus?: 'loading' | 'ready' | 'failed' }) {
  const [lang, setLang] = useState<Language>('de');
  const [dark, setDark] = useState(false);
  const [flow, dispatch] = useReducer(flowReducer, { screen: 'selection' });
  const [infoOpen, setInfoOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstRender = useRef(true);
  const t = interfaceText[lang];
  const scenario = flow.screen !== 'selection' ? scenarios.find(s => s.id === flow.scenarioId)! : undefined;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = `${t.brand} · Simulation`;
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#142721' : '#f6f7f3');
  }, [lang, dark, t.brand]);
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    mainRef.current?.focus();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [flow]);
  useEffect(() => { if (infoOpen) dialogRef.current?.showModal(); else dialogRef.current?.close(); }, [infoOpen]);
  function restart() { setLang('de'); setDark(false); dispatch({ type: 'reset' }); }

  return <div className="app-shell">
    <a className="skip-link" href="#main">{t.skip}</a>
    <header className="site-header">
      <div className="brand"><span className="brand-mark"><Icon name="brand" size={25}/></span><span><strong>{t.brand}</strong><span className="brand-descriptor">{t.descriptor}</span></span></div>
      <div className="header-controls"><div className="language-control" role="group" aria-label={t.language}>
        <button lang="de" aria-pressed={lang === 'de'} onClick={() => setLang('de')}>DE<span className="sr-only"> · Deutsch</span></button><button lang="en" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN<span className="sr-only"> · English</span></button>
      </div><button className="icon-button theme-toggle" aria-label={dark ? t.themeLight : t.themeDark} onClick={() => setDark(!dark)}><Icon name={dark ? 'sun' : 'moon'}/></button></div>
    </header>
    <div className="simulation-bar"><span className="simulation-label"><Icon name="info" size={16}/>{t.simulation}</span><span className="prototype-label">{t.version}</span></div>

    <main id="main" ref={mainRef} tabIndex={-1} className={flow.screen === 'selection' ? 'main selection-main' : 'main guidance-main'}>
      {flow.screen === 'selection' ? <>
        <section className="intro"><p className="eyebrow">{t.eyebrow}</p><h1>{t.headline.split('\n').map((line, i) => <span key={line} className={i ? 'muted-heading' : ''}>{line}</span>)}</h1><p className="intro-text">{t.intro}</p></section>
        <section aria-labelledby="scenario-heading" className="scenario-section"><div className="section-heading"><h2 id="scenario-heading">{t.choose}</h2><span>01 / 02</span></div>
          <div className="scenario-grid">{scenarios.map(s => <button key={s.id} className={`scenario-card card-${s.id}`} onClick={() => dispatch({ type: 'choose', scenarioId: s.id })}>
            <div className="card-topline"><span>{t.scenario} {s.number}</span><span>{s.steps.length} {t.steps}</span></div>
            <div className="card-visual"><Illustration name={s.illustration}/></div>
            <div className="card-copy"><h3>{s.name[lang]}</h3><p>{s.summary[lang]}</p></div><div className="card-link"><span>{t.open}</span><Icon name="arrow"/></div>
          </button>)}</div>
        </section>
        <aside className="study-note"><Icon name="shield" size={24}/><div><p>{t.studyNote}</p><p className="secondary-text">{t.privacy}</p></div></aside>
      </> : scenario && <>
        <div className="guidance-topline"><span className="scenario-tag">{scenario.name[lang]}</span><span>{flow.screen === 'warning' ? t.situation : flow.screen === 'complete' ? t.finishedEyebrow : t.pace}</span></div>
        {flow.screen === 'warning' && <article className="guidance-card warning-card"><div className="warning-label"><Icon name="warning" size={19}/>{t.warning}</div><div className="warning-visual"><Illustration name={scenario.illustration}/></div><h1>{scenario.warning[lang]}</h1><p className="warning-description">{scenario.situation[lang]}</p><div className="setup-note"><strong>{t.before}</strong><p>{scenario.setup[lang]}</p></div><p className="simulation-explanation">{t.studyContext}</p></article>}
        {flow.screen === 'steps' && <>
          <div className="progress-section"><div className="progress-text"><strong>{t.step} {flow.index + 1} {t.of} {scenario.steps.length}</strong><span>{scenario.name[lang]}</span></div><div className="progress-track" role="progressbar" aria-label={`${t.step} ${flow.index + 1} ${t.of} ${scenario.steps.length}`} aria-valuemin={0} aria-valuemax={scenario.steps.length} aria-valuenow={flow.index + 1}>{scenario.steps.map((s, i) => <span key={s.id} className={i <= flow.index ? 'filled' : ''}/>)}</div></div>
          <article className="guidance-card step-card"><div className="step-visual"><span className="step-number">{String(flow.index + 1).padStart(2, '0')}</span><Illustration name={scenario.steps[flow.index].illustration}/></div><div className="step-copy"><p className="eyebrow">{t.step.toUpperCase()} {String(flow.index + 1).padStart(2, '0')}</p><h1>{scenario.steps[flow.index].title[lang]}</h1><p>{scenario.steps[flow.index].explanation[lang]}</p></div></article>
        </>}
        {flow.screen === 'complete' && <article className="guidance-card complete-card"><Illustration name="complete"/><p className="eyebrow">{t.finishedEyebrow}</p><h1>{t.finished}</h1><p>{t.finishedText}</p><p className="completion-note"><Icon name="info" size={18}/>{t.notAllClear}</p></article>}
        <nav className="flow-navigation" aria-label={t.navigation}>
          {flow.screen === 'complete' ? <><button className="button secondary" onClick={() => dispatch({ type: 'review', count: scenario.steps.length })}><Icon name="back"/>{t.review}</button><button className="button primary" onClick={restart}>{t.restart}<Icon name="restart"/></button></> : <><button className="button secondary" onClick={() => dispatch({ type: 'back' })}><Icon name="back"/>{t.back}</button><button className="button primary" onClick={() => dispatch(flow.screen === 'warning' ? { type: 'start' } : { type: 'next', count: scenario.steps.length })}>{flow.screen === 'warning' ? t.start : flow.index === scenario.steps.length - 1 ? t.finish : t.next}<Icon name={flow.screen === 'steps' && flow.index === scenario.steps.length - 1 ? 'check' : 'arrow'}/></button></>}
        </nav><p className="pace-note">{t.stop}</p>
      </>}
    </main>
    <footer className="site-footer"><span>{t.footer}</span><div className="footer-actions"><span className="offline-status" role="status"><Icon name="offline" size={16}/>{offlineStatus === 'ready' ? t.offlineReady : offlineStatus === 'failed' ? t.offlineFailed : t.offlineLoading}</span><button className="text-button" onClick={() => setInfoOpen(true)}>{t.info}<Icon name="info" size={16}/></button></div></footer>
    <dialog ref={dialogRef} onCancel={() => setInfoOpen(false)} onClose={() => setInfoOpen(false)} aria-labelledby="info-title"><div className="dialog-heading"><h2 id="info-title">{t.infoTitle}</h2><button className="icon-button" aria-label={t.close} onClick={() => setInfoOpen(false)}><Icon name="close"/></button></div><p>{t.infoIntro}</p><p>{t.infoBody}</p><p>{t.infoOffline}</p><p>{t.infoSafety}</p><button className="button primary" onClick={() => setInfoOpen(false)}>{t.close}<Icon name="check"/></button></dialog>
  </div>;
}
