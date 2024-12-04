class Media {
	constructor(title){
		this._title = title;
		this._isCheckedOut = false;
		this._ratings = [];
	}

	get title(){ return this._title; }
	get isCheckedOut(){ return this._isCheckedOut; }
	get ratings(){ return this._ratings; }

	getAverageRating(){
		let sum = this._ratings.reduce((currSum, rating) => currSum + rating, 0);
		return this._ratings.length === 0 ? 0 : sum / this._ratings.length;
	}

	toggleCheckOutStatus(){
		this._isCheckedOut = !this.isCheckedOut;
	}

	addRating(rating){
		this._ratings.push(Math.max(1, Math.min(rating, 5)));
	}
}

class Book extends Media {
	constructor(author, title, pages){
		super(title);
		this._author = author;
		this._pages = pages;
	}

	get author(){ return this._author; }
	get pages(){ return this._pages; }
}

class Movie extends Media {
	constructor(director, title, runTime){
		super(title);
		this._director = director;
		this._runTime = runTime;
	}

	get director(){ return this._director; }
	get runTime(){ return this._runTime; }
}

class CD extends Media {
	constructor(artist, title, songs){
		super(title);
		this._artist = artist;
		this._songs = songs;
	}

	get artist(){ return this._artist; }
	get songs(){ return this._songs; }

	//extra
	shuffle(){
		let shuffled = this._songs.slice();
		for(let i = shuffled.length - 1; i >= 1; --i){
			let j = Math.floor(Math.random() * (i + 1));
			//swap value in index i and j
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	}
}

// testing on book class
console.log('-----Testing on Book class-----');
const historyOfEverything = new Book('Bill Bryson', 'A Short History of Nearly Everything', 544);
historyOfEverything.toggleCheckOutStatus();
console.log(`status: ${historyOfEverything.isCheckedOut}`);
historyOfEverything.addRating(4);
historyOfEverything.addRating(5);
historyOfEverything.addRating(5);
console.log(`average rating: ${historyOfEverything.getAverageRating()}`);

// testing on movie class
console.log('\n-----Testing on Movie class-----');
const speed = new Movie('Jan de Bont', 'Speed', 116);
speed.toggleCheckOutStatus();
console.log(`status: ${speed.isCheckedOut}`);
speed.addRating(1);
speed.addRating(1);
speed.addRating(5);
console.log(`average rating: ${speed.getAverageRating()}`);

//testing on cd class
console.log('\n-----Testing on CD class-----');
const reputation = new CD('Taylor Swift', 'Reputation', ["…Ready for It?", "End Game", "I Did Something Bad", "Don't Blame Me", "Delicate", "Look What You Made Me Do"]);
reputation.toggleCheckOutStatus();
console.log(`status: ${reputation.isCheckedOut}`);
reputation.addRating(5);
reputation.addRating(3);
reputation.addRating(5);
console.log(`average rating: ${reputation.getAverageRating()}`);
console.log('shuffled song list:');
console.log(reputation.shuffle().join('\n'));
