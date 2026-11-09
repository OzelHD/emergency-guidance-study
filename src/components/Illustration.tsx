import type { IllustrationName } from '../content/scenarios';
export function Illustration({ name }: { name: IllustrationName }) {
  return <svg className={`illustration illustration-${name}`} viewBox="0 0 400 200" fill="none" aria-hidden="true">
    <g className="scene-fill" stroke="none"><circle cx="205" cy="98" r="80"/><path d="M30 163c60-26 96 11 152-6s100-15 181 5v20H30Z"/></g>
    <g stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
      {name === 'landslide' && <><path className="scene-area" d="m55 164 88-112 89 112Z"/><path d="m119 83 24 20 16-14m-4-22 28 35 24 14m-7-62 18 18-6 12 17 17m-8 22 13 4-3 13-14-4Zm28 25 12 2-2 12-13-3Z"/><path d="M36 166h241m23-53 36 28m-20-2 20 2-5-20"/><path d="M293 163v-34l22-15 22 15v34m-32 0v-20h10v20"/></>}
      {name === 'flood' && <><path className="scene-area" d="M139 145V82l57-39 58 39v63"/><path d="m128 90 68-48 69 48m-108 5h20v23h-20Zm60 0h20v23h-20Zm-30 11h20v43"/><path className="water" d="M64 149q17-12 34 0t34 0 34 0 34 0 34 0 34 0 34 0 34 0M64 168q17-12 34 0t34 0 34 0 34 0 34 0 34 0 34 0 34 0"/><path d="m97 42-8 17m21-7-8 17m176-18-8 17m24-5-8 17"/></>}
      {name === 'exit' && <><path className="scene-area" d="M106 167V41h100v126m-100 0h127"/><path d="m116 47 61 10v110h-61Zm47 65h1m47-10h78m-21-20 21 20-21 20M271 167h40"/><path d="m108 167-20 10h91"/></>}
      {name === 'sideways' && <><path className="scene-area" d="m65 128 66-89 69 89"/><path d="m155 52 26 27m-5-17 5 17-17-5M47 171h113m-4-20 76 0m-17-17 17 17-17 17"/><circle cx="278" cy="73" r="11"/><path d="m277 86-12 35 21 16 9 29m-30-45-14 42m21-64 21 17h25m-51-25-25 20"/></>}
      {name === 'meeting' && <><path className="scene-area" d="M60 171h77l26-32h174"/><path d="M222 139V42h58l-13 17 13 17h-58m-22 63h45"/><circle cx="184" cy="97" r="9"/><path d="M184 109v28m0-16-17 12m17-12 15 12m-15 4-11 22m11-22 12 22"/><path d="m78 107 26-29 28 29m-18-1 17 1-2-17"/></>}
      {name === 'wait' && <><path className="scene-area" d="M108 164V83l89-44 90 44v81Z"/><path d="M93 164h208m-139-4v-40h45v40"/><circle cx="226" cy="91" r="10"/><path d="M226 104v27m-18-14 18 7 19-7m-19 14-14 23m14-23 15 23"/><path d="m151 85 9 9 17-18"/></>}
      {name === 'basement' && <><path className="scene-area" d="M116 165V46h164v119"/><path d="M116 116h164m-130-45h24v24h-24Zm74 0h24v24h-24Z"/><path className="water" d="M126 142q12-9 24 0t24 0 24 0 24 0 24 0 24 0"/><circle cx="292" cy="143" r="26"/><path d="m274 125 36 36"/><path d="M98 167h166"/></>}
      {name === 'stairs' && <><path className="scene-area" d="M85 166h48v-31h47v-31h47V73h49V42h41v124Z"/><path d="m139 91 86-56m-26-1 26 1-8 24M74 166h253"/><path className="water" d="M69 183q12-9 24 0t24 0 24 0 24 0"/></>}
      {name === 'complete' && <><circle className="scene-area" cx="200" cy="100" r="57"/><path strokeWidth="4" d="m174 100 18 18 36-38"/><path d="M92 163h216"/></>}
    </g>
  </svg>;
}
