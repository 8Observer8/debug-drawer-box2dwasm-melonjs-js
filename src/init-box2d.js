import Box2DLib from "box2d-wasm";

export let box2d = null;

export function initBox2D(localhost = true) {
    return new Promise(resolve => {
        Box2DLib({
            locateFile: (url, scriptDirectory) => {
                if (url.endsWith(".wasm") && !localhost) {
                    return "file:///opt/render/project/src/node_modules/box2d-wasm/dist/umd/Box2D.simd.wasm";
                }
                return scriptDirectory + url;
            }
        }).then((re) => {
            box2d = re;
            resolve();
        });
    });
}
