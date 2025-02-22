import { useState, useEffect } from 'react';
import '@matterport/webcomponent';
import type { MpSdk } from '../public/assets/sdk';
import './App.css';
import { WebComponent } from './WebComponent';

function App() {
  const [mpSdk, setMpSdk] = useState<MpSdk>();

  // Use after SDK has loadeed -- or you can pass the sdk into a child component or use on a context
  useEffect(() => {
    if (mpSdk) {
      mpSdk.App.state
        .waitUntil((state) => state.phase === mpSdk.App.Phase.PLAYING)
        .then(() => {
          mpSdk.Camera.rotate(115, 0);
        });
    }
  }, [mpSdk]);

  return (
    <>
      <WebComponent model='JGPnGQ6hosj' getSdk={(sdk: MpSdk) => setMpSdk(sdk)} />
    </>
  );
}

export default App;
