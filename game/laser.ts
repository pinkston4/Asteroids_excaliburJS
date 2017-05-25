
class Laser extends ex.Actor {

    private laser: ex.Sprite;

    constructor(x: number, y: number, playerNg: number) {
        super(x, y);
        this.collisionType = ex.CollisionType.Fixed;
        this.laser = new ex.Sprite(resources.playerLaser, 0, 0, 9, 54);
        this.laser.scale = new ex.Vector(0.5, 0.5);
        this.addDrawing('playersShot', this.laser);

        let netVel = 600
        let yVel = -Math.cos(playerNg) * netVel;
        let xVel = Math.sin(playerNg) * netVel;
        this.vel = new ex.Vector(xVel, yVel);
        this.rotation = playerNg;

        this.on('exitviewport', (evt: ex.ExitViewPortEvent) => {
            this.kill();
        });
    }


    public onInitialize(engine) {
        this.setDrawing('playersShot');
    }


}