class GameScene extends ex.Scene {

    private level: number = 1;
    private meteors;
    private largeMeteorCount: number;
    private mediumMeteorCount: number;
    private meteorInitVelX: number = 100;
    private meteorInitVelY: number = 100;
    private player: Player;
    public topBorder: Border;
    public rightBorder: Border;
    public bottomBorder: Border;
    public leftBorder: Border;

    constructor() {
        super();
        this.meteors = [];
        this.largeMeteorCount = this.level * 3;
        this.mediumMeteorCount = this.level * 5;
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

        let initialMeteor = new LargeMeteor(-300, 0, this.meteorInitVelX, this.meteorInitVelY);
        this.meteors.push(initialMeteor);

        while (this.meteors.length < this.largeMeteorCount) {
            let x = Math.floor(Math.random() * (left + 150));
            let y = Math.floor(Math.random() * (topLeftY + 150));
            let currentMeteor = new LargeMeteor(x, y, this.meteorInitVelX, this.meteorInitVelY);
            this.meteors.push(currentMeteor);
            this.meteorInitVelX += 25;
            this.meteorInitVelY -= 25;
        }

        while (this.meteors.length < this.largeMeteorCount + this.mediumMeteorCount) {
            let x = -300;
            let y = -100;
            let currentMeteor = new MediumMeteor(x, y, this.meteorInitVelX, this.meteorInitVelY);
            this.meteors.push(currentMeteor);
            y += 50;
            this.meteorInitVelX -= 25;
            this.meteorInitVelY += 25;
        }


    }

    // each time the scene is entered (Engine.goToScene)
    public onActivate() { 
        this.add(this.leftBorder);
        this.add(this.topBorder);
        this.add(this.rightBorder);
        this.add(this.bottomBorder);
        this.add(this.player);

        for (let meteor of this.meteors) {
            this.add(meteor);
            meteor.on('collision', (ev: ex.CollisionEvent) => {
                let e = ev.other;
                if(e == this.leftBorder ||  e == this.rightBorder) {
                    meteor.vel.x *= -1;
                } else if (e == this.topBorder || e == this.bottomBorder) {
                    meteor.vel.y *= -1;
                }
            });
        }

        this.player.on('collision', (ev: ex.CollisionEvent) => {
            if(ev.other == this.leftBorder) {
                this.player.vel = new ex.Vector(0, 0);
                this.player.pos.x = this.leftBorder.x + 5;
            }
            if(ev.other == this.topBorder) {
                this.player.vel = new ex.Vector(0, 0);
                this.player.pos.y = this.topBorder.y + 5;
            }
            if(ev.other == this.rightBorder) {
                this.player.vel = new ex.Vector(0, 0);
                this.player.pos.x = this.rightBorder.x - 5;
            }
            if(ev.other == this.bottomBorder) {
                this.player.vel = new ex.Vector(0, 0);
                this.player.pos.y = this.bottomBorder.y - 5;
            }
        });

        game.input.keyboard.on('press', (evt: ex.Input.KeyEvent) => {
            if(evt.key == ex.Input.Keys.Space) {
                let blaster = new Laser(this.player.pos.x, this.player.pos.y, this.player.rotation);
                this.add(blaster);
                blaster.on('collision', (ev: ex.CollisionEvent) => {
                    if(ev.other != this.leftBorder && ev.other != this.topBorder && ev.other != this.rightBorder && ev.other != this.bottomBorder && ev.other != this.player) {
                        ev.other.kill();
                    }
                });
            }
        });
  
    }

    // each time the scene is exited (Engine.goToScene)
    public onDeactivate() { 
        for (let child of this.children) {
            this.remove(child)
        }
    }

 
}
