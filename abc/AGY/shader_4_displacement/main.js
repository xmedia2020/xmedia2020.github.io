import * as GLU from './glsl_utils.js'
import * as shader_sources from './demo_0.js'

// -- Canvas ------------------------------------
const canvas = document.createElement("canvas")
canvas.style.width = '100vw'
canvas.style.height = '100vh'
document.body.appendChild(canvas)

const gl = canvas.getContext('webgl')
if(!gl){
    console.error("Unable to initialize WebGL")
}

//const tex = GLU.loadTexture(gl, "assets/gys.jpg")
const tex = GLU.loadTexture(gl, "assets/bodoni_m.png")

gl.bindTexture(gl.TEXTURE_2D, tex);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
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

// 1. Vertex & fragment shaders
const v_shader = GLU.compileShader(gl, shader_sources.vertex, gl.VERTEX_SHADER)
const f_shader = GLU.compileShader(gl, shader_sources.fragment, gl.FRAGMENT_SHADER)

// 2. Shader programs
const program = gl.createProgram()
gl.attachShader(program, v_shader)
gl.attachShader(program, f_shader)
gl.linkProgram(program)
gl.useProgram(program)

// 3. Buffers
const position_buf = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, position_buf)
GLU.setRect(gl, -1, -1, 2, 2)

// 4. Attibs
const a_position = GLU.getAttribLocation(gl, program, 'a_position')

gl.enableVertexAttribArray(a_position)
gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 2 * 4, 0)

// ---
const texCoord_buf = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, texCoord_buf)
GLU.setRect(gl, 0, 0, 1, 1)

const a_texCoord = GLU.getAttribLocation(gl, program, 'a_texCoord')

gl.enableVertexAttribArray(a_texCoord)
gl.vertexAttribPointer(a_texCoord, 2, gl.FLOAT, false, 2 * 4, 0)

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

    // Immagine
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(u_pointer, pointer.x * r, h-pointer.y * r)
    gl.uniform1f(u_time, t / 1000.0)

    gl.drawArrays(gl.TRIANGLES, 0, 6)

    requestAnimationFrame(loop)
}
