import { Mesh, PlaneGeometry, Vector3 } from 'three';
import { Point2 } from '../../../../../world/environment/utils/Geometry';
import { Collider } from '../Collider';

export class QuadCollider extends Collider {
  protected mesh: Mesh;
  constructor(corners: [number, number][]) {
    super();
    const points: Vector3[] = [];
    corners.forEach(([x, z]) => points.push(new Vector3(x, 0, z)));
    const plane = new PlaneGeometry(2, 2);
    plane.rotateX(Math.PI / 2);
    const atr = plane.getAttribute('position');
    const array = atr.array as number[];
    for (let i = 0; i < atr.count; i++) {
      array[i * 3] = corners[i][0];
      array[i * 3 + 1] = 0;
      array[i * 3 + 2] = corners[i][1];
    }

    this.mesh = new Mesh(plane, Collider.material);
  }

  getPoints() {
    const geometry = this.mesh.geometry.clone();
    geometry.translate(this.position.x, 0, this.position.y);
    const array = Array.from(geometry.getAttribute('position').array);
    const points: number[][] = [];
    for (let i = 0; i < 4; i++) {
      const point = array.splice(0, 3);
      points.push(point);
    }

    return points.map(([x, _, y]) => new Point2(x, y));
  }

  isCollision() {
    const points = this.getPoints();
    console.log(points);
    return true;
  }
  pressGrass() {}
}
