import { PerspectiveCamera } from "three";
import { GameStore } from "../../gameStore/GameStore";
import { TLoopCallback } from "../../loopsManager/loop/Loop";
import { LoopsManager } from "../../loopsManager/LoopsManager";
import { Point3 } from "../../world/environment/utils/Geometry";
import { CameraController } from "./controllers/CameraController";
import { CameraOrbitController } from "./controllers/orbit/CameraOrbitController";

class GameCamera {
  private static camera: PerspectiveCamera | null = null;
  private static position: Point3 | null = null;
  private static target: Point3 | null = null;
  private static controller: CameraController;

  static init(mouseEventsHandler: HTMLElement) {
    const camera = new PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.01, 50);
    this.camera = camera;

    this.position = new Point3(0, 0, 0);
    this.target = new Point3(0, 0, 0);

    this.controller = new CameraOrbitController(
      mouseEventsHandler,
      this.position,
      this.target,
      this.camera
    );

    LoopsManager.subscribe("update", this.update);
  }

  static getCamera() {
    if (!this.camera) {
      throw new Error("[GameCamera getCamera] first init GameCamera");
    }

    return this.camera;
  }

  public static update: TLoopCallback = (time) => {
    const { camera, position, target } = this;
    if (!camera || !position || !target) {
      throw new Error("[GameCamera update] first init GameCamera ");
    }

    GameStore.cameraTarget.x = target.x;
    GameStore.cameraTarget.z = target.z;
    {
      const { x, y, z } = position;
      camera.position.set(x, y, z);
    }
    {
      const { x, y, z } = target;
      camera.lookAt(x, y, z);
    }

    this.controller.update(time);
  };

  static setTargetPosition(x: number, y: number, z: number) {
    if (this.controller instanceof CameraOrbitController) {
      this.controller.setTargetPosition(x, y, z);
    }
  }
}

export { GameCamera };
