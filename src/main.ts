import './style.css';
import type { MpSdk } from '../assets/sdk.d.ts'

const init = async () => {
  await import('@matterport/webcomponent');
  
  const container = document.getElementById('app');
  if (container === null) {
    return;
  }
  const showcase = document.createElement('matterport-viewer');
  if (showcase === null) {
    return;
  }
  showcase.setAttribute('asset-base', 'assets');
  showcase.setAttribute('application-key','yxszifc05b1bidcsqfr60806d');
  container.appendChild(showcase);
  showcase?.addEventListener('mpSdkPlaying', async (evt: any) => {
    const mpSdk: MpSdk = evt.detail.mpSdk;
    mpSdk.Camera.rotate(90, 0);
  });
}
init();