class School {
	constructor(name, level, numberOfStudents){
		this._name = name;
		this._level = level;
		this._numberOfStudents = numberOfStudents;
	}

	get name(){ return this._name; }
	get level(){ return this._level; }
	get numberOfStudents(){ return this._numberOfStudents; }
	set numberOfStudents(num){ this._numberOfStudents = num; }

	quickFacts(){
		console.log(`${this._name} educates ${this._numberOfStudents} students at the ${this.level} school level.`);
	}

	static pickSubstituteTeacher(substituteTeachers){
		const rand = Math.floor(Math.random() * substituteTeachers.length);
		return substituteTeachers[rand];
	}
}

class Primary extends School {
	constructor(name, numberOfStudents, pickupPolicy){
		super(name, 'primary', numberOfStudents);
		this._pickupPolicy = pickupPolicy;
	}

	get pickupPolicy(){ return this._pickupPolicy; }
}

class Middle extends School {
	constructor(name, numberOfStudents){
		super(name, 'middle', numberOfStudents);
	}
}

class Highschool extends School {
	constructor(name, numberOfStudents, sportsTeams){
		super(name, 'high', numberOfStudents);
		this._sportsTeams = sportsTeams;
	}

	get sportsTeams(){
		console.log(this._sportsTeams.join(', '));
		return this._sportsTeams; 
	}
}

//testing primary class
console.log('-----Testing on Primary class-----');
const lorraineHansbury = new Primary('Lorraine Hansbury', 514, 'Students must be picked up by a parent, guardian, or a family member over the age of 13.');
lorraineHansbury.quickFacts();
const substitute = School.pickSubstituteTeacher(['Jamal Crawford', 'Lou Williams', 'J. R. Smith', 'James Harden', 'Jason Terry', 'Manu Ginobli']);
console.log(`substitute teacher: ${substitute}`);

//testing highschool class
console.log('\n-----Testing on Highschool class-----');
const alSmith = new Highschool('Al E. Smith', 415, ['Baseball', 'Basketball', 'Volleyball', 'Track and Field']);
const teams = alSmith.sportsTeams;