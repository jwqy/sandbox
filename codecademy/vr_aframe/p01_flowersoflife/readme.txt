Project Index: 1
Project Name : Flower of Life
Project Description:
	The Flower of Life is a geometrical figure composed of multiple evenly-spaced, overlapping circles, 
	that are arranged so that they form a flower-like pattern with a sixfold symmetry, kind of like a hexagon. 
	The center of each circle is on the circumference of six surrounding circles of the same diameter.

	It is considered by some to be a symbol of sacred geometry, said to contain ancient, religious value depicting the fundamental forms of space and time. 
	In this sense, it is a visual expression of the connections life weaves through all sentient beings.
	In this project, we are going to build a Flower of Life (VR) in index.html using A-Frame. 
	We will put our knowledge of the <a-circle> primitive and positioning to use.

Codeacademy completed link: https://github.com/Codecademy/learn-a-frame/blob/master/1-introduction/flower-of-life/flower.html 

Instructions:
01) Watch this video to learn how the figure is drawn https://youtu.be/0AktguOn6QI

02) In the <head> element, add a <script> element with a src source attribute that points to the URL of the external A-Frame file:
	https://aframe.io/releases/1.0.4/aframe.min.js

03) In the <body> element, add the <a-scene> element with a color like so:
		<a-scene background="color: #FF5733">
			<!-- Write code here later: -->
		</a-scene>
	If the browser becomes orange and “VR” button appears on the bottom-right, then we are ready to go!

04) There are a few ways to implement circles in A-Frame, including using the <a-circle> or <a-cylinder> primitive. 
	For the following steps, we are going to use <a-circle>.
	First things first, create an <a-circle> with the following components:
		color="#F5C85D"
		position="0 2 -10"
		radius="1"
		opacity="0.5"
	This will be our starting point circle. Feel free to change the color to your liking.

05) Now we have the first circle, we can use it as a starting point.
	Create two more <a-circle>s:
		One that’s 1 meter above.
		One that’s 1 meter below.

06) Now let’s create another circle sitting to the right of the first and second circles. 
	The center of that circle should be the right intersection of those two circles:
		https://content.codecademy.com/courses/learn-a-frame/introduction/flower-of-life-circles.svg

	Let’s find out the position coordinates of the center. We can use a right triangle to do so. 
	For the y coordinate, we know the center will be halfway between the top circle’s y and bottom circle’s y. 
	So that is a 0.5 difference. We also know the center is a distance of 1 from the middle circle’s center.
	
	We now have a right triangle that can help us get the x coordinate:
		https://content.codecademy.com/courses/learn-a-frame/introduction/flower-of-life-triangle.svg

	With the help of the Pythagorean Theorem, we can approximate to three decimal places:
		𝑥 = sqrt(1^2 − 0.5^2) ≈ 0.866

	Create two more <a-circle>s with the following positions:
		"0.866 2.5 -10"
		"0.866 1.5 -10"

07) Almost there! The last thing we need to do is add two more circles to the left of the middle circle.
	Try using the mathematical formula we used above, or use your intuition to try and figure out what the positions of these last two circles should be.