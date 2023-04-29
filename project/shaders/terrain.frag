#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec4 position;

uniform sampler2D uSamplerHeight;
uniform sampler2D uSamplerTerrain;
uniform sampler2D uSamplerOriginalHeight;
uniform sampler2D uSamplerAltimetry;
uniform float timeFactor;

void main() {
  vec4 color = texture2D(uSamplerTerrain, vTextureCoord);
  vec4 height = texture2D(uSamplerOriginalHeight, vTextureCoord);
  vec4 altimetry = texture2D(uSamplerAltimetry, vec2(0, -height.r));

  color.r = color.r * 0.7 + altimetry.r * 0.3; 
  color.b = color.b * 0.7 + altimetry.b * 0.3; 
  color.g = color.g * 0.7 + altimetry.g * 0.3; 

  gl_FragColor = color;
}