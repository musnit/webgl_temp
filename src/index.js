import * as THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE)

import UI from './ui.js';

import piecesModel from '../models/3_small_pieces.json';

import React from 'react';
import ReactDOM from 'react-dom';

var scene, camera, renderer;
var geometry, material, mesh;
var pieceMeshes = [];
var phongReflectionMaterial;
var controls;

var urls = [
      'images/posx.jpg',
      'images/negx.jpg',
      'images/posy.jpg',
      'images/negy.jpg',
      'images/posz.jpg',
      'images/negz.jpg'
    ];

window.onload = function() {
  init();
  addLights();
  animate();
  loadModel();
};

window.onkeypress = (event) => {
  if(event.key === 'Enter'){
    onPress();
  }
}

function init() {

    scene = new THREE.Scene();
    //scene.background = new THREE.Color( 0x3e3e3e );

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;
    camera.position.set(-301.84525365102866, 50.13329342572092, -257.6355870966525);
    camera.lookAt(new THREE.Vector3());


    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );
    controls = new OrbitControls(camera, renderer.domElement)
    controls.autoRotate = true;

    var geometry = new THREE.BoxBufferGeometry( 200, 10, 400 );
    var material = new THREE.MeshBasicMaterial({ color: 0x7d7d7d });
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.y += 150;
    scene.add( mesh );

    // wrap it up into the object that we need
    var cubemap = THREE.ImageUtils.loadTextureCube(urls, THREE.CubeRefractionMapping);

    // set the format, likely RGB
    // unless you've gone crazy
    cubemap.format = THREE.RGBFormat;

    // following code from https://github.com/mrdoob/three.js/blob/master/examples/webgl_materials_cubemap.html
    var shader = THREE.ShaderLib[ "cube" ];
    shader.uniforms[ "tCube" ].value = cubemap;

    var material = new THREE.ShaderMaterial( {

      fragmentShader: shader.fragmentShader,
      vertexShader: shader.vertexShader,
      uniforms: shader.uniforms,
      depthWrite: false,
      side: THREE.BackSide

    });

    var skybox = new THREE.Mesh( new THREE.CubeGeometry( 1000, 1000, 1000 ), material );
    skybox.flipSided = true;
    scene.add(skybox);

    phongReflectionMaterial = new THREE.MeshPhongMaterial({
      color: 0xcccccc,
      specular: 0x000000,
      emissive: 0x000000,
      shininess: 250,
      opacity: 1,
      transparent: true,
      bmap: THREE.ImageUtils.loadTexture('images/amber_texture.jpg'),
      envMap: cubemap,
      reflectivity: 0.4,
      refractionRatio: 0.98
    });

    ReactDOM.render(
      <UI material={phongReflectionMaterial} controls={controls} />,
      document.getElementById('react-root')
    );
}

function addLights() {
  var ambientLight = new THREE.AmbientLight( 0xffffff, 0.6 );
  scene.add( ambientLight );

  var lights = [];
  lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
  lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
  lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );
  lights[ 0 ].position.set( 0, 0, 144 );
  lights[ 1 ].position.set( 0, 140, 144 );
  lights[ 2 ].position.set( 0, - 140, 144 );
  scene.add( lights[ 0 ] );
  scene.add( lights[ 1 ] );
  scene.add( lights[ 2 ] );

  var geometry = new THREE.CylinderGeometry( 15, 15, 2, 32 );
  var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
  var cylinder = new THREE.Mesh( geometry, material );
  cylinder.rotation.set(0,0,0);
  cylinder.position.set( 0, 144, 0 );
  var cylinder2 = cylinder.clone();
  cylinder2.position.set( 0, 144, 140 );
  var cylinder3 = cylinder.clone();
  cylinder3.position.set( 0, 144, -140 );

  scene.add( cylinder );
  scene.add( cylinder2 );
  scene.add( cylinder3 );

}

function animate() {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
}

function loadModel() {
  // instantiate a loader
  var loader = new THREE.JSONLoader();

  var pieceModel1 = loader.parse(piecesModel.geometries[0].data);
  var pieceMesh1 = new THREE.Mesh( pieceModel1.geometry, phongReflectionMaterial );
  var pieceModel2 = loader.parse(piecesModel.geometries[1].data);
  var pieceMesh2 = new THREE.Mesh( pieceModel2.geometry, phongReflectionMaterial );
  var pieceModel3 = loader.parse(piecesModel.geometries[2].data);
  var pieceMesh3 = new THREE.Mesh( pieceModel3.geometry, phongReflectionMaterial );

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
      newPiece.position.y += 10*Math.random()*10;
      newPiece.position.z += yPos + jStart;
      newPiece.rotation.set(Math.random()*90, Math.random()*90, Math.random()*90)
      scene.add( newPiece );
      pieceMeshes.push(newPiece);
    }
  }
}
