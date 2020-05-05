class Stage1 extends Phaser.Scene {
  constructor () {
    super('Stage1');
  }

  preload() {
    this.load.image('trader','assets/ValescanTrader.png');
    this.load.image('farmhouse','assets/FarmHouse.png');
    this.load.image('farm','assets/farm.png');
    this.load.image('tree','assets/Tree.png');
    this.load.image('addButton','assets/AddButton.png');
    this.load.image('hunterhouse','assets/HuntersHut.png');
    this.load.image('ground','assets/groundSpriteSheet.png');
    this.load.image('mine','assets/Mine.png');
    this.load.image('UI','assets/UITemplate.png');
    this.load.image('mineUI','assets/UIMines.png');
    this.load.image('xbutton','assets/xButton.png');
    this.load.image('traderUI','assets/UITrader.png');
    this.load.image('placeholder',"assets/personPlacerholder.png");
    this.load.image('placeholderGrey','assets/personPlacerholderGrey.png');
    this.load.image('farmUI',"assets/FarmUI.png");
    this.load.image('hunterUI',"assets/HunterUI.png");
    this.load.image('reilaPopup',"assets/reilaPopup.png");
    this.load.image('daltisPopup',"assets/daltisPopup.png");
    this.load.image('larrisPopup',"assets/larrisPopup.png");
    this.load.image('lucindaPopup',"assets/lucindaPopup.png");
    this.load.image('cebanPopup',"assets/cebanPopup.png");
    this.load.image('kainaPopup',"assets/kainaPopup.png");
    this.load.image('jarackPopup',"assets/jarackPopup.png");
    this.load.image('verdaanisPopup',"assets/verdaanisPopup.png");
    this.load.image('alvorPopup',"assets/alvorPopup.png");
    this.load.image('marstonPopup',"assets/marstonPopup.png");
    this.load.image('corlissPopup',"assets/corlissPopup.png");
    this.load.image('maecyPopup',"assets/maecyPopup.png");
    this.load.image('ventureButton',"assets/ventureButton.png");
    this.load.image('moneyUIcon',"assets/moneyUIcon.png");
    this.load.image('stoneUIcon',"assets/stoneUIcon.png");
    this.load.image('woodUIcon',"assets/woodUIcon.png");
    this.load.image('metalUIcon',"assets/metalUIcon.png");
    this.load.image('foodUIcon',"assets/foodUIcon.png");
    this.load.image('moreWorkerBack',"assets/moreWorkerBack.png");
    this.load.image('moreWorker',"assets/moreWorker.png");
    this.load.image('lucasPopup',"assets/lucasPopup.png");
    this.load.image('saedePopup',"assets/saedePopup.png");
    this.load.image('kesliPopup',"assets/kesliPopup.png");
    this.load.image('rydenPopup',"assets/rydenPopup.png");
    this.load.image('melinaPopup',"assets/melinaPopup.png");
    this.load.image('jeylaPopup',"assets/jeylaPopup.png");
    this.load.image('statusUIContent',"assets/statusUIContent.png");
    this.load.image('statusUIHungry',"assets/statusUIHungry.png");
    this.load.image('statusUIFamished',"assets/statusUIFamished.png");
    this.load.image('statusUIStarved',"assets/statusUIStarved.png");
    this.load.image('statusUITired',"assets/statusUITired.png");
    this.load.image('statusUIExhausted',"assets/statusUIExhausted.png");
    this.load.image('statusUITETW',"assets/statusUITETW.png");
    this.load.image('notEnoughFoodUI',"assets/notEnoughFoodUI.png")
    this.load.image('carbon',"assets/carbon.jpg");
    this.load.image('lumberUI',"assets/UILumber.png");
    this.load.image('lumber','assets/lumber.png')
    this.load.image('finalizeButton',"assets/finalize.png");
    this.load.image('buildButton','assets/BuildButton.png');
    this.load.image('carpenterUI',"assets/UICarpenter.png");
    this.load.image('monkUI',"assets/UIMonk.png");
    this.load.image('treeUI',"assets/UITree.png");
    this.load.image('churchUI',"assets/UIChurch.png");

  }

  create() {
    //\/\//\///-BASIC SETUP AREA -//\\/\//\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/
    let townmembers = []
    let townmembersWIPList = []
    let worksites = []
    let uiState = 'none'
    this.cursors = this.input.keyboard.createCursorKeys();
    this.map = this.make.tilemap({data: maps[0], tileWidth: 25, tileHeight: 25});
    this.tiles = this.map.addTilesetImage("ground", null, 25,25,0,0);
    this.layer = this.map.createDynamicLayer(0, this.tiles,0,0);
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    // CAMERA SETUP                                                        /\
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    this.camera = this.cameras.main
    this.camera.setViewport(0, 0, 1445, 822);
    this.camera.setBounds(0, 0, 1600, 900);
    this.worldView = this.camera.worldView;
    this.scrollX = 0;
    this.scrollY = 0;

    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    // INSTANTIATION FOR GRAPHIC ELEMENTS ASSOCIATED WITH FARM             /\
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    this.farm1 = this.physics.add.sprite(1050,675,'farm');
    this.farm2 = this.physics.add.sprite(1050,825,'farm');
    this.farm1.body.setAllowGravity(false);
    this.farm2.body.setAllowGravity(false);
    this.farm1.setScale(0.75);
    this.farm2.setScale(0.75);
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    // CREATION AND INITIALIZATION OF WORKSITE CLASS                       /\
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    class Worksite {
      constructor(name,id,workSprite,worksiteButton,worksiteUI,worksiteX,worksiteOracle,townmemberOffset,tireAmount,output,built,buildButton,cost) {
        this.name = name;
        this.id = id;
        this.workSprite = workSprite;
        this.worksiteButton = worksiteButton;
        this.worksiteUI = worksiteUI;
        this.worksiteX = worksiteX;
        this.worksiteOracle = worksiteOracle;
        this.townmemberOffset = townmemberOffset;
        this.tireAmount = tireAmount;
        this.output = output
        this.multiplier = 0
        this.built = built;
        this.buildButton = buildButton;
        this.cost = cost;
      }
      init() {
        this.worksiteUI.body.setAllowGravity(false);
        this.worksiteUI.visible = false;
        this.worksiteX.setInteractive();
        this.worksiteX.body.setAllowGravity(false);
        this.worksiteX.visible = false;
        this.worksiteOracle.visible = false;
        this.worksiteButton.setInteractive();
        this.worksiteButton.setScale(1.5);
        this.worksiteButton.body.setAllowGravity(false);
        if (!this.built) {
          this.worksiteButton.visible = false;
          this.buildButton.setInteractive();
          this.buildButton.body.setAllowGravity(false);
        } else {
          this.buildButton.visible = false;
        }
        this.workSprite.body.setAllowGravity(false);
        this.worksiteButton.on('pointerdown',pointer => {this.resolveButton(pointer)});
        this.worksiteX.on('pointerdown', pointer => {this.resolveX(pointer)});
        this.buildButton.on('pointerdown', pointer => {this.checkCost(pointer)});
        worksites.push(this);
      }
      build() {
        this.worksiteButton.visible = true;
        this.buildButton.visible = false;
      }
      checkCost() {
        let errArr = []
        let refunds = []
        for (let i=0;i<this.cost.length;i+=2) {
          if (this.cost[i+1] == "stone") {
            if (window.game.scene.scenes[0].gameManager.town.resources.stone >= this.cost[i]) {
              window.game.scene.scenes[0].gameManager.town.resources.stone -= this.cost[i]
              window.game.scene.scenes[0].gameManager.setResourceUI();
              refunds.push(this.cost[i])
              refunds.push(this.cost[i+1])
            } else {
              errArr.push(1);
            }
          } else if (this.cost[i+1] == "wood") {
            if (window.game.scene.scenes[0].gameManager.town.resources.wood >= this.cost[i]) {
              window.game.scene.scenes[0].gameManager.town.resources.wood -= this.cost[i]
              window.game.scene.scenes[0].gameManager.setResourceUI();
              refunds.push(this.cost[i])
              refunds.push(this.cost[i+1])
            } else {
              errArr.push(1);
            }
          } else if (this.cost[i+1] == "metal") {
            if (window.game.scene.scenes[0].gameManager.town.resources.metal >= this.cost[i]) {
              window.game.scene.scenes[0].gameManager.town.resources.metal -= this.cost[i]
              window.game.scene.scenes[0].gameManager.setResourceUI();
              refunds.push(this.cost[i])
              refunds.push(this.cost[i+1])
            } else {
              errArr.push(1);
            }
          }
        }
        if (errArr.length == 0) {
          this.build()
        } else {
          console.log("You do not have the required resources to build this worksite" + this.cost)
          for (let i=0;i<refunds.length;i+=2 ){
            if (refunds[i+1] == "stone") {
              window.game.scene.scenes[0].gameManager.town.resources.stone += refunds[i]
              window.game.scene.scenes[0].gameManager.setResourceUI()
            } else if (refunds[i+1] == "wood") {
              window.game.scene.scenes[0].gameManager.town.resources.wood += refunds[i]
              window.game.scene.scenes[0].gameManager.setResourceUI()
            } else if (refunds[i+1] == "metal") {
              window.game.scene.scenes[0].gameManager.town.resources.metal += refunds[i]
              window.game.scene.scenes[0].gameManager.setResourceUI()
            }
          }
        }
      }
      resolveX() {
        uiState = 'none'
        this.worksiteUI.visible = false;
        this.worksiteX.visible = false;
        this.worksiteOracle.visible = false;
        window.game.scene.scenes[0].gameManager.town.worksites.ui.moreWorkerButton.visible = false;
        window.game.scene.scenes[0].gameManager.town.worksites.ui.moreWorkerBackButton.visible = false;
        for (let i=0;i<townmembersWIPList.length;i++) {
          townmembersWIPList[i].hide()
        }
      }
      startUI() {
        uiState = this.name
        this.worksiteUI.visible = true;
        this.worksiteX.visible = true;
        this.worksiteOracle.visible = true;
        window.game.scene.scenes[0].gameManager.town.worksites.ui.moreWorkerButton.visible = true;
        window.game.scene.scenes[0].gameManager.town.worksites.ui.moreWorkerButtonMoveTo(this.townmemberOffset[0]+231,this.townmemberOffset[1]+175)
        for (let i=0;i<townmembersWIPList.length;i++) {
          townmembersWIPList[i].moveTo(this.townmemberOffset[0],this.townmemberOffset[1])
          if (townmembersWIPList[i].working == this.id && townmembersWIPList[i].weakTag == false) {
            townmembersWIPList[i].on();
          } else if (townmembersWIPList[i].weakTag == false) {
            townmembersWIPList[i].renderGrey();
          } else {
            townmembersWIPList[i].hide();
          }
        }
      }
      resolveButton() {
        if (uiState == 'none') {
         this.startUI()
        } else {
          window.game.scene.scenes[0].gameManager.clearUI()
          this.startUI()
        }
      }
    }

    this.farm = new Worksite("farm",1,this.physics.add.sprite(1255,685,'farmhouse'),this.physics.add.sprite(1290,675,'addButton'),this.physics.add.sprite(750,675,'farmUI'), this.physics.add.sprite(1100,500,'xbutton'),this.add.text(790,585,"0",{ fontFamily: '"Roboto Condensed"'}),[434,650],1/2,[5,"food"],false,this.physics.add.sprite(1255,685,'buildButton'),[150,"stone",40,"wood"]);
    this.mine = new Worksite("mine",2,this.physics.add.sprite(1454,355,'mine'),this.physics.add.sprite(1495,367,'addButton'),this.physics.add.sprite(900,355,'mineUI'),this.physics.add.sprite(1250,185,'xbutton'),this.add.text(930,265,"0" ,{ fontFamily: '"Roboto Condensed"'}),[584,340],1,[],false,this.physics.add.sprite(1454,355,'buildButton'),[20,"wood",5,"metal"]);
    this.trader = new Worksite("trader",3,this.physics.add.sprite(255,300,'trader'),this.physics.add.sprite(310,290,'addButton'),this.physics.add.sprite(800,300,'traderUI'),this.physics.add.sprite(1150,130,'xbutton'),this.add.text(835,215,"0" ,{ fontFamily: '"Roboto Condensed"'}),[484,275],1/3,[25,"money"],false,this.physics.add.sprite(255,300,'buildButton'),[200,"wood",40,"stone"]);
    this.hunter = new Worksite("hunter",4,this.physics.add.sprite(200,75,'hunterhouse'),this.physics.add.sprite(240,65,'addButton'),this.physics.add.sprite(700,300,'hunterUI'),this.physics.add.sprite(1050,120,'xbutton'),this.add.text(735,215,"0" ,{ fontFamily: '"Roboto Condensed"'}),[384,275],1/2,[3,"food"],true,this.physics.add.sprite(200,75,'buildButton'),["null"]);
    this.lumber = new Worksite("lumber",5,this.physics.add.sprite(400,85,'lumber'),this.physics.add.sprite(440,75,'addButton'),this.physics.add.sprite(800,300,'lumberUI'),this.physics.add.sprite(1150,120,'xbutton'),this.add.text(835,215,"0" ,{ fontFamily: '"Roboto Condensed"'}),[484,275],1/2,[20,"wood"],true,this.physics.add.sprite(400,85,'buildButton'),["null"]);
    this.carpenter = new Worksite("carpenter",6,this.physics.add.sprite(100,425,'carbon'),this.physics.add.sprite(165,410,'addButton'),this.physics.add.sprite(625,365,'carpenterUI'),this.physics.add.sprite(975,185,'xbutton'),this.add.text(660,280,"0",{fontFamily: '"Roboto Condensed"'}),[309,340],1/2,[1,"carpentry"],false,this.physics.add.sprite(100,435,'buildButton'),[240,"wood"]);
    this.smith = new Worksite("smith",7,this.physics.add.sprite(935,440,'carbon'),this.physics.add.sprite(985,430,'addButton'),this.physics.add.sprite(450,345,'lumberUI'),this.physics.add.sprite(800,165,'xbutton'),this.add.text(500,258,"0",{fontFamily: `"Roboto Condensed"`}),[134,320],1/2,[1,"smithing"],false,this.physics.add.sprite(935,440,'buildButton'),[140,"wood",75,"stone",10,"metal"]);
    this.monk = new Worksite("monk",8,this.physics.add.sprite(843,65,"carbon"),this.physics.add.sprite(876,53,"addButton"),this.physics.add.sprite(1112,375,'monkUI'),this.physics.add.sprite(1425,190,'xbutton'),this.add.text(1154,287,"0",{fontFamily: '"Roboto Condensed"'}),[795,350],1/3,[2,"magic"],true,this.physics.add.sprite(843,65,'buildButton'),["null"]);
    this.tree = new Worksite("tree",9,this.physics.add.sprite(1320,175,"carbon"),this.physics.add.sprite(1353,163,"addButton"),this.physics.add.sprite(1112,475,'treeUI'),this.physics.add.sprite(1425,290,'xbutton'),this.add.text(1154,387,"0",{fontFamily: '"Roboto Condensed"'}),[795,450],1/3,[4,"magic"],true,this.physics.add.sprite(1320,175,'buildButton'),["null"]);
    this.church = new Worksite("church",10,this.physics.add.sprite(550,650,"carbon"),this.physics.add.sprite(585,637,"addButton"),this.physics.add.sprite(1112,475,'churchUI'),this.physics.add.sprite(1425,290,'xbutton'),this.add.text(1154,387,"0",{fontFamily: '"Roboto Condensed"'}),[795,450],1/3,[1,"faith"],false,this.physics.add.sprite(550,650,'buildButton'),[150,"wood"]);
    this.farm.init()
    this.mine.init()
    this.trader.init()
    this.hunter.init()
    this.lumber.init()
    this.carpenter.init()
    this.smith.init()
    this.monk.init()
    this.tree.init()
    this.church.init()
    this.trader.workSprite.setScale(1.5)
    this.carpenter.workSprite.setScale(0.75)
    this.smith.workSprite.setScale(0.5)
    this.monk.workSprite.setScale(0.25)
    this.church.workSprite.setScale(0.75)
    let notEnoughFoodUI = this.add.image(this.worldView.centerX,this.worldView.centerY,'notEnoughFoodUI').setScrollFactor(0)
    notEnoughFoodUI.visible = false;
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    // CREATION AND INITIALIZATION OF TOWNMEMBER CLASS                     /\
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    class Townmember {
      constructor(name,age,thoughts,needs,bonuses,layoutModifier,sprite,greysprite,popup,weakTag,foodSprites,foodModifier) {
        this.name = name
        this.age = age
        this.thoughts = thoughts
        this.hunger = 0;
        this.tire = 0;
        this.needs = needs
        this.bonuses = bonuses
        this.working = 0
        this.layoutModifier = layoutModifier
        this.sprite = sprite
        this.greysprite = greysprite
        this.popup = popup
        this.weakTag = weakTag
        this.exhaustTag = false;
        this.foodSprites = foodSprites
        this.feedTag = false;
        this.foodModifier = foodModifier
      }

      on() {
        if (this.tire > 0.99) {
          console.log(this.name + " cannot work because they are too exhausted! Those who are  " + this.age + " years old cannot work as hard as adults. . .")
          this.working = 0
          this.exhaustTag = true;
        }
        this.sprite.visible = true;
        this.greysprite.visible = false;
        if (uiState == 'farm') {
          this.working = 1
        } else if (uiState == 'mine') {
          this.working = 2
        } else if (uiState == 'trader') {
          this.working = 3
        } else if (uiState == 'hunter') {
          this.working = 4
        } else if (uiState == 'lumber') {
          this.working = 5
        } else if (uiState == "carpenter") {
          this.working = 6
        }  else if (uiState == "smith") {
          this.working = 7
        } else if (uiState == "monk") {
          this.working = 8
        } else if (uiState == "tree") {
          this.working = 9
        } else if (uiState == "church") {
          this.working = 10
        }
        window.game.scene.scenes[0].gameManager.calculateMultipliers()
        window.game.scene.scenes[0].gameManager.setResourceUI();
      }

      off() {
        this.sprite.visible = false;
        this.greysprite.visible = true;
        this.working = 0
        window.game.scene.scenes[0].gameManager.calculateMultipliers()
        window.game.scene.scenes[0].gameManager.setResourceUI();
      }

      renderGrey() {
        this.sprite.visible = false;
        this.greysprite.visible = true;
      }

      hide() {
        this.sprite.visible = false;
        this.greysprite.visible = false;
      }

      moveTo(x,y) {
        this.sprite.x = x + this.layoutModifier[0];
        this.sprite.y = y + this.layoutModifier[1];
        this.greysprite.x = x + this.layoutModifier[0];
        this.greysprite.y = y + this.layoutModifier[1];
      }

      moveToFood(x,y) {
        this.sprite.x = x
        this.sprite.y = y
        this.greysprite.x = x
        this.greysprite.y = y
        this.foodSprites[0].x = x
        this.foodSprites[0].y = y
        this.foodSprites[1].x = x
        this.foodSprites[1].y = y
      }

      evaluateStatus() {
        this.needs = []
        if (this.tire < 0.34 && this.tire > 0) {
          this.needs.push("tired")
        } else if (this.tire < 1 &&this.tire > 0) {
          this.needs.push("exhausted")
        } else if (this.tire >= 1 && this.tire > 0) {
          this.needs.push("TETW")
          this.renderGrey()
          this.working = 0
        }
        if (this.hunger == 1) {
          this.needs.push("hungry")
        } else if (this.hunger == 2) {
          this.needs.push("famished")
        } else if (this.hunger == 3) {
          this.needs.push("starved")
        }
        if (this.needs.length == 0) {
          this.needs.push("content")
        }
      }

      showStatusMessage() {
        this.evaluateStatus()
        for (let i=0;i < this.needs.length;i++) {
          if (this.needs[i] == "tired") {
            tiredSUI.moveTo(this.sprite.x - 140,this.sprite.y - 60 - (i * 60))
            tiredSUI.show()
          }
          if (this.needs[i] == "exhausted") {
            exhaustedSUI.moveTo(this.sprite.x - 140,this.sprite.y - 60 - (i * 60))
            exhaustedSUI.show()
          }
          if (this.needs[i] == "TETW") {
            tetwSUI.moveTo(this.sprite.x - 140,this.sprite.y - 60 - (i * 60))
            tetwSUI.show()
          }
          if (this.needs[i] == "hungry") {
            hungrySUI.moveTo(this.sprite.x - 150,this.sprite.y - 45 - (i * 60))
            hungrySUI.show()
          }
          if (this.needs[i] == "famished") {
            famishedSUI.moveTo(this.sprite.x - 150,this.sprite.y - 45 - (i * 60))
            famishedSUI.show()
          }
          if (this.needs[i] == "starved") {
            starvedSUI.moveTo(this.sprite.x - 150,this.sprite.y - 45 - (i * 60))
            starvedSUI.show()
          }
          if (this.needs[i] == "content") {
            contentSUI.moveTo(this.sprite.x - 140,this.sprite.y - 60 - (i * 60))
            contentSUI.show()
          }
        }
      }

      popMouse() {
        this.popup.visible = true;
        this.popup.x = this.sprite.x + 125
        this.popup.y = this.sprite.y - 125
        this.showStatusMessage()
      }

      hideStatusMessage() {
        hungrySUI.hide()
        famishedSUI.hide()
        starvedSUI.hide()
        tiredSUI.hide()
        exhaustedSUI.hide()
        tetwSUI.hide()
        contentSUI.hide()
      }

      popHide() {
        this.popup.visible = false;
        this.hideStatusMessage()
      }

      increaseHunger() {
        this.hunger = this.hunger + 1
      }

      decreaseHunger() {
        this.hunger = this.hunger - 1
      }

      increaseTire(exhaustion) {
        this.tire = this.tire + exhaustion
      }
      feed() {
        if (window.game.scene.scenes[0].gameManager.town.resources.ui.foodCreditNumber > 0) {
        this.foodSprites[1].visible = false;
        this.foodSprites[0].visible = true;
        this.feedTag = true;
        window.game.scene.scenes[0].gameManager.decreaseFoodCredit()
      }
      }
      starve() {
        this.foodSprites[1].visible = true;
        this.foodSprites[0].visible = false;
        this.feedTag = false;
        window.game.scene.scenes[0].gameManager.increaseFoodCredit()
      }
      init() {
        this.sprite.setInteractive();
        this.greysprite.setInteractive();
        this.sprite.body.setAllowGravity(false);
        this.greysprite.body.setAllowGravity(false);
        this.sprite.visible = false;
        this.greysprite.visible = false;
        this.foodSprites[0].setInteractive();
        this.foodSprites[1].setInteractive();
        this.foodSprites[0].body.setAllowGravity(false);
        this.foodSprites[1].body.setAllowGravity(false);
        this.foodSprites[0].visible = false;
        this.foodSprites[1].visible = false;
        this.popup.body.setAllowGravity(false);
        this.popup.visible = false;
        this.sprite.on('pointerdown', pointer => {this.off(pointer)})
        this.greysprite.on('pointerdown', pointer => {this.on(pointer,uiState)})
        this.sprite.on('pointerover', pointer => {this.popMouse(pointer)})
        this.greysprite.on('pointerover', pointer =>  {this.popMouse(pointer)})
        this.sprite.on('pointerout',pointer =>  {this.popHide(pointer)})
        this.greysprite.on('pointerout', pointer =>  {this.popHide(pointer)})
        this.foodSprites[1].on('pointerover', pointer => this.popMouse(pointer))
        this.foodSprites[1].on('pointerout', pointer => this.popHide(pointer))
        this.foodSprites[0].on('pointerover', pointer => this.popMouse(pointer))
        this.foodSprites[0].on('pointerout', pointer => this.popHide(pointer))
        this.foodSprites[1].on('pointerdown', pointer => this.feed(pointer))
        this.foodSprites[0].on('pointerdown', pointer => this.starve(pointer))
        townmembersWIPList.push(this)
      }

    }
    this.reilaCatell = new Townmember("Reila Catell", 34, "I am happy",[],["carpenter","lumber","mine"],[0,0],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"reilaPopup"),false,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")],[0,0])
    this.daltisNaalor = new Townmember("Daltis Naalor", 43, "I am happy",[],["hunter","hunter","hunter"],[63,0],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"daltisPopup"),false,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")],[63,0])
    this.larrisParge = new Townmember("Larris Parge", 37, "I am happy",[],["farm","lumber","mine"],[126,0],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"larrisPopup"),false,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")],[126,0])
    this.lucindaParge = new Townmember("Lucinda Parge", 32, "I am happy",[],["farm"],[189,0],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"lucindaPopup"),false,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")],[189,0])
    this.cebanVepren = new Townmember("Ceban Vepren", 26, "I am happy",[],["trader"],[0,74],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"cebanPopup"),false,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")],[252,0])
    this.kainaVepren = new Townmember("Kaina Vepren", 22, "I am happy",[],[],[63,74],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"kainaPopup"),false,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")],[0,74])
    this.jarackRhysling = new Townmember("Jarack Rhysling", 74, "I am happy",[],["church","monk","tree","lumber","mine"],[126,74],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"jarackPopup"),false,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")],[63,74])
    this.verdaanisPadra = new Townmember("Verdaanis Padra", 52, "I am happy",[],["church","monk","tree"],[189,74],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"verdaanisPopup"),false,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")],[126,74])
    this.alvorRiverwood = new Townmember("Alvor Riverwood", 39, "I am happy",[],["smith","smith","smith","lumber","mine"],[0,148],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"alvorPopup"),false,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")],[189,74])
    this.marstonSinch = new Townmember("Marston Sinch", 45, "I am happy",[],["lumber","mine"],[63,148],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"marstonPopup"),false,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")],[252,74])
    this.corlissSinch = new Townmember("Corliss Sinch", 43, "I am happy",[],[],[126,148],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"corlissPopup"),false,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")],[0,148])
    this.maecyCorbray = new Townmember("Maecy Corbray", 33, "I am happy",[],[],[189,148],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"maecyPopup"),false,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")],[63,148])
    this.lucasParge = new Townmember("Lucas Parge", 8, "I am happy",[],[],[252,74],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"lucasPopup"),true,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")],[126,148])
    this.saedeVepren = new Townmember("Saede Vepren", 10, "I am happy",[],[],[313,74],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"saedePopup"),true,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")],[189,148])
    this.kesliSinch = new Townmember("Kesli Sinch", 13, "I am happy",[],[],[377,74],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"kesliPopup"),true,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")],[252,148])
    this.rydenCorbray = new Townmember("Ryden Corbray", 11, "I am happy",[],[],[252,148],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"rydenPopup"),true,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")],[0,222])
    this.jeylaCovan = new Townmember("Jeyla Covan", 84, "I am happy",[],["church"],[313,148],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"jeylaPopup"),true,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")],[63,222])
    this.melinaPyle = new Townmember("Melina Pyle", 68, "I am happy",[],["church"],[377,148],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"melinaPopup"),true,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")],[126,222])
    this.reilaCatell.init()
    this.daltisNaalor.init()
    this.larrisParge.init()
    this.lucindaParge.init()
    this.cebanVepren.init()
    this.kainaVepren.init()
    this.jarackRhysling.init()
    this.verdaanisPadra.init()
    this.alvorRiverwood.init()
    this.marstonSinch.init()
    this.corlissSinch.init()
    this.maecyCorbray.init();
    this.lucasParge.init()
    this.saedeVepren.init()
    this.kesliSinch.init()
    this.rydenCorbray.init()
    this.jeylaCovan.init()
    this.melinaPyle.init()
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    // CREATION OF STATUS UI MESSAGE CLASS                                 /\
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    class StatusUI {
      constructor(image) {
        this.image = image
      }
      show() {
        this.image.visible = true;
      }
      hide() {
        this.image.visible = false;
      }
      moveTo(x,y) {
        this.image.x = x
        this.image.y = y
      }
    }
    let hungrySUI = new StatusUI(this.add.image(0,0,'statusUIHungry'))
    let famishedSUI = new StatusUI(this.add.image(0,0,'statusUIFamished'))
    let starvedSUI = new StatusUI(this.add.image(0,0,'statusUIStarved'))
    let tiredSUI = new StatusUI(this.add.image(0,0,'statusUITired'))
    let exhaustedSUI = new StatusUI(this.add.image(0,0,'statusUIExhausted'))
    let tetwSUI = new StatusUI(this.add.image(0,0,'statusUITETW'))
    let contentSUI = new StatusUI(this.add.image(0,0,'statusUIContent'))
    hungrySUI.hide()
    famishedSUI.hide()
    starvedSUI.hide()
    tiredSUI.hide()
    exhaustedSUI.hide()
    tetwSUI.hide()
    contentSUI.hide()

    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    // INSTANTIATION FOR GRAPHIC AND UI ELEMENTS RELATED TO GAME MANAGER   /\
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\

    this.ventureButton = this.add.image(1315,765,'ventureButton').setScrollFactor(0);
    this.ventureButton.setInteractive();
    let foodUIcon = this.add.image(30,33,'foodUIcon').setScrollFactor(0);
    let woodUIcon = this.add.image(1385,30,'woodUIcon').setScrollFactor(0);
    let stoneUIcon = this.add.image(1385,65,'stoneUIcon').setScrollFactor(0);
    let metalUIcon = this.add.image(1385,100,'metalUIcon').setScrollFactor(0);
    let moneyUIcon = this.add.image(30,80,'moneyUIcon').setScrollFactor(0);
    let magicUIcon = this.add.image(30,135,'stoneUIcon').setScrollFactor(0);
    let faithUIcon = this.add.image(30,175,'stoneUIcon').setScrollFactor(0);
    let foodNumber = this.add.text(60,28,"0",{ fontFamily: '"Roboto Condensed"' }).setScrollFactor(0);
    let woodNumber = this.add.text(1412,25,"0",{ fontFamily: '"Roboto Condensed"' }).setScrollFactor(0);
    let stoneNumber = this.add.text(1412,60,"0",{ fontFamily: '"Roboto Condensed"' }).setScrollFactor(0);
    let metalNumber = this.add.text(1412,100,"0",{ fontFamily: '"Roboto Condensed"' }).setScrollFactor(0);
    let moneyNumber = this.add.text(60,75,"0",{ fontFamily: '"Roboto Condensed"' }).setScrollFactor(0);
    let magicNumber = this.add.text(60,130,"0",{ fontFamily: '"Roboto Condensed"' }).setScrollFactor(0);
    let faithNumber = this.add.text(60,170,"0",{ fontFamily: '"Roboto Condensed"' }).setScrollFactor(0);
    let foodCreditUI = this.add.text(300,450,"0",{ fontFamily: '"Roboto Condensed"' })
    foodCreditUI.visible = false;
    foodCreditUI.setFontSize(100)
    let mwb = this.physics.add.sprite(0,0,"moreWorker");
    mwb.setInteractive()
    mwb.body.setAllowGravity(false);
    mwb.visible = false;
    let mwbb = this.physics.add.sprite(0,0,"moreWorkerBack");
    mwbb.setInteractive()
    mwbb.body.setAllowGravity(false);
    mwbb.visible = false;
    let fb = this.physics.add.sprite(1100,500,"finalizeButton").setScrollFactor(0);
    fb.setInteractive()
    fb.body.setAllowGravity(false);
    fb.visible = false;
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    // BUTTON BEHAVIOR FOR BUTTONS RELATED TO GAME MANAGER                 /\
    mwb.on('pointerdown', function() {window.game.scene.scenes[0].gameManager.town.worksites.ui.moreWorkerButtonOnClick(uiState)});
    mwbb.on('pointerdown', function() {window.game.scene.scenes[0].gameManager.town.worksites.ui.moreWorkerBackButtonOnClick()});
    fb.on('pointerdown', function() {window.game.scene.scenes[0].gameManager.town.resources.ui.finalizeButtonOnClick()})
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    // VENTURE BUTTON BEHAVIOR                                             /\
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    this.ventureButton.on('pointerdown', function() {
      window.game.scene.scenes[0].gameManager.clearUI()
      window.game.scene.scenes[0].gameManager.calculateMultipliers()
      window.game.scene.scenes[0].gameManager.calculateGainedResources()
      window.game.scene.scenes[0].gameManager.feedTown();
      window.game.scene.scenes[0].gameManager.setResourceUI();
      window.game.scene.scenes[0].gameManager.resetTire();
      window.game.scene.scenes[0].gameManager.calculateTire();
    })
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    // CREATION OF GAME MANAGER                                            /\
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    this.gameManager = {
      town: {
        resources: {
          money: 50,
          wood: 50,
          stone: 200,
          metal: 5,
          magic: 0,
          faith: 0,
          food: 0,
          water: 0,
          carpentry: 0,
          smithing: 0,
          ui: {
            money: moneyUIcon,
            wood: woodUIcon,
            stone: stoneUIcon,
            metal: metalUIcon,
            food: foodUIcon,
            magic: magicUIcon,
            faith: faithUIcon,
            text: {
              food: foodNumber,
              money: moneyNumber,
              wood: woodNumber,
              stone: stoneNumber,
              metal: metalNumber,
              magic: magicNumber,
              faith: faithNumber,
            },
            oracle: {
              farm: window.game.scene.scenes[0].farm.worksiteOracle,
              mine: window.game.scene.scenes[0].mine.worksiteOracle,
              trader: window.game.scene.scenes[0].trader.worksiteOracle,
              hunter: window.game.scene.scenes[0].hunter.worksiteOracle,
              lumber: window.game.scene.scenes[0].lumber.worksiteOracle,
              carpenter: window.game.scene.scenes[0].carpenter.worksiteOracle,
              smith: window.game.scene.scenes[0].smith.worksiteOracle,
              monk: window.game.scene.scenes[0].monk.worksiteOracle,
              tree: window.game.scene.scenes[0].tree.worksiteOracle,
              church: window.game.scene.scenes[0].church.worksiteOracle,
            },
            foodScreen: notEnoughFoodUI,
            foodCredit: foodCreditUI,
            foodCreditNumber: 0,
            finalizeButton: fb,
            finalizeButtonOnClick: function() {
              window.game.scene.scenes[0].gameManager.town.resources.ui.finalizeButton.visible = false;
              window.game.scene.scenes[0].gameManager.town.resources.ui.foodCredit.visible = false;
              window.game.scene.scenes[0].gameManager.town.resources.ui.foodScreen.visible = false;
              for (let i=0;i<window.game.scene.scenes[0].gameManager.townmembersWIP.length;i++) {
                window.game.scene.scenes[0].gameManager.townmembersWIP[i].foodSprites[0].visible = false;
                window.game.scene.scenes[0].gameManager.townmembersWIP[i].foodSprites[1].visible = false;
                if (window.game.scene.scenes[0].gameManager.townmembersWIP[i].feedTag == false) {
                  window.game.scene.scenes[0].gameManager.townmembersWIP[i].increaseHunger()
                } else {
                  window.game.scene.scenes[0].gameManager.townmembersWIP[i].decreaseHunger()
                }
              }
            }
          }
        },
        worksites: {
          ui: {
            moreWorkerButton: mwb,
            moreWorkerBackButton: mwbb,
            moreWorkerButtonMoveTo: function(x,y) {
              window.game.scene.scenes[0].gameManager.town.worksites.ui.moreWorkerButton.x = x;
              window.game.scene.scenes[0].gameManager.town.worksites.ui.moreWorkerButton.y = y;
              window.game.scene.scenes[0].gameManager.town.worksites.ui.moreWorkerBackButton.x = x;
              window.game.scene.scenes[0].gameManager.town.worksites.ui.moreWorkerBackButton.y = y;
            },
            moreWorkerButtonOnClick: function(uiState) {
              window.game.scene.scenes[0].gameManager.town.worksites.ui.moreWorkerBackButton.visible = true;
              window.game.scene.scenes[0].gameManager.town.worksites.ui.moreWorkerButton.visible = false;
              for (let i=0;i<window.game.scene.scenes[0].gameManager.townmembersWIP.length;i++) {
                for (let k=0;k<window.game.scene.scenes[0].gameManager.worksites.length;k++) {
                  if (window.game.scene.scenes[0].gameManager.townmembersWIP[i].weakTag == true && window.game.scene.scenes[0].gameManager.townmembersWIP[i].working == window.game.scene.scenes[0].gameManager.worksites[k].id && window.game.scene.scenes[0].gameManager.worksites[k].name == uiState) {
                    window.game.scene.scenes[0].gameManager.townmembersWIP[i].on()
                    break;
                  } else if (window.game.scene.scenes[0].gameManager.townmembersWIP[i].weakTag == true) {
                    window.game.scene.scenes[0].gameManager.townmembersWIP[i].renderGrey();
                  }
                }
              }
            },
            moreWorkerBackButtonOnClick: function() {
              window.game.scene.scenes[0].gameManager.town.worksites.ui.moreWorkerBackButton.visible = false;
              window.game.scene.scenes[0].gameManager.town.worksites.ui.moreWorkerButton.visible = true;
              for (let i=0;i<window.game.scene.scenes[0].gameManager.townmembersWIP.length;i++) {
                if (window.game.scene.scenes[0].gameManager.townmembersWIP[i].weakTag == true) {
                  window.game.scene.scenes[0].gameManager.townmembersWIP[i].hide();
                }
              }
            }
          }
          },
          mine: {
            outputGenerator: function() {
              let mineRNG = (Math.floor(Math.random() * 100))/100
              if (0 < mineRNG && mineRNG < 0.011) {
                //event manager ==> 'found an emerald in the mine'
                console.log("emerald found!")
                window.game.scene.scenes[0].mine.output = [35,"stone",5,"metal"]
              } else if (0.01 < mineRNG && mineRNG < 0.06) {
                window.game.scene.scenes[0].mine.output = [35,"stone",10,"metal"]
              } else if (0.05 < mineRNG && mineRNG < 0.11) {
                window.game.scene.scenes[0].mine.output = [40,"stone",5,"metal"]
              } else if (0.10 < mineRNG && mineRNG < 0.41) {
                window.game.scene.scenes[0].mine.output = [30,"stone",5,"metal"]
              } else {
                window.game.scene.scenes[0].mine.output = [35,"stone",5,"metal"]
              }
            }
        }
      },
      townmembers: townmembers,
      townmembersWIP: townmembersWIPList,
      worksites: worksites,
      clearUI: function() {
        uiState = 'none'
        for (let i=0;i<window.game.scene.scenes[0].gameManager.worksites.length;i++) {
          window.game.scene.scenes[0].gameManager.worksites[i].worksiteUI.visible = false;
          window.game.scene.scenes[0].gameManager.worksites[i].worksiteX.visible = false;
          window.game.scene.scenes[0].gameManager.worksites[i].worksiteOracle.visible = false;
        }
        window.game.scene.scenes[0].gameManager.town.worksites.ui.moreWorkerButton.visible = false;
        window.game.scene.scenes[0].gameManager.town.worksites.ui.moreWorkerBackButton.visible = false;
        window.game.scene.scenes[0].reilaCatell.hide();
        window.game.scene.scenes[0].daltisNaalor.hide();
        window.game.scene.scenes[0].larrisParge.hide();
        window.game.scene.scenes[0].lucindaParge.hide();
        window.game.scene.scenes[0].cebanVepren.hide();
        window.game.scene.scenes[0].kainaVepren.hide();
        window.game.scene.scenes[0].jarackRhysling.hide();
        window.game.scene.scenes[0].verdaanisPadra.hide();
        window.game.scene.scenes[0].alvorRiverwood.hide();
        window.game.scene.scenes[0].marstonSinch.hide();
        window.game.scene.scenes[0].corlissSinch.hide();
        window.game.scene.scenes[0].maecyCorbray.hide();
      },
      calculateTire: function() {
        for (let i=0;i<window.game.scene.scenes[0].gameManager.townmembersWIP.length;i++) {
          if (window.game.scene.scenes[0].gameManager.townmembersWIP[i].weakTag == true) {
            for (let k=0;k<window.game.scene.scenes[0].gameManager.worksites.length;k++) {
              if (window.game.scene.scenes[0].gameManager.worksites[k].id == window.game.scene.scenes[0].gameManager.townmembersWIP[i].working) {
                window.game.scene.scenes[0].gameManager.townmembersWIP[i].increaseTire(window.game.scene.scenes[0].gameManager.worksites[k].tireAmount);
              }
            }
          }
        }
      },
      calculateMultipliers: function() {
        for (let i=0;i<window.game.scene.scenes[0].gameManager.worksites.length;i++) {
          window.game.scene.scenes[0].gameManager.worksites[i].multiplier = 0
        }
        for (let i=0;i<window.game.scene.scenes[0].gameManager.townmembersWIP.length;i++) {
          for (let k=0;k<window.game.scene.scenes[0].gameManager.worksites.length;k++) {
            if (window.game.scene.scenes[0].gameManager.townmembersWIP[i].working == window.game.scene.scenes[0].gameManager.worksites[k].id) {
              let bonus = 0
              for (let m=0;m<window.game.scene.scenes[0].gameManager.townmembersWIP[i].bonuses.length;m++) {
                  if (window.game.scene.scenes[0].gameManager.townmembersWIP[i].bonuses[m] == window.game.scene.scenes[0].gameManager.worksites[k].name) {
                    bonus++
                  }
              }
              window.game.scene.scenes[0].gameManager.worksites[k].multiplier = window.game.scene.scenes[0].gameManager.worksites[k].multiplier + 1 + bonus
            }
          }
        }
      },
      calculateGainedResources: function() {
        window.game.scene.scenes[0].gameManager.town.mine.outputGenerator();
        for (let i=0;i<window.game.scene.scenes[0].gameManager.worksites.length;i++) {
          for (let k=0;k<window.game.scene.scenes[0].gameManager.worksites[i].output.length;k+=2) {
            let newResource = (window.game.scene.scenes[0].gameManager.worksites[i].output[k] * window.game.scene.scenes[0].gameManager.worksites[i].multiplier)
            if (window.game.scene.scenes[0].gameManager.worksites[i].output[k+1] == "food") {
              window.game.scene.scenes[0].gameManager.town.resources.food = window.game.scene.scenes[0].gameManager.town.resources.food + newResource
            } else if (window.game.scene.scenes[0].gameManager.worksites[i].output[k+1] == "stone") {
              window.game.scene.scenes[0].gameManager.town.resources.stone = window.game.scene.scenes[0].gameManager.town.resources.stone + newResource
            } else if (window.game.scene.scenes[0].gameManager.worksites[i].output[k+1] == "metal") {
              window.game.scene.scenes[0].gameManager.town.resources.metal = window.game.scene.scenes[0].gameManager.town.resources.metal + newResource
            } else if (window.game.scene.scenes[0].gameManager.worksites[i].output[k+1] == "money") {
              window.game.scene.scenes[0].gameManager.town.resources.money = window.game.scene.scenes[0].gameManager.town.resources.money + newResource
            } else if (window.game.scene.scenes[0].gameManager.worksites[i].output[k+1] == "wood") {
              window.game.scene.scenes[0].gameManager.town.resources.wood = window.game.scene.scenes[0].gameManager.town.resources.wood + newResource
            } else if (window.game.scene.scenes[0].gameManager.worksites[i].output[k+1] == "magic") {
              window.game.scene.scenes[0].gameManager.town.resources.magic = window.game.scene.scenes[0].gameManager.town.resources.magic + newResource
            } else if (window.game.scene.scenes[0].gameManager.worksites[i].output[k+1] == "faith") {
              window.game.scene.scenes[0].gameManager.town.resources.faith = window.game.scene.scenes[0].gameManager.town.resources.faith + newResource
            } else if (window.game.scene.scenes[0].gameManager.worksites[i].output[k+1] == "carpentry") {
              window.game.scene.scenes[0].gameManager.town.resources.carpentry = window.game.scene.scenes[0].gameManager.town.resources.carpentry + newResource
            } else if (window.game.scene.scenes[0].gameManager.worksites[i].output[k+1] == "smithing") {
              window.game.scene.scenes[0].gameManager.town.resources.smithing = window.game.scene.scenes[0].gameManager.town.resources.smithing + newResource
            }
          }
        }
      },
      increaseFoodCredit: function() {
        window.game.scene.scenes[0].gameManager.town.resources.ui.foodCreditNumber++
        window.game.scene.scenes[0].gameManager.town.resources.ui.foodCredit.setText(window.game.scene.scenes[0].gameManager.town.resources.ui.foodCreditNumber)
      },
      decreaseFoodCredit: function() {
        window.game.scene.scenes[0].gameManager.town.resources.ui.foodCreditNumber--
        window.game.scene.scenes[0].gameManager.town.resources.ui.foodCredit.setText(window.game.scene.scenes[0].gameManager.town.resources.ui.foodCreditNumber)
      },
      renderFoodScreen: function(fc) {
        let foodCredit = fc
        window.game.scene.scenes[0].gameManager.town.resources.ui.foodCreditNumber = foodCredit
        foodCreditUI.visible = true;
        foodCreditUI.setText(foodCredit)
        window.game.scene.scenes[0].gameManager.town.resources.ui.finalizeButton.visible = true;
        window.game.scene.scenes[0].gameManager.town.resources.ui.foodScreen.visible = true
        for (let i=0;i<window.game.scene.scenes[0].gameManager.townmembersWIP.length;i++) {
          window.game.scene.scenes[0].gameManager.townmembersWIP[i].foodSprites[1].visible = true;
          window.game.scene.scenes[0].gameManager.townmembersWIP[i].foodSprites[1].setScrollFactor(0)
          window.game.scene.scenes[0].gameManager.townmembersWIP[i].foodSprites[0].setScrollFactor(0)

          window.game.scene.scenes[0].gameManager.townmembersWIP[i].moveToFood(window.game.scene.scenes[0].gameManager.town.resources.ui.foodScreen.x -125+ window.game.scene.scenes[0].gameManager.townmembersWIP[i].foodModifier[0],window.game.scene.scenes[0].gameManager.town.resources.ui.foodScreen.y -25+ window.game.scene.scenes[0].gameManager.townmembersWIP[i].foodModifier[1])
        }
      },
      feedTown: function() {
        if (window.game.scene.scenes[0].gameManager.town.resources.food > window.game.scene.scenes[0].gameManager.townmembersWIP.length - 1) {
          for (let i=0;i<window.game.scene.scenes[0].gameManager.townmembersWIP.length;i++) {
            if (window.game.scene.scenes[0].gameManager.townmembersWIP[i].hunger > 0) {
              window.game.scene.scenes[0].gameManager.townmembersWIP[i].decreaseHunger()
            }
          }
          window.game.scene.scenes[0].gameManager.town.resources.food = window.game.scene.scenes[0].gameManager.town.resources.food - 20
        } else {
          window.game.scene.scenes[0].gameManager.renderFoodScreen(window.game.scene.scenes[0].gameManager.town.resources.food)
          window.game.scene.scenes[0].gameManager.town.resources.food = 0
        }
      },
      resetTire: function() {
        for (let i = 0;i<window.game.scene.scenes[0].gameManager.townmembersWIP.length;i++) {
          if (window.game.scene.scenes[0].gameManager.townmembersWIP[i].exhaustTag == true) {
            console.log(window.game.scene.scenes[0].gameManager.townmembersWIP[i].name + " was exhausted but their tire value has now been set to 0")
            window.game.scene.scenes[0].gameManager.townmembersWIP[i].exhaustTag = false;
            window.game.scene.scenes[0].gameManager.townmembersWIP[i].tire = 0
          }
        }
      },
      setResourceUI: function() {
        window.game.scene.scenes[0].gameManager.town.resources.ui.text.food.setText(window.game.scene.scenes[0].gameManager.town.resources.food)
        window.game.scene.scenes[0].gameManager.town.resources.ui.text.wood.setText(window.game.scene.scenes[0].gameManager.town.resources.wood)
        window.game.scene.scenes[0].gameManager.town.resources.ui.text.stone.setText(window.game.scene.scenes[0].gameManager.town.resources.stone)
        window.game.scene.scenes[0].gameManager.town.resources.ui.text.metal.setText(window.game.scene.scenes[0].gameManager.town.resources.metal)
        window.game.scene.scenes[0].gameManager.town.resources.ui.text.money.setText(window.game.scene.scenes[0].gameManager.town.resources.money)
        window.game.scene.scenes[0].gameManager.town.resources.ui.text.magic.setText(window.game.scene.scenes[0].gameManager.town.resources.magic)
        window.game.scene.scenes[0].gameManager.town.resources.ui.text.faith.setText(window.game.scene.scenes[0].gameManager.town.resources.faith)
        window.game.scene.scenes[0].gameManager.setOracleText()
      },
      setOracleText: function() {
        window.game.scene.scenes[0].gameManager.town.resources.ui.oracle.farm.setText((window.game.scene.scenes[0].gameManager.worksites[0].output[0] * window.game.scene.scenes[0].gameManager.worksites[0].multiplier) + " Food");
        window.game.scene.scenes[0].gameManager.town.resources.ui.oracle.mine.setText((30 * window.game.scene.scenes[0].gameManager.worksites[1].multiplier)+"-"+ (40 * window.game.scene.scenes[0].gameManager.worksites[1].multiplier) + " Stone + " + (5 * window.game.scene.scenes[0].gameManager.worksites[1].multiplier)+"-"+(10 * window.game.scene.scenes[0].gameManager.worksites[1].multiplier) + " Metal")
        window.game.scene.scenes[0].gameManager.town.resources.ui.oracle.trader.setText((window.game.scene.scenes[0].gameManager.worksites[2].output[0] * window.game.scene.scenes[0].gameManager.worksites[2].multiplier) + " Money")
        window.game.scene.scenes[0].gameManager.town.resources.ui.oracle.hunter.setText((window.game.scene.scenes[0].gameManager.worksites[3].output[0] * window.game.scene.scenes[0].gameManager.worksites[3].multiplier) + " Food")
        window.game.scene.scenes[0].gameManager.town.resources.ui.oracle.lumber.setText((window.game.scene.scenes[0].gameManager.worksites[4].output[0] * window.game.scene.scenes[0].gameManager.worksites[4].multiplier) + " Wood")
        window.game.scene.scenes[0].gameManager.town.resources.ui.oracle.carpenter.setText((window.game.scene.scenes[0].gameManager.worksites[5].output[0] * window.game.scene.scenes[0].gameManager.worksites[5].multiplier) + " Carpentry")
        window.game.scene.scenes[0].gameManager.town.resources.ui.oracle.smith.setText((window.game.scene.scenes[0].gameManager.worksites[6].output[0] * window.game.scene.scenes[0].gameManager.worksites[6].multiplier) + " Smithing")
        window.game.scene.scenes[0].gameManager.town.resources.ui.oracle.monk.setText((window.game.scene.scenes[0].gameManager.worksites[7].output[0] * window.game.scene.scenes[0].gameManager.worksites[7].multiplier) + " Magic")
        window.game.scene.scenes[0].gameManager.town.resources.ui.oracle.tree.setText((window.game.scene.scenes[0].gameManager.worksites[8].output[0] * window.game.scene.scenes[0].gameManager.worksites[8].multiplier) + " Magic")
        window.game.scene.scenes[0].gameManager.town.resources.ui.oracle.church.setText((window.game.scene.scenes[0].gameManager.worksites[9].output[0] * window.game.scene.scenes[0].gameManager.worksites[9].multiplier) + " Faith")
      }
    }
    this.gameManager.setResourceUI();

  }
____
  update() {
    if (this.worldView.right - 100 < this.input.x) {
      this.scrollX += 5
      this.camera.scrollX = this.scrollX
    }
    if (this.worldView.left + 100 > this.input.x) {
      this.scrollX -= 5
      this.camera.scrollX = this.scrollX
    }
    if (this.worldView.top + 50 > this.input.y) {
      this.scrollY -= 5
      this.camera.scrollY = this.scrollY
    }
    if (this.worldView.bottom - 75 < this.input.y) {
      this.scrollY += 5
      this.camera.scrollY = this.scrollY
    }
  }
};
