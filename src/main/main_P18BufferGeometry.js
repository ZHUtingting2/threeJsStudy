import * as THREE from "three"
//导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//目标：BufferAttribute 
//导入动画库
import gsap from "gsap";
//导入dat.gui
import * as dat from "dat.gui";

//1.创建场景
const scene = new THREE.Scene();

//2.创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//3.定义相机位置
camera.position.set(0, 0, 10);//x, y, z坐标
scene.add(camera);

//4.创建物体、添加物体
const geomery = new THREE.BufferGeometry();
const vertices = new Float32Array([
    -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
]);
//设置顶点
geomery.setAttribute("position", new THREE.BufferAttribute(vertices, 3));//(vertices, 3)每3个值作为1个坐标
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const mesh = new THREE.Mesh(geomery, material);
scene.add(mesh);
console.log(mesh);

const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cube = new THREE.Mesh(geomery, cubeMaterial);



//旋转
cube.rotation.set(Math.PI / 4, 0, 0, "XYZ");//Math.pi代表π，π/4就等于45°，所以此处就代表x轴旋转了45°，Y,Z为0不变，按照“XYZ”方向旋转
//scene.add(cube);
//console.log(cube);


//5.初始化渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
console.log(renderer);
document.body.appendChild(renderer.domElement);

//6.使用控制器查看3D物体
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;//设置控制器的阻尼，让控制器更有真实效果，但是必须在动画循环里调用 .update
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//设置时钟
const clock = new THREE.Clock();

//监听屏幕双击事件
window.addEventListener("dblclick", () => {
    const fullScreenElement = document.fullscreenElement;
    console.log(fullScreenElement)
    if (!fullScreenElement) {
        //双击控制屏幕进入全屏
        renderer.domElement.requestFullscreen();//请求进入
    } else {
        document.exitFullscreen();//退出全屏是文档对象退出
    }
})

function render() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);//请求动画帧函数。渲染每一帧
}

render();

//监听画面尺寸变化，更新渲染画面
window.addEventListener("resize", () => {
    console.log("画面变化了");
    camera.aspect = window.innerWidth / window.innerHeight;//更新摄像头
    camera.updateProjectionMatrix();//更新摄像头的投影矩阵
    renderer.setSize(window.innerWidth, window.innerHeight);//更新渲染器
    renderer.setPixelRatio(window.devicePixelRatio);//设置渲染器的像素比
})