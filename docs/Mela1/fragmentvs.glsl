var fragmentvs = `#version 300 es
precision highp float;
precision highp int;

uniform float u_color;
uniform vec2 u_resolution;
uniform vec2 u_center;
uniform vec2 u_skalierung;
uniform int u_max_iter;

in vec2 v_position;
in vec4 v_color;
out vec4 outColor; 


void main()	{
   vec4 dummy = vec4(0.302, 0.6039, 1.0, 0.678);
   outColor = mix( v_color, vec4(v_position.x, v_position.y, u_color / 13.0, 1.0), 0.2);
   // outColor = dummy;
}
`