class Story1 extends Phaser.Scene {
  constructor (){
    super('Story1');
  }
  preload () {
    this.load.image('intro1', 'assets/intro1.png')
    this.load.image('intro2', 'assets/intro2.png')
    this.load.image('intro3', 'assets/intro3.png')
    this.load.image('intro4', 'assets/intro4.png')
    this.load.image('intro5', 'assets/intro5.png')
    this.load.image('intro6', 'assets/intro6.png')
    this.load.image('intro7', 'assets/intro7.png')
  }

  create () {
    this.intro7 = this.physics.add.sprite(250,250,'intro7');
    this.intro7.body.setAllowGravity(false);
    this.intro6 = this.physics.add.sprite(250,250,'intro6');
    this.intro6.body.setAllowGravity(false);
    this.intro5 = this.physics.add.sprite(250,250,'intro5');
    this.intro5.body.setAllowGravity(false);
    this.intro4 = this.physics.add.sprite(250,250,'intro4');
    this.intro4.body.setAllowGravity(false);
    this.intro3 = this.physics.add.sprite(250,250,'intro3');
    this.intro3.body.setAllowGravity(false);
    this.intro2 = this.physics.add.sprite(250,250,'intro2');
    this.intro2.body.setAllowGravity(false);
    this.intro1 = this.physics.add.sprite(250,250,'intro1');
    this.intro1.body.setAllowGravity(false)
    this.i = 0;
    let _this = this;
    setInterval(function(){
      if (_this.i == 0) {
        _this.intro1.destroy()
      }
      if (_this.i == 1) {
        _this.intro2.destroy()
      }
      if (_this.i == 2) {
        _this.intro3.destroy()
      }
      if (_this.i == 3) {
        _this.intro4.destroy()
      }
      if (_this.i == 4) {
        _this.intro5.destroy()
      }
      if (_this.i == 5) {
        _this.intro6.destroy()
      }
      if (_this.i == 6) {
        _this.scene.start("Stage1")
      }
      _this.i += 1;
  }, 4000);
  }



  update(){

  }


};
