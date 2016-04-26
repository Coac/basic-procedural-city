import BABYLON from 'Babylonjs';

window.addEventListener('DOMContentLoaded', function() {
  let canvas = document.getElementById('renderCanvas');
  let engine = new BABYLON.Engine(canvas, true);

  let createScene = function() {
    let scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.84, 0.9, 1);

    scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
    scene.fogColor = new BABYLON.Color3(1, 1, 1);
    scene.fogStart = 10;
    scene.fogEnd = 100;

    let camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 20, -15), scene);
    camera.setTarget(new BABYLON.Vector3(0, 15, 0));
    camera.attachControl(canvas, false);
    camera.speed = 0.3;

    new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

    let buildingMat = new BABYLON.StandardMaterial('texture1', scene);
    buildingMat.diffuseTexture = new BABYLON.Texture('../assets/textures/building.jpg', scene);
    buildingMat.diffuseTexture.uScale = 5.0;
    buildingMat.diffuseTexture.vScale = 5.0;

    let minPos = -80;
    let maxPos = 80;

    let buildings = [];
    for (var index = 0; index < 1000; index++) {
      let building = BABYLON.Mesh.CreateBox('building' + index, 1, scene);

      let height = getRandomArbitrary(2, 20);
      let size = getRandomArbitrary(2, 4);
      building.scaling = new BABYLON.Vector3(size, height, size);

      building.position = new BABYLON.Vector3(getRandomArbitrary(minPos, maxPos), building.scaling.y / 2, getRandomArbitrary(minPos, maxPos));
      building.rotation.y = getRandomArbitrary(-5, 5);

      building.material = buildingMat;
      buildings.push(building);
    }

    BABYLON.Mesh.MergeMeshes(buildings, true, true);

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    let groundMat = new BABYLON.StandardMaterial('texture1', scene);
    groundMat.diffuseTexture = new BABYLON.Texture('../assets/textures/ground.jpg', scene);
    groundMat.diffuseTexture.uScale = 10.0;
    groundMat.diffuseTexture.vScale = 10.0;
    let ground = BABYLON.Mesh.CreateGround('mainGround', 400, 400, 1, scene);
    ground.material = groundMat;

    scene.debugLayer.show();
    return scene;
  };

  var scene = createScene();

  engine.runRenderLoop(function() {
    scene.render();
  });
});
