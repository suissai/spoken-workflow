import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useSpeech } from '@/components/chappie/voice';
describe('Voice narration', () => {
 afterEach(() => vi.unstubAllGlobals());
 it('reports unsupported speech without preventing text use', () => {
  const { result } = renderHook(() => useSpeech('en'));
  act(() => result.current.speak(['A purchase was prepared.']));
  expect(result.current.speaking).toBe(false);
  expect(result.current.error).toBeTruthy();
 });
 it('narrates segments sequentially and stops before the next one', () => {
  const spoken: Array<{text: string; lang: string; onend: () => void}> = [];
  vi.stubGlobal('speechSynthesis', {cancel: vi.fn(), speak: (u: {text:string;lang:string;onend:()=>void}) => spoken.push(u)});
  vi.stubGlobal('SpeechSynthesisUtterance', class {text:string;lang='';constructor(text:string){this.text=text;}});
  const {result} = renderHook(() => useSpeech('pt'));
  act(() => result.current.speak(['Primeira etapa','Segunda etapa','Terceira etapa']));
  expect(spoken.length).toBe(1);
  expect(spoken[0]?.lang).toBe('pt-BR');
  act(() => spoken[0]?.onend());
  expect(spoken.length).toBe(2);
  act(() => result.current.stop());
  act(() => spoken[1]?.onend());
  expect(spoken.length).toBe(2);
 });
});