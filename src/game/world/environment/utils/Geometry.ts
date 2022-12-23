import { IPosition2 } from '../../../../ts/interfaces';

const NUM_PREC = 4;

export function roundNum(num: number, precision = NUM_PREC): number {
  return Math.round(num * 10 ** precision) / 10 ** precision;
}

export class Point2 {
  public x: number;
  public y: number;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  getDistanceTo(x?: Point3 | Point2 | number, y?: number): number {
    if (x instanceof Point2 || x instanceof Point3) {
      return roundNum(Math.sqrt((this.x - x.x) ** 2 + (this.y - x.y) ** 2));
    }
    if (!x && !y) {
      return this.getDistanceTo(new Point2(0, 0));
    }
    if (typeof x === 'number' && typeof y === 'number') {
      return this.getDistanceTo(new Point2(x, y));
    }
    return 0;
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public getCirclePoint(angle: number, radius = 1) {
    return new Point2(this.x + Math.cos(angle) * radius, this.y + Math.sin(angle) * radius);
  }

  getCordsArr(): [number, number] {
    return [this.x, this.y];
  }

  getPositionObject(): IPosition2 {
    return {
      x: this.x,
      y: this.y,
    };
  }

  clone() {
    return new Point2(this.x, this.y);
  }
}

export class Point3 {
  public x: number;
  public y: number;
  public z: number;
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  getDistanceTo(x?: Point3 | Point2 | number, y?: number, z?: number): number {
    if (x instanceof Point3) {
      return roundNum(Math.sqrt((this.x - x.x) ** 2 + (this.y - x.y) ** 2 + (this.z - x.z) ** 2));
    }

    if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number') {
      return this.getDistanceTo(new Point3(x, y, z));
    } else if (typeof x === 'number' && typeof y === 'number' && !z) {
      return this.getDistanceTo(new Point3(x, y, this.z));
    } else if (typeof x === 'number' && !y && !z) {
      return this.getDistanceTo(new Point3(x, this.y, this.z));
    } else if (x instanceof Point2) {
      return this.getDistanceTo(new Point3(x.x, x.y, this.z));
    } else if (!x && !y && !z) {
      return this.getDistanceTo(new Point3(0, 0, 0));
    }
    return 0;
  }

  getCordsArr(): [number, number, number] {
    return [this.x, this.y, this.z];
  }
}

export class Vector2 {
  public x: number;
  public y: number;
  public length: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.length = this.getLength();
  }

  public getLength(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  public normalize(): Vector2 {
    if (this.x === 0 && this.y === 0) return this;
    const length = this.getLength();
    this.x /= length;
    this.y /= length;
    this.length = this.getLength();
    return this;
  }

  public scale(scalar: number): Vector2 {
    this.x *= scalar;
    this.y *= scalar;
    this.length = this.getLength();
    return this;
  }

  public movePoint(point: Point2) {
    point.x += this.x;
    point.y += this.y;
    return point;
  }

  public getPerpendicularVector(): Vector2 {
    if (this.x === 0) {
      return new Vector2(this.y, 0);
    }
    if (this.y === 0) {
      return new Vector2(0, this.x);
    }
    return new Vector2(-this.y, this.x);
  }

  public addVector(vec: Vector2): Vector2 {
    this.x += vec.x;
    this.y += vec.y;
    return this;
  }

  public dot(vec: Vector2) {
    const length = this.getLength();
    const x = this.x / length;
    const y = this.y / length;
    return x * vec.x + y * vec.y;
  }
}

export class Vector3 {
  public x: number;
  public y: number;
  public z: number;
  public length: number;

  constructor(x: number | Point3, y: number, z: number) {
    if (x instanceof Point3) {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
    } else {
      this.x = x;
      this.y = y;
      this.z = z;
    }
    this.length = this.getLength();
  }

  public getLength(): number {
    return roundNum(Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2));
  }

  public normalize(): Vector3 {
    if (this.x === 0 && this.y === 0 && this.z === 0) return this;
    const length = this.getLength();
    this.x = roundNum(this.x / length);
    this.y = roundNum(this.y / length);
    this.z = roundNum(this.z / length);
    this.length = this.getLength();
    return this;
  }

  public scale(scalar: number): Vector3 {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    this.length = this.getLength();
    return this;
  }
}

export class Line {
  start: Point2;
  end: Point2;
  constructor(start: Point2, end: Point2) {
    this.start = start;
    this.end = end;
  }

  getLength() {
    const x = this.start.x - this.end.x;
    const y = this.start.y - this.end.y;
    return Math.sqrt(x ** 2 + y ** 2);
  }

  isIntersectLine(line: Line) {
    const x1 = this.start.x;
    const y1 = this.start.y;

    const x2 = this.end.x;
    const y2 = this.end.y;

    const x3 = line.start.x;
    const y3 = line.start.y;

    const x4 = line.end.x;
    const y4 = line.end.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (den === 0) {
      return false;
    }

    const tNum = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);
    const uNum = (x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2);

    const t = tNum / den;
    const u = uNum / den;

    return 0 < t && t < 1 && 0 < u && u < 1;
  }

  isIntersectsCircle(circle: Circle) {
    if (circle.isPointIn(this.start) || circle.isPointIn(this.end)) {
      return true;
    }

    const lineVector = new Vector2(this.end.x - this.start.x, this.end.y - this.start.y);

    const O = this.start;
    const C = circle.center;
    const OC = new Vector2(C.x - O.x, C.y - O.y);

    const OT_length = lineVector.normalize().dot(OC);
    const CT_length = Math.sqrt(OC.getLength() ** 2 - OT_length ** 2);
    return CT_length <= circle.radius;
  }
}

export class Triangle {
  A: Point2;
  B: Point2;
  C: Point2;

  a: Line;
  b: Line;
  c: Line;

  constructor(points: [Point2, Point2, Point2]) {
    this.A = points[0].clone();
    this.B = points[1].clone();
    this.C = points[2].clone();

    this.a = new Line(this.A, this.B);
    this.b = new Line(this.B, this.C);
    this.c = new Line(this.C, this.A);
  }

  getHalfPerimeter() {
    const a = this.a.getLength();
    const b = this.b.getLength();
    const c = this.c.getLength();

    return (a + b + c) / 2;
  }

  getHeight() {
    const p = this.getHalfPerimeter();
    const a = this.a.getLength();
    const b = this.b.getLength();
    const c = this.c.getLength();
    const h = (2 * Math.sqrt(p * (p - a) * (p - b) * (p - c))) / a;
    return h;
  }

  getSquare() {
    const a = this.a.getLength();
    const h = this.getHeight();
    return 0.5 * a * h;
  }

  isPointIn(point: Point2) {
    const origSquare = this.getSquare();

    const triangle_1 = new Triangle([point, this.A, this.B]);
    const triangle_2 = new Triangle([point, this.B, this.C]);
    const triangle_3 = new Triangle([point, this.C, this.A]);

    const sumSquare = triangle_1.getSquare() + triangle_2.getSquare() + triangle_3.getSquare();
    return Math.abs(origSquare - sumSquare) < 0.00000001;
  }
}

export class Quad {
  A: Point2;
  B: Point2;
  C: Point2;
  D: Point2;

  a: Line;
  b: Line;
  c: Line;
  d: Line;

  triangle_1: Triangle;
  triangle_2: Triangle;

  constructor(points: [Point2, Point2, Point2, Point2]) {
    this.A = points[0].clone();
    this.B = points[1].clone();
    this.C = points[2].clone();
    this.D = points[3].clone();

    this.a = new Line(this.A, this.B);
    this.b = new Line(this.B, this.C);
    this.c = new Line(this.C, this.D);
    this.d = new Line(this.D, this.A);

    this.triangle_1 = new Triangle([this.A, this.B, this.C]);
    this.triangle_2 = new Triangle([this.A, this.D, this.C]);
  }

  getSquare() {
    const square_1 = this.triangle_1.getSquare();
    const square_2 = this.triangle_2.getSquare();
    return square_1 + square_2;
  }

  isPointIn(point: Point2) {
    return this.triangle_1.isPointIn(point) || this.triangle_2.isPointIn(point);
  }

  isQuadIn(quad: Quad) {
    // first check intersection lines;
    const thisLines = [this.a, this.b, this.c, this.d];
    const quadLines = [quad.a, quad.b, quad.c, quad.d];

    for (let i = 0; i < thisLines.length; i++) {
      const line = thisLines[i];
      for (let j = 0; j < quadLines.length; j++) {
        const quadLine = quadLines[j];
        if (line.isIntersectLine(quadLine)) {
          return true;
        }
      }
    }

    // if lines didn't intersect check one point
    // situation when one quad fully inside secondQuad;
    if (this.isPointIn(quad.A)) {
      return true;
    }
    if (quad.isPointIn(this.A)) {
      return true;
    }

    return false;
  }
}

export class Circle {
  center: Point2;
  radius: number;
  constructor(center: Point2, radius: number) {
    this.center = center;
    this.radius = radius;
  }

  isPointIn(point: Point2) {
    const distance = this.center.getDistanceTo(point);
    return distance < this.radius;
  }

  isCircleIn(circle: Circle) {
    const distance = this.center.getDistanceTo(circle.center);
    const radSum = this.radius + circle.radius;
    return distance < radSum;
  }
}
