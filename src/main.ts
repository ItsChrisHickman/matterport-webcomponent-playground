import './style.css';
import type { MpSdk } from '../assets/sdk.d.ts'

const init = async () => {
  await import('@matterport/webcomponent');
  const currentContainer = document.querySelector('matterport-viewer');
  if (currentContainer === null) {
    return;
  }
  const newWebComponent = document.createElement('matterport-viewer');
  if (newWebComponent === null) {
    return;
  }

  currentContainer.appendChild(newWebComponent);

  newWebComponent?.addEventListener('mpSdkPlaying', async (evt: any) => {
    const mpSdk: MpSdk = evt.detail.mpSdk;
    mpSdk.Camera.rotate(90, 0);
  });
}
init();