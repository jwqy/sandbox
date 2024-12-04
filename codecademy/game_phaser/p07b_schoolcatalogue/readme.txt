Project Index: 7b
Project Name : School catalogue
Project Description:
	Let’s put your knowledge of classes to the test by creating a digital school catalog for the New York City Department of Education. 
	The Department of Education wants the catalog to hold quick reference material for each school in the city.
	We need to create classes for primary and high schools. 
	Because these classes share properties and methods, each will inherit from a parent School class.
	Our parent and three child classes have the following properties, getters, setters, and methods:

	School
		Properties: name (string), level (one of three strings: 'primary', 'middle', or 'high'), and numberOfStudents (number)
		Getters: all properties have getters
		Setters: the numberOfStudents property has a setter
		Methods: .quickFacts() and .pickSubstituteTeacher() (this is a static method)

	Primary
		Includes everything in the School class, plus one additional property
		Properties: pickupPolicy (string)

	Middle
		Does not include any additional properties or methods
	
	High
		Includes everything in the School class, plus one additional property
		Properties: sportsTeams (array of strings)

	Note: If you’re running into problems with loading image assets where black squares with green borders (like this example) load 
		  instead of the intended images, it may be a browser issue related to CORS. As a work-around, use Firefox as your browser. 
		  Otherwise, double-check your syntax to make sure everything’s in working order.

Codeacademy completed link: -

Instructions:
Challenge to create the classes without any hints.

Additional Info:
01) quickFacts method prints the following to console
		SCHOOL NAME educates NUMBER OF STUDENTS students at the LEVEL school level.

02) pickSubstituteTeacher method will receive one parameter, named substituteTeachers. 
	The substituteTeachers parameter will take an array of strings.
	Inside the method, randomly generate a whole number between 0 and one less than the length of the substituteTeachers array.
	Use this number to access and return the substitute teacher at that randomly generated index.

03) The sportsTeams getter should log all of the sports to the console

04) To test Primary class:
	a)	Create a PrimarySchool instance with the following properties:
			Name: 'Lorraine Hansbury'
			Number of Students: 514
			Pickup Policy: 'Students must be picked up by a parent, guardian, or a family member over the age of 13.'
		Save the instance to a constant variable named lorraineHansbury.

	b)	Call .quickFacts() on the lorraineHansbury instance.
	c)	The principal of Lorraine Hansbury needs a substitute teacher for the day.
		Call .pickSubstituteTeacher() on School, and pass the following array as an argument:
			['Jamal Crawford', 'Lou Williams', 'J. R. Smith', 'James Harden', 'Jason Terry', 'Manu Ginobli'];

05) To test Highschool class:
	a)	Create a HighSchool instance with the following properties:
			Name: 'Al E. Smith'
			Number of Students: 415
			Sports Teams: ['Baseball', 'Basketball', 'Volleyball', 'Track and Field']
		Save the instance to a constant variable named alSmith.

	b)	Get the value saved to the sportsTeams property in alSmith.

06) additional challenge:
	a)	Create a middle school class
	b)	Add more properties to each class (averageTestScores, schoolOverview, etc.)
	c)	Create a class called SchoolCatalog that holds a collection of schools. 
		Create an instance of SchoolCatalog for primary, middle, and high schools.
