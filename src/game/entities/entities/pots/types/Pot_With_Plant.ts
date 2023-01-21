import { CylinderGeometry, DoubleSide, Mesh } from 'three';
import Assets from '../../../../../assets/Assets';
import { getGroundMaterial } from '../../../../Materials/GroundMaterial';
import { PhongMaterialWithCloseCameraShader } from '../../../../Materials/PhongWithCloseCamera';
import { getShadowMaterial } from '../../../../Materials/ShadowMaterial';
import { IEntityInventoryData } from '../../../base/GameEntity/GameEntity';
import { CircleCollider } from '../../../base/IndependentGameEntity/Collider/CircleCollider/CircleCollider';
import { Pot } from '../Pot';

const assetName = 'pot_1';
const clickGeometry = new CylinderGeometry(0.2, 0.15, 0.25, 6);
clickGeometry.translate(0, 0.125, 0);
export class Pot_With_Plant extends Pot {
  collider = new CircleCollider(0.2);
  inventoryData: IEntityInventoryData = {
    title: 'Pot_With_Plant',
  };
  isRotate = false;

  clickGeometry = clickGeometry;

  baseMesh = new Mesh(
    Assets.getGeometry(assetName),
    PhongMaterialWithCloseCameraShader({ map: Assets.getTexture('testUv') })
  );
  groundMesh = new Mesh(Assets.getGeometry(`${assetName}_ground`), getGroundMaterial());
  shadowMesh = new Mesh(Assets.getGeometry(`${assetName}_shadow`), getShadowMaterial());

  constructor() {
    super();
    const types = ['red', 'blue', 'yellow', 'white', 'pink'];
    const type = types[Math.floor(Math.random() * types.length)];
    const plant = new Mesh(
      Assets.getGeometry(`lupin`),
      PhongMaterialWithCloseCameraShader({
        map: Assets.getTexture(`lupin_${type}`),
        side: DoubleSide,
      })
    );
    plant.castShadow = true;
    plant.receiveShadow = true;
    plant.position.set(0, 0.15, 0);
    this.mesh.add(plant);
    this.init();
  }
}
