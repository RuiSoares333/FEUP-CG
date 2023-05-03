#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;
varying vec4 coords;
varying vec4 normal;

void main() {
	gl_FragColor =  texture2D(uSampler2, vTextureCoord);
}