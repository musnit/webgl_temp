import * as THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE)

import piecesModel from '../models/3_small_pieces.json';
console.log(piecesModel.geometries);
var scene, camera, renderer;
var geometry, material, mesh;
var pieceMeshes = [];

window.onload = function() {
  init();
  addLights();
  animate();
  loadModel();
};

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x3e3e3e );

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;
    camera.position.set(0, 0, -350)
    camera.lookAt(new THREE.Vector3())

    var controls = new OrbitControls(camera)

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

    var geometry = new THREE.BoxBufferGeometry( 200, 400, 10 );
    var material = new THREE.MeshBasicMaterial({ color: 0x7d7d7d });
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.z += 150;
    scene.add( mesh );
}

function addLights() {
  var ambientLight = new THREE.AmbientLight( 0x000000 );
  scene.add( ambientLight );

  var lights = [];
  lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
  lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
  lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );
  lights[ 0 ].position.set( 0, 0, 144 );
  lights[ 1 ].position.set( 0, 180, 144 );
  lights[ 2 ].position.set( 0, - 180, 144 );
  scene.add( lights[ 0 ] );
  scene.add( lights[ 1 ] );
  scene.add( lights[ 2 ] );

  var geometry = new THREE.CylinderGeometry( 10, 10, 2, 32 );
  var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
  var cylinder = new THREE.Mesh( geometry, material );
  cylinder.rotation.set(Math.PI/2,0,0);
  cylinder.position.set( 0, 0, 144 );
  var cylinder2 = cylinder.clone();
  cylinder2.position.set( 0, 180, 144 );
  var cylinder3 = cylinder.clone();
  cylinder3.position.set( 0, -180, 144 );

  scene.add( cylinder );
  scene.add( cylinder2 );
  scene.add( cylinder3 );

}

function animate() {

    requestAnimationFrame( animate );

    /*pieceMeshes.forEach((pieceMesh) => {
      pieceMesh.rotation.x += 0.01;
      pieceMesh.rotation.y += 0.02;
    });*/

    renderer.render( scene, camera );

}

function loadModel() {
  // instantiate a loader
  var loader = new THREE.JSONLoader();

  // load a resource
  var material = new THREE.MeshPhongMaterial({
    color: 0x2194ce,
    specular: 0x000000,
    emissive: 0x000000,
    shininess: 50,
    opacity: 0.8,
    transparent: true
  });

  var pieceModel1 = loader.parse(piecesModel.geometries[0].data);
  var pieceMesh1 = new THREE.Mesh( pieceModel1.geometry, material );
  var pieceModel2 = loader.parse(piecesModel.geometries[1].data);
  var pieceMesh2 = new THREE.Mesh( pieceModel2.geometry, material );
  var pieceModel3 = loader.parse(piecesModel.geometries[2].data);
  var pieceMesh3 = new THREE.Mesh( pieceModel3.geometry, material );

  var meshes = [pieceMesh1, pieceMesh2, pieceMesh3];

  //i from 0 to 20
  //j from 0 to 40
  var iMax = 15;
  var jMax = 25;
  var iBoundsMax = 150;
  var jBoundsMax = 300;
  var iStart = -iBoundsMax/2;
  var jStart = -jBoundsMax/2;
  for (var i = 0; i < iMax; i++) {
    for(var j = 0; j < jMax; j++) {
      var xPos = i/iMax * iBoundsMax;
      var yPos = j/jMax * jBoundsMax;
      var mesh = meshes[Math.floor(Math.random()*3)];
      var newPiece = mesh.clone();
      newPiece.position.x += xPos + iStart;
      newPiece.position.y += yPos + jStart;
      newPiece.position.z += 10*Math.random()*10;
      newPiece.rotation.set(Math.random()*90, Math.random()*90, Math.random()*90)
      scene.add( newPiece );
      pieceMeshes.push(newPiece);
    }
  }

    /*,
  	// Function when resource is loaded
  	function ( geometry, materials ) {
  		var material = new THREE.MultiMaterial( materials );
  		var object = new THREE.Mesh( geometry, material );
  		scene.add( object );
  	}
  );*/
}
