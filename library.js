// OOP in JavaScript
// Book Class

class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
		this.isAvailable = true;
	}
	// Method to borrow a book and throw the error
	borrow() {
		if (!this.isAvailable) {
			throw new Error("Book is not available");
		}
		this.isAvailable = false;
	}
	// method to return the book
	returnBook() {
		this.isAvailable = true;
	}
}

// Abstraction
class User {
	constructor(name) {
		if (this.constructor === User) {
			// checks if the constructor of the current instance (this) is the User class itself.
			throw new Error("Abstract class can't be instantiated");
		}
		this.name = name; //Name of the user will be added in the library log
	}

	// method to borrow a book
	borrowBook(book) {
		book.borrow();
		return true;
	}
}

// Inheritance
class Member extends User {
	constructor(name) {
		super(name); // super inherit the name from User Class
	}
	// Method for a Librarian to add a book into the library log
	addBook(book, library) {
		library.addBook(book);
	}
}

// Librarian Class and here i will extend the user
class Librarian extends User {
	constructor(name) {
		super(name);
	}
	// method to add book to the library log
	addBook(book, library) {
		library.addBook(book);
	}
}

// Library class to manage collection of books and user
class Library {
	constructor() {
		this.books = []; //Array to store books
		this.users = []; //Array to store users
	}
	// method to add books to the library
	addBook(book) {
		this.books.push(book);
	}

	// method to register a new user
	registerUser(user) {
		this.users.push(user);
	}
}

// Initializing the library for default librarian

let library = new Library();
let librarian = new Librarian("Default Librarian");

// Event handler for adding a book through the form
document.getElementById("addBookForm").onsubmit = function (event) {
	event.preventDefault(); // prevent page refresh on submit

	// get the values from the form
	let title = document.getElementById("bookTitle").value;
	let author = document.getElementById("bookAuthor").value;
	let isbn = document.getElementById("bookISBN").value;

	// create a new book
	let newBook = new Book(title, author, isbn);
	librarian.addBook(newBook, library); // Adds the book

	// Log the action and reset the form
	logToLibrary(`Added new book: ${title} Written by: ${author}`);
	document.getElementById("addBookForm").reset();
};

// Another event handler for adding the member through a form

document.getElementById("addMemberForm").onsubmit = function (event) {
	event.preventDefault(); // prevent page refresh on submit

	// Get the name from the form and register the new user
	let name = document.getElementById("memberName").value;
	let newMember = new Member(name);

	library.registerUser(newMember);
	// Log the action and rest the form
	logToLibrary(`Added new member: ${name}`);
	document.getElementById("addMemberForm").reset();
};

// function to handle borrowing a book
function borrowBook() {
	// Get the ISBN and member name from the input field
	let isbn = document.getElementById("actionISBN").value;
	let memberName = document.getElementById("actionMemberName").value;
	// find both book and user from the DB
	let book = library.books.find((b) => b.isbn === isbn);
	let member = library.users.find((u) => u.name === memberName);

	// if both book and member are found, attempt to borrow the book
	if (book && member) {
		try {
			member.borrowBook(book);
			logToLibrary(`${memberName} borrowed: ${book.title} for 7 days`);
		} catch (error) {
			logToLibrary(`Error: ${error.message}`);
		}
	} else {
		logToLibrary("Book or Member not found");
	}
}

// Function to returning the book
function returnBook() {
	// Get the ISBN from the input field
	let isbn = document.getElementById("actionISBN").value;
	let book = library.books.find((b) => b.isbn === isbn);

	// if the book found in the DB then return it
	if (book) {
		book.returnBook();
		logToLibrary(`You have successfully Returned the book: ${book.title}`);
	} else {
		logToLibrary("Book not found");
	}
}

// Log all the activity in the library Logs
function logToLibrary(message) {
	let logDiv = document.getElementById("libraryLog");
	logDiv.innerHTML += message + "<br>";
}

// add the event lisnt to borrow and return book button

document.getElementById("borrowBookBtn").addEventListener("click", borrowBook);
document.getElementById("returnBookBtn").addEventListener("click", returnBook);
