#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying vec4 ;


void main() {

	if (coords.y > 0.5)
		gl_FragColor = vec4(1,0.9,0,1);
	else
	{
		gl_FragColor = vec4(0.05,0.53,0.8,1);
	}
}