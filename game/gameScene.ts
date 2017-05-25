class GameScene extends ex.Scene {

    private player: Player;
    public topBorder: Border;
    public rightBorder: Border;
    public bottomBorder: Border;
    public leftBorder: Border;

    constructor() {
        super();
    }

    public onInitialize(engine: ex.Engine) {
        let topLeftY = 0 - game.getDrawHeight()/2;
        let bottomLeftY = game.getDrawHeight()/2;
        let left = 0 - game.getDrawWidth()/2;
        let right = game.getDrawWidth()/2;
        
        this.topBorder = new Border(0, topLeftY + 10, game.getDrawWidth()-20, 2);
        this.bottomBorder = new Border(0, bottomLeftY - 10, game.getDrawWidth()-20, 2);
        this.leftBorder = new Border(left + 10, 0, 2, game.getDrawHeight()-20);
        this.rightBorder  = new Border(right - 10, 0, 2, game.getDrawHeight()-20);
        
        this.player = new Player(0, 0);

    }

    // each time the scene is entered (Engine.goToScene)
    public onActivate() { 
        this.add(this.leftBorder);
        this.add(this.topBorder);
        this.add(this.rightBorder);
        this.add(this.bottomBorder);
        this.add(this.player);

         this.player.on('collision', (ev: ex.CollisionEvent) => {
            if(ev.other == this.leftBorder || ev.other == this.rightBorder || ev.other == this.topBorder || ev.other == this.bottomBorder){
                this.player.vel.x = 0;
                this.player.vel.y = 0;
                this.player.pos.x = this.player.oldPos.x;
                this.player.pos.y = this.player.oldPos.y;
            }
        });

        game.input.keyboard.on('press', (evt: ex.Input.KeyEvent) => {
            if(evt.key == ex.Input.Keys.Space) {
                let blaster = new Laser(this.player.pos.x, this.player.pos.y, this.player.rotation);
                this.add(blaster);
            }
        });
  
    }

    // each time the scene is exited (Engine.goToScene)
    public onDeactivate() { 
        this.removeGroup('player/boundaries');
        this.remove(this.player);
        this.remove(this.topBorder);
        this.remove(this.bottomBorder);
        this.remove(this.leftBorder);
        this.remove(this.rightBorder);
    }
}