/* eslint-disable no-console */
import { ClickBox } from "./entities/base/IndependentGameEntity/ClickBox/ClickBox";
import { Collider } from "./entities/base/IndependentGameEntity/Collider/Collider";
import { IndependentGameEntity } from "./entities/base/IndependentGameEntity/IndependentGameEntity";
import { EntityManager } from "./entities/EntityManager";
import { LoopsManager } from "./loopsManager/LoopsManager";
import { GameCamera } from "./renderer/gameCamera/GameCamera";
import { Renderer } from "./renderer/Renderer";

const DEV = true;

const devFunctions = {
  renderer: {
    showStats: (value) => {
      if (value) {
        document.body.appendChild(Renderer.stats.dom);
      } else {
        this.stats.dom.remove();
      }
    },

    setFPS: (value = 60) => {
      LoopsManager.loops?.render.setFps(value);
    },
  },

  loops: {
    pauseAllLoops: (value) => {
      LoopsManager.paused = value;
      if (!value) LoopsManager.play();
    },
    pauseRender: (value) => {
      LoopsManager.loops?.render.pause(value);
    },
    pauseUpdate: (value) => {
      LoopsManager.loops?.update.pause(value);
    },
    pauseTick: (value) => {
      LoopsManager.loops?.tick.pause(value);
    },
    setRenderFPS: (fps) => {
      LoopsManager.loops?.render.setFps(fps);
    },
    setUpdateFPS: (fps) => {
      LoopsManager.loops?.update.setFps(fps);
    },
    setTickFPS: (fps) => {
      LoopsManager.loops?.tick.setFps(fps);
    },
  },

  objects: {
    selected: null,
    selectEntity(id) {
      const entity = this.getById(id);
      if (entity) {
        this.selected = entity;
      }
      if (entity instanceof IndependentGameEntity) {
        if (entity.placed.position) {
          const { x, y } = entity.placed.position;
          GameCamera.setTargetPosition(x, 0, y);
        }
      }
    },
    getById(id) {
      const entity = EntityManager.getEntityById(id);

      return entity;
    },
    getAll() {
      console.table(EntityManager.getEntities());
    },
    showColliders(value) {
      Collider.material.visible = value;
      ClickBox.material.visible = value;
    },
  },

  camera: {
    setTargetPosition(x, y, z) {
      GameCamera.setTargetPosition(x, y, z);
    },
  },
};

if (DEV) {
  console.log("%c DEV FUNCTIONS SETTED", "background: #ff0000; color: white");
  globalThis.$DEV = devFunctions;
  // setTimeout(() => {
  //   devFunctions.objects.showColliders(true);
  // }, 1000);
}

export { DEV };
