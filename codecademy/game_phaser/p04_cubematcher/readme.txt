Project Index: 4
Project Name : Cube Matcher
Project Description:
	For this project, you will be given several files with code to help you start your project. 
	In its current state, Cube Matcher doesn’t work and cannot be played — until we finish it with our knowledge of JavaScript and iterators, which you’ve just learned.
	To create our game, we’ve used JavaScript and Phaser.js, a game-development library, in the starting code.
	Phaser bundles together JavaScript code to create browser-based games, allowing us to develop more quickly and easily.
	To complete Cube Matcher you will use the following iterator methods:
		.forEach()
		.map()
		.filter()
		.some()
		.every()
	As well as the following:
		Chaining multiple iterator methods to the same array.

	Note: If you’re running into problems with loading image assets where black squares with green borders (like this example) load 
		  instead of the intended images, it may be a browser issue related to CORS. As a work-around, use Firefox as your browser. 
		  Otherwise, double-check your syntax to make sure everything’s in working order.

	*main script: GameScene.js
Codeacademy completed link: -

Instructions:
01) Start by opening the Cube Matcher game in your browser and clicking on the start screen. 
	You should see the game screen with a score displayed and a timer counting down, but with an empty grid with no actual cubes.
	Scroll down the GameScene.js file until you find the method called .makeBoard() below the .update() function. .makeBoard() 
	contains all the code needed to create a 12 by 12 board of colored cubes and display them in the browser – exactly what we need. 
	However, .makeBoard() is missing some code.

	Find the variable called board in .makeBoard(). 
	This is a nested array that represents a grid of cubes, with each inner array representing a column of cubes. 
	For example, a 2 x 2 grid would be:
		[
			['x', 'x'], // column 0
			['x', 'x']  // column 2
		]

	In this step, you’ll fill the empty spaces in the columns of the game with cubes.
	Because board is a nested array, we need to iterate at each level of nesting to replace the empty spaces of the board with cubes: 
		first, over each column, and then over each empty space in that column.

	We’ve already given you code that maps over the columns of the board, board.map((col, i) => {}). 
	However, in order to reach the cubes in each column, we also need to iterate over each cube in the given column, col.

	Inside of the body of the callback function given to you in makeBoard(), use .map(), to iterate over each column, col.
	The callback function in the nested iterator should have 2 parameters: row and j for a cube in the column and j, the index of that cube in the column.

02) Inside the inner .map(), call the helper function this.makeCube() and pass in i and j. Return this value.
	Save your code and restart the game. Make sure you now see a board filled with colored cubes displayed.

03) Take a look at the board of the game in your browser. Find different groups of connected cubes of the same color; are they all the same number and shape?
	In Cube Matcher, groups of cubes will have different numbers of cubes and shapes, generated at random. 
	We’ve provided a function, checkClosest(), that checks the 4 cubes to the left, right, top, and bottom of a selected cube.
	How can we check larger groups of cubes with irregular shapes?

	The code in the getNeighbors() function will do that for us. Scroll down GameScene.js and find getNeighbors() underneath the code for checkClosest(). 
	This function finds all the cubes of the same color that are connected to each other, including the cube the player clicked on.

	Below the conditional in getNeighbors(), create a constant variable, matches, and assign it checkClosest(curr). 
	checkClosest() returns an array of cubes of the same color connected to the cube passed into it.

04) Iterate over each of the matching cubes in the array stored in matches using the .forEach() iterator. 
	The callback passed to the iterator should have a single parameter named match to represent the current matching cube.

05) Finally, add the following code to the callback’s body to complete getNeighbors():
		match.removed = true;
		validNeighborCubes.push(match);
		cubesToCheck.push(match);
	This code marks each matching cube as no longer playable and collects it in an array with any other matching cubes.

06) The game is still not playable since we aren’t actually using getNeighbors() yet. 
	In the next steps, we’ll fix this by adding code to the function that runs when a player clicks on a cube.
	In GameScene.js, scroll up to find the following line inside the .create() method and after the function onTimedEvent():
		this.input.on('gameobjectdown', function(pointer, cube, event))
	This callback function (called an event handler) will be called whenever a cube is clicked.
	
	Inside of the event handler and after the line you located in the previous step, 
	create a constant variable neighborCubes and store the result of calling getNeighbors() with the clicked cube.

07) Remove the matching cubes from the board. Find the conditional that checks neighborCubes.length > 0 below the line where you declared neighborCubes. 
	We’ve given you the code that updates the score, but the code to update the board by removing matching cubes needs to be added. 
	Under the code for the score, use an iterator on neighborCubes to visit each neighboring cube and for each cube run some code. 
	Pass in a callback function to the iterator with neighbor as the only parameter.

	Once you’ve done that, add this code to the callback function’s body:
		// Remove neighboring cube from display
		neighbor.destroy();
	This Phaser code will remove the neighbor cube from the display.

08) The last step of this section is to move the remaining cubes down after their neighbor is removed from the board:
		// Shift remaining cubes down
		renderCubes(neighbor);
	Check your work by restarting the game and clicking on cubes. 
	Any cube that has at least one other matching cube connected to it should now disappear and any cubes above them should move down the board.

09) If you clicked on enough cubes in the previous step, you might have seen that empty columns appeared on our board.
	(If you didn’t already, take a moment to play the game, clear a column, and see the resulting empty column).
	The finished Cube Matcher game should not allow any empty columns to be displayed. 
	Instead, it should shift all remaining columns to the left of each empty column over, until all the remaining columns of cubes are next to each other. 
	The function removeCols() will take care of this. Find the removeCols() towards the bottom of GameScene.js, below getNeighbors().

	On the first line inside removeCols(), declare a constant variable called emptyCols. 
	We’ll store the index of each empty column of the board in this constant. 
	Assign it board.map() for now, and we’ll fill out the callback function in the next step.

10) In Cube Matcher, an empty column is any column in board where every single cube in the column has been removed from play. 
	We’ll add code to visit each column of the board and see if it’s empty or not before we remove it.
	The callback function passed to board.map() should have 2 parameters: col for the current column and i for the column’s index in the board array.
	.map()‘s callback function takes optional parameters besides the current element. 
	The second parameter is the current element’s array index. We’ll need to have this second parameter to remove empty columns in later steps.

11) We’ll now check to see if all cubes have been removed from the board, a great use case for the .every() method. 
	Call .every() on col and store the result in a constant variable called isEmpty. Pass this callback to .every():
		cube => cube.removed 
	to the .every() iterator. This iterator returns true or false that each element in an array meets some condition.
	Here, this line checks that every cube in a column has been removed from the board.
	If it is, we know that this column is empty and the result of .every() will be true.

12) If the column is empty, we want to return the index of that column, and otherwise, we’ll return false.
	Use the value of isEmpty to check these conditions and return the proper value.

13) At the moment, the emptyCols array might be a mix of column indices where the column is empty and false where there are playable moves.
	We need to clean this result up to only contain values for column indices.
	Use chaining to filter the results of our previous code for emptyCols and return only numbers and not false.
	Chain .filter() after the .map() method you added. We’ll complete it in the next step.

	Inside your .filter(), add a callback function and set it up with a single index parameter.
	Inside this callback function, return true if the value is an actual index, and false if it is false.

14) There’s some additional code we’ve given you that removes the empty columns from view in the browser, and also in the board array.
	Restart and play Cube Matcher, and empty columns should now be removed and remaining columns will move to the left.

15) Our game now ends if the clock runs outs, but we also want to end the game if there are no more valid moves to make.
	There are valid moves as long as there’s at least one cube on the board with a matching neighbor.
	Find the helper function remainingMoves() towards the bottom of GameScene.js below getNeighbors(). remainingMoves() 
	should check each column in board, and look for some matching cubes. 
	As long as there is at least one group of matching cubes, then the board is still playable and the game can keep going.

	Since we only need to make sure there is at least one remaining move, we can use .some(). Iterate over board with .some().
	Pass a callback function to some() that has one parameter representing a column. 
	Use the given helper function doesColumnContainValidMoves() which accepts a column array as an argument and returns true 
	if there are any valid moves for any cubes in the column.

	Make sure to return true or false from remainingMoves() based on the result of .some().

16) Play your updated game until there are no more moves you can make. Make sure that the game ends as intended. 
	You can see where remainingMoves() is called inside the game’s update() method. 
	As long as remainingMoves() returns false as intended when there are no remaining moves, your game should now be fully playable!

17) Congrats! You’ve finished Cube Matcher and created a sophisticated browser-based interactive game using several different JavaScript iterators.
	If you want to extend your game and challenge yourself even further, you might want to consider adding additional features.
	For example, you could have a high score feature that keeps track of a player’s score through several games. 
	See if you can alter the existing to code and the score variable to keep track of a player’s high score.