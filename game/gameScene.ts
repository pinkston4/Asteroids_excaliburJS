class GameScene extends ex.Scene {

    private level: number;

    private meteors;
    private largeMeteorCount: number;
    private mediumMeteorCount: number;

    private player: Player;

    public topBorder: Border;
    public rightBorder: Border;
    public bottomBorder: Border;
    public leftBorder: Border;

    public top: number;
    public bottom: number;
    public left: number;
    public right: number;

    constructor() {
        super();
        this.meteors = [];
        this.level = 1;
    }

    public onInitialize(engine: ex.Engine) {
        this.top = 0 - game.getDrawHeight()/2;
        this.bottom = game.getDrawHeight()/2;
        this.left = 0 - game.getDrawWidth()/2;
        this.right = game.getDrawWidth()/2;
        
        this.topBorder = new Border(0, this.top + 10, game.getDrawWidth()-20, 2);
        this.bottomBorder = new Border(0, this.bottom - 10, game.getDrawWidth()-20, 2);
        this.leftBorder = new Border(this.left + 10, 0, 2, game.getDrawHeight()-20);
        this.rightBorder  = new Border(this.right - 10, 0, 2, game.getDrawHeight()-20);
        
        this.player = new Player(0, 0);

        this.createLargeMeteors();
    }

    // each time the scene is entered (Engine.goToScene)
    public onActivate() { 
        this.add(this.leftBorder);
        this.add(this.topBorder);
        this.add(this.rightBorder);
        this.add(this.bottomBorder);
        this.add(this.player);

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
                    if(this.meteors.includes(ev.other)){
                            let index = this.meteors.indexOf(ev.other);
                            this.meteors.splice(index, 1);
                            ev.other.kill();
                            blaster.kill();
                            this.remove(ev.other);
                            this.remove(blaster);
                    }
                });
            }
        });
  
    }

    private createLargeMeteors(): void {
        while (this.meteors.length < this.level + 1) {
            let x: number = Math.floor(Math.random() * this.right - 50);
            let y: number = Math.floor(Math.random() * this.bottom - 50);
            let velX: number = Math.floor(Math.random() * 100 + 10);
            let velY: number = Math.floor(Math.random() * 100 + 10);
            let currentMeteor = new LargeMeteor(x, y, velX, velY);
            this.meteors.push(currentMeteor);
        }
        this.createMediumMeteors();
    }

    private createMediumMeteors(): void {
        while (this.meteors.length < this.level * 2) {
            let x: number = Math.floor(Math.random() * this.left + 50);
            let y: number = Math.floor(Math.random() * this.top + 50);
            let velX: number = Math.floor(Math.random() * 100 + 10);
            let velY: number = Math.floor(Math.random() * 100 + 10);
            let currentMeteor = new MediumMeteor(x, y, velX, velY);
            this.meteors.push(currentMeteor);
          
            }
        this.addMeteor();
    }

    private addMeteor(): void {
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
            meteor.on('exitviewport', (ev: ex.ExitViewPortEvent) => {
                let index = this.meteors.indexOf(meteor);
                this.meteors.splice(index, 1);
                meteor.kill();
                this.remove(meteor);

            });
        }
    }

    public update(engine, delta) {
        super.update(engine, delta);
        if (this.meteors.length == 0) {
            this.level += 1;
            this.createLargeMeteors();
        }
    }

    // each time the scene is exited (Engine.goToScene)
    public onDeactivate() { 
        for (let child of this.children) {
            this.remove(child)
        }
    }

 
}
