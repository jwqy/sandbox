Project Index: 8a
Project Name : Codey Jump
Project Description:
	

	Note: If you’re running into problems with loading image assets where black squares with green borders (like this example) load 
		  instead of the intended images, it may be a browser issue related to CORS. As a work-around, use Firefox as your browser. 
		  Otherwise, double-check your syntax to make sure everything’s in working order.

Codeacademy completed link: -

Instructions:
01) The first step to giving more life to our jumper game is by animating the main character! 
	Codey’s got nowhere to go but up, so let’s get them there. 
	Inside create() add in the animation called 'jump' that generates frames from the 'codey' spritesheet using frames 2 and 3.

02) Then play your animation in update() by calling .play('jump', true) on your player object!

03) Lastly, we want Codey to look left and right when they’re moving left and right. 
	When the left cursor is pressed, set player.flipX to true. When the right cursor is pressed, set player.flipX to false.

04) The current background looks pretty drab without anything on it. Let’s make it a gradient that shines bright while Codey jumps!
	Start by adding graphics and creating a graphics variable by adding the following code to create():
		const graphics = this.add.graphics();

05) Now we set the fillGradientStyle in order to tell our graphics object what kind of gradient we want.
	.fillGradientStyle() takes five arguments: topLeft, topRight, bottomLeft, bottomRight, and alpha.
	The first four are hexadecimal numbers that correspond to colors, the last is a number between 0 and 1.
	Call graphics.fillGradientStyle() and specify the colors for our background gradient. It won’t appear until we draw it in the next step.

06) The last step is to create a rectangle! Let’s do it using graphics.fillRect(). Make it as big as the game itself!

07) Let’s make the ground shake when we hit the platform, this will give a sense of gravity to the situation and the feeling of weight to Codey. 
	Inside our update() code we check if player.body.touching.down in order to determine whether to bounce Codey back up.
	In that same block add a call to this.cameras.main.shake() with some duration and intensity.

08) When the player has jumped up enough platforms, let’s celebrate their success by giving them speed lines! We’ll use a particle emitter for that.
	The first step is to add in the particles in create(). 
	Assign a particle manager to our particles variable by calling this.add.particles('stripe') and assigning it to particles.

09) We’ve been maintaining a platformCount that counts the number of platforms have wrapped below the bottom of the screen.
	Towards the end of our update() function, check if platformCount has exceeded a certain number (like 10) when we’re going to build in our effect.
	Also check if emitter is defined already! 
	We created the variable at the top of our file but we don’t want to make a new particle emitter every time our update() method ticks.

10) Inside our if-statement, let’s create a new emitter and save it to emitter. Use particles.createEmitter().
	Span the emitter across all the x values in our game, and send them from the bottom of the screen upwards 
	(in order to make it feel like Codey is going really fast)
