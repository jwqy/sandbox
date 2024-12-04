Project Index: 6b
Project Name : Bug Invaders
Project Description:
	In this project, we’re going to take the skills we’ve learned from our Phaser physics lesson and create our own version of Space Invaders.

	Note: If you’re running into problems with loading image assets where black squares with green borders (like this example) load 
		  instead of the intended images, it may be a browser issue related to CORS. As a work-around, use Firefox as your browser. 
		  Otherwise, double-check your syntax to make sure everything’s in working order.

Codeacademy completed link: -

Instructions:
01) In Bug Invader, there are 3 rows and 8 columns of enemies.
	In create(), let’s create these enemies, call this.physics.add.group() and assign it to gameState.enemies.
	We’ll use gameState.enemies to create our bugs.

02) We’re going to use nested for loops to create our rows of enemies. Let’s start on the outer for loop that:
		uses yVal as a counter that starts at 1.
		continues running for as long as yVal is less than 4.
		increases yVal by 1 for every iteration.

03) Inside the for loop from the previous step, we’re going to create another for loop to creates the columns of enemies. This loop:
		uses xVal as a counter that starts at 1.
		continues running for as long as xVal is less than 9.
		increases xVal by 1 for every iteration.

04) Inside the nested for loop, call gameState.enemies.create() with the arguments (in the following order):
		50 * xVal
		50 * yVal
		'bug1'
	The first two arguments will provide adequate spacing between the bugs. Save your code to see your created bugs falling down!

05) We don’t want our bugs to fall down immediately and we’ll get to making the bugs move later. 
	For now, let’s make sure they stay up and scale them down a little.
	Chain .setScale(.6) to the just added gameState.enemies.create() method. This will make the bug sprites 60% the size of the original.
	Then, chain another method, .setGravityY(-200) to counteract the game’s gravity and make the bugs stay up.

06) With our bugs in place, let’s create some pellets that the bugs try to drop on Codey.
	Declare a pellets variable and instantiate it with this.physics.add.group(). pellets is the Group object we’ll use to create individual pellets.

07) In create(), declare a genPellet() function.
	Inside genPellet(), declare a variable randomBug and assign to it Phaser.Utils.Array.GetRandom(gameState.enemies.getChildren()).
	Note: The method Phaser.Utils.Array.GetRandom() takes an array and selects a random element in that array. 
		  .getChildren() is called on a Group object and returns an array of the sprites belonging to the Group.

08) Still inside genPellet() but under randomBug, call pellets.create(randomBug.x, randomBug.y, 'bugPellet').
	Soon we’ll use genPellet() to drop pellets from a randomly selected bug! -cue evil laughter-

09) While our game is active, let’s make the bugs continuously create pellets and use gameState.pelletsLoop to keep track of this loop.
	In create(), assign gameState.pelletsLoop the value of calling this.time.addEvent(). Then, pass in the following object as an argument:
		{
		delay: 300,
		callback: genPellet,
		callbackScope: this,
		loop: true,
		}
	Save your code to see the pellets appear from random bugs!

10) The pellets aren’t interacting with anything right now. Let’s change that by adding a Collider between pellets and platforms! 
	When the pellet hits the ground platform, the pellet should be removed/destroyed.
	Call this.physics.add.collider() with the following arguments:
		pellets
		platforms
		a callback function to remove the pellet when it hits the ground platform.

11) There have to be consequences if a pellet hits Codey. To set up this interaction, create another Collider object between pellets and gameState.player.
	Call this.physics.add.collider() with the following arguments:
		pellets
		gameState.player
		an empty arrow function callback (we’ll add to this callback function in the next step).

12) After a pellet hits Codey, it’s game over. 
	Therefore, we want the callback in the collider to do a few things for us that would indicate that the game is actually over.
	Inside the anonymous arrow function you created in the previous step:
		Do NOT assign any parameters (you don’t need any).
		Set gameState.active to false.
		Destroy gameState.pelletsLoop.
		Pause the game’s physics.
		Add text to tell players that the game is over.
	Save your code and let Codey get hit by a bug pellet to see what happens when it’s Game Over!

13) Let’s give Codey the ability fire back.
	In create(), create a Group object using this.physics.add.group() and assign it to gameState.bugRepellent.

14) In update(), locate the if statement that has the condition Phaser.Input.Keyboard.JustDown(gameState.cursors.space).
	This if statement checks if the spacebar is being pressed.
	Inside the if statement, call gameState.bugRepellent.create() with the following arguments:
		gameState.player.x
		gameState.player.y
		'bugRepellent'
	Save your code and press spacebar to see Codey send repellent… downward? Don’t worry, we’ll fix this in the next step.

15) Chain .setGravityY(-400) to your method call in the previous step.

16) Codey’s repellent should get rid of bugs. In create(), add a Collider between the Groups: gameState.enemies and gameState.bugRepellent.

17) Add another argument to the Collider object, an anonymous callback function that has 2 parameters, bug and repellent.
	Inside the callback function, we need to add code that:
		Destroys bug, i.e. call bug.destroy().
		Destroys repellent.
		Changes the text of gameState.scoreText to show the number of bugs left.
	You can use the provided numOfTotalEnemies() function to return the number of bugs left. 
	Your use a template literal like: `Bugs Left: ${numOfTotalEnemies()}` Save your code, and test how Codey’s repellent interacts with the bugs!

18) When there are no more bugs, then the player wins!
	Inside update(), inside the if statement that checks gameState.active, nest an if statement that checks numOfTotalEnemies() === 0.
	numOfTotalEnemies() is a helper function provided for you that returns the number of bugs left in the game.

19) Inside the body of the if statement:
		Set gameState.active to false.
		Pause physics.
		Add text onto the screen to tell your players they’ve won! Check the hint for a syntax refresher.
		Moving the Bugs

20) Let’s add movement to the bugs to make it feel more like Space Invaders.
	Give gameState anenemyVelocity property with a value of 1.

21) Inside update(), add an else statement to the if statement that checks the total number of enemies.
	Inside that else statement, call gameState.enemies.getChildren() to the array of bug sprites. 
	Then, call the .forEach() iterator and create a callback that increases each element’s x property by gameState.enemyVelocity.
	Save your code and you should see the bugs move to the right continuously.

22) While we’re still inside the else statement, after the iterator from the previous step we’re going to
	add two new properties (leftMostBug and rightMostBug) to gameState.
	Assign:
		gameState.leftMostBug a value of sortedEnemies()[0]
		gameState.rightMostBug a value of sortedEnemies()[sortedEnemies().length -1]
	We’ll need these two properties to determine how to move the bugs. Check out the hint for more information about the methods!

23) Under gameState.rightMostbug add an if statement that checks if gameState.leftMostBug.x is less than 10 OR if gameState.rightMostBug.x > 440.
	These conditions check if the leftmost bug hit the left border or if the rightmost bug hit the right border.

24) Inside the if statement from the previous step, multiply gameState.enemyVelocity by -1 and save that value to gameState.enemyVelocity.
	Then, iterate through gameState.enemies.getChildren() and increase the y property of each by 10 and saving the new values.
	Now the bugs will move downward after the leftmost bug or the rightmost bug collides with the game’s borders!

25) Since the bugs can now move downward, they might eventually hit Codey which means game over!
	Add a Collider between gameState.enemies and gameState.player() that also has a callback function to end the game. Your callback should:
		Set gameState.active to false.
		Set gameState.enemyVelocity to 1.
		Pause the game’s physics.
		Add text to tell players that the game is over.

26) Let’s make sure our game works properly for the other win or game over conditions.
	Go back to the Collider of gameState.player and pellet. Inside the callback of that collider, set gameState.enemyVelocity to 1. 
	Inside update(), in the if statement that checks if numOfTotalEnemies() === 0, set gameState.enemyVelocity to 1.

27) Fantastic job on re-creating an arcade classic! If you want to challenge yourself even further:
		Add in a high score system.
		Randomize the bug sprites.
		Attribute different points for different bugs.
		Add sound effects.
		Increase the speed of the bugs as the number of bugs decrease.