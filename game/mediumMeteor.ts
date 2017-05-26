class MediumMeteor extends ex.Actor {

    private meteor: ex.Sprite;

    constructor(x:number, y:number, velX: number, velY: number) {
        super(x, y, 43, 43);
        this.collisionType = ex.CollisionType.Elastic;
        this.meteor = new ex.Sprite(resources.mediumMeteor, 0, 0, 43, 43);
        this.vel = new ex.Vector(velX, velY);
        this.addDrawing('mediumMeteor', this.meteor);
    }

    public onInitialize(engine) {
        this.setDrawing('mediumMeteor');
    }
}