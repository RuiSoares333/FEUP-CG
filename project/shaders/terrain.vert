attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;
//varying vec4 coords;
uniform sampler2D uSamplerHeight;

void main() {
  vTextureCoord = aTextureCoord;

  vec3 offset = aVertexNormal * texture2D(uSamplerHeight, vTextureCoord).b * 0.12;
  
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
  
  //coords = vec4(aVertexPosition + offset, 1.0);
}

