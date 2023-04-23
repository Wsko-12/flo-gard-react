import { Shader, Uniform } from "three";

export const applyCloseCameraShader = (shader: Shader, distance = 1.5) => {
  shader.uniforms.uDist = new Uniform(distance);
  let fragment = shader.fragmentShader;
  fragment = fragment.replace(
    "void main() {",
    `
uniform float uDist;
void main() {`
  );
  fragment = fragment.replace(
    "#include <alphatest_fragment>",
    `
        float depth = gl_FragCoord.z / gl_FragCoord.w;
        if(depth < uDist){
          // closest to screen = 1.0;
          float far = 1.0 - depth / uDist;

          float x = (sin(gl_FragCoord.x) + 1.0) / 2.0;
          float xVal = step(far * 2.5, x);

          float y = (sin(gl_FragCoord.y) + 1.0) / 2.0;
          float yVal = step(far * 2.5, y);

          diffuseColor.a *= (xVal + yVal) / 2.0;
        }
  
        #include <alphatest_fragment>
      `
  );

  shader.fragmentShader = fragment;
};
