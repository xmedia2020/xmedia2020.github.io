/*
 * --Setup Three.js
 */

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

let mouse = new THREE.Vector2();

/*
 * --Elements
 */

let planes = []
const rectW = 0.5
const spacing = 2;

for (let i = 0; i < 3; i++) {
    let col
    if (i % 2 == 0) {
        col = "rgb(255, 255, 255)"
    } else {
        col = "rgb(255, 0, 0)"
    }
    const geometry = new THREE.PlaneGeometry(rectW, rectW, 4)
    const material = new THREE.MeshBasicMaterial({ color: col });
    const mesh = new THREE.Mesh(geometry, material)

    planes.push(mesh)
}

// Adding elements to the scene
for (let i = 0; i < planes.length; i++) {
    let sign
    if (i % 2 == 0) {
        sign = 1
    } else {
        sign = -1;
    }
    let p = planes[i]
    scene.add(p)
    p.position.x = 0
    p.position.y = i * 0.02
    p.position.z = i * 0.8
    p.rotation.y = 0.00000001
    //p.rotation.z = sign *Math.PI/4
}

// Camera and Matrix translation 
camera.position.z = 1;
camera.rotation.x = 0.05


/*
 * --Loop
 */
let t = 0;
let animate = function() {
    requestAnimationFrame(animate)

    for (let i = 0; i < planes.length; i++) {
        let sign
        if (i % 2 == 0) {
            sign = 1
        } else {
            sign = -1
        }
        let p = planes[i]
        let my = map(mouse.y, -1, 1, -0.000001, 0.000001)
        let mx = map(mouse.x, -1, 1, -Math.PI / 40, Math.PI / 40)
        p.position.z = i * my
        p.rotation.z = sign * Math.PI/8 + mx*0.001 
        // p.rotation.z += 0.001 * i *0.17
        p.position.x = Math.sin(i*(t/50))*0.00003
    }

    renderer.render(scene, camera)
    t += 1;
};

animate();
window.addEventListener('mousemove', onMouseMove, false);
//window.requestAnimationFrame(render);


function map(val, in_min, in_max, out_min, out_max) {
    return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function easeInOutExpo(t) {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if ((t /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (t - 1));
    return 0.5 * (-Math.pow(2, -10 * --t) + 2);
}

function onMouseMove(event) {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

}