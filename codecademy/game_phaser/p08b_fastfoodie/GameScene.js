const gameState = {
	score: 0,
	starRating: 5,
	currentWaveCount: 1,
	customerIsReady: false,
	cam: {},
	gameSpeed: 3,
	currentMusic: {},
	totalWaveCount: 3,
	readyForNextOrder: true,
	customersServedCount: 0,
}

// Gameplay scene
class GameScene extends Phaser.Scene {
	constructor() {
		super({ key: 'GameScene' })
	}

	preload() {
		// Preload images
		const baseURL = 'https://content.codecademy.com/courses/learn-phaser/fastfoodie/';
		this.load.image('Chef', `${baseURL}art/Chef.png`);
		this.load.image('Customer-1', `${baseURL}art/Customer-1.png`);
		this.load.image('Customer-2', `${baseURL}art/Customer-2.png`);
		this.load.image('Customer-3', `${baseURL}art/Customer-3.png`);
		this.load.image('Customer-4', `${baseURL}art/Customer-4.png`);
		this.load.image('Customer-5', `${baseURL}art/Customer-5.png`);
		this.load.image('Floor-Server', `${baseURL}art/Floor-Server.png`);
		this.load.image('Floor-Customer', `${baseURL}art/Floor-Customer.png`);
		this.load.image('Tray', `${baseURL}art/Tray.png`);
		this.load.image('Barrier', `${baseURL}art/Barrier.png`);
		this.load.image('Star-full', `${baseURL}art/Star-full.png`);
		this.load.image('Star-half', `${baseURL}art/Star-half.png`);
		this.load.image('Star-empty', `${baseURL}art/Star-empty.png`);

		// Preload song
		this.load.audio('gameplayTheme', [
			`${baseURL}audio/music/2-gameplayTheme.ogg`,
			`${baseURL}audio/music/2-gameplayTheme.mp3`
		]); // Credit: "Pixel Song #18" by hmmm101: https://freesound.org/people/hmmm101

		// Preload SFX
		this.load.audio('placeFoodSFX', [
			`${baseURL}audio/sfx/placeFood.ogg`,
			`${baseURL}audio/sfx/placeFood.mp3`
		]); // Credit: "action_02.wav" by dermotte: https://freesound.org/people/dermotte

		this.load.audio('servingCorrectSFX', [
			`${baseURL}audio/sfx/servingCorrect.ogg`,
			`${baseURL}audio/sfx/servingCorrect.mp3`
		]); // Credit: "Video Game SFX Positive Action Long Tail" by rhodesmas: https://freesound.org/people/djlprojects

		this.load.audio('servingIncorrectSFX', [
			`${baseURL}audio/sfx/servingIncorrect.ogg`,
			`${baseURL}audio/sfx/servingIncorrect.mp3`
		]); // Credit: "Incorrect 01" by rhodesmas: https://freesound.org/people/rhodesmas

		this.load.audio('servingEmptySFX', [
			`${baseURL}audio/sfx/servingEmpty.ogg`,
			`${baseURL}audio/sfx/servingEmpty.mp3`
		]); // Credit: "Computer Error Noise [variants of KevinVG207's Freesound#331912].wav" by Timbre: https://freesound.org/people/Timbre

		this.load.audio('fiveStarsSFX', [
			`${baseURL}audio/sfx/fiveStars.ogg`,
			`${baseURL}audio/sfx/fiveStars.mp3`
		]); // Credit: "Success 01" by rhodesmas: https://freesound.org/people/rhodesmas

		this.load.audio('nextWaveSFX', [
			`${baseURL}audio/sfx/nextWave.ogg`,
			`${baseURL}audio/sfx/nextWave.mp3`
		]); // Credit: "old fashion radio jingle 2.wav" by rhodesmas: https://freesound.org/people/chimerical
	}

	create() {
		this.resetConfig();

		// Stop, reassign, and play the new music
		gameState.currentMusic.stop();
		gameState.currentMusic = this.sound.add('gameplayTheme');
		gameState.currentMusic.play({ loop: true });

		// Assign SFX
		gameState.sfx = {};
		gameState.sfx.placeFood = this.sound.add('placeFoodSFX');
		gameState.sfx.servingCorrect = this.sound.add('servingCorrectSFX');
		gameState.sfx.servingIncorrect = this.sound.add('servingIncorrectSFX');
		gameState.sfx.servingEmpty = this.sound.add('servingEmptySFX');
		gameState.sfx.fiveStars = this.sound.add('fiveStarsSFX');
		gameState.sfx.nextWave = this.sound.add('nextWaveSFX');

		// Create environment sprites
		gameState.floorServer = this.add.sprite(gameState.cam.midPoint.x, 0, 'Floor-Server').setScale(0.5).setOrigin(0.5, 0);
		gameState.floorCustomer = this.add.sprite(gameState.cam.midPoint.x, gameState.cam.worldView.bottom, 'Floor-Customer').setScale(0.5).setOrigin(0.5, 1);
		gameState.table = this.add.sprite(gameState.cam.midPoint.x, gameState.cam.midPoint.y, 'Barrier').setScale(0.5);

		// Create player and tray sprites
		gameState.tray = this.add.sprite(gameState.cam.midPoint.x, gameState.cam.midPoint.y, 'Tray').setScale(0.5);
		gameState.player = this.add.sprite(gameState.cam.midPoint.x, 200, 'Chef').setScale(0.5);

		// Display the score
		gameState.scoreTitleText = this.add.text(gameState.cam.midPoint.x, 30, 'Score', { fontSize: '15px', fill: '#666666' }).setOrigin(0.5);
		gameState.scoreText = this.add.text(gameState.cam.midPoint.x, gameState.scoreTitleText.y + gameState.scoreTitleText.height + 20, gameState.score, { fontSize: '30px', fill: '#000000' }).setOrigin(0.5);

		// Display the wave count
		gameState.waveTitleText = this.add.text(gameState.cam.worldView.right - 20, 30, 'Wave', { fontSize: '64px', fill: '#666666' }).setOrigin(1, 1).setScale(0.25);
		gameState.waveCountText = this.add.text(gameState.cam.worldView.right - 20, 30, gameState.currentWaveCount + '/' + gameState.totalWaveCount, { fontSize: '120px', fill: '#000000' }).setOrigin(1, 0).setScale(0.25);

		// Display number of customers left
		gameState.customerCountText = this.add.text(gameState.cam.worldView.right - 20, 80, `Customers left: ${gameState.customersLeftCount}`, { fontSize: '15px', fill: '#000000' }).setOrigin(1);

		// Generate wave group
		gameState.customers = this.add.group();
		this.generateWave();

		//meal
		gameState.currentMeal = this.add.group();
		gameState.currentMeal.fullnessValue = 0;

		//keys
		gameState.keys.Enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		gameState.keys.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		gameState.keys.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		gameState.keys.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

		//stars/rating
		gameState.starGroup = this.add.group();
		this.drawStars();

		//timer
		gameState.patienceTimerConfig = { delay: 5000, loop: false, paused: true };
		gameState.patienceTimer = this.time.addEvent(gameState.patienceTimerConfig);
	}

	update() {
		if (gameState.readyForNextOrder === true) {
			gameState.readyForNextOrder = false;
			gameState.customerIsReady = false;

			//hide completed customer's meter
			if (gameState.currentCustomer) {
				gameState.currentCustomer.meterContainer.visible = false;
			}

			//move completed customers away down the line
			for (let i = 0; i < gameState.customersServedCount; ++i) {
				this.tweens.add({
					targets: gameState.customers.children.entries[i],
					duration: 750,
					angle: 0,
					x: '-= 300',
				});
			}

			gameState.currentCustomer = gameState.customers.children.entries[gameState.customersServedCount];

			//move current customer to front of line
			this.tweens.add({
				targets: gameState.currentCustomer,
				duration: 1000,
				delay: 100,
				angle: 90,
				x: gameState.player.x,
				ease: 'Power2',
				onComplete: function () {
					gameState.customerIsReady = true;
					gameState.currentCustomer.meterContainer.visible = true;
					gameState.patienceTimer.paused = false;
				}
			});

			//move next customers up the line
			for (let i = gameState.customersServedCount + 1; i < gameState.totalCustomerCount; ++i) {
				this.tweens.add({
					targets: gameState.customers.children.entries[i],
					delay: 200,
					duration: 1500,
					x: '-= 200',
				});
			}
		}

		if (Phaser.Input.Keyboard.JustDown(gameState.keys.A)) {
			this.placeFood('Burger', 5);
		}
		if (Phaser.Input.Keyboard.JustDown(gameState.keys.S)) {
			this.placeFood('Fries', 3);
		}
		if (Phaser.Input.Keyboard.JustDown(gameState.keys.D)) {
			this.placeFood('Shake', 1);
		}
		if (Phaser.Input.Keyboard.JustDown(gameState.keys.Enter)) {
			if (gameState.readyForNextOrder === false && gameState.customerIsReady === true) {
				gameState.patienceTimer.reset(gameState.patienceTimerConfig);
				this.moveCustomerLine();
				this.updateCustomerCountText();
			}
		}

		//patience timer meter behaviour
		if (gameState.patienceTimer.paused === false) {
			let progress = gameState.patienceTimer.getProgress();
			gameState.currentCustomer.timerMeterBody.setScale(1 - progress, 1);

			if (progress < 0.25) {
				gameState.currentCustomer.timerMeterBody.setFillStyle(0x3ADB40);
			} else if (progress >= 0.25 && progress < 0.75) {
				gameState.currentCustomer.timerMeterBody.setFillStyle(0xFF9D00);
			} else if (progress >= 0.75 && progress < 1) {
				gameState.currentCustomer.timerMeterBody.setFillStyle(0xDB533A);
			} else {
				//timer completed, reset it
				gameState.patienceTimer.reset(gameState.patienceTimerConfig);
				this.moveCustomerLine();
				this.updateCustomerCountText();
			}
		}

		//win/lose condition
		if (gameState.starRating <= 0) {
			gameState.currentMusic.stop();
			this.scene.stop('GameScene');
			this.scene.start('LoseScene');
		}

		if (gameState.currentWaveCount > gameState.totalWaveCount) {
			gameState.currentMusic.stop();
			this.scene.stop('GameScene');
			this.scene.start('WinScene');
		}
	}

	/* WAVES */
	// Generate wave
	generateWave() {
		// Add the total number of customers per wave here:
		gameState.totalCustomerCount = Math.ceil(Math.random() * 10) * gameState.currentWaveCount;

		this.updateCustomerCountText();

		for (let i = 0; i < gameState.totalCustomerCount; i++) {
			// Create your container below and add your customers to it below:
			let customerContainer = this.add.container(gameState.cam.worldView.right + (200 * i), gameState.cam.worldView.bottom - 140);
			gameState.customers.add(customerContainer);

			// Customer sprite randomizer
			let customerImageKey = Math.ceil(Math.random() * 5);

			// Draw customers here!
			let customer = this.add.sprite(0, 0, `Customer-${customerImageKey}`).setScale(0.5);
			customerContainer.add(customer);

			// Fullness meter container
			customerContainer.fullnessMeter = this.add.group();

			// Define capacity
			customerContainer.fullnessCapacity = Math.ceil(Math.random() * 5 * gameState.totalWaveCount);

			// If capacity is an impossible number, reshuffle it until it isn't
			while (customerContainer.fullnessCapacity === 12 || customerContainer.fullnessCapacity === 14) {
				customerContainer.fullnessCapacity = Math.ceil(Math.random() * 5) * gameState.totalWaveCount;
			}

			// Edit the meterWidth
			let meterWidth = customerContainer.fullnessCapacity * 10;
			customerContainer.meterContainer = this.add.container(0, customer.y + (meterWidth / 2));

			// Add the customerContainer.meterContainer to customerContainer
			customerContainer.add(customerContainer.meterContainer);

			// Add meter base
			customerContainer.meterBase = this.add.rectangle(-130, customer.y, meterWidth, 33, 0x707070).setOrigin(0);
			customerContainer.meterBase.setStrokeStyle(6, 0x707070);
			customerContainer.meterBase.angle = -90;
			customerContainer.meterContainer.add(customerContainer.meterBase);

			// Add timer countdown meter body
			customerContainer.timerMeterBody = this.add.rectangle(customerContainer.meterBase.x + 22, customer.y + 1, meterWidth + 4, 12, 0x3ADB40).setOrigin(0);
			customerContainer.timerMeterBody.angle = -90;
			customerContainer.meterContainer.add(customerContainer.timerMeterBody);

			// Create container for individual fullness blocks
			customerContainer.fullnessMeterBlocks = [];

			// Create fullness meter blocks
			for (let j = 0; j < customerContainer.fullnessCapacity; j++) {
				customerContainer.fullnessMeterBlocks[j] = this.add.rectangle(customerContainer.meterBase.x, customer.y - (10 * j), 10, 20, 0xDBD53A).setOrigin(0);
				customerContainer.fullnessMeterBlocks[j].setStrokeStyle(2, 0xB9B42E);
				customerContainer.fullnessMeterBlocks[j].angle = -90;
				customerContainer.fullnessMeter.add(customerContainer.fullnessMeterBlocks[j]);
				customerContainer.meterContainer.add(customerContainer.fullnessMeterBlocks[j]);
			}

			// Hide meters
			customerContainer.meterContainer.visible = false;
		}
	}

	updateCustomerCountText() {
		gameState.customersLeftCount = gameState.totalCustomerCount - gameState.customersServedCount;
		gameState.customerCountText.setText(`Customers left: ${gameState.customersLeftCount}`);
	}

	placeFood(food, fullnessValue) {
		if (typeof food !== 'string' || typeof fullnessValue !== 'number') {
			return;
		}

		if (gameState.currentMeal.children.entries.length < 3 && gameState.customerIsReady === true) {
			//update meal
			let xPos = gameState.tray.x - 90 + (90 * gameState.currentMeal.children.entries.length);
			gameState.currentMeal.create(xPos, gameState.tray.y, food).setScale(0.5);

			//update fullness
			gameState.currentMeal.fullnessValue += fullnessValue;

			for (let i = 0; i < gameState.currentMeal.fullnessValue; ++i) {
				if (i < gameState.currentCustomer.fullnessCapacity) {
					if (gameState.currentMeal.fullnessValue === gameState.currentCustomer.fullnessCapacity) {
						//exactly full
						gameState.currentCustomer.fullnessMeterBlocks[i].setFillStyle(0x3ADB40);
						gameState.currentCustomer.fullnessMeterBlocks[i].setStrokeStyle(2, 0x2EB94E);
					} else if (gameState.currentMeal.fullnessValue > gameState.currentCustomer.fullnessCapacity) {
						//too full
						gameState.currentCustomer.fullnessMeterBlocks[i].setFillStyle(0xDB533A);
						gameState.currentCustomer.fullnessMeterBlocks[i].setStrokeStyle(2, 0xB92E2E);
					} else {
						//not full
						gameState.currentCustomer.fullnessMeterBlocks[i].setFillStyle(0xFFFA81);
					}
					gameState.sfx.placeFood.play();
				}
			}
		}
	}

	moveCustomerLine() {
		//update stars before clearing meal
		this.updateStars(gameState.currentMeal.fullnessValue, gameState.currentCustomer.fullnessCapacity);

		gameState.currentMeal.clear(true);
		gameState.currentMeal.fullnessValue = 0;
		++gameState.customersServedCount;
		gameState.readyForNextOrder = true;

		if (gameState.customersServedCount >= gameState.totalCustomerCount) {
			++gameState.currentWaveCount;
			--gameState.gameSpeed;
			gameState.readyForNextOrder = false;
			this.destroyWave();
		}
	}

	drawStars() {
		gameState.starGroup.clear(true, true);
		for (let i = 0; i < gameState.starRating; ++i) {
			let star = this.add.sprite(20 + (50 * i), 20, 'Star-full').setOrigin(0, 0).setScale(0.5);
			gameState.starGroup.add(star);
		}
	}

	updateStars(fullnessValue, fullnessCapacity) {
		if (typeof fullnessValue !== 'number' || typeof fullnessCapacity !== 'number') {
			return;
		}

		if (fullnessValue === fullnessCapacity) {
			//customer is full
			gameState.currentCustomer.list[0].setTint(0x3ADB40);
			gameState.sfx.servingCorrect.play();
			gameState.score += 100;
			gameState.scoreText.setText(`${gameState.score}`);
			gameState.starRating = clamp(++gameState.starRating, 0, 5);
			if (gameState.starRating >= 5) {
				gameState.sfx.fiveStars.play();
			}
		} else if (fullnessValue < fullnessCapacity) {
			//customer is still hungry
			gameState.currentCustomer.list[0].setTint(0xDB533A);
			gameState.starRating = clamp(gameState.starRating - 2, 0, 5);
			gameState.sfx.servingIncorrect.play();
		} else if (fullnessValue > fullnessCapacity) {
			//customer is too full
			gameState.currentCustomer.list[0].setTint(0xDB9B3A);
			gameState.starRating = clamp(--gameState.starRating, 0, 5);
			gameState.sfx.servingEmpty.play();
		}

		this.drawStars();
	}

	destroyWave() {
		gameState.sfx.nextWave.play();

		//move completed customers away out of screen
		for (let i = 0; i < gameState.customersServedCount; ++i) {
			this.tweens.add({
				targets: gameState.customers.children.entries[i],
				duration: 750,
				angle: 0,
				x: -500,
			});
		}

		gameState.customersServedCount = 0;
		gameState.customers.clear(true);
		this.generateWave();
		gameState.readyForNextOrder = true;
		gameState.waveCountText.setText(`${gameState.currentWaveCount}/${gameState.totalWaveCount}`);
	}

	resetConfig() {
		gameState.starRating = 5;
		gameState.currentWaveCount = 1;
		gameState.customerIsReady = false;
		gameState.gameSpeed = 3;
		gameState.readyForNextOrder = true;
		gameState.customersServedCount = 0;
	}
}

//helper function to clamp values
function clamp(val, min, max) {
	return val >= max ? max : (val <= min ? min : val);
}