class Player extends ex.Actor {

    private playerSprite: ex.Sprite;
    public health: number;

    constructor(x: number, y:number) {
        super(x, y);
        this.health = 100;
        this.collisionType = ex.CollisionType.Active;
        this.playerSprite = new ex.Sprite(resources.playerShip, x, y, 96, 75);
        this.playerSprite.scale = new ex.Vector(0.5, 0.5);
        this.addDrawing('playerShip', this.playerSprite);
      
      
    }

    public onInitialize(engine) {
        this.setDrawing('playerShip');
    }

    public update(engine, delta) {

        //move
        let leftKey = ex.Input.Keys.A;
        let rightKey = ex.Input.Keys.D;
        let upKey = ex.Input.Keys.W;
        let downKey = ex.Input.Keys.S;

        let movementKeys = [leftKey, rightKey, upKey, downKey];

        //aim
        let leftArrow = ex.Input.Keys.Left;
        let rightArrow = ex.Input.Keys.Right;
        let upArrow = ex.Input.Keys.Up;
        let downArrow = ex.Input.Keys.Down;

        let keyThing = engine.input.keyboard; 

        super.update(engine, delta);

        if(keyThing.wasPressed(leftKey) || keyThing.isHeld(leftKey)) {
            this.vel.x = -350;
        } else if(keyThing.wasPressed(rightKey) || keyThing.isHeld(rightKey)) {
            this.vel.x = 350;
        } else if(keyThing.wasPressed(upKey) || keyThing.isHeld(upKey)) {
            this.vel.y = -350;
        } else if(keyThing.wasPressed(downKey) || keyThing.isHeld(downKey)) {
            this.vel.y = 350;
        } else if(keyThing.wasReleased(leftKey)|| keyThing.wasReleased(rightKey)) {
            this.vel.x = 0;
        } else if(keyThing.wasReleased(upKey) || keyThing.wasReleased(downKey)) {
            this.vel.y = 0;
        } 

        if(keyThing.wasPressed(leftArrow)) {
            this.rotation = 4.712;
        } else if(keyThing.wasPressed(upArrow)) {
            this.rotation = 0;
        } else if(keyThing.wasPressed(rightArrow)) {
            this.rotation = 1.571;
        } else if(keyThing.wasPressed(downArrow)) {
            this.rotation = 3.141;
        } else if(keyThing.isHeld(leftArrow) && keyThing.isHeld(upArrow)) {
            this.rotation = 5.497;
        } else if(keyThing.isHeld(leftArrow) && keyThing.isHeld(downArrow)) {
            this.rotation = 3.926;
        } else if(keyThing.isHeld(rightArrow) && keyThing.isHeld(upArrow)) {
            this.rotation = 0.785;
        } else if(keyThing.isHeld(rightArrow) && keyThing.isHeld(downArrow)) {
            this.rotation = 2.356;
        } 
     
    }
}