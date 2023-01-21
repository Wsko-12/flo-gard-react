import { DoubleSide, Group, Mesh } from 'three';
import Assets from '../../../../../assets/Assets';
import { getGlassMaterial } from '../../../../Materials/GlassMaterial';
import { PhongMaterialWithCloseCameraShader } from '../../../../Materials/PhongWithCloseCamera';
import { EColorsPallet } from '../../../../world/environment/utils/utils';
import { QuadCollider } from '../../../base/IndependentGameEntity/Collider/QuadCollider/QuadCollider';
import { GreenHouse } from '../GreenHouse';

const assetName = 'greenhouse_1';

export class GreenHouse_1 extends GreenHouse {
  protected yShift = 0.125;
  collider = new QuadCollider([
    [-1, 1.4],
    [1, 1.4],
    [1, -1.4],
    [-1, -1.4],
  ]);
  inventoryData = {
    title: 'GreenHouse_1',
  };
  isRotate = true;

  clickGeometry = Assets.getGeometry(assetName);
  mesh = new Group();
  constructor() {
    super();
    const floorMesh = new Mesh(
      Assets.getGeometry(`${assetName}_floor`),
      PhongMaterialWithCloseCameraShader({
        map: Assets.getTexture(assetName),
        alphaTest: 0.5,
        shininess: 0,
      })
    );
    floorMesh.userData.staticColor = EColorsPallet.white;

    const glassMesh = new Mesh(Assets.getGeometry(assetName), getGlassMaterial(3));

    const mesh = new Mesh(
      Assets.getGeometry(assetName),
      PhongMaterialWithCloseCameraShader(
        {
          map: Assets.getTexture(assetName),
          alphaTest: 0.5,
          shininess: 0,
          color: 0xff00ff,
          side: DoubleSide,
        },
        3
      )
    );

    floorMesh.receiveShadow = true;
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    this.mesh.add(mesh, floorMesh, glassMesh);
    this.init();
  }
}
