Project Index: 3
Project Name : Treasure Hunter
Project Description:
	Let’s combine our knowledge of loops and arrays to finish building a game 
	that pits two treasure hunters against each otherin a race to find the most golden coins!

	The premise of the game is that there is a grid outlined on the screen. 
	Within that grid, there are plots that have the possibility of containing a golden coin. 
	The player and computer take turns clicking on plots to reveal what is there and the first treasure hunter to get to 3 coins wins the game!

	You will be using your knowledge of loops to create an array that will contain the grid of plots. 
	You will use this array to determine which of those plots will contain hidden coins. 
	That will be followed by completing a function that determines if the player’s selection has a hidden coin.

	*main script: GameScene.js
Codeacademy completed link: -

Instructions:
01) Let’s create our variables at the very top of GameScene.js (before we declare the class GameScene).
	Our first variable will be a plot on the grid outline. Name this variable plot but do not assign it a value.
	The second variable is grid, assign it a value of an empty array. grid will store our collection of plots in its array.

02) In Treasure Hunter, we will later build a function that will choose 5 random plots to hide the golden coins. 
	This means we’ll also need to create another array, coinCollection to stores these coins.

03) We need 2 more variables that will keep track of the player score and the computer score. 
	Call these variables playerCoins & compCoins and set them both to 0.

04) In Treasure Hunter, there are 6 rows by 6 columns of plots (36 total plots). Let’s make the first row of plots and go from there.
	We can use a for loop to create multiple plots for our row.
	Create a for loop that defines a variable called x which has a value of 46. 
	We want our loop to continue if x is less than 437. Each time we iterate, increase x by 78.
	We increase by 78 to ensure our plots fit correctly in the background image and do not touch each other.
	Inside of this for loop add this sprite to see what the for loop does.
		this.add.sprite(x, 46, 'gold');
	Once you have finished with this for loop make sure to delete the line that is creating the coin sprites.

05) Remember, we need to create 5 more rows to fill out our grid so we now need 5 more images for each row. 
	We can do this by nesting a for loop inside the for loop we just created!
	Inside the previous for loop, create another for loop that has a y variable which also has a value of 46.
	We want our for loop to continue if y is less than 437. Each time we iterate, increase y by 78.
	We’ll use this nested for loop to create our sprites in the next step!

06)	We have our for loops created so now let’s create our sprites. 
	We need both the x and y coordinates to create an image, here is the Phaser 3 syntax for adding an image:
		plot = this.add.sprite(x, y, 'gold');
	We are making that sprite be equal to a plot so that in the next step we can add the plot to fill out our grid.
	Insert that code into your nested for loop, save and you should see the grid fill out with gold coins.

07) We need to track the plots we created inside our global grid array. 
	Still inside the inner for loop and after creating our sprite, use .push() to add the plot element into the grid.

08) Our grid is filled with images, awesome. We do not want the gold coins to appear just yet though, 
	they should only appear when the player or computer chooses a plot that has a hidden coin. 
	So in the this.add.sprite() method, replace the third argument 'gold' with 'blank'.
	Once you save your code, the board should look empty! Our blank sprite is shown below:

09) With our grid created we now need to choose 5 random plots to set our future coins. 
	We do not want the coins to appear as images just yet, instead, 
	we need to save 5 random numbers in our coinCollection where each random number corresponds to an index of grid.
	To begin, create a function called decideCoinLocations() after the nested for loops.

10) We need 5 random indices, so create a while loop that that runs while our coinCollection has less than 5 elements.

11) Within the while loop create a random number variable called randIdx which will range between 0 and 35 (to account for all of our plots). 
	In that variable, we will use the Math methods to create the logic for these random numbers.
	• We can get a random number with the Math.random() method.
	• We need to ensure that our random number can only be as big or as small as the length of the grid array. 
	  We can do this by multiplying the random value by the length of the grid array.
		Math.random() * grid.length
	• Lastly, we need to use the Math.floor() to round the random value of Math.random() multiplied by the length of the grid.
		Math.floor(Math.random() * grid.length)

12) Now that we have our random index number we will use it to access an element from the grid (i.e grab a random plot). 
	Still, inside the while loop, create a new variable called selectedPlot that is equal to the element in grid with the index of randIdx.

13) We need to terminate our while loop by adding 5 elements into coinCollection. 
	Use .push() to add selectedPlot into coinCollection.

14) Currently, there is a chance that coinCollection could have duplicate indices so we need to exclude a value after 
	it has been picked since we don’t want multiple coins in a single plot. In this case, we will use .indexOf() to exclude a value.
	Create an if statement which checks to see if calling .indexOf() on coinCollection with the argument of selectedPlot is equal to -1.
	Wrap this if statement around the previous step’s line of code: coinCollection.push(selectedPlot).

15) Our decideCoinLocations() function is now complete. Outside the completed function call the function you just created.

16) If you take a closer look at update() you will see a lot of code that is commented out. 
	Most of this is Phaser syntax for determining the mouse location, highlighting that location and determining what plot is clicked. 
	Locate and delete the start and end of the multiline comment.
	After you’ve removed the comment and saved, you will be able to highlight your specific plot location, however, clicking will not do anything.

17) Create a for loop inside our playerCheck() function to iterate through all the coins we have saved. 
	Use i assigned 0 as the first statement. Add the remaining 2 expressions so that this for loop allows us to iterate through each element in coinCollection.

18) Inside the for loop, create an if statement to compare the clicked image (the clickedPlot) to the current element in the iteration, i, of coinCollection.

19) If our condition was truthy, then the player selected a plot with a gold coin! Inside the if statement:
		Give the player some points by incrementing playerCoins
		Change the clicked plot’s sprite to use the 'playerGold' image with the following Phaser syntax:
		clickedPlot.setTexture('playerGold')
	And finally, add a break statement to end the loop.

20) If our condition was false then the player selected a plot that does not have a gold coin.
	Create an else statement which changes the image to a dig sprite with the Phaser syntax below:
		clickedPlot.setTexture('dig')

21) Our playerCheck() function is now complete. Great job, you have finished this project! Save your code and try playing the game.
	If you click on a plot you should now see the image change to either a gold coin or dig image. 
	The computer will also go right after. Try winning a game against the computer!

	For an extra challenge try:
		Changing the win condition to 4 instead of 3
		A random amount of coins but ensure it is an odd number
		A special coin or coins that add more than 1 point that is included alongside the +1 gold coin.