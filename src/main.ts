import './style.css';
import '@matterport/webcomponent';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <matterport-viewer m="SxQL3iGyoDo" application-key="yxszifc05b1bidcsqfr60806d"></matterport-viewer>
    </div>
  </div>
`;
