import { LoopsManager } from "./loopsManager/LoopsManager";
import { Renderer } from "./renderer/Renderer";
import { World } from "./world/World";

class Game {
  static init = async (canvas: HTMLCanvasElement) => {
    LoopsManager.init();
    World.init();
    Renderer.init(canvas);
    LoopsManager.start();
  };
}

export { Game };
