let config =  {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1445,
  height: 822,
  physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {y: 300}
        }
    },
  scene:[Stage1]
};
