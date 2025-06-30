// Global variables
let s = 200;    // Side length of the entire sponge
let level = 2;  // Recursion level (2 means 400 cubes, reasonable performance)
let cubes = []; // Array to store cube data

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // Generate the sponge, centered at the origin
  generateSponge(level, 0, 0, 0, s);
  orbitControl(); // Optional: allows mouse interaction with the view
}

function draw() {
  background(0); // Black background

  // Orbiting light position
  let angle = frameCount * 0.01;
  let d = 300; // Distance from origin
  let lightX = d * cos(angle);
  let lightY = d * sin(angle);
  let lightZ = 0;

  // Lighting setup
  ambientLight(50); // Subtle ambient light
  pointLight(255, 255, 255, lightX, lightY, lightZ); // White orbiting point light

  // Rotate the sponge
  rotateX(frameCount * 0.005);
  rotateY(frameCount * 0.01);

  // Draw each cube
  for (let cube of cubes) {
    push();
    translate(cube.cx, cube.cy, cube.cz);
    ambientMaterial(cube.col);    // Base color from gradient
    specularMaterial(255);        // White specular highlights
    shininess(32);                // Shininess factor
    box(cube.size);               // Draw cube
    pop();
  }
}

// Recursive function to generate Menger sponge cubes
function generateSponge(level, cx, cy, cz, size) {
  if (level === 0) {
    // Base case: add cube with position-based color
    let col = color(
      map(cx, -s / 2, s / 2, 0, 255), // Red from x-position
      map(cy, -s / 2, s / 2, 0, 255), // Green from y-position
      map(cz, -s / 2, s / 2, 0, 255)  // Blue from z-position
    );
    cubes.push({ cx, cy, cz, size, col });
  } else {
    // Recursive case: divide into smaller cubes
    let step = size / 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          // Count indices equal to 1
          let ones = (i === 1 ? 1 : 0) + (j === 1 ? 1 : 0) + (k === 1 ? 1 : 0);
          if (ones < 2) {
            // Keep this cube, recurse with new center
            generateSponge(
              level - 1,
              cx + (i - 1) * step,
              cy + (j - 1) * step,
              cz + (k - 1) * step,
              step
            );
          }
        }
      }
    }
  }
}