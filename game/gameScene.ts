class GameScene extends ex.Scene {

    private level: number;

    private largeMeteors;
    private mediumMeteors;
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
        this.largeMeteors = [];
        this.mediumMeteors = [];
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
        this.add(this.leftBorder);
        this.add(this.topBorder);
        this.add(this.rightBorder);
        this.add(this.bottomBorder);
        this.add(this.player);
    }

    // each time the scene is entered (Engine.goToScene)
    public onActivate() { 
   

        this.createLargeMeteors();

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
                    if(this.mediumMeteors.includes(ev.other)){
                        let index = this.mediumMeteors.indexOf(ev.other);
                        this.mediumMeteors.splice(index, 1);
                        ev.other.kill();
                    }
                    if(this.largeMeteors.includes(ev.other)) {
                        let index = this.largeMeteors.indexOf(ev.other);
                        this.largeMeteors.splice(index, 1);
                        let pm1 = new MediumMeteor(ev.other.pos.x, ev.other.pos.y, ev.other.vel.x, ev.other.vel.y);
                        let pm2 = new MediumMeteor(ev.other.oldPos.x, ev.other.oldPos.y, ev.other.vel.x * -1, ev.other.vel.y * -1);
                        ev.other.kill();
                        this.add(pm1);
                        this.add(pm2);
                        this.mediumMeteors.push(pm1, pm2);

                    }
                });
            }
        });
  
    }

    private createLargeMeteors(): void {
        while (this.largeMeteors.length < this.level + 1) {
            let x: number = Math.floor(Math.random() * this.right - 50);
            let y: number = Math.floor(Math.random() * this.bottom - 50);
            let velX: number = Math.floor(Math.random() * 100 + 10);
            let velY: number = Math.floor(Math.random() * 100 + 10);
            let currentMeteor = new LargeMeteor(x, y, velX, velY);
            this.largeMeteors.push(currentMeteor);
        }
        this.createMediumMeteors();
    }

    private createMediumMeteors(): void {
        while (this.mediumMeteors.length < this.level * 2) {
            let x: number = Math.floor(Math.random() * this.left + 50);
            let y: number = Math.floor(Math.random() * this.top + 50);
            let velX: number = Math.floor(Math.random() * 100 + 10);
            let velY: number = Math.floor(Math.random() * 100 + 10);
            let currentMeteor = new MediumMeteor(x, y, velX, velY);
            this.mediumMeteors.push(currentMeteor);
          
            }
        this.addMeteor();
    }

    private addMeteor(): void {
        let meteors = [this.largeMeteors, this.mediumMeteors];
        for (let mArray of meteors) {
            for (let meteor of mArray) {
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
        }
   
    }

    public update(engine, delta) {
        super.update(engine, delta);
        if (this.largeMeteors.length == 0 && this.mediumMeteors == 0) {
            this.level += 1;
            game.goToScene('next');
        }
    }

    // each time the scene is exited (Engine.goToScene)
    // public onDeactivate() { 
    //     console.log('ondeactivate');
    //     for (let child of this.children) {
    //         this.remove(child)
    //         console.log('removing child', child);
    //     }
    // }

 
}
