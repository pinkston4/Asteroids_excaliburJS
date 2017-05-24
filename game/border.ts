class Border extends ex.Actor {

    constructor(x:number, y:number, width:number, height:number) {
        super(x, y, width, height, ex.Color.White);
        this.collisionType = ex.CollisionType.Fixed;
    }
}