import { Group, Mesh } from 'three';
import { IndependentGameEntity } from '../../base/IndependentGameEntity/IndependentGameEntity';

export abstract class Pot extends IndependentGameEntity {
  abstract mesh: Group;
  abstract potMesh: Mesh;
  abstract groundMesh: Mesh;
  constructor() {
    super();
  }

  public init(): void {
    const { groundMesh, potMesh } = this;
    groundMesh.castShadow = true;
    groundMesh.receiveShadow = true;
    potMesh.castShadow = true;
    potMesh.castShadow = true;

    this.mesh.add(groundMesh, potMesh);
    super.init();
  }
}
