//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000)
let mouseX = 400 / 2
let mouseY = 400 / 2

let object;
let controls;
let objToRender = 'computer';

const loader = new GLTFLoader();

loader.load(
    `models/${objToRender}/scene.gltf`,
    (gltf) => {
        object = gltf.scene;
        scene.add(object)
    },
    (xhr) => console.log((xhr.loaded / xhr.total * 100) + '% loaded'),
    (error) => console.error(error)
)

const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(400, 400)

document.getElementById('container3D').appendChild(renderer.domElement)

camera.position.z = 1

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500)
topLight.castShadow = true
scene.add(topLight)

const ambientLight = new THREE.AmbientLight(0x333333, 1)
scene.add(ambientLight)

// controls = new OrbitControls(camera, renderer.domElement)

function animate() {
    requestAnimationFrame(animate)
    object.rotation.y = -3 + mouseX / 400 * 3;
    object.rotation.x = -1.2 + mouseY * 2.5 / 400;
    renderer.render(scene, camera)
}

window.addEventListener("resize", () => {
    camera.aspect = 400 / 400
    camera.updateProjectionMatrix()
    renderer.setSize(400 / 400)
})

document.onmousemove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

animate()