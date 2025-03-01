import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';


console.log(THREE);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const lighthight = new THREE.AmbientLight(
// 	 0x404040 )


/**
 * 聚光灯
 */
const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 0, 10, 10 );
scene.add( spotLight );

const spotLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( spotLightHelper );

/**
 * 文字
 * 纹理
 */


// console.log(new THREE.TextureLoader)

// load a texture, set wrap mode to repeat
const texture = new THREE.TextureLoader().load( "textures/water.jpg" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 4 );
// scene.add(text)
scene.add(texture)


/**
 * glb gltf 模型文件引入
 */

const loader = new GLTFLoader();

loader.load( 'path/to/model.glb', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );


/**
 * 物体
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );

scene.add( cube );

// scene.add(lighthight)

camera.position.z = 5;

function animate() {

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );

}