Project Index: 1
Project Name : Healthy Recipes
Project Description: 
	Using CSS selectors, you’ll give a recipe website some new style!
	
Codeacademy completed link: -
	
Instructions:
01) Start by making the image at the top of the page a little smaller. 
	Navigate to style.css and write a CSS selector for the img tag.
	Within its curly braces, write:
		height: 150px;


02) The font size of the recipe description should be larger. 
	In style.css, write a CSS selector for the .description class.
	Within its curly braces, add the following CSS:
		font-size: 20px;

03) Next, let’s style the cooking time. The element on line 15 of index.html has an id attribute of cook-time.
	Navigate to style.css and add a cook-time ID selector.
	Inside of its curly braces, write:
		font-weight: bold;

04) Now, let’s change the bullet points of the ingredient list to squares instead of circles.
	Start by writing a selector for the li elements inside of the .ingredients element.
	Then, write this inside of its curly braces:
		list-style: square;

05) Next let’s make the time for each preparation step appear gray. 
	In style.css, write a selector for p elements that also have a class of .time.
	Then, inside of this selector’s curly braces, write:
		color: gray;

06) At the bottom of the page, there’s a link to the full recipe. Let’s make the link a different color.
	Notice that in index.html, on line 42, there is a p element with a class of citation,
		then an a element inside of it with a class of external-link. 
	Navigate to style.css and write a selector using external-link class.
	Then, add this code inside of the selector’s curly braces:

		color: SeaGreen;

07) Finally, let’s make the font Helvetica instead of the default Times New Roman.
	Instead of writing multiple selectors to apply the font-family property,
		write a selector that applies a font-family attribute to all text at once.
	The selector should target the h1, h2, p, and li elements.
	To change their font, include this line of code inside the curly braces:
		font-family: Helvetica;
