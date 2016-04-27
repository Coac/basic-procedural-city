import BABYLON from 'Babylonjs';
import Settings from './Settings';
import BuildingFactory from './BuildingFactory';

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

    let buildings = [];
    let buildingFactory = new BuildingFactory(scene);
    for (var index = 0; index < Settings.NUMBER_OF_BUILDING; index++) {
      buildings.push(buildingFactory.getRndBuilding());
    }

    BABYLON.Mesh.MergeMeshes(buildings, true, true);

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
