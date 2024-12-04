Project Index: 7a
Project Name : Build a library
Project Description:
	Congratulations, you’ve become head librarian at your local Books-‘N-Stuff, which is in dire need of your help. 
	They’re still using index cards to organize their content! Yikes.
	But no matter, you know some JavaScript, so let’s get to work modernizing your new digs.
	Books-‘N-Stuff carries three different types of media: books, CDs, and movies. 
	In this project you will create a parent class named Media with three subclasses: Book, Movie, and CD. 
	These three subclasses have the following properties and methods:

	Book
		Properties: author (string), title (string), pages (number), isCheckedOut (boolean, initially false), and ratings (array, initially empty).
		Getters: all properties have a getter
		Methods: .getAverageRating(), .toggleCheckOutStatus(), and .addRating()

	Movie
		Properties: director (string), title (string), runTime (number), isCheckedOut (boolean, initially false), and ratings (array, initially empty)
		Getters: all properties have a getter
		Methods: .getAverageRating(), .toggleCheckOutStatus(), and .addRating()
	
	CD
		Properties: artist (string), title (string), isCheckedOut (boolean, initially false), and ratings (array, initially empty), songs (array of strings)
		Getters: all properties have a getter
		Methods: .getAverageRating(), .toggleCheckOutStatus(), and .addRating()

	Note: If you’re running into problems with loading image assets where black squares with green borders (like this example) load 
		  instead of the intended images, it may be a browser issue related to CORS. As a work-around, use Firefox as your browser. 
		  Otherwise, double-check your syntax to make sure everything’s in working order.

Codeacademy completed link: -

Instructions:
Challenge to create the classes without any hints.

Additional Info:
01) Parent class shall be named as Media.

02) To test Book class:
	a)	Create a Book instance with the following properties:
			Author: 'Bill Bryson'
			Title: 'A Short History of Nearly Everything'
			pages: 544
		Save the instance to a constant variable named historyOfEverything.

	b) Call .toggleCheckOutStatus() on the historyOfEverything instance.
	c) Log the value saved to the isCheckedOut property in the historyOfEverything instance.
	d) Call .addRating() three times on historyOfEverything with inputs of 4, 5, and 5.
	e) Call .getAverageRating() on historyOfEverything. Log the result to the console.

03) To test Movie class:
	a)	Create a Movie instance with the following properties:
			Director: 'Jan de Bont'
			Title: 'Speed'
			Runtime: 116
		Save the instance to a constant variable named speed.

	b) Call .toggleCheckOutStatus() on the speed instance.
	c) Log the value saved to the isCheckedOut property in the speed instance.
	d) Call .addRating() three times on speed with inputs of 1, 1, and 5.
	e) Call .getAverageRating() on speed. Log the result to the console.

04) Additional challenge:
	a) Create a CD class that extends Media.
	b) In .addRating(), make sure input is between 1 and 5.
	c) Create a method called shuffle for the CD class. The method returns a randomly sorted array of all the songs in the songs property.
	d) Create class called Catalog that holds all of the Media items in our library.
