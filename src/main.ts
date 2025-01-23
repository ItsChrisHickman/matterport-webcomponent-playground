import './style.css';
import type { MpSdk } from '../assets/sdk'
import('@matterport/webcomponent');

const init = async () => {
  // Attempt to dynamically load the webcomponent to avoid bundle errors
  
  const container = document.getElementById('app');
  if (container === null) {
    return;
  }
  const showcase = document.createElement('matterport-viewer');
  if (showcase === null) {
    return;
  }
  showcase.setAttribute('m', 'SxQL3iGyoDo');
  showcase.setAttribute('asset-base', 'assets');
  showcase.setAttribute('application-key','xtet8rr5t5i42rwanintd7rzb');
  container.appendChild(showcase);
  showcase?.addEventListener('mpSdkPlaying', async (evt: any) => {
    const mpSdk: MpSdk = evt.detail.mpSdk;
    onShowcaseLoaded(mpSdk);
  });
}
init();

const onShowcaseLoaded = async(mpSdk: MpSdk) => {
  mpSdk.Camera.rotate(90, 0);
}