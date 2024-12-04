Project Index: 2
Project Name : Mole Unearther
Project Description:
	Let’s use what we learned about functions and variables to build a game scene, run the game logic, and handle user input.
	
	The sun is up and out, but so is our pesky mole! 
	We have set up the bottom three burrows for the mole to pop out of, 
	and it is up to the user to catch the mole by hitting the burrow’s key as many times as possible before the sun sets and time runs out. 
	If the correct burrow is hit, then reward the user with points and the mole will move on to another burrow. 
	If the wrong burrow is hit, then penalize the user by deducting points.

	This project uses the Phaser.js library to set up our scene and create the mole character with corresponding animations.
	We will be building out the core game logic with a timer that gives the user a set amount of time to play, 
	a scoreboard that rewards and penalizes the user with points, and finally a feature that pauses the game.

	Note: If you’re running into problems with loading image assets where black squares with green borders (like this example) load 
		  instead of the intended images, it may be a browser issue related to CORS. As a work-around, use Firefox as your browser. 
		  Otherwise, double-check your syntax to make sure everything’s in working order.

	*main script: GameScene.js
Codeacademy completed link: https://content.codecademy.com/courses/learn-phaser/mole-unearther/sample/index.html?_gl=1*1sf6ih1*_ga*Njc1OTE4OTYyLjE3MTQ5ODY2NzA.*_ga_3LRZM6TM9L*MTcxNjc4OTU0My4yOC4xLjE3MTY3OTE3MjAuNTYuMC4w

Instructions:
01) Let’s start out by exploring the code that we set up for you. 
	Don’t worry about any unfamiliar parts. We will cover these concepts at a later time, but for now, use the comments to guide you.

	game.js binds together our three scenes and helps us control the flow between each of them.
	StartScene.js is the first scene that appears when the game starts. 
				  It handles the screen display and the user’s click interaction to move to the next scene.
	GameScene.js is loaded in when the user clicks the mouse in StartScene. 
				 It sets up anything that is displayed while the game is played and controls the flow of the game. 
				 This is where we will write out the logic for our game.
	EndScene.js is the last scene that we use to display the user’s final score and handle the user’s click interaction to go back to GameScene.js.

02) To kick things off, we will set up some variables that will store information about the state of the game so that we can communicate them to the user. 
	To start, the user will want to know how much time is left in the game.

	At the top of our GameScene.js file, let’s create a timeLeft variable and set it to 30, which is the number of seconds we will allot for gameplay.
	It will be used to track how many seconds are left as the game progresses.

03) Next, the user will want to know how many points they have. Initialize a score variable and start the user off with 0 points.

04) Since we will also build out a pause feature, let’s go ahead and create an isPaused variable. 
	The game is not paused when it is first started, so set the initial value to false.

05) Let’s run our program to check that we created our variables correctly. 
	First, save your code and click in the starting scene to begin the game, and then observe the game’s behavior (so far) from GameScene.js.

06) To create a timer to count down, we can leverage the timeLeft variable that decrements after each second passes so that the game can end.
	Inside create(), let’s create an empty updateTimer() function. 
	We will want to create it before onSecondElapsed(), since we will use it in onSecondElapsed() later.

07) Inside updateTimer(), decrease the timeLeft by 1.

08) Now that we have a function to update the timer, we can use it after each second elapses.
	Locate the onSecondElapsed() function inside create(). 
	This function is already set up to execute after every second passes. 
	We can take advantage of this to also update the timer by making our call to the updateTimer() function inside the onSecondElapsed() function.
	When we run the program again, we can see our timer count down!

09) Next up is handling when the user presses the J, K, or L key. 
	We need a function, onBurrowHit(), that will run when any of those keys are pressed. Then, it will distribute rewards and penalties accordingly.
	Inside update() and below applyMissPenalty(), create onBurrowHit(). 
	It should be an arrow function with a key parameter that will be passed in with the key that the user pressed.

10) Now we have a function, onBurrowHit(), that we can use to execute when the user hits a key. 
	In update(), there are three conditions set up for you that will identify when the user hits one of the keys:

		if (Phaser.Input.Keyboard.JustDown(gameState.jKey)) {

		} else if (Phaser.Input.Keyboard.JustDown(gameState.kKey)) {

		} else if (Phaser.Input.Keyboard.JustDown(gameState.lKey)) {

		}

	Inside each condition, call the onBurrowHit() function with the corresponding 'j', 'k', or 'l' key that the user hit.

11) Going back to the onBurrowHit() function, we want to give the user a reward if the key the user hit is the same as currentBurrowKey.
	We set up the currentBurrowKey variable for you, to contain the key of the burrow that the mole is currently residing in.
	Using an if statement, check if the key parameter is equal to currentBurrowKey.

12) Inside the if condition, the user hit the burrow that the mole is in, so call the applyHitReward() function. 
	This function is set up to display a point reward next to the score box.
	Then add this call:
		this.relocateMole();
	This will move the mole to another location.

13) So far we only check if the user’s input key is the same as the mole’s burrow. 
	When that condition is not satisfied, it’s a miss, and we want to apply a score penalty.
	Add an else statement after the if condition to call the applyMissPenalty() function for missing the mole’s burrow.
	This function is set up to display a point penalty next to the score box.

14) Now let’s run what we have so far! See what happens when you press the correct key and press an incorrect key.
	Updating the Score with a Reward

15) Now, you may have noticed that the point reward and penalty don’t change the user’s score.
	Let’s focus on building out the appropriate score update. We want the score to update similarly to how we updated timeLeft.
	Inside update() and before applyHitReward(), set up the updateScore() function.

16)	The updateScore() function should be flexible enough to update by any number of points. 
	To accommodate this, add a points parameter to our function that allows the caller to pass in any number, and add it to the score.
	Inside updateScore, add the points parameter to score.

17) Now that we can add points to the score, let’s use it in the applyHitReward() function, where we reward the user for correctly hitting the mole.
	Inside applyHitReward(), update the score with an additional 5 points by calling updateScore().

18) Let’s check our work by running the program and pressing the correct key. Check that the score increases as intended.

19) Next up is to deduct penalty points when the user hits the wrong burrow. 
	We will follow the same steps as we took to reward the user with points.
	The only difference is that will subtract points instead of add.
	We already set up our function to update the point total, so let’s call it in the applyMissPenalty() function, 
	that is located after applyHitReward(), with -5 to subtract 5 points.

20) Let’s run the program and check our work! Go ahead and try missing the mole by pressing the incorrect key. Make sure that the score updates properly.

21) We’re in the homestretch! Let’s add some pause functionality so that the timer will stop when the user hits Space. 
	Remember the isPaused variable we declared at the beginning? We will use this to stop and start the timer.
	Inside update(), after onBurrowHit(), create an arrow function, togglePause(), that will run when the user hits the spacebar key.
	This function will flip the isPaused variable to be the opposite of its current value.

22) Inside togglePause(), we need to set the isPaused variable to true when it is false.
	Add an if statement with a condition that checks if isPaused is equal to false. Inside the statement, set isPaused to true. Then add this call:
		this.displayPauseScreen();
	this.displayPauseScreen() adds an overlay on the screen to communicate to the user that the game is paused.

23) Let’s call our togglePause() function so we can test out what we have written so far.
	Call togglePause() inside the condition that checks if the space key is down (towards the bottom of update()):
		if (Phaser.Input.Keyboard.JustDown(gameState.spaceKey)) {
		// …
		}

24) Run the program to check our work. Verify that the game pauses correctly with SPACE.

25) Now that we can successfully pause the game, we should let the user unpause the game. 
	In the togglePause() function, when the if condition fails, then the value of isPaused should be toggled to false.
	Add an else condition and set the isPaused variable to false. Then add this call:
		this.removePauseScreen();
	this.removePauseScreen() removes the paused overlay on the screen.

26) When we run the program, we can now pause and unpause the game. 
	With this, we’re done! You finished building out a timer, scoreboard, and pausing functionality using functions. Congrats!
	If you’re up for it, try challenging yourself and adding new features to the game. For example:
		When the user is rewarded with points for successfully hitting the mole, reward points based on the amount of time it took for the user to react.
		Add in another burrow at the top for the mole to relocate to and the user to hit.
		These challenges might stretch your JavaScript knowledge beyond what we have covered so far. 
		You can use the existing code in GameScene.js to guide you. 
		Don’t worry if you get stuck, you can always come back and add more game features later!