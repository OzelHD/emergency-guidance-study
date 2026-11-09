import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createElement } from 'react';
import { act, create } from 'react-test-renderer';
import type { ReactTestRenderer } from 'react-test-renderer';
import { App } from '../src/App';
import { scenarios } from '../src/content/scenarios';
import { interfaceText } from '../src/content/interface';
import { flowReducer } from '../src/state';

Object.assign(globalThis, {
  IS_REACT_ACT_ENVIRONMENT: true,
  document: { documentElement: { lang: 'de', dataset: {} }, title: '', querySelector: () => ({ setAttribute() {} }) },
  window: { scrollTo() {} }
});
function textOf(node: any): string { return typeof node === 'string' ? node : node?.children?.map(textOf).join('') || ''; }
async function click(renderer: ReactTestRenderer, label: string) {
  const buttons = renderer.root.findAllByType('button');
  const visibleMatches = buttons.filter(button => textOf(button) === label);
  const matches = visibleMatches.length ? visibleMatches : buttons.filter(button => button.props['aria-label'] === label);
  assert.equal(matches.length, 1, `Expected one button: ${label}`);
  await act(async () => { matches[0].props.onClick(); });
}

for (const scenario of scenarios) for (const language of ['de', 'en'] as const) {
  test(`${scenario.id}: complete UI navigation in ${language}, reverse, translate and reset`, async () => {
    let view!: ReactTestRenderer;
    await act(async () => { view = create(createElement(App, { offlineStatus: 'ready' }), { createNodeMock: () => ({ focus() {}, showModal() {}, close() {} }) }); });
    const t = interfaceText[language];
    if (language === 'en') await click(view, 'EN · English');
    const card = view.root.findAllByType('button').find(b => textOf(b).includes(scenario.name[language]) && textOf(b).includes(t.open));
    assert.ok(card);
    await act(async () => { card.props.onClick(); });
    assert.equal(textOf(view.root.findByType('h1')), scenario.warning[language]);
    await click(view, t.back);
    assert.equal(view.root.findAllByType('h3').length, 2);
    await act(async () => { view.root.findAllByType('button').find(b => textOf(b).includes(scenario.name[language]) && textOf(b).includes(t.open))!.props.onClick(); });
    await click(view, t.start);
    assert.equal(textOf(view.root.findByType('h1')), scenario.steps[0].title[language]);
    await click(view, t.back);
    assert.equal(textOf(view.root.findByType('h1')), scenario.warning[language]);
    await click(view, t.start);

    for (let i = 0; i < scenario.steps.length; i++) {
      assert.equal(textOf(view.root.findByType('h1')), scenario.steps[i].title[language]);
      const progress = view.root.findByProps({ role: 'progressbar' });
      assert.equal(progress.props['aria-valuenow'], i + 1);
      assert.equal(progress.props['aria-valuemax'], scenario.steps.length);
      // Switching language twice must retain the exact step.
      const alternate = language === 'de' ? 'en' : 'de';
      await click(view, alternate === 'en' ? 'EN · English' : 'DE · Deutsch');
      assert.equal(textOf(view.root.findByType('h1')), scenario.steps[i].title[alternate]);
      await click(view, language === 'en' ? 'EN · English' : 'DE · Deutsch');
      await click(view, t.themeDark);
      assert.equal(document.documentElement.dataset.theme, 'dark');
      assert.equal(textOf(view.root.findByType('h1')), scenario.steps[i].title[language]);
      await click(view, t.themeLight);
      if (i > 0) {
        await click(view, t.back);
        assert.equal(textOf(view.root.findByType('h1')), scenario.steps[i - 1].title[language]);
        await click(view, t.next);
      }
      await click(view, i === scenario.steps.length - 1 ? t.finish : t.next);
    }
    assert.equal(textOf(view.root.findByType('h1')), t.finished);
    assert.ok(textOf(view.root).includes(t.notAllClear));
    await click(view, t.review);
    assert.equal(textOf(view.root.findByType('h1')), scenario.steps.at(-1)!.title[language]);
    await click(view, t.finish);
    await click(view, t.themeDark);
    await click(view, t.restart);
    assert.equal(document.documentElement.lang, 'de');
    assert.equal(document.documentElement.dataset.theme, 'light');
    assert.equal(view.root.findAllByType('h3').length, 2);
    await click(view, interfaceText.de.info);
    assert.ok(textOf(view.root.findByType('dialog')).includes(interfaceText.de.infoBody));
    await click(view, interfaceText.de.close);
    await act(async () => { view.unmount(); });
  });
}

test('content is bilingual, has unique IDs and no actionable call links', () => {
  assert.deepEqual(Object.keys(interfaceText.de).sort(), Object.keys(interfaceText.en).sort());
  for (const scenario of scenarios) {
    assert.equal(new Set(scenario.steps.map(s => s.id)).size, scenario.steps.length);
    for (const field of [scenario.name, scenario.summary, scenario.situation, scenario.warning, scenario.setup, ...scenario.steps.flatMap(s => [s.title, s.explanation])]) {
      for (const lang of ['de', 'en'] as const) {
        assert.ok(field[lang].length > 0);
        assert.doesNotMatch(field[lang], /\[\]|\bTODO\b|tel:|https?:\/\//);
      }
    }
  }
  assert.notEqual(scenarios[0].steps.length, scenarios[1].steps.length);
});

test('navigation ignores impossible actions and never advances beyond completion', () => {
  assert.deepEqual(flowReducer({ screen: 'selection' }, { type: 'next', count: 4 }), { screen: 'selection' });
  const completed = { screen: 'complete', scenarioId: 'flood', index: 2 } as const;
  assert.deepEqual(flowReducer(completed, { type: 'next', count: 3 }), completed);
});
