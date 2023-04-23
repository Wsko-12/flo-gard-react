interface AtlasItem {
  name: string;
  folder: string;
  file: string;
}

interface IPosition2 {
  x: number;
  y: number;
}

interface IPosition3 extends IPosition2 {
  z: number;
}

type TFiveRange = 0 | 1 | 2 | 3 | 4 | 5;

export type { IPosition2, AtlasItem, TFiveRange, IPosition3 };
