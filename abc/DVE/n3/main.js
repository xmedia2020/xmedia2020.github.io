import * as GLU from './glsl_utils.js'
import * as shader_sources from './demo_0.js'

// -- Canvas ------------------------------------
const canvas = document.createElement("canvas")
canvas.style.width = '100vw'
canvas.style.height = '100vh'
document.body.appendChild(canvas)
canvas.id = 'canvas'
//canvas.classList.add("canvas")
//const myCanvas = document.querySelector(".canvas")

const gl = canvas.getContext('webgl')
if(!gl){
    console.error("Unable to initialize WebGL")
}

const tex = GLU.loadTexture(gl, "assets/helvetica_n.png")

gl.bindTexture(gl.TEXTURE_2D, tex);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR) // gl.NEAREST?
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

// -- Pointer -----------------------------------
const pointer = {
    x       : 0,
    y       : 0,
    px      : 0,
    py      : 0,
    pressed : false
}
canvas.addEventListener('mousemove', function(e){
    pointer.px = pointer.x
    pointer.py = pointer.y
    pointer.x  = e.pageX
    pointer.y  = e.pageY
})

// 1. Create vertex and fragment shaders
const v_shader = GLU.compileShader(gl, shader_sources.vertex, gl.VERTEX_SHADER)
const f_shader = GLU.compileShader(gl, shader_sources.fragment, gl.FRAGMENT_SHADER)

// 2. Create shader programs
const program = gl.createProgram()
gl.attachShader(program, v_shader)
gl.attachShader(program, f_shader)
gl.linkProgram(program)
gl.useProgram(program)

// 3. Create buffers
const position_buf = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, position_buf)
GLU.setRect(gl, -1, -1, 2, 2)

// Layout of our data in the vertex buffer
const a_position = GLU.getAttribLocation(gl, program, 'a_position')

gl.enableVertexAttribArray(a_position)
gl.vertexAttribPointer(a_position,
    2, 			// position is a vec2 (2 values per component)
    gl.FLOAT, 	// each component is a float
    false, 		// don't normalize values
    2 * 4, 		// two 4 byte float components per vertex (32 bit float is 4 bytes)
    0 			// how many bytes inside the buffer to start from
)
// ---
const texCoord_buf = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, texCoord_buf)
GLU.setRect(gl, 0, 0, 1, 1)

// Layout of our data in the vertex buffer
const a_texCoord = GLU.getAttribLocation(gl, program, 'a_texCoord')

gl.enableVertexAttribArray(a_texCoord)
gl.vertexAttribPointer(a_texCoord,
    2,          // texCoord is a vec2 (2 values per component)
    gl.FLOAT,   // each component is a float
    false,      // don't normalize values
    2 * 4,      // two 4 byte float components per vertex (32 bit float is 4 bytes)
    0           // how many bytes inside the buffer to start from
)

// 4. Set Uniforms
const u_time = GLU.getUniformLocation(gl, program, 'u_time')
const u_resolution = GLU.getUniformLocation(gl, program, 'u_resolution')
const u_pointer = GLU.getUniformLocation(gl, program, 'u_pointer')

const u_textureResolution = GLU.getUniformLocation(gl, program, 'u_textureResolution')
gl.uniform2f(u_textureResolution, 256.0, 256.0)


// -- Loop -----------------------------------
requestAnimationFrame(loop)

function loop(t){
    const r = window.devicePixelRatio
    const w = Math.floor(gl.canvas.clientWidth * r)
    const h = Math.floor(gl.canvas.clientHeight * r)

    // Resize
    if (canvas.width != w || canvas.height != h){
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
        gl.uniform2f(u_resolution, w, h)
    }

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT);

    // bind the texture
    // gl.activeTexture(gl.TEXTURE0);                            // TAffect texture unit 0
    // gl.bindTexture(gl.TEXTURE_2D, map);                       // Bind the texture to texture unit 0
    // gl.uniform1i(u_tex, 0);                                   // Tell the shader we bound the texture to texture unit 0

    //gl.uniform2f(u_textureSize)
    gl.uniform2f(u_pointer, pointer.x * r, h-pointer.y * r)     // Scaled & Inverted Y
    gl.uniform1f(u_time, t / 1000.0)                            // Time in seconds

    gl.drawArrays(gl.TRIANGLES, 0, 6)                           // primitie, offset, count

    requestAnimationFrame(loop)
}


// --Event----------------------------------

window.addEventListener("keypress", function(e){
    if (e.key == 's') {

        exportCanvasAsPNG("canvas","pattern")
        // const a = document.createElement("a")
        
        // //document.body.appendChild(a)

        // a.href = myCanvas.toDataURL()
        // a.download = "pattern.png"
        // a.click()
        // //document.body.removeChild(a)
    }
})

function exportCanvasAsPNG(id, fileName) {

    var canvasElement = document.getElementById(id);

    var MIME_TYPE = "image/png";

    var imgURL = canvasElement.toDataURL(MIME_TYPE);

    var dlLink = document.createElement('a');
    dlLink.download = fileName;
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
}


// function keyPressed(){

//     //if the key is a s
//     // if(key == 's'){
//         //save out to a file
//         save("pattern");
//     // }

// }