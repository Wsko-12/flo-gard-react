export const GameStore = {
  cameraTarget: {
    x: 0,
    z: 0,
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
