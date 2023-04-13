// Define the game variables
let bird;
let pipes = [];
let score = 0;
let gameOver = false;

// Set up the game
function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new Pipe());
}

// Draw the game on the canvas
function draw() {
  background(0);

  // Draw the bird
  bird.show();
  bird.update();

  // Draw and update the pipes
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    // Check for collision with the bird
    if (pipes[i].hits(bird)) {
      gameOver = true;
    }

    // Remove the pipe if it's offscreen
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  // Add a new pipe every 100 frames
  if (frameCount % 20 == 0) {
    pipes.push(new Pipe());
    score++;
  }

  // Draw the score
  textSize(32);
  fill(255);
  text(score, 10, 50);

  // End the game if it's over
  if (gameOver) {
    textSize(64);
    text("Game Over", 50, height / 2);
    noLoop();
  }
}

// Handle the bird jump when the space bar is pressed
function keyPressed() {
  if (key == ' ') {
    bird.up();
  }
}

// Define the Bird class
class Bird {
  constructor() {
    this.x = 64;
    this.y = height / 2;
    this.gravity = 0.6;
    this.lift = -15;
    this.velocity = 0;
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, 32, 32);
  }

  up() {
    this.velocity += this.lift;
  }

  update() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}

// Define the Pipe class
class Pipe {
  constructor() {
    this.top = random(height / 2);
    this.bottom = random(height / 2);
    this.x = width;
    this.w = 20;
    this.speed = 10;
  }

  show() {
    fill(255);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return (this.x < -this.w);
  }

  hits(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  }
}
