// https://webglfundamentals.org/webgl/lessons/webgl-image-processing.html
//
// ------------------------------------------------------------------
export const vertex = `

precision mediump float;
precision mediump int;

uniform vec2 u_resolution;
uniform vec2 u_textureResolution;

attribute vec2 a_position;
attribute vec2 a_texCoord;

varying vec2 v_texCoord;

void main() {
    float a = u_resolution.x / u_resolution.y;
    float center_x = (a - 1.0) / 2.0;
    v_texCoord.x = a_texCoord.x * a - center_x;
    v_texCoord.y = 1.0 - a_texCoord.y;    // raddriziamo la Y qui...
    gl_Position = vec4(a_position, 0.0, 1.0);
}

`;

// ------------------------------------------------------------------
export const fragment = `

precision mediump float;
precision mediump int;

uniform vec2 u_resolution;
uniform vec2 u_pointer;
uniform vec2 u_textureResolution;
uniform float u_time;
uniform sampler2D u_tex;

varying vec2 v_texCoord;

void main() {
    // -- aspect ------
    //float a = u_resolution.x / u_resolution.y;

    // -- image ------
    vec2 cm = (2.0 * u_pointer.xy - u_resolution.xy) / u_resolution;

    // -- image ------
    //vec2 center = (2.0 * gl_FragCoord.xy - u_resolution) / a;

    float x = fract(v_texCoord.x + sin(gl_FragCoord.x*0.01)*1.3) - cm.x;
    float y = fract(v_texCoord.y + sin(gl_FragCoord.y*0.01)*1.3) + cm.y;
    //float x = v_texCoord.x - sin(u_time * v_texCoord.y * cm.x * 3.0) * 0.2;
    //float y = v_texCoord.y;
    //float x = v_texCoord.x + sin(u_time * 0.05 + ( v_texCoord.x * v_texCoord.y ) * 0.07) * 2.0; - cm.x;
    //float y = v_texCoord.y;


    vec4 t = texture2D(u_tex, vec2(x, y));
    gl_FragColor = vec4(t.rgb, 1.0);


}


`;