import Phaser from 'phaser';
import images from '../../assets/*.png';

class Start extends Phaser.Scene {
  constructor() {
    super({
      key: 'start',
    })
  }

  preload() {
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const centeredHorizontily = width / 2;
    const centeredVertically = height / 2;

    const loadingText = this.make.text({
      x: centeredHorizontily,
      y: centeredVertically - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: centeredHorizontily,
      y: centeredVertically - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: centeredHorizontily,
      y: centeredVertically + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);


    this.load.image('phaser', images.phaser);

    this.load.image('sky', images.sky);
    this.load.image('ground', images.platform);
    this.load.image('star', images.star);
    this.load.image('bomb', images.bomb);
    this.load.spritesheet('player', images.dude, {
      frameWidth: 32,
      frameHeight: 48,
    });

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);

      percentText.setText(`${parseInt(value * 100, 10)}%`);
    });            
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });
  }
  
  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const centeredHorizontily = width / 2;
    const centeredVertically = height / 2;

    const madeWithText = this.make.text({
      x: centeredHorizontily,
      y: centeredVertically - 50,
      text: 'Made with',
      style: {
        fill: '#ffffff'
      }
    });
    madeWithText.setOrigin(0.5, 0.5);

    this.add.image(centeredHorizontily, centeredVertically, 'phaser');

    this.time.addEvent({
      delay: 1000,
      callback: () => this.scene.start('game')
    })
  }
}

export default Start;
