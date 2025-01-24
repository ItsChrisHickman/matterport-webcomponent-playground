import './style.css';
import type { MpSdk } from '../public/assets/sdk';
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
  showcase.setAttribute('m', 'JGPnGQ6hosj');
  showcase.setAttribute('asset-base', 'assets');
  showcase.setAttribute('application-key', 'xtet8rr5t5i42rwanintd7rzb');
  container.appendChild(showcase);
  showcase?.addEventListener('mpSdkPlaying', async (evt: any) => {
    const mpSdk: MpSdk = evt.detail.mpSdk;
    onShowcaseLoaded(mpSdk);
  });
};
init();

const onShowcaseLoaded = async (sdk: MpSdk) => {
  console.log(sdk);
  await sdk.App.state.waitUntil(
    (state) => state.phase === sdk.App.Phase.PLAYING
  );
  sdk.Camera.rotate(115, 0);
};
