function draw() {
  for (let index = 0; index < motor.length; index++) {
    const objeto = motor[index];
    objeto.draw();
  }
}
