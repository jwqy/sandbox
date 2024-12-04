Project Index: 7c
Project Name : Codey's Counting Conundrum
Project Description:
	The game that we’re going to build out draws inspiration from a game used to study chimpanzee memory. 
	The premise of the game is that numbers flash on the screen for a brief period of time before being covered by circles. 
	The goal is to then click on the circles in the correct order from smallest to largest.

	Note: If you’re running into problems with loading image assets where black squares with green borders (like this example) load 
		  instead of the intended images, it may be a browser issue related to CORS. As a work-around, use Firefox as your browser. 
		  Otherwise, double-check your syntax to make sure everything’s in working order.

	*main script: GameScene.js
Codeacademy completed link: -

Instructions:
01) In our game, we have three Scenes stored in three separate files. 
	Let’s add the code needed to transition from one Scene to another starting with StartScene.js.
	We want to go from the start screen to the game screen. 
	Therefore, inside the 'pointerup' listener, call this.scene.stop('StartScene') and then start the next scene by calling this.scene.start('GameScene').

02) From GameScene, we want to transition to EndScene.
	Navigate to GameScene.js and inside the update() method, there’s a conditional that checks if all the gameState.circles sprites are gone. 
	Inside that conditional, end GameScene and transition to EndScene.

03) From EndScene, we want to give our players the option to restart the game.
	Navigate to EndScene.js and locate the 'pointerup' event listener. 
	Inside the callback function for the event listener, add the logic to transition from EndScene to GameScene.

04) Let’s add an animation to our start screen. Navigate to StartScene.js.
	We’ve already preloaded the sprite sheet and given it a key of 'searching'.
	Inside the create method, call this.add.sprite(220, 320, 'searching') to add in our searching sprite and assign it to gameState.startSprite. 
	We’ll use gameState.startSprite to play our animation later.

05) Create the animation for 'searching' by calling this.anims.create() with the object:
		{
			key: 'codeySearch',
			frames: this.anims.generateFrameNames('searching', { start: 0 , end: 5}),
			delay: 0,
			frameRate: 2,
			repeat: -1
		}
	This animation will have 6 frames total, using the 0th frame to the 5th frame of 'searching', not have any delay,
	play 2 times in a second, and continuously play.

06) With our animation and sprite set up, let’s now play the animation.
	Call: gameState.startSprite.anims.play('codeySearch')

07) Navigate to GameScene.js. Before we add any code let’s take a second to look over some of the provided code in create()
	that creates the numbers and boxes in game. We have gameState.circles and a for loop that creates multiple circles.
	
	One important line in that loop is:
		let currentCircle = this.add.circle(randomCoord.x + 10, randomCoord.y + 15, 20, 0x4D39E0, 0);
	Notice that we’re creating a circle that that has a 0 alpha/opacity value. 
	This means the circle being created will not be visible (it will be completely transparent).

	Another important point is that each circle also has a number property to it.
		currentCircle.number = i
	As we iterate through the loop, i increases and therefore assigns a different number to each circle.

	Inside the for loop, create a tween by calling this.tweens.add() with the following object as an argument:
		{
			targets: currentCircle,
			paused: false,
			completeDelay: 3000,
			onComplete: function() {
			}
		}

08) Inside onComplete‘s anonymous function:
		assign currentCircle.fillAlpha a value of 1 - to make our circle entirely blue and non-see through.
		call gameState.textAlert.setText("") to remove the initial instructions.
		call gameState.score.setText(` Correct: ${gameState.correct}\nIncorrect: ${gameState.incorrect}`)
	we’ll use this text to update the number of correct and incorrect guesses later.

09) After the circles appear, players will need to click on the circles in the correct order, so we need to add an event listener to each currentCircle.
	Since we should only allow the circles to be clicked after they’ve turned blue, we should add this event listener inside our onComplete function.
	Inside the onComplete function, call currentCircle.on('pointerup', () => {}).

10) With the event listener up, let’s implement the game logic of when a player clicks.
	If the player clicks on the correct circle, the circle should disappear and we should increment our in-game counters to reflect the correct guess.
	We’ll need a conditional inside the callback of the 'pointerup' listener.
	Add an if statement that checks if gameState.counter is the same as currentCircle.number.

11) Within our if statement, we need to:
		increase gameState.counter by 1 and save its new value.
		increase gameState.correct by 1 and save its new value.
		destroy currentCircle.

12) There’s a chance that the circle clicked isn’t the correct circle. Therefore, we need to add an else statement. 
	Inside the else statement, increase gameState.incorrect by 1 and save the new value.

13) In either case, whether the correct circle was clicked or not, we want to update the gameState.score‘s text.
	Within the event handler’s callback, but NOT within the conditional, call
		gameState.score.setText(`  Correct: ${gameState.correct}\nIncorrect: ${gameState.incorrect}`);

14) The basic logic that checks if the correct circle has been clicked is now implemented. 
	But, it’s hard to tell if a circle was clicked and it was the wrong circle.
	We can fix this by providing visual feedback with a tween!
	This tween will make the circle grow larger and then shrink back down to size.
	Within the for loop, and after the first tween, assign currentCircle.wrongTween the value of calling:
		this.tweens.add({
			targets: currentCircle,
			paused: true,
			scaleX: 1.5,
			scaleY: 1.5,
			yoyo: true,
			duration: 150
		});

15) With currentCircle.wrongTween set up, we can update the logic when a player clicks the wrong circle.
	After incrementing gameState.incorrect, play this tween as visual feedback by calling currentCircle.wrongTween.restart().
	Calling .restart() on a tween allows us to play the same tween multiple times in a Scene.

16) Now let’s go to EndScene.js.
	Depending on the player’s score, we want to display two different animations. 
	If it’s greater than or equal to 70, we want to use the 'happy' sprite sheet. Otherwise, we’ll use the 'sad' sprite sheet.
	We’ll start with the 'happy' sprite. Inside the if statement of create(), call this.add.sprite(220, 220, 'happy') and assign it to gameState.win.

17) With our 'happy' sprite set up, create the animation by calling:
		this.anims.create({
			key: 'celebrate',
			frames: this.anims.generateFrameNames('happy', { start: 0, end: 1 }),
			delay: 0,
			frameRate: 2,
			repeat: -1
		})

18) Still inside the if statement, call gameState.win.anims.play('celebrate') to play the animation.

19) In our else condition, we want to use use Codey’s 'sad' sprite sheet. Notice that like the 'happy' sprite sheet, it also has 2 frames.
	Using the same logic as we did for the if condition, inside of else:
		create the 'sad' sprite and assign it to gameState.lose.
		create the animation cry using the 'sad' sprite sheet.
		play the animation.

20) Congratulations! We finished with our project and have a fully functional game that uses scene transitions, animations, and tweens!
	If you want to challenge yourself:
		Add a tween that plays when the correct circle is clicked.
		Change the “wrong” tween to temporarily show the number of the circle.
		Create an options screen for players:
		How long to display the numbers (without being blocked).
		How many circles/numbers to display.