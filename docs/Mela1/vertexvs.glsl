var vertexvs =  `#version 300 es

precision highp float;

in vec2 a_position; // -1 .. +1 ---
in vec4 a_color; // -1 .. +1 ---
out vec2 v_position; // re/im, ca. -4 .. +4
out vec4 v_color; // re/im, ca. -4 .. +4

uniform float u_color;
uniform vec2 u_resolution;
uniform vec2 u_center;
uniform vec2 u_skalierung;
uniform int u_max_iter;

void main() {
  // vec2 clipSpace = a_position / u_resolution * 2.0 - 1.0;
  // v_position= vec2( u_skalierung.x*clipSpace.x+u_center.x, 
  //                 u_skalierung.y*clipSpace.y+u_center.y); 
  // gl_Position = vec4(clipSpace.x, clipSpace.y, 0.0, 1.0);
  v_position= vec2(a_position.x, a_position.y);
  v_color = a_color;
  gl_PointSize = 10.0;
  gl_Position = vec4(u_skalierung.x*(a_position.x-u_center.x), u_skalierung.y*(a_position.y-u_center.y),0.0,1.0);
}

`