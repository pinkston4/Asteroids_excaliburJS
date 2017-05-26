class Meteor extends ex.Actor {

    private meteor: ex.Sprite;
    private mMeteor: ex.Sprite;
    public childM1;
    public childM2;

    constructor(x:number, y:number, velX: number, velY: number) {
        super(x, y, 120, 98);
        this.collisionType = ex.CollisionType.Elastic;
        this.meteor = new ex.Sprite(resources.largeMeteor, 0, 0, 120, 98);
        this.vel = new ex.Vector(velX, velY);
        this.addDrawing('largeMeteor', this.meteor);
    }

    public onInitialize(engine) {
        this.setDrawing('largeMeteor');
    }

    public update(engine, delta) {
        super.update(engine, delta);
        // if(this.isKilled()){
          
        // }
    }

}