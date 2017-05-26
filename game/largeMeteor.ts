class LargeMeteor extends ex.Actor {

    private meteor: ex.Sprite;
  
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


}