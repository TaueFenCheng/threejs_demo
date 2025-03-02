import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


console.log(THREE);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 添加环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 白色的环境光，强度为0.5
scene.add(ambientLight);

/**
 * 聚光灯
 */
// const spotLight = new THREE.SpotLight(0xffffff, 1);
// spotLight.position.set(5, 8, 5);
// spotLight.angle = Math.PI / 4; // 45度的聚光角度，使光照范围更大
// spotLight.penumbra = 0.2; // 增加半影过渡区域，使光照边缘更柔和
// spotLight.decay = 1.5; // 稍微增加衰减效果
// spotLight.distance = 100; // 光照距离
// spotLight.castShadow = true; // 启用阴影投射
// spotLight.shadow.mapSize.width = 1024;
// spotLight.shadow.mapSize.height = 1024;
// spotLight.shadow.camera.near = 0.5;
// spotLight.shadow.camera.far = 500;
// spotLight.shadow.focus = 1; // 使阴影更锐利
// scene.add(spotLight);

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

/**
 * 文字
 * 纹理
 */

// load a texture, set wrap mode to repeat
const texture = new THREE.TextureLoader().load("textures/texture.webp");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.set(2, 2);
texture.repeat.set(1, 1);
texture.minFilter = THREE.LinearFilter;
texture.magFilter = THREE.LinearFilter;
// texture.rotation = Math.PI / 4; // 旋转45度



/**
 * glb gltf 模型文件引入
 */

const loader = new GLTFLoader();

// 加载 .glb 文件
loader.load(
	'path/to/model.glb',  // 模型路径
	function (gltf) {
		// GLB 的处理方式与 GLTF 完全相同
		scene.add(gltf.scene);
	},
	function (progress) {
		console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
	},
	function (error) {
		console.error('An error occurred:', error);
	}
);

// 加载 .gltf 文件
loader.load(
	'path/to/model.gltf',  // 模型路径
	function (gltf) {
		// 加载成功回调
		scene.add(gltf.scene);

		// 如果模型有动画，可以这样访问
		const animations = gltf.animations;

		// 访问具体的网格
		const mesh = gltf.scene.children[0];
	},
	function (progress) {
		// 加载进度回调
		console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
	},
	function (error) {
		// 加载错误回调
		console.error('An error occurred:', error);
	}
);

/**
 * 画线
 */


//create a blue LineBasicMaterial
const materialLine = new THREE.LineBasicMaterial({ color: 0x0000ff });


// 顶点的几何体
const points = [];
points.push(new THREE.Vector3(- 10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));

const geometryLine = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(geometryLine, materialLine)

// scene.add(line)

/**
 * 物体
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
renderer.shadowMap.enabled = true; // 启用阴影渲染
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 使用PCFSoft阴影
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({
	map: texture,  // 添加纹理贴图
	color: 0xffffff  // 设置为白色以不影响纹理颜色
});
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true; // 允许投射阴影
cube.receiveShadow = true; // 允许接收阴影

// 添加地面
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -2;
plane.receiveShadow = true; // 地面接收阴影
scene.add(plane);

scene.add(cube);

// scene.add(lighthight)

camera.position.z = 5;

function animate() {

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render(scene, camera);

}