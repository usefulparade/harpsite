import { WebGLRenderer } from 'https://cdn.skypack.dev/three@0.132.2';

function createRenderer() {

    const specs = {
        antialias: true,
        alpha: true
    }
    const renderer = new WebGLRenderer(specs);

    // turn on the physically correct lighting model
    renderer.physicallyCorrectLights = true;

    return renderer;
}

export { createRenderer };