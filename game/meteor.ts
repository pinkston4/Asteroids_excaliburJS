class Meteor extends ex.Actor {

    private meteor: ex.Sprite;
    private velocity: number = 100;

    constructor(x:number, y:number) {
        super(x, y);
        this.collisionType = ex.CollisionType.Elastic;
        this.meteor = new ex.Sprite(resources.largeMeteor, 0, 0, 120, 98);
        this.vel = new ex.Vector(this.velocity, this.velocity);
        this.addDrawing('largeMeteor', this.meteor);
    }

    public onInitialize(engine) {
        this.setDrawing('largeMeteor');
    }

    public update(engine, delta) {
        super.update(engine, delta);
    }

}