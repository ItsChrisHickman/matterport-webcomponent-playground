import './style.css';
import '@matterport/webcomponent';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Matterport WebComponent</h1>
    <div class="card">
      <matterport-viewer m="SxQL3iGyoDo" application-key="yxszifc05b1bidcsqfr60806d" asset-base="assets"></matterport-viewer>
    </div>
  </div>
`;

const viewer = document.querySelector('matterport-viewer');
if (viewer !== null) {
  viewer.addEventListener('mpSdkPlaying', evt => {
    const mpSdk = evt.detail.mpSdk;
    mpSdk.Camera.rotate(90, 0);
  })
}