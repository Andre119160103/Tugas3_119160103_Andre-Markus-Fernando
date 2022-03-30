let sun 
let planet1
let planet2
let planet3
let G = 25
function setup() {
  createCanvas(windowWidth,windowHeight);
  
  sun = new Body(100,createVector(0,0),createVector(0,0))
  
  //planet1  posisi
  let r1 = (sun.r,min(windowWidth/3, windowHeight/3))
  let theta1 = random(TWO_PI)
  let planetPos1 = createVector(r1*cos(theta1), r1*sin(theta1))
  
  //planet2  posisi
  let r2 = (sun.r,min(windowWidth/2, windowHeight/2))
  let theta2 = random(TWO_PI)
  let planetPos2 = createVector(r2*cos(theta2), r2*sin(theta2))
  
  //planet3  posisi
  let r3 = (sun.r, min(windowWidth/4, windowHeight/4))
  let theta3 = random(TWO_PI)
  let planetPos3 = createVector(r3*cos(theta3), r3*sin(theta3))
  
  
  //planet1 velocity
  let planetVel1 = planetPos1.copy()
  planetVel1.rotate(HALF_PI)
  planetVel1.setMag( sqrt(G*sun.mass/planetPos1.mag()))
  planet1 = new Body(20, planetPos1, planetVel1)
  
  //planet2 velocity
  let planetVel2 = planetPos2.copy()
  planetVel2.rotate(HALF_PI)
  planetVel2.setMag( sqrt(G*sun.mass/planetPos2.mag()))
  planet2 = new Body(25, planetPos2, planetVel2)
  
  //planet3 velocity
  let planetVel3 = planetPos3.copy()
  planetVel3.rotate(HALF_PI)
  planetVel3.setMag( sqrt(G*sun.mass/planetPos3.mag()))
  planet3 = new Body(15, planetPos3, planetVel3)
  
}

function draw() {
  translate(width/2, height/2)
  background(180);
  sun.attract(planet1)
  sun.attract(planet2)
  sun.attract(planet3)
  sun.show()
  planet1.update()
  planet2.update()
  planet3.update()
  planet1.show()
  planet2.show()
  planet3.show()
}

function Body(_mass, _pos, _vel){
  this.mass = _mass
  this.pos = _pos
  this.vel = _vel
  this.r = this.mass
  
  this.show = function() {
    fill(249,255,43); noStroke();
    ellipse(this.pos.x, this.pos.y, this.r, this.r)
    
  }
  
  this.update = function(){
    // update posisi
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
  }
  this.applyForce = function(f) {
    this.vel.x += f.x / this.mass
    this.vel.y += f.y / this.mass
  }
  
  this.attract = function(child) {
    let r = dist(this.pos.x, this.pos.y, child.pos.x, child.pos.y)
    let f = this.pos.copy().sub(child.pos)
    f.setMag( (G * this.mass * child.mass)/(r * r) )
    child.applyForce(f)
  }
}