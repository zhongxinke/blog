import * as THREE from "three";
import TWEEN from "three/addons/libs/tween.module.js";
import { TrackballControls } from "three/addons/controls/TrackballControls";
import {
  CSS3DRenderer,
  CSS3DObject
} from "three/addons/renderers/CSS3DRenderer";

export default class ThreeUtils {
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  cssScene: THREE.Scene;
  cssRenderer: CSS3DRenderer;
  controls: TrackballControls;
  group: THREE.Group;
  groupVector: THREE.Vector3;
  constructor(container: HTMLElement) {
    this.camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    this.camera.position.set(0, 0, 100);
    this.scene = new THREE.Scene();
    this.cssScene = new THREE.Scene();

    this.scene.background = new THREE.Color(0x0b3037);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(this.renderer.domElement);

    this.group = new THREE.Group();
    this.groupVector = new THREE.Vector3();
    const plane = this.bg();
    this.group.add(plane);
    this.scene.add(this.group);
    this.animate();

    document.addEventListener("mousemove", this.onMouseMove.bind(this));
    // window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  onMouseMove(event) {
    TWEEN.removeAll();
    // 获取鼠标在屏幕上的坐标
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    new TWEEN.Tween(this.groupVector)
      .to({ x: mouseX, y: mouseY }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(({ x, y }) => {
        this.group.lookAt(x, y * 0.5, 1);
      })
      .start();
  }

  bg() {
    const geometry = new THREE.PlaneGeometry(
      window.innerWidth,
      window.innerWidth
    );

    const texture = new THREE.TextureLoader().load("./assets/bg2.jpeg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(window.innerHeight / 10, window.innerHeight / 10);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(geometry, material);

    return plane;
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    TWEEN.update();
    // this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
