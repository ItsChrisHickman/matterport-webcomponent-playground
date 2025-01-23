import './style.css';
import { MpSdk } from '../assets/sdk.d'

const MP_SDK_KEY = 'yxszifc05b1bidcsqfr60806d';
const QUERY_STRING = window.location.search;
const URL_PARAMS = new URLSearchParams(QUERY_STRING);
const MODEL = URL_PARAMS.get('m') ? URL_PARAMS.get('m') : 'JGPnGQ6hosj';

// connect the sdk; log an error and stop if there were any connection issues
(async function connectSdk() {
  const iframe = document.getElementById('showcase');
  iframe.src =
    '/assets/showcase.html?m=' +
    MODEL +
    '&play=1&hr=0&useLegacyIds=0&qs=1&applicationKey=' +
    MP_SDK_KEY;
  iframe.addEventListener('load', async function () {
    try {
      let mpSdk = await showcase.contentWindow.MP_SDK.connect(showcase);
      onShowcaseConnect(mpSdk);
    } catch (e) {
      console.error(e);
      return;
    }
  });
})();

async function onShowcaseConnect(mpSdk: MpSdk) {
  console.log('Hello Bundle SDK', mpSdk)

}