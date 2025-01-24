import './style.css';
import type { MpSdk } from '../public/assets/sdk'
import('@matterport/webcomponent');
import { tagComponentFactory } from "./components/TagComponent.js";


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
}
init();

const onShowcaseLoaded = async (sdk: MpSdk) => {

  await sdk.App.state.waitUntil(
    (appState) => appState.phase == "appphase.playing"
  );

  // register components
  await sdk.Scene.registerComponents([
    {
      name: "tag",
      factory: tagComponentFactory(),
    },
  ]);

  const [sceneObject] = await sdk.Scene.createObjects(1);

  let lights = sceneObject.addNode();
  lights.addComponent("mp.directionalLight", {});
  lights.addComponent("mp.ambientLight", { intensity: 4 });

  const tagNodes = new Map();
  let counter = 0;
  sdk.Tag.data.subscribe({
    onAdded: function (index, item) {
      const node = sceneObject.addNode();

      sdk.Tag.editStem(index, { stemVisible: false });
      let randomColor =
        "#" +
        Math.floor(Math.random() * 0xffffff)
          .toString(16)
          .padStart(6, "0");

      let component = node.addComponent("tag", {
        tagId: index,
        shape: counter % 3 === 0 ? "sphere" : "box",
        color1: "black",
        color2: randomColor,
        hoverColor1: randomColor,
        hoverColor2: "black",
      });
      node.position.set(
        item.anchorPosition.x + item.stemVector.x,
        item.anchorPosition.y + item.stemVector.y,
        item.anchorPosition.z + item.stemVector.z
      );
      const tagClickEmitPath = sceneObject.addPath({
        // Arbitrary ID
        id: `click-emit-${index}`,
        // We're adding a path to an EMIT
        type: sdk.Scene.PathType.EMIT,
        node,
        component,
        // We're making a path to this.notify('TAG.CLICK', payload)
        property: "TAG.CLICK",
      });
      sceneObject.spyOnEvent({
        path: tagClickEmitPath,
        // TagComponent's notify event returns the tagId:
        // this.notify('TAG.CLICK', tagId)
        onEvent: (tagId: string) => {
          sdk.Mattertag.navigateToTag(tagId, sdk.Mattertag.Transition.FLY);
        },
      });
      node.start();
      tagNodes.set(item.id, node);
    },
    onRemoved: function (index) {
      const node = tagNodes.get(index);
      if (node) {
        node.stop();
      }
    },
    onCollectionUpdated: function (collection) {
      console.log("All done!", collection);
    },
  });
}
