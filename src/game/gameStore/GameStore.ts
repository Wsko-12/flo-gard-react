import { Vector3 } from 'three';

export const GameStore = {
  cameraTarget: {
    x: 0,
    z: 0,
  },
  cameraPosition: {
    value: new Vector3(0, 0, 0),
  },
  lastClick: {
    x: 100,
    y: 100,
    set(x: number, y: number) {
      this.x = x;
      this.y = y;
    },
    centralize() {
      this.x = window.innerWidth / 2;
      this.y = window.innerHeight / 2;
    },
  },
};
