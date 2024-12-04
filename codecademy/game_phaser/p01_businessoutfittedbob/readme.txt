Project Index: 1
Project Name : Business Outfitted Bob
Project Description:
	This will be your first time seeing Phaser code but you will not need to know it or use it to complete this project.
	You will need to draw on what you’ve learned so far about JavaScript to complete Business Outfitted Bob:
		Declaration of global variables and keywords like const and let
		Changing the values of variables
		Conditional statements using if, else if, and else
	Once the missing JavaScript code has been added in certain files, all the features of the game will be complete and you will be able to play the game.

	Note: If you’re running into problems with loading image assets where black squares with green borders (like this example) load 
		  instead of the intended images, it may be a browser issue related to CORS. As a work-around, use Firefox as your browser. 
		  Otherwise, double-check your syntax to make sure everything’s in working order.

	*main script: GameScene.js
Codeacademy completed link: -

Instructions:
01) In order to play our game, we’ll need to set a few variables at the top of the GameScene.js file.
	This allows us to store information about parts of our game as values so we can use them later.
	Create a variable named score at the top of the GameScene.js file and set it to 0. We’ll use this variable to track Bob’s earnings during the game.

02) Create moneyMultiplier, a constant variable that makes sure Bob has earnings that are a multiple of 100 on a new line after score.
	Set moneyMultiplier to 100.

03) Create a constant variable, speed on a new line under moneyMultiplier. Assign it the value 1.

04) Let’s give Bob the ability to move so he can start collecting money and increase his earnings.
	We want to move Bob in 4 directions: up, down, right, and left. This should happen when we press the up, down, right and left arrow keys of the keyboard.
	Inside of the update() method towards the bottom of the file, locate the line where we declared a constant variable called cursors. 
	This refers to several keys, including the arrow keys of the keyboard. 

	Next, we need to store the arrow keys for the 4 directions as variables, separately.
	Start with the right arrow. Under the line declaring cursors, create a constant variable called rightArrow and assign it cursors.right.isDown.
	This is Phaser syntax that will let us check if the right arrow key is being pressed by the player.

05) On a new line beneath rightArrow, create another constant called leftArrow and store cursors.left.isDown in it.

06) On a new line beneath leftArrow, create another constant called upArrow and store cursors.up.isDown in it.

07) One more key to go! On a new line beneath upArrow, create our last constant for arrow keys, downArrow, and store cursors.down.isDown in it.

08) Great! We now know which keys we have to watch in case a player presses them. 
	Let’s add code to move the Bob character across the screen if one of these arrow keys is pressed.
	Under the constant variables you created in update() and on a new line, create a conditional if statement that checks if rightArrow is true. 
	If it is, we’ll run one of the helper functions given to us to move him in the correct direction.
	Inside of our if statement place the code moveBobRight(). This will move the Bob sprite to the right across the screen.

09) Check that the leftArrow key has been pressed by chaining an else if statement to the if statement you created in the previous step.
	Add the code moveBobLeft() inside of our else if statement.

10) Check that the upArrow key has been pressed by chaining an else if statement to the else if statement you created in the previous step.
	Add code to move the Bob sprite up, moveBobUp().

11) Check that the downArrow key has been pressed by chaining an else if statement to the if statement you created in the previous step.
	Add code to move the Bob sprite down, moveBobDown().
	Once this step is finished, test that Bob can move in all 4 directions by playing the game.

12) We’ll need to check if Bob has touched walls. We can track where Bob is with gameState.player (this is Phaser related syntax).
	By storing gameState.player.x in bobXCoord, we can access Bob’s x coordinate.
	Below the code that moves the Bob sprite in update(), create a constant variable called bobXCoord and assign it Bob’s x coordinate, gameState.player.x.

13) Just as gameState.player.x gets Bob’s x coordinate, gameState.player.y gets Bob’s y coordinate. 
	Create a constant variable called bobYCoord and assign it Bob’s y coordinate , gameState.player.y.

14) With those two constants, we can now check if Bob has touched the left or right walls of the game. 
	The left wall is located at 32 from the left and the right wall is located 448 pixels from the left.

	On a new line below your previous code, write an if statement that checks if Bob’s x coordinate, bobXCoord, 
	is less than or equal to 32 OR if Bob’s x coordinate is greater than or equal to 448. Leave the inside of the if statement blank for now.

15) Add another if statement under the code you wrote in the previous step that checks if Bob is touching the top and bottom walls
	using Bob’s y coordinate,bobYCoord. The top wall is located 32 pixels from the top of the game screen and the bottom wall
	is 568 pixels from the top of the game screen.

	In this conditional, check if Bob’s y coordinate is less than or equal to 32 OR greater than or equal to 568. 
	Like the other if statement you created in this step, leave the inside of it blank.

16) If Bob touches a wall we want to end the game.
	Inside each of the if statements we just created, call the endGame method inside each of the if statements by adding the code this.endGame()
	inside each of the conditionals.

	Before you move on, check your work by touching each of the walls with Bob and making sure that the Game Over screen is displayed.

17) Our game is almost done!
	However, you may have noticed a problem if you’ve played the game a few times. Bob’s earnings do not reset to $0 in new games.
	In the EndScene.js file inside of the create() method reset the score variable to 0.
	Check your work by playing the game and see if the score resets.

18) That’s it – you’ve successfully finished essential features of a Phaser.js game using JavaScript. Great work!
	If you want to challenge yourself, see what additional changes and features you can add to the game. For example, try the following:
		Change the speed Bob moves. Bob should move faster as he collects more money and his earnings increase.
		Add code to GameScene.js so that when Bob and the money sprite overlap speed will increment by 0.1.
		What changes would you have to make when declaring the speed variable to make this work?