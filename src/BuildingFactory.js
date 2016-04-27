import BABYLON from 'Babylonjs';
import Settings from './Settings';

class BuildingFactory {
  constructor(scene) {
    this.scene = scene;
    this.buildingMat = new BABYLON.StandardMaterial('texture1', this.scene);
    this.buildingMat.diffuseTexture = new BABYLON.Texture('../assets/textures/building.jpg', this.scene);
    this.buildingMat.diffuseTexture.uScale = 5.0;
    this.buildingMat.diffuseTexture.vScale = 5.0;
  }

  getRndBuilding() {
    let posX = getRandomArbitrary(-Settings.AREA_SIZE, Settings.AREA_SIZE);
    let posZ = getRandomArbitrary(-Settings.AREA_SIZE, Settings.AREA_SIZE);
    let height = getRandomArbitrary(Settings.BUILDING_MIN_HEIGHT, Settings.BUILDING_MAX_HEIGHT);
    let size = getRandomArbitrary(Settings.BUILDING_MIN_SIZE, Settings.BUILDING_MAX_SIZE);

    let building;
    let rnd = Math.random();
    if (rnd < 0.27) {
      building = this.getDefaultBuilding(height, size, posX, posZ);
    } else if (rnd < 0.54) {
      building = this.getBuildingWithBase(height, size, posX, posZ);
    } else if (rnd < 0.81) {
      building = this.getBlockyBuilding(height, size, posX, posZ);
    } else {
      building = this.getRoundedBuilding(height, size, posX, posZ);
    }
    return building;
  }

  getDefaultBuilding(height, size, posX, posZ) {
    let building = BABYLON.Mesh.CreateBox('building', 1, this.scene);
    building.scaling = new BABYLON.Vector3(size, height, size);
    building.position = new BABYLON.Vector3(posX, building.scaling.y / 2, posZ);
    building.rotation.y = Math.random() * 3.15;
    building.material = this.buildingMat;
    return building;
  }

  getRoundedBuilding(height, size, posX, posZ) {
    let building = BABYLON.Mesh.CreateCylinder('cylinder', height * 2, size, size, 10, 1, this.scene, false);
    building.position = new BABYLON.Vector3(posX, building.scaling.y / 2, posZ);
    building.rotation.y = Math.random() * 3.15;
    building.material = this.buildingMat;
    return building;
  }

  getBuildingWithBase(height, size, posX, posZ) {
    let building = this.getDefaultBuilding(height, size, posX, posZ);

    let base = BABYLON.Mesh.CreateBox('base', 1, this.scene);
    base.scaling = new BABYLON.Vector3(size * 1.2, building.scaling.y * getRandomArbitrary(0.2, 0.4), size * 1.2);
    base.position = new BABYLON.Vector3(building.position.x, base.scaling.y / 2, building.position.z);
    base.rotation = building.rotation;
    base.material = this.buildingMat;
    return BABYLON.Mesh.MergeMeshes([building, base], true, true);
  }

  getBlockyBuilding(height, size, posX, posZ) {
    let base = this.getDefaultBuilding(height * 0.05, size, posX, posZ);

    let blocks = [base];

    let nbBlock = 5;
    for (var i = 0; i < nbBlock + 1; i++) {
      let block = BABYLON.Mesh.CreateBox('base', 1, this.scene);

      let width = getRandomArbitrary(base.scaling.x * 0.2, base.scaling.x * 0.4);
      let length = getRandomArbitrary(base.scaling.z * 0.8, base.scaling.z);

      let heightStep = height / nbBlock;

      if (Math.random() > 0.5) {
        block.scaling = new BABYLON.Vector3(width, heightStep * i, length);
      } else {
        block.scaling = new BABYLON.Vector3(length, heightStep * i, width);
      }

      block.position.x = getRandomArbitrary(base.position.x - block.scaling.x / 2, base.position.x + block.scaling.x / 2);
      block.position.z = getRandomArbitrary(base.position.z - block.scaling.z / 2, base.position.z + block.scaling.z / 2);
      block.position.y = block.scaling.y / 2;

      block.rotation = base.rotation;
      block.material = this.buildingMat;

      blocks.push(block);
    }

    return BABYLON.Mesh.MergeMeshes(blocks, true, true);
  }

}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export default BuildingFactory;
