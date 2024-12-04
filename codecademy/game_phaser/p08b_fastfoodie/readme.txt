Project Index: 8b
Project Name : Fast Foodie
Project Description:
	Let’s make a polished video game! Your main character is a cafeteria server, and their goal is to satisfy as many customers as possible.
	You should feed as many customers—and exactly meet their hunger levels—while keeping your fast food restaurant’s rating above 1 star.
	You’ll build the line of customers and introduce three progressively harder waves.
	Additionally, you’ll create functionality to assess their hunger levels and build the ability to serve customers three different food items.
	To add flair, you’ll add movement tweens, color effects, and sound.

	Note: If you’re running into problems with loading image assets where black squares with green borders (like this example) load 
		  instead of the intended images, it may be a browser issue related to CORS.
		  As a work-around, use Firefox as your browser.

		  Otherwise, double-check your syntax to make sure everything’s in working order.

Codeacademy completed link: https://content.codecademy.com/courses/learn-phaser/fastfoodie/sample/index.html?_gl=1*ntt5pp*_gcl_au*MjAxNzMxMTAwOC4xNzE0Mzg0NzYz*_ga*Njc1OTE4OTYyLjE3MTQ5ODY2NzA.*_ga_3LRZM6TM9L*MTcxODY5NTA5NC41LjEuMTcxODY5NTIzMC41MS4wLjA.

Instructions:
01) Inside generateWave(), we’ll need to randomly generate the number of customers who appear on the line.
	Inside gameState, we’ve already included a property called currentWaveCount.
	Before the for loop, create a new gameState property called totalCustomerCount that will contain the total number of customers for a given wave
	Make sure totalCustomerCount will always be a number from 1–10.
	Round the value to the nearest whole number using Math.ceil().
	Multiply the random integer by gameState.currentWaveCount to increase the number of customers as the waves increase.

02) For each member of gameState.totalCustomerCount, we will make a container.
	Containers are game objects that store other game objects - we can use them to move many objects at once.
	In this case, we’ll create a container including the customer sprite, a hunger gauge, and a timer bar.
	Inside the provided for loop define a variable called customerContainer as:
		this.add.container(gameState.cam.worldView.right + (200 * i), gameState.cam.worldView.bottom - 140)
	This places the container to the right and 140px from the bottom of the camera, which represents the visible screen area.
	By multiplying 200 by the x location of each container, the customers will appear in a line to the right as the count increases.

03) Add customerContainer to the gameState.customers group by calling .add() on gameState.customers and passing in customerContainer.
	This will make managing customers and their associated sprites much easier.

04) You’ll notice that we don’t have any visible customers yet.
	That’s because we’ve created their containers but haven’t drawn any images! 
	To draw a random customer sprite on the screen, define a variable called customer as:
		this.add.sprite(0, 0, `Customer-${customerImageKey}`).setScale(0.5)

05) Add customer to customerContainer using customerContainer.add(customer).
	This will make the customers appear.
	If everything worked correctly, after you save your code, you’ll see the first customer lining up to be served.

06) The game will need a way to know when the chef is ready to serve the next customer.
	Make this happen by creating a boolean property in gameState (at the very top of GameScene.js) called readyForNextOrder.
	Define it as true.

07) In order to move the first customer up, you’ll also need to identify the next available customer.
	You can do this by tracking the number of customers that have been served.
	In the original definition of gameState, create a property called customersServedCount and assign it a value of 0.

08) In the update() method, check for gameState.readyForNextOrder.
	If it’s true, set it to false again.
	This will be important when players interact with the game and the chef finishes an order.

09) You’ll need to know when the customer is in the correct position to be served, i.e. the customer is right in front of the server.
	There is already a customerIsReady property in gameState that you will use to track the customer’s position.
	Still within the conditional, assign gameState.customerIsReady a value of false.

10) You’re now ready to set the current customer.
	After setting gameState.customerIsReady to false, derive a new property called gameState.currentCustomer from the array gameState.customers.children.entries.
	The correct element will be at the index of gameState.customersServedCount.

11) Now that all the building blocks are complete, you can make the next customer move to the front of the line! 
	Do so by creating a tween and making gameState.currentCustomer the target.
	The tween should have a 1-second duration.
	There should be a delay of 100 milliseconds.
	The customer should face the chef at an angle of 90 (degrees).
	The customer should tween horizontally to gameState.player.x (they’ll face each other).
	Set the ease style to 'Power2'.
	You should now see your first customer move down the line and turn to the server.

12) When the tween is complete, set gameState.customerIsReady to true.
	This will tell the game that the current customer can be served.

13) Players want to have an idea of how many customers they will be serving.
	In GameScene, create a method called updateCustomerCountText().

14)	Inside updateCustomerCountText(), create a property of gameState called customersLeftCount 
	and define it as the number of customers left after those who have been served.

15) Once you have gameState.customersLeftCount, you can dynamically update the number of customers left.
	Set the text of gameState.customerCountText, which was included in the create() function, to gameState.customersLeftCount.
	Make sure to prepend 'Customers left: ' so players have context behind the number.
	To update the text, call this.updateCustomerCountText() before the first for loop in generateWave().

16) We need gameState to also keep track of the meals we feed to customers.
	At the very bottom of the create() method, and add a currentMeal property to gameState and make it a Phaser group.

17) Next, we’ll want to identify how well the meal served satisfies the current customer’s hunger.
	Give gameState.currentMeal another property of fullnessValue and set it to 0.

18) With the meal functionality set up, we now need to display the varied hunger levels of customers.
	We’ve already included most of the code to display a fullness meter for each customer, but a few parts are missing!
	In generateWave()‘s provided for loop, change meterWidth to the current customer container’s fullnessCapacity and multiply it by 10.
	This will make the meter’s container vary in width based on how hungry the current customer is.

19)	Add the meterContainer to customerContainer so it can be positioned above the customer’s head.

20) In the for loop that creates the fullness meter blocks, replace the conditional (j < 1) with a conditional that checks
	if j is less than the current customer’s fullnessCapacity.
	You’ll now be able to adjust the color of the fullness meter based on how well the chef serves customers.

21)	Finally, on completion of the tween you made earlier in update(), set the visibility of the current customer’s meterContainer to true.
	This will display the meter when the customer has moved in front of the chef.
	Great job-they’re ready to be served! Save your code and see the bars appear above the customer.

22) Now that our customers are hungry, you need a way to feed them.
	Let’s use keyboard keys! We’ll use gameState to keep track of them.
	There is already a gameState.keys property.
	In create(), add a gameState.keys.Enter property and assign it a value of the Phaser key Enter.

23) Create additional gameState.keys properties for the keys A, S, and D.

24) Make a method called placeFood() and give it two parameters: food (string) and fullnessValue (integer).
	You’ll use this method to feed customers when players press A, S, and D.

25) You only want to add to the tray when gameState.currentMeal.children.entries.length is less than 3 and the customer is ready.
	If conditions are met, create a new sprite in gameState.currentMeal.
	Make it so the X position can vary based on the number of entries in gameState.currentMeal.

26) Add fullnessValue to gameState.currentMeal.fullnessValue.
	This will tell the game how much the customer has been served.

27) Players will want visual feedback to know if they’ve served enough food.
	We can color the customer’s fullness capacity bars in different colors based on how filling the meal is.
	Set the scaffolding for this by iterating through each of gameState.currentMeal.fullnessValue.
	Inside the loop add a check to see if the counter used in the iteration is less than gameState.currentCustomer.fullnessCapacity.

28) Inside the conditional, you can add more checks to see how full the customer is and assign the color of their fullness meter to match accordingly.
	One scenario you have to check is if the customer is exactly full.
	If so, set the fill of the fullness blocks to green (0x3ADB40) and set their stroke style to 2, 0x2EB94E.

29) Another check is if the customer is too full.
	In this case, turn the blocks red (0xDB533A) and change the stroke style to 2, 0xB92E2E.

30) The last case is if the customer isn’t full at all.
	Then, turn the relevant blocks yellow-green (0xFFFA81).
	This is a slight color change, so we won’t change the stroke style.

31) We also want the player to have some audible feedback.
	Play gameState.sfx.placeFood when food is placed in the tray.

32) Time to feed your customers! Check to see when the A, S, or D key has been pressed and call the placeFood() method with the correct arguments.
	Try it out in your game, you should see the bars change color when you press the A, S, or D key.
		When a player presses A, serve a 'Burger' worth 5 fullness points.
		When a player presses S, serve 'Fries' worth 3 fullness points.
		When a player presses D, serve 'Shake' worth 1 fullness points.

33) Make a new method called moveCustomerLine().
	This method will house the logic needed to move the entire line of customers.
	You’ll need to:
		Use gameState.currentMeal.clear(true) to reset the current meal.
		Reset gameState.currentMeal.fullnessValue to 0.
		Increase gameState.customersServedCount.
		Set gameState.readyForNextOrder to true (for now).

34) Now add a check for when the Enter is pressed.
	If gameState.readyForNextOrder is false and gameState.customerisReady is true, you need to:
		move the customer line.
		update the text display for remaining customers.

35) Inside the check for previous customers, add a loop to create a tween for each previous customer to have:
		Over a duration of 750 ms,
		their x coordinate shift to the left 300px,
		their angle set to 0.

36) Use a tween to move customers down the line after they are fed.
	Therefore, if you’ve served at least one customer, create a tween for each previous customer to have:
		Over a duration of 750 ms,
		their x coordinate shift to the left 300px,
		their angle set to 0.
	These tweens should be added in the conditional that you added your previous tween.

37) The served customers have moved and the customers still in line should move too.
	Below the code for the current customer’s tween, create a loop that will give all the remaining customers a tween that:
		has a delay of 200 ms
		moves the customer to the left by 200 px.
		happens over 1500 ms.
	Save your code to see the line move.

38) The restaurant thrives as long as we maintain our star ratings.
	So we need to keep track of what ratings our restaurant gets.
	Make a group called gameState.starGroup in the create() function.
	Create a method called drawStars() that adds stars to gameState.starGroup.
	Use the key 'Star-full' to create complete stars.
	Clear out any existing stars, you’ll be making new stars each time a customer gives a rating.
	Draw the number of stars equal to the rating.
	Offset the stars 20px from the top and left of the screen.
	Add 50px of space between each star.
	Call the method to draw the stars in create().

39) As the game progresses, we need to update the star rating.
	Do this by making a new method called updateStars() that should accept information about the customer’s fullnessValue and fullnessCapacity.
	When fullnessValue and fullnessCapacity are equal:
		The customer should turn a tint of green (0x3ADB40).
		'servingCorrect' sound effect should play.
		gameState.score should increase by 100.
		The score text should be updated.
		If the current starRating is less than 5, then increase it by 1.
		If gameState.starRating reaches 5, then play the 'fiveStar' sound.

40) We also need to account for less-than-ideal situations such as customers leaving hungry.
	When fullnessValue is less than fullnessCapacity:
		The customer should turn a tint of red (0xDB533A).
		servingIncorrect sound effect should play.
		Remove two stars from the current starRating.

41) Customers also might be too full, leaving them unhappy that they had to waste food.
	When fullnessValue is more than fullnessCapacity:
		The customer should turn a tint of orange (0xDB9B3A).
		servingEmpty sound effect should play.
		Remove one star from the current starRating.

42) Clear the old star sprites and redraw new ones to reflect the new star rating.
	In order to see the stars updated, call this.updateStars() with the correct arguments when moving the line.

43) Customers won’t wait forever to be served.
	Express the concept of customers’ patience in your game using a timed meter that goes down to zero.
	Draw a background for each customer’s timer meter under the fullness meter
	Draw a bar to represent the timer
	Create a timer once the customer has moved up to the chef.
	Shrink the timer bar as the customer loses patience
	Change the color of the timer as the customer is closer to leaving:
		green (0x3ADB40) when there’s lots of time, orange (0xFF9D00) at the 25% mark, and red (0xDB533A) if the timer is 75% complete.
	Automatically run moveCustomerLine() when the timer reaches zero.
	Remove the timer if the customer has been manually served before time runs out.
	Add multiple waves of customers

44) Make the game longer by increasing the number of rounds!
	Create a wave count.
	When all the customers in a wave are served, increase the wave count and decrease gameState.gameSpeed in moveCustomerLine().
	The line gameState.readyForNextOrder = true should be built into the logic that accounts for the length of the wave and the current wave.

45) Clear out old customers after each round.
	Create a new method called destroyWave() to remove the previous customers.
	'nextWaveSFX' sound effect should play.
	In this method, tween all the wave members so they move left one last time.
	Be sure to reset their angles, as the last person who was served will still be facing the chef.
	On completion of the previous tween, tween all the wave members so they move off the left side of the screen.
	On completion of the next tween, destroy the old wave and generate a new wave.
	Then set gameState.readyForNextOrder to true.
	Create a text object to display the wave count and update it as needed.
	You can add some flair by changing the scale and location of the wave count text between waves.

46) Now that everything is in place, players need a way to stop playing the game.
	If the star rating hits 0 stars, change the scene to LoseState.
	If the player gets to 3 waves, change the scene to WinState.
	Add the score to the lose and win scenes.
	Reset the game values when a new game starts.

47) You’re done! If you want to make the game even more complex, here are some potential next steps:
		Add more waves.
		Add half-star ratings — you have access to half and empty star images!
		Add empty stars on screen so players know 5 stars are the maximum.
		Add more stats to the lose and win scenes (number of burgers served, for example)
		Create a combo that multiplies the score when players get multiple orders correct.