Project Index: 5
Project Name : Electric Mouse
Project Description:
	Let’s combine our knowledge of objects to finish building a game that pits our Electric Mouse against the Psychic Hairless Cat and its Owl minions!

	The premise of the game is that there are two characters battling each other. 
	The player is an Electric Mouse, and the computer is the Psychic Hairless Cat and its Owl Minions.
	Before the player can fight the Psychic Hairless Cat, the player must beat three Owl minions.
	The player and computer will simultaneously choose one of three moves, Attack, Defend, and Special Attack, 
	the result of the selections are then displayed on the screen.

	Chart for scoring: https://content.codecademy.com/courses/learn-phaser/electric-mouse/electric-mouse-table.svg?_gl=1*1jyhuci*_ga*Njc1OTE4OTYyLjE3MTQ5ODY2NzA.*_ga_3LRZM6TM9L*MTcxNzQ4MzI5NC4zNy4xLjE3MTc0ODU0NDAuMzQuMC4w

	Note: If you’re running into problems with loading image assets where black squares with green borders (like this example) load 
		  instead of the intended images, it may be a browser issue related to CORS. As a work-around, use Firefox as your browser. 
		  Otherwise, double-check your syntax to make sure everything’s in working order.

	*main script: GameScene.js
Codeacademy completed link: -

Instructions:
01) The create() method is where we’ll create game objects that we want to use in our game. 
	One critical object that you need to update is gameState.player (which currently has the value of an empty object).
	Update gameState.player so that its value is an object with the following properties:
		name with a value of 'Electric Mouse'.
		health with a value of 45.
		frames with the value of an empty array.
	If you save your code now and try to play the game, you’ll see both Electric Mouse and the first Owl (remember, enemy sprites are provided for you).

02) Our frames array will contain the animations for our characters. 
	We will create four new objects inside frames for each animation. Each object has a key of key and the respective values are:
		'playerIdle'
		'playerAttack'
		'playerDefend'
		'playerSpecial'
	We’ll use each one of these objects to play the different options in our game.

03) The images we will be using for our characters will be taken from a sprite sheet. 
	A sprite sheet contains multiple frames, each with a different image. 
	We can “animate” these images by playing them in quick succession to appear like a picture is moving. 
	
	To animate Electric Mouse, we need to insert two more properties inside each object of the frames array.
	Create two more keys called start and end and set the value for each animation as followed:
		key					start	end
		'playerIdle'		0		2
		'playerAttack'		3		4
		'playerDefend'		5		6
		'playerSpecial'		7		8
	For instance, the first element in frames should have 3 properties:
		key with a value of 'playerIdle',
		start with a value of 0,
		end with a value of 2.
	Save your code to see Electric Mouse’s idle animation.

04) If you look below you will see the rest of the objects for the opponents have been created. 
	Three for the different Owl variations, ‘Owl’, ‘Red Owl’, ‘Blue Owl’ and a slightly larger ‘Psychic Hairless Cat’ object.

	We’ll use gameState.computer to keep track of the current enemy on the screen. 
	So to start, below the gameState.opponents array, assign gameState.opponents[0] to gameState.computer since that will be our first enemy.
	With the opponent assigned, saving your code will show both sprites in their idle animations.

05)	We’ve already added our player and enemy objects so let’s talk about how Phaser implements animations.
	After we have created our initial sprites you will notice three .forEach() methods under the comment // Creates all of the player animations.
	This first .forEach() method is for the player animations and it is followed by a nested forEach() for the opponents’ array and subsequent animations. 
	There is some Phaser syntax in the method but the major thing you need to notice is this section here:
		this.anims.create({
		// ...
		})
	For us to create animations in Phaser, we have to create each one separately. 
	Therefore, we use .forEach() to iterate through our array which contains the necessary information like the name of the sprite, 
	the frame key, which frames to start and stop, etc. and include it in the Phaser method this.anims.create(). 

06) Locate the comment // Add your information text and styling below:. 
	Below that create an object called style, we’re going to use this object to store properties that will style our text.
	Use the chart below to give style the following properties:
		key			value
		font		'16px Helvetica'
		fill		'#000000'
		padding		{x:6, y:7}

07) To add text in our game, we’ll use the Phaser method this.add.text() which takes four arguments:
		The x-coordinate position in the game (a number).
		The y-coordinate position in the game (a number).
		The initial text string.
		An object containing style information such as font, fill color, and padding.

	Add the text for what the player’s choice by assigning gameState.playerMove the value of calling this.add.text() with the arguments:
		x-coordinate: 65,
		y-coordinate: 140,
		text: '',
		style formatting: style
		
08) Similarly, we want to display text for the computer’s decision. Set gameState.computerMove to store a text object:
		located at the x-coordinate 320.
		located at the y-coordinate 140.
		that initially displays an empty string.
		uses style‘s properties.

	Apply the same methodology to gameState.information with the arguments:
		x-coordinate: 140,
		y-coordinate: 80,
		text: '',
		style formatting: style

09) Lastly, gameState.playerHealthBar and gameState.computerHealthBar display the text of Electric Mouse 
	and the current enemy in the style of 'HP: #' (where # is replaced by the actual value.)
	To get the health value of these objects we need to access the properties: gameState.player.health and gameState.computer.health.
	For example, Electric Mouse starts with an HP of 45, so our game should render:
		HP: 45

	Use your knowledge to add in the text for both player and computer that will:
		use the coordinates 45 (x) and 45 (y) for the player and 375 (x) and 45 (y) for the computer.
		display the correct text.
		use style to style the text.

	When you save your code you should see the text appear above the characters.

10) Our characters and information are created so we can focus on our ‘Attack’ and ‘Defend’ buttons. 
	Note: The code for Special Attack is provided for you to reference if need be!

	But we should review the game logic before writing any code for implementation. 
	The way our game works is by comparing the player and computer choices. 
	The player choice is decided by what button is clicked, and the computer choice is decided by a random number. 
	The outcomes are based on the following pattern (similar to rock, paper, scissors):
		Attack beats Special Attack (whoever chose Special Attack in this situation loses HP).
		Defend beats Attack (whoever chose Attack in this situation loses HP).
		Special attack beats Defend (whoever chose Defend in this situation loses HP).

	If both players select the same choice then both will receive total damage or when both defend, nothing happens. 
	Use this nifty chart to reference the outcomes.

	In the callback function of gameState.attackButton.on(), locate the conditional:
		if (game.input.enabled)

	Create a variable called randomMove which will be the random choice of the computer.
	We can use Math.random() to obtain a random number and if multiplied by 3, the random number will only be between 0 to 2.
	The random number will have a decimal point though so we should wrap Math.random() * 3 with the Math.floor() to generate an integer.

11) With our randomMove variable created we have the computer’s random choice: 0 represents attack, 1 represents defend and 2 represents special attack.
	Now we need to determine what will happen based on what that random number is. 
	Create a control structure, (such as if, else if and else) to execute code depending on which random choice was selected. 
	Remember that we are working on the Attack button so each of these conditions will be based on the player has choosing Attack.

	If the player chooses attack and the computer also chooses attack (randomMove equals 0), 
	then we should subtract 1 from both the player and computer’s .health property.

12) We need to also display what move was chosen by both the player and computer.
	gameState.playerMove and gameState.computerMove are objects created using Phaser methods to display text (which display an empty strings at the moment). 
	Phaser also offers a handy way to update the text by accessing the .text property of both 
	gameState.playerMove and gameState.computerMove and assigning a new string:
		gameState.playerMove.text = 'Wow new text!'

	In this case, both Electric Mouse and the computer chose to attack, so the text in game should display something like
	Attack! for both objects (but be as creative as you’d like!).

13) After we have subtracted the health our health bars we will need to update the changes.
	Update the text of the playerHealthBar and the computerHealthBar to the current value of the player.health and computer.health. 
	Keep the 'HP: ' portion of the string.

14) After updating the health bars, the information text should also be changed to show what happens as a result.
	Assign a new string to gameState.information.text that tells the player both Electric Mouse and the current enemy lost 1 hp. Be as creative as you’d like!

15) We still need to play the animations for the player and computer.
	Our sprite animations are also in our gameState object and we can call the Phaser .play() method with a string 
	to play an animation based on the keys we defined above.

	Starting the Electric Mouse’s attack animation, call .play('playerAttack') on gameState.player.sprite.anims. 
	Notice that 'playerAttack' is the key of the animation we created earlier.

16) Playing the computer attack animation is different since we need to access the .name of the current enemy and then appending 'Attack' to it.
	Call gameState.computerSprite.anims.play() with the concatenated string of gameState.computer.name and 'Attack' to play the correct animation.
	Save your code, if done correctly, when both player and computer choose Attack, you’ll see:
		Both attack animations,
		Both characters lose 1 HP,
		The informational text updates,
		And the move text updates.

17) Add an else if statement that checks if randomMove is 1, this means that the computer chose to defend.
	If the player attacks and the computer defends, the outcome should be:
		gameState.playerMove and gameState.computerMove displays the move selection
		Electric Mouse loses 1 HP.
		The enemy is unharmed.
		gameState.information‘s text should display the results of the HP loss.
		Electric Mouse’s attack and the enemy’s defend animations should play.

18) Account for randomMove to be 2 by adding an else block. This means the computer chose Special Attack (and the Electric Mouse chose Attack).
	Here the outcome should be:
		gameState.playerMove and gameState.computerMove displays the move selection
		Electric Mouse is unharmed.
		The enemy loses 5 HP.
		gameState.information‘s text should display the results of the HP loss.
		Electric Mouse’s attack and the enemy’s special attack animations should play.
	Try out your fully functional attack button!

19) With our attack button finished, let’s move onto implementing our defend button. We’ll apply similar logic used for the attack button such as:
	Creating another randomMove variable to decide the computer’s action.
		Adding in control flow (if...else if...else) to account for the outcome:
		If the computer selects attack, the computer should lose 1 health as the player defends
		If the computer chooses defend then neither character does any damage.
		If the computer chooses special attack then the computer should do 4 damage to the player.
		The text displays the choices and outcomes.
		The animations match the choices.
		The HP of both Electric Mouse and the enemy is updated.

20) Great job! Our buttons are now completed and we should now be able to play our game. 
	Each button should trigger a computer choice which will be reflected in the properties in gameState. 
	Our waveCheck() helper function will insert the next character to be versed when we have defeated an enemy.
	Try playing a game against the computer and see if you can beat the Psychic Hairless Cat!

	For an extra challenge try to:
		Tweak the difficulty of the game by deciding your own HP values for Electric mouse and/or enemies.
		Change the logic for defend to heal both characters if they both choose to defend.
		Give the Electric mouse additional lives at the beginning.
		Edit the styling of the informational text.
		Creating another move that the player and computer can do (Special Defense?).
		Create logic that determines move accuracy so that the player or computer can miss.