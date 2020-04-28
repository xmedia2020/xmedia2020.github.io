/*
 * --Setup Three.js
 */

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

/*
 * --Elements
 */

let cubes = []
const rectW = 0.4
const rows = 20
const cols = 20
const spacing = 2;

let materials = []
for(let i = 0; i<5; i++){
    const m = new THREE.TextureLoader().load( `assets/side${i%3}.png`)
    materials.push(new THREE.MeshBasicMaterial({map: m}))
}

for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
        const index = x + rows * y
        const geometry = new THREE.BoxGeometry(rectW, rectW, rectW)
        const prop = new THREE.Mesh(geometry, materials)

        const cube = {
            mesh: prop,
            pos: {
                x: x * rectW,
                y: y * rectW
            },
            rot: {
                x: 0,
                y: 0,
                z: 0,
            },
            idx: index,
            seq: 0,
            time: 0,
        }

        cubes.push(cube)
    }
}

// Adding elements to the scene
for (let i = 0; i < cubes.length; i++) {
    let c = cubes[i]
    scene.add(c.mesh)
    c.mesh.position.x = c.pos.x
    c.mesh.position.y = c.pos.y
    c.mesh.position.z = 0
}

// Camera and Matrix translation 
camera.position.z = 5;
scene.position.x = -((rectW) * rows) / 2
scene.position.y = -((rectW) * cols) / 2


/*
 * --Loop
 */
let t = 0;
let duration = 40;
let rot = {
    x: 0,
    y: 0,
    z: 0,
}
let seq = 0;

let animate = function() {
    requestAnimationFrame(animate)
    //console.log(cubes[0].rot)

    let travelled = t / duration
    travelled = easeInOutExpo(travelled)
    const currentRot = THREE.MathUtils.lerp(0, Math.PI / 2, travelled)

    for (let c of cubes) {
        switch (seq) {
            case 0:
                c.rot.x = currentRot
                break
            case 1:
                c.rot.y = currentRot
                break
            case 2:
                c.rot.x = -currentRot
                break
            case 3:
                c.rot.y = -currentRot
                c.rot.z = -currentRot
                break
        }

        c.mesh.rotation.x = c.rot.x
        c.mesh.rotation.y = c.rot.y
        c.mesh.rotation.z = c.rot.z
    }

    if (travelled < 1) {
        t += 1
    } else {
        seq += 1
        t = 0
    }

    if (seq > 3) {
        seq = 0;
    }


    renderer.render(scene, camera)
};

animate();



function map(val, in_min, in_max, out_min, out_max) {
    return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function easeInOutExpo(t) {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if ((t /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (t - 1));
    return 0.5 * (-Math.pow(2, -10 * --t) + 2);
}