Project Index: 6a
Project Name : Fantasy Adventure Game
Project Description:
	Create an action-adventure style fantasy story in Phaser using click events!

	Note: If you’re running into problems with loading image assets where black squares with green borders (like this example) load 
		  instead of the intended images, it may be a browser issue related to CORS. As a work-around, use Firefox as your browser. 
		  Otherwise, double-check your syntax to make sure everything’s in working order.

Codeacademy completed link: -

Instructions:
01) We’re going to be developing an interactive storytelling game with orcs, knights and wizards! 
	Our first step is going to be adding in a create() function to our Phaser project.

02) In create() let’s start by adding in the background!
	Create a background by adding the image with the key 'bg' using this.add.image(). 
	We want to display it from our top-left corner so pass in 0 as both the x and the y values.
	Save the result as gameState.background, we’ll need it!

03) This creates a background image centered at (0, 0), but we want (0, 0) to be the top-left corner. 
	We can use .setOrigin() to indicate we want to change the behavior of how our image is centered.
	If we call .setOrigin(0, 0) on gameState.background, it will tell Phaser that we want our x and y values to 
	represent the leftmost and topmost of our image. Exactly what we want!

04) Let’s create a new function for rendering a character, called renderCharacter(). 
	This will update the image inside our background with the image of the relevant character who is speaking.

	Outside of create(), create a renderCharacter() function that takes two arguments: 
		scene, the scene itself so we can use scene plugins to create the image, 
		key, the key to the image to display.

05) Inside renderCharacter() our first step is to remove whatever image might already be there. 
	Check if there is such a thing as gameState.character and, if so, call gameState.character.destroy() to get rid of the image that’s there already.

06) Now that it’s freed up, let’s assign a new gameState.character.
	Use scene.add.image() to add the image corresponding to key at the coordinates (270, 340).

07) Let’s try to render the character in create() now. Call renderCharacter(this, 'knight') within create() to see if we’re rendering the character correctly.

08) Woah! Well it really jumps out, but it’s not exactly where we want it to be. Let’s update it’s positioning inside renderCharacter().
	After creating gameState.character, call .setOrigin(.5, 1) on it. 
	This centers the x value on our 270 value but uses the y value as the bottom of where the image should display.

09) Still a little big! Call .setScale() on gameState.character to make it a little smaller. An argument of .7 should do to make it about the right size.

10) Now that we’re displaying our characters correctly, let’s focus on adding playability to our game. 
	We’re going to use and update four provided functions, initializePage(), displayPage(), destroyPage(), and fetchPage().
	Start by reading over the given code:
		initializePage() adds some basic objects to our gameState.
		destroyPage() removes all previous information being displayed.
		displayPage() will draw the character, text, and options for each page.
		fetchPage() will provide us with each page to display. Inside fetchPage() we’ve written our first story.
	
	Start off by calling initializePage() with this as an argument at the end of create().

11) Next, let’s get our first page by calling fetchPage(1). Save the results in a variable called firstPage.

12) Now let’s use that firstPage and display it by calling displayPage().
	The first argument to pass displayPage() is this (which points to the current scene).
	The second argument is our page, so, firstPage.

13) Now let’s actually render our page information inside displayPage().
	Inside displayPage() the first thing we want to do is render our character! 
	Call renderCharacter() with scene as the first argument and page.character as the second argument.

14) Notice in displayPage() a for loop that creates each of the options as optionBox and optionText. 
	At the end of that for loop we’re going to change it so that clicking on optionBox will turn to the appropriate page in the story.
	Start by setting the optionBox as interactive.

15) Next let’s add in a 'pointerup' event to optionBox. We want to provide this event handler with our option variable as a context.

16) Inside our 'pointerup' event, let’s start by getting the next page. Since we passed option in our context, we can refer to this.option.
	Create a variable called newPage and set it equal to this.option.nextPage.

17) Check if newPage is undefined. If not, we want to do two things:
		Call destroyPage() to get rid of the current page.
		Call displayPage() with scene and the results from fetchPage(newPage).

18) Now that our event handler is created, we need to add our options to gameState.options.
	Call gameState.options.push() and give it an object with optionBox and optionText.

19) We can finally play our game! Fantastic! Unfortunately, it’s hard to tell exactly that it’s intentional for us to click on the different choices provided.
	We want to add two more events for optionBox before calling gameState.options.push(). 
	One for when we hover over an option to highlight the choice, the other for when we stop hovering over an option to stop highlighting it.
	Let’s start by highlighting our choices.

	Give optionBox a 'pointerover' event handler. Pass our handler a context with optionBox and optionText.

20) Let’s highight our choice by updating the optionBox‘s stroke style. We can do that by calling
		this.optionBox.setStrokeStyle(2, 0xffe014, 1);
	This makes the rectangle’s outline thicker and changes the yellow color to a brighter gold.

21) Let’s also make the text a bit brighter by updating it’s color:
	Set the text color with the following:
		this.optionText.setColor('#ffe014');
	This sets the text color to the same gold we used for the box. 
	Text requires its color as a string, like '#ffe014' whereas the rectangle requires the color as a number, like 0xffe014.
	It’s possible to write some code to make them both use the same format, but depending on the game it might not be worth it!

22) Now that we have a 'pointerover' event, we’ll need a 'pointerout' event for when the mouse cursor leaves the option (so it no longer looks “selected”).
	Create a 'pointerout' event for optionBox and pass it the same context of { optionBox, optionText }.

23) Update the optionBox and optionText by calling the following methods to revert them back to normal:
		this.optionBox.setStrokeStyle(1, 0xb38c03, 1);
		this.optionText.setColor('#b39c0e');

24) Now scroll down to the fetchPage() implementation. 
	Try looking at the pages variable declared there. 
	It’s a series of objects that represent the flow of our game.

	Try updating the character key to a different value, like 'knight' or 'wizard'.

25) Now update the dialogue, and the option text too! When you reload the game, do you see what you expected! 
	Try writing your own script and make a game for your friends to play!