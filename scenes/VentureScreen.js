class VentureScreen extends Phaser.Scene {
  constructor() {
    super('VentureScreen');
  }

  preload() {
    this.load.image("carbon","assets/carbon.jpg")
    this.load.image("activeTeamTab","assets/teamTabActive.png");
    this.load.image("activeShopsTab","assets/shopTabActive.png");
    this.load.image("activeProjectsTab","assets/projectTabActive.png");
    this.load.image("inactiveTeamTab","assets/teamTabInactive.png");
    this.load.image("inactiveShopsTab","assets/shopTabInactive.png");
    this.load.image("inactiveProjectsTab","assets/projectTabInactive.png");
    this.load.image("teamButton","assets/teamButton.png");
    this.load.image("shopsButton","assets/shopsButton.png");
    this.load.image("projectsButton","assets/projectButton.png");
    this.load.image("healthPotion","assets/healthPotion.png");
    this.load.image("woodUICon","assets/woodUIcon.png");
    this.load.image("moneyUIcon","assets/moneyUIcon.png")
    this.load.image("invBack","assets/invBack.png");
    this.load.image("townInvBack","assets/townInvBack.png");
    this.load.image("meraldaInvIcon","assets/meraldaInvIcon.png");
    this.load.image("addInvIcon","assets/addInvIcon.png");
  }

  create() {
    let state = 0
    let tabGroups = []
    this.inventories = []

    this.checkRender = function() {
      for (let i=0;i<tabGroups.length;i++) {
        if (state == tabGroups[i].renderState) {
          tabGroups[i].activeTab.visible = true;
          tabGroups[i].inactiveTab1.visible = true;
          tabGroups[i].inactiveTab2.visible = true;
        } else {
          tabGroups[i].activeTab.visible = false;
          tabGroups[i].inactiveTab1.visible = false;
          tabGroups[i].inactiveTab2.visible = false;
        }
       }
      }

    class TabGroup {
      constructor(renderState,activeTab,inactiveTab1,inactiveTab2) {
        this.renderState = renderState
        this.inactiveTab1 = inactiveTab1;
        this.inactiveTab2 = inactiveTab2;
        this.activeTab = activeTab;
        tabGroups.push(this)
      }
  }
    let renderTeamTabActive = new TabGroup(0,this.add.image(1444/2, 822/2, 'inactiveShopsTab'),this.add.image(1444/2, 822/2, 'inactiveProjectsTab'),this.add.image(1444/2, 822/2, 'activeTeamTab'))
    let renderShopsTabActive = new TabGroup(1,this.add.image(1444/2, 822/2, 'inactiveTeamTab'),this.add.image(1444/2, 822/2, 'inactiveProjectsTab'),this.add.image(1444/2, 822/2, 'activeShopsTab'))
    let renderProjectsTabActive = new TabGroup(2,this.add.image(1444/2, 822/2, 'inactiveTeamTab'),this.add.image(1444/2, 822/2, 'inactiveShopsTab'),this.add.image(1444/2, 822/2, 'activeProjectsTab'))
    window.game.scene.scenes[1].checkRender()
    this.tb = this.add.image(225,50,'teamButton')
    this.tb.setInteractive()
    this.tb.on('pointerdown',function() {
      state = 0
      for (let i=0;i<inventoryMeralda.contents.length;i++) {
        inventoryMeralda.contents[i].showItem()
      }
      for (let i=0;i<inventoryTown.contents.length;i++) {
        inventoryTown.contents[i].showItem()
      }
      for (var i = 0; i < blacksmith.contents.length; i++) {
        blacksmith.contents[i].hideItem()
      }
      meraldaInvIcon.visible = true;
      addInvIcon.visible = true;
      invBack1.visible = true;
      invBackTown.visible = true;
      window.game.scene.scenes[1].checkRender()
    })
    this.sb = this.add.image(650,50,'shopsButton')
    this.sb.setInteractive()
    this.sb.on("pointerdown",function() {
      state = 1
      for (let i=0;i<inventoryMeralda.contents.length;i++) {
        inventoryMeralda.contents[i].hideItem()
      }
      for (let i=0;i<inventoryTown.contents.length;i++) {
        inventoryTown.contents[i].hideItem()
      }
      for (var i = 0; i < blacksmith.contents.length; i++) {
        blacksmith.contents[i].showItem()
      }
      meraldaInvIcon.visible = false;
      addInvIcon.visible = false;
      invBack1.visible = false;
      invBackTown.visible = false;
      window.game.scene.scenes[1].checkRender()
    })
    this.pb = this.add.image(1115,50,"projectsButton");
    this.pb.setInteractive()
    this.pb.on("pointerdown",function() {
      state = 2
      for (let i=0;i<inventoryMeralda.contents.length;i++) {
        inventoryMeralda.contents[i].hideItem()
      }
      for (let i=0;i<inventoryTown.contents.length;i++) {
        inventoryTown.contents[i].hideItem()
      }
      for (var i = 0; i < blacksmith.contents.length; i++) {
        blacksmith.contents[i].hideItem()
      }
      meraldaInvIcon.visible = false;
      addInvIcon.visible = false;
      invBack1.visible = false;
      invBackTown.visible = false;
      window.game.scene.scenes[1].checkRender()
    })

    let meraldaInvIcon = this.add.image(250,250,"meraldaInvIcon")
    let addInvIcon = this.add.image(500,250,'addInvIcon')
    let invBack1 = this.add.image(300,550,"invBack");
    let invBackTown = this.add.image(1300,440,"townInvBack");


    class Item {
      constructor(name,value,texture,position,index,meta) {
        this.name = name;
        this.value = value;
        this.texture = texture;
        this.position = position;
        this.meta = meta;
        this.inv = "none"
        if (meta.stack) {
          this.meta.stacktext.visible = false
        }
        this.texture.setInteractive({pixelperfect: true,draggable: true})
        this.texture.visible = false;
        let _this = this
        this.texture.on("pointerdown",function() {
          _this.texture.on("drag",function(pointer,dragX,dragY) {
            _this.texture.x = dragX
            _this.texture.y = dragY
            _this.meta.stacktext.x = dragX + 35
            _this.meta.stacktext.y = dragY + 35

          })
        })
        this.texture.on("pointerup",function() {
          let doneAll = false
          for (let i=0;i<window.game.scene.scenes[1].inventories.length;i++) {
            if (i == window.game.scene.scenes[1].inventories.length -1) {
              doneAll = true
            }
            if (_this.texture.x < window.game.scene.scenes[1].inventories[i].position[0] + window.game.scene.scenes[1].inventories[i].dimensions[0] && _this.texture.x > window.game.scene.scenes[1].inventories[i].position[0] && _this.texture.y < window.game.scene.scenes[1].inventories[i].position[1] + window.game.scene.scenes[1].inventories[i].dimensions[1] && _this.texture.y > window.game.scene.scenes[1].inventories[i].position[1] && window.game.scene.scenes[1].inventories[i].contents.length < window.game.scene.scenes[1].inventories[i].max) {
              console.log("switching inventory!")
              console.log(window.game.scene.scenes[1].inventories[i],_this.inv)
              for (let k=0;k<window.game.scene.scenes[1].inventories.length;k++) {
                if (_this.inv == window.game.scene.scenes[1].inventories[k].name) {
                  console.log("removed!")
                  window.game.scene.scenes[1].inventories[k].removeItem(_this.index)
                }
              }
              if (_this.meta.stack) {
                let tttl = _this.meta.amount
                _this.meta.amount = 1
                for (let ttl=0;ttl<tttl;ttl++) {
                  window.game.scene.scenes[1].inventories[i].handleNewItem(_this)
                }
              } else {
              window.game.scene.scenes[1].inventories[i].handleNewItem(_this)
            }

              return
            } else {
              if (doneAll) {
              _this.texture.x = _this.position[0]
              _this.texture.y = _this.position[1]
              _this.meta.stacktext.x = _this.position[0] + 35
              _this.meta.stacktext.y = _this.position[1] + 35
            }
            }
          }
        })
      }
      updateInv(inv) {
          this.inv = inv
      }
      showItem() {
        this.texture.visible = true;
        if (this.meta.stack) {
          this.meta.stacktext.visible = true;
        }
      }
      hideItem() {
        this.texture.visible = false;
        if (this.meta.stack) {
          this.meta.stacktext.visible = false;
        }
      }
      renderStackText() {
        if (this.meta.stack) {
          this.meta.stacktext.x = this.texture.x + 35
          this.meta.stacktext.y = this.texture.y + 35
          this.meta.stacktext.setText(this.meta.amount)
          this.meta.stacktext.visible = true
        } else {
          console.log("no stack text")
        }
      }
      calculatePosition(index,col,startPos) {
        this.index = index;
        let det = index/col
        det = det + 0.01
        let det1 = det.toString().split(".")[0]
        let det2 =  det.toString().split(".")[1]
        let x = startPos[0]
        if (det2 == "51") {
          x += 100
        }
        let y = (100 * det1) + startPos[1]
        this.position = [x,y]
        this.texture.x = x;
        this.texture.y = y;
      }

    }
    let healthPotion = new Item("Health Potion",20,this.add.image(250,250,'healthPotion').setScale(2),[250,250],0,{stack: true,amount:1,max: 5,stacktext: this.add.text(0,0,'helllo')})
    let healthPotion2 = new Item("Health Potion",20,this.add.image(250,250,'healthPotion').setScale(2),[250,250],0,{stack: true,amount:1,max: 5,stacktext: this.add.text(0,0,'hello')})
    let healthPotion3 = new Item("Health Potion",20,this.add.image(250,250,'healthPotion').setScale(2),[250,250],0,{stack: true,amount:1,max: 5,stacktext: this.add.text(0,0,'hello')})
    let healthPotion4 = new Item("Health Potion",20,this.add.image(250,250,'healthPotion').setScale(2),[250,250],0,{stack: true,amount:1,max: 5,stacktext: this.add.text(0,0,'hello')})
    let healthPotion5 = new Item("Health Potion",20,this.add.image(250,250,'healthPotion').setScale(2),[250,250],0,{stack: true,amount:1,max: 5,stacktext: this.add.text(0,0,'hello')})
    let healthPotion6 = new Item("Carbon Health Potion",20,this.add.image(250,250,'carbon').setScale(0.4),[250,250],0,{stack: true,amount:1,max: 5,stacktext: this.add.text(0,0,'ho')})
    let healthPotion7 = new Item("Health Potion",20,this.add.image(250,250,'healthPotion').setScale(2),[250,250],0,{stack: true,amount:1,max: 5,stacktext: this.add.text(0,0,'hello')})
    let healthPotion8 = new Item("Health Potion",20,this.add.image(250,250,'healthPotion').setScale(2),[250,250],0,{stack: true,amount:1,max: 5,stacktext: this.add.text(0,0,'hello')})




    class Inventory {
      constructor(name,contents,position,max) {
        this.name = name;
        this.contents = contents;
        this.position = position;
        this.max = max;
        this.dimensions = [200,(this.max/2) * 100]
      }
      handleNewItem(item) {
        if (item.meta.stack) {
          this.checkStacks(item)
        } else {
          this.addItem(item)
        }
      }
      checkStacks(item) {
        let ddoneaall = false
        for (let i=0;i<this.contents.length;i++) {
          if (this.contents[i].name == item.name) {
            console.log(this.contents[i].meta.amount)
            console.log(this.contents[i].meta.max)
            if (this.contents[i].meta.amount < this.contents[i].meta.max) {
              this.contents[i].meta.amount++
              item.hideItem()
              this.displayInventory()
              return
            }
          }
        }
        this.addItem(item)
      }
      addItem(item) {
        this.contents.push(item)
        item.updateInv(this.name)
        this.displayInventory()
      }
      removeItem(index) {
        let newContents = []
        for (let i=0;i<this.contents.length;i++) {
          if (index == i) {
            console.log(this.contents[i])
          } else {
            newContents.push(this.contents[i])
          }
        }
        this.contents = newContents
        this.displayInventory()
      }
      displayInventory() {
        for (let i=0;i<this.contents.length;i++) {
          this.contents[i].calculatePosition(i,2,this.position)
          if (this.contents[i].meta.stack) {
          this.contents[i].renderStackText()
        }
          this.contents[i].showItem()
        }
      }
    }

    let inventoryMeralda = new Inventory("meralda",[],[250,400],8)
    inventoryMeralda.handleNewItem(healthPotion)
    inventoryMeralda.handleNewItem(healthPotion)
    inventoryMeralda.handleNewItem(healthPotion)
    inventoryMeralda.handleNewItem(healthPotion)
    inventoryMeralda.handleNewItem(healthPotion)
    inventoryMeralda.handleNewItem(healthPotion7)
    inventoryMeralda.displayInventory()
    let townWood = new Item("Wood",1,this.add.image(250,250,'woodUIcon').setScale(3.5),[250,250],0,{stack: true,amount: window.game.scene.scenes[0].gameManager.town.resources.wood,max:1000000000,stacktext: this.add.text(0,0,'hello')})
    let inventoryTown = new Inventory("town",[],[1250,140],14)
    inventoryTown.handleNewItem(townWood)
    inventoryTown.handleNewItem(new Item("money",1,this.add.image(250,250,'moneyUIcon').setScale(3),[250,250],0,{stack: true,amount: window.game.scene.scenes[0].gameManager.town.resources.money,max:1000000000,stacktext: this.add.text(0,0,"ho")}))
    inventoryTown.handleNewItem(new Item("stone",1,this.add.image(250,250,'stoneUIcon').setScale(3),[250,250],0,{stack: true,amount: window.game.scene.scenes[0].gameManager.town.resources.stone,max:1000000000,stacktext: this.add.text(0,0,"ho")}))
    inventoryTown.handleNewItem(new Item("metal",1,this.add.image(250,250,'metalUIcon').setScale(3),[250,250],0,{stack: true,amount: window.game.scene.scenes[0].gameManager.town.resources.metal,max:1000000000,stacktext: this.add.text(0,0,"ho")}))
    inventoryTown.addItem(new Item("Health Potion",20,this.add.image(250,250,'healthPotion').setScale(2),[250,250],0,{stack: true,amount:1,max: 5,stacktext: this.add.text(0,0,'hello')}))
    window.game.scene.scenes[1].inventories.push(inventoryTown)
    window.game.scene.scenes[1].inventories.push(inventoryMeralda)
    inventoryTown.displayInventory()

    class Shop {
      constructor(name,contents,position) {
        this.name = name
        this.contents = contents
        this.position = position
      }
      addItem(item) {
        this.contents.push(item);
      }
      removeItem(index) {
        let newCnts = []
        for (let i=0;i<this.contents.length;i++) {
          if (i == index) {
            console.log("deleted")
          } else {
            newCnts.push(this.contents[i])
          }
        }
        this.contents = newCnts
      }
      displayShop() {
        for (var i = 0; i < this.contents.length; i++) {
          this.contents[i].calculateShopPosition(i,this.position)
          this.contents[i].showItem()
        }
      }
    }

    class ShopItem {
      constructor(name,cost,texture,position,index,item) {
        this.name = name;
        this.cost = cost;
        this.texture = texture;
        this.position = position;
        this.index = index;
        this.item = item;
      }
      showItem() {
        this.texture.visible = true;
      }
      hideItem() {
        this.texture.visible = false;
      }
      calculateShopPosition(index,startPos) {
        this.index = index;
        let det = index/3
        det = det + 0.01
        let det1 = det.toString().split(".")[0]
        let det2 =  det.toString().split(".")[1]
        console.log(det2)
        let x = startPos[0]
        if (det2 == "3433333333333333") {
          console.log("ran!")
          x += 100
        } else if (det2=="6766666666666666" || det2 =="6766666666666667") {
          console.log("ran")
          x += 200
        }
        let y = (100 * det1) + startPos[1]
        this.position = [x,y]
        this.texture.x = x;
        this.texture.y = y;
      }
    }

    let blacksmith = new Shop("blacksmith",[],[240,600])
    blacksmith.addItem(new ShopItem("carbon health potion",[],this.add.image(250,250,'carbon').setScale(0.4),[0,0],0, new Item("Carbon Health Potion",20,this.add.image(250,250,'carbon').setScale(0.4),[250,250],0,{stack: true,amount:1,max: 5,stacktext: this.add.text(0,0,'ho')})))
    blacksmith.addItem(new ShopItem("carbon health potion",[],this.add.image(250,250,'carbon').setScale(0.4),[0,0],0, new Item("Carbon Health Potion",20,this.add.image(250,250,'carbon').setScale(0.4),[250,250],0,{stack: true,amount:1,max: 5,stacktext: this.add.text(0,0,'ho')})))
    blacksmith.addItem(new ShopItem("carbon health potion",[],this.add.image(250,250,'carbon').setScale(0.4),[0,0],0, new Item("Carbon Health Potion",20,this.add.image(250,250,'carbon').setScale(0.4),[250,250],0,{stack: true,amount:1,max: 5,stacktext: this.add.text(0,0,'ho')})))
    blacksmith.addItem(new ShopItem("carbon health potion",[],this.add.image(250,250,'carbon').setScale(0.4),[0,0],0, new Item("Carbon Health Potion",20,this.add.image(250,250,'carbon').setScale(0.4),[250,250],0,{stack: true,amount:1,max: 5,stacktext: this.add.text(0,0,'ho')})))
    blacksmith.addItem(new ShopItem("carbon health potion",[],this.add.image(250,250,'carbon').setScale(0.4),[0,0],0, new Item("Carbon Health Potion",20,this.add.image(250,250,'carbon').setScale(0.4),[250,250],0,{stack: true,amount:1,max: 5,stacktext: this.add.text(0,0,'ho')})))
    blacksmith.addItem(new ShopItem("carbon health potion",[],this.add.image(250,250,'carbon').setScale(0.4),[0,0],0, new Item("Carbon Health Potion",20,this.add.image(250,250,'carbon').setScale(0.4),[250,250],0,{stack: true,amount:1,max: 5,stacktext: this.add.text(0,0,'ho')})))
    blacksmith.displayShop()
    for (var i = 0; i < blacksmith.contents.length; i++) {
      blacksmith.contents[i].hideItem()
    }

  }

  update() {

  }
}
