import { link } from 'fs';
import * as THREE from "three";
import TWEEN from "three/addons/libs/tween.module.js";
import { TrackballControls } from "three/addons/controls/TrackballControls";
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import {
  CSS3DRenderer,
  CSS3DObject
} from "three/addons/renderers/CSS3DRenderer";

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

export default class ThreeUtils {
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  cssScene: THREE.Scene;
  cssRenderer: CSS3DRenderer;
  controls: TrackballControls;
  group: THREE.Group;
  groupVector: THREE.Vector3;
  constructor(container: HTMLElement, options: {
    nav: any[],
    onClick: (link: string) => void,
  }) {
    const { nav, onClick } = options;
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
    const routePlane = nav.map(route => this.plane(route.image, route.x, route.y, route.link))
    this.routes()

    this.group.add(plane, ...routePlane);
    this.scene.add(this.group);
    this.animate();

    document.addEventListener("mousemove", this.onMouseMove.bind(this));
    window.addEventListener("resize", this.onWindowResize.bind(this));
    window.addEventListener("mousedown", this.onMouseDown.bind(this, onClick))
  }

  onMouseDown(onClick) {

    raycaster.setFromCamera(pointer, this.camera);

    const intersects = raycaster.intersectObject(this.group, true);

    if (intersects.length > 0) {

      const res = intersects.filter(function (res) {

        return res && res.object;

      })[0];

      if (res && res.object) {
        if (res.object.name === "plane") {
          onClick?.(res.object.link)
        }
      }

    }
  }
  onMouseMove(event) {
    // 获取鼠标在屏幕上的坐标
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // new TWEEN.Tween(this.groupVector)
    //   .to({ x: mouseX, y: mouseY }, 500)
    //   .easing(TWEEN.Easing.Sinusoidal.Out)
    //   .onUpdate(({ x, y }) => {

    //   })
    //   .start();
    this.group.lookAt(pointer.x * 0.7, pointer.y * 0.5, 1);
    raycaster.setFromCamera(pointer, this.camera);

    const intersects = raycaster.intersectObject(this.group, true);

    if (intersects.length > 0) {

      const res = intersects.filter(function (res) {

        return res && res.object;

      })[0];

      if (res && res.object) {
        if (res.object.name === "plane") {
          document.body.style.cursor = "pointer";
        } else {
          document.body.style.cursor = "default";
        }
      }

    }
  }

  routes() {
    // otherNav.forEach(item => {
    //   console.log({ item })
    // })
  }

  // 创建平面图片
  plane(imgUrl: string, x: number = 0, y: number = 0, link: string = "") {
    const geometry = new THREE.CircleGeometry(5, 10);

    const texture = new THREE.TextureLoader().load(imgUrl);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const plane = new THREE.Mesh(geometry, material);

    plane.name = "plane";
    plane.position.z = 15;
    plane.position.x = x;
    plane.position.y = y;
    plane.link = link;

    return plane;
  }

  bg() {
    const geometry = new THREE.PlaneGeometry(
      window.innerWidth,
      window.innerWidth
    );

    const texture = new THREE.TextureLoader().load("/blogImg/bg2.jpeg");
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
