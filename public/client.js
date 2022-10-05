/**********************************************/
/*               PROYECTO 2 HCG               */
/**********************************************/
/* GRUPO: 1IL131                              */
/* INTEGRANTES: CILLI, ÃNGEL (E-8-182257)     */
/*              STRAUSS, EUGENIA (20-70-4569) */
/**********************************************/

import * as THREE from 'three';
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import Stats from './jsm/libs/stats.module.js'
import { GUI } from './jsm/libs/lil-gui.module.min.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { Water } from 'three/addons/objects/Water2.js';


let  water;  
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000)
camera.position.set(30,13,60)
camera.lookAt(scene.position)
const renderer = new THREE.WebGLRenderer({
    antialias: true
})

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild( renderer.domElement );

const renderScene = new RenderPass(scene,camera)
const composer = new EffectComposer( renderer)
composer.addPass(renderScene)

const params = {
    color: '#94d1ff',
    scale: 4,
    flowX: 1,
    flowY: 1
};

const bloomPass= new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.002,
    0.2,
    0.2
)
//composer.addPass(bloomPass)
//Water

    // ground

    const groundGeometry = new THREE.PlaneGeometry( 200, 200 );
    const groundMaterial = new THREE.MeshStandardMaterial( { roughness: 0.8, metalness: 0.6 } );
    const ground = new THREE.Mesh( groundGeometry, groundMaterial );
    ground.rotation.x = Math.PI * - 0.5;
    scene.add( ground );

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load( 'img/stonefloor.jpg', function ( map ) {

        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 16;
        map.repeat.set( 4, 4 );
        groundMaterial.map = map;
        groundMaterial.needsUpdate = true;

    } );

    // water

    const waterGeometry = new THREE.PlaneGeometry( 200, 200 );

    water = new Water( waterGeometry, {
        color: params.color,
        scale: params.scale,
        flowDirection: new THREE.Vector2( params.flowX, params.flowY ),
        textureWidth: 1024,
        textureHeight: 1024
    } );

    water.position.y = 1;
    water.rotation.x = Math.PI * - 0.5;
    scene.add( water );


    // gui

    const gui = new GUI();

    gui.addColor( params, 'color' ).onChange( function ( value ) {

        water.material.uniforms[ 'color' ].value.set( value );

    } );
    gui.add( params, 'scale', 1, 10 ).onChange( function ( value ) {

        water.material.uniforms[ 'config' ].value.w = value;

    } );
    gui.add( params, 'flowX', - 1, 1 ).step( 0.01 ).onChange( function ( value ) {

        water.material.uniforms[ 'flowDirection' ].value.x = value;
        water.material.uniforms[ 'flowDirection' ].value.normalize();

    } );
    gui.add( params, 'flowY', - 1, 1 ).step( 0.01 ).onChange( function ( value ) {

        water.material.uniforms[ 'flowDirection' ].value.y = value;
        water.material.uniforms[ 'flowDirection' ].value.normalize();

    } );

    gui.open();

    //

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 5;
    controls.maxDistance = 50;

    //

    window.addEventListener( 'resize', onWindowResize );



function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}


//background

// SKYBOX ////////////////////////////////////////

scene.background = new THREE.CubeTextureLoader().setPath( 'skybox/forest/' ).load( [
	'px.png', 'nx.png',
	'py.png', 'ny.png',
	'pz.png', 'nz.png'
] );

//scene.background = new THREE.Color( 0x2A2A27 );
  
//Create a plane that receives shadows (but does not cast them)
const planeGeometry = new THREE.PlaneGeometry( 200, 200, 320, 320 );
const plane = new THREE.Mesh( planeGeometry, Water );
plane.position.set(-5,-5,-5)
plane.rotation.x=300
//plane.receiveShadow = true;
scene.add( plane );

const planeMaterial = new THREE.MeshStandardMaterial( {   color: 0x6D908E , side:THREE.DoubleSide } )
const subplane = new THREE.Mesh(planeGeometry,planeMaterial)
subplane.position.set(-10,-10,-10)
subplane.rotation.x=300
subplane.receiveShadow = true;
//scene.add( subplane );

//enable shadow
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
//const controls = new OrbitControls(camera, renderer.domElement)
const boxGeometry = new THREE.BoxGeometry()

//triforce
// Create Triangles
var normalMap = new THREE.TextureLoader().load(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1385231/metal-seamless-normal-mapping.jpg"
  );
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
  var material = new THREE.MeshPhongMaterial({
    color: 0xf6c12a,
    normalMap: normalMap,
    shininess: 100,
  
  });
  
  var shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(2, 3);
  shape.lineTo(4, 0);
  shape.lineTo(0, 0);
  
  var extrudeSettings = {
    steps: 5,
    depth: 1,
    bevelEnabled: true,
    bevelThickness: 0.3,
    bevelSize: 0.5,
    bevelOffset: 0,
    bevelSegments: 1
  };
  
  var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  
  // Sets the origin to the center of geometry for rotation
  geometry.center();
  
  var piece1 = new THREE.Mesh(geometry, material);
  var piece2 = new THREE.Mesh(geometry, material);
  var piece3 = new THREE.Mesh(geometry, material);
  
  piece1.position.x = -3.9;
  piece1.position.y = 6;
  piece1.scale.set(1.5, 1.5, 1.5);
  
  piece2.position.x = 3.9;
  piece2.position.y = 6;
  piece2.scale.set(1.5, 1.5, 1.5);
  
  piece3.position.x = 0;
  piece3.position.y = 12;
  piece3.scale.set(1.5, 1.5, 1.5);

  scene.add(piece1);
  scene.add(piece2);
  scene.add(piece3);
  
  
  // Lighting
  var ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);
//Create a sphere that cast shadows
const sphereGeometry = new THREE.SphereGeometry( 1, 20, 20 );
const sphereGeometry2 = new THREE.SphereGeometry( 0.5, 20, 20 );
const sphereMaterial = new THREE.MeshPhongMaterial( { 
    color: 0x00ffff,
    opacity: 0.45,
    transparent: true
} );
const sphereMaterial2 = new THREE.MeshPhongMaterial( { 
    color: 0xffffff,
    opacity: 10,
    
} );
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.castShadow = false; //default is false
sphere.receiveShadow = false; //default
//sphere.position.set(0,2,0)
//scene.add( sphere );
const sphere2 = new THREE.Mesh( sphereGeometry2, sphereMaterial2 );


//point light triforce
const ptlight1 = new THREE.PointLight( 0xFFC000, 1, 80);
ptlight1.position.set( -0.9, 20, 28);
scene.add( ptlight1 );
//Create a helper for the shadow camera
const sphereSize = 1;
const pointtLightHelper1 = new THREE.PointLightHelper( ptlight1, sphereSize );
//scene.add( pointtLightHelper1 );

//point light navi
const pnlight = new THREE.PointLight( 0x00ffFF, 0.8, 30);
//pnlight.position.set( 8, 5, 0 );
//scene.add( pnlight );

//Set up shadow properties for the plight
pnlight.shadow.mapSize.width = 200; // default
pnlight.shadow.mapSize.height = 200; // default
pnlight.shadow.camera.near = 0.8; // default
pnlight.shadow.camera.far = 30; // default
//Create a helper for the shadow camera


//object group that surrounds triforce and spins
const triforceobj= new THREE.Object3D()

triforceobj.add(pnlight)
triforceobj.add(sphere)
triforceobj.add(sphere2)
triforceobj.position.set(0,10,0)
scene.add(triforceobj)
pnlight.position.x=20
sphere.position.x=20
sphere2.position.x=20

window.addEventListener(
    'resize',
    () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    },
    false
)

// GENERACIÓN DEL LUGIÉRNAGAS ////////////////////
const luciernagas = [];
const pointLights = [];
for ( let i = 0; i < 50; i ++ ) { //Cantidad de puntos
	const x = THREE.MathUtils.randFloatSpread( 100 ); //Dispersión en x
	const y = THREE.MathUtils.randFloatSpread( 100 ); //Dispersión en y
	const z = THREE.MathUtils.randFloatSpread( 100 ); //Dispersión en z
	luciernagas.push( x, y, z );
    pointLights.push( x, y, z );
}
const aspectoLuciernagas = createRadial()
function createRadial()
{
    let canvas = document.createElement("canvas")
    canvas.width = canvas.height = 256
    let context= canvas.getContext("2d")
    let pointsGradient = context.createRadialGradient(127, 127, 1, 127, 127, 127)
    pointsGradient.addColorStop( 0, "aquamarine" )
    pointsGradient.addColorStop( 1, "transparent" )
    context.fillStyle = pointsGradient
    context.fillRect(0,0,256,256)
    return new THREE.CanvasTexture(canvas)
}

const pointsGeometry = new THREE.BufferGeometry();
pointsGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( luciernagas, 3 ) );
const pointsMaterial = new THREE.PointsMaterial( { color : 0xFFFF80, map : aspectoLuciernagas, alphaTest : 0, transparent : true, blending : THREE.AdditiveBlending} );
const points = new THREE.Points( pointsGeometry, pointsMaterial );
points.add( new THREE.PointLight( 0xFFFFFF, 0.5 ) )
scene.add( points );

const stats = Stats()
document.body.appendChild(stats.dom)


const dirlightFolder = gui.addFolder('Main light')
dirlightFolder.add(ptlight1.position, 'x', -30, 30)
dirlightFolder.add(ptlight1.position, 'y', 0, 90)
dirlightFolder.add(ptlight1.position, 'z', -30, 30)
dirlightFolder.open()



var stream = "music/Majora's Mask Song of Healing.mp3";


// init
function init() {
    

    // AUDIO
    var audioLoader = new THREE.AudioLoader();
    var listener = new THREE.AudioListener();
    var audio = new THREE.Audio(listener);
    audioLoader.load(stream, function(buffer) {
        audio.setBuffer(buffer);
        audio.setLoop(true);
        audio.play();
        
    });


}
function animate() {
    let tfloat= new Date()*0.0025
    requestAnimationFrame(animate)
    piece1.rotateY(0.02)
    piece2.rotateY(0.02)
    piece3.rotateY(0.02)
    triforceobj.position.y = (Math.sin(tfloat)*4 + 8) 
    triforceobj.rotateY(-0.03/2) 
   
    points.rotation.x += Math.random()/500;
    points.rotation.y += Math.random()/500;
    points.rotation.z += Math.random()/500;

    controls.update()
   
    
    render()
    
  

}
function render() {
    renderer.render(scene, camera)
}
init()
animate()