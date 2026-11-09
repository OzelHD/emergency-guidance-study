export type Flow = { scenarioId: 'landslide' | 'flood'; screen: 'warning' | 'steps' | 'complete'; index: number } | { screen: 'selection' };
export type FlowAction = { type: 'choose'; scenarioId: 'landslide' | 'flood' } | { type: 'start' } | { type: 'next'; count: number } | { type: 'back' } | { type: 'review'; count: number } | { type: 'reset' };
export function flowReducer(state: Flow, action: FlowAction): Flow {
  if (action.type === 'reset') return { screen: 'selection' };
  if (action.type === 'choose') return { screen: 'warning', scenarioId: action.scenarioId, index: 0 };
  if (state.screen === 'selection') return state;
  if (action.type === 'start' && state.screen === 'warning') return { ...state, screen: 'steps', index: 0 };
  if (action.type === 'next' && state.screen === 'steps') return state.index + 1 >= action.count ? { ...state, screen: 'complete' } : { ...state, index: state.index + 1 };
  if (action.type === 'back') return state.screen === 'steps' && state.index > 0 ? { ...state, index: state.index - 1 } : state.screen === 'steps' ? { ...state, screen: 'warning' } : { screen: 'selection' };
  if (action.type === 'review' && state.screen === 'complete') return { ...state, screen: 'steps', index: Math.max(0, action.count - 1) };
  return state;
}
