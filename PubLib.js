function Library (shelves) {this.shelves = shelves || [];}
Library.prototype = {
    report: function() {alert(this.toString());},
    toString: function() { //notice: Shelf.toString is not used to reduce coupling
        var books = this.shelves.reduce( function(a,b){ return b.books.concat(a.books || a); });
        return books.length? "In Stock:\n" + books.join('\n') : "The library is empty!";        
}   };

function Shelf (books) {this.books = books || [];}
Shelf.prototype = {toString: function() {return this.books.join(", ");}};

function Book (title, author) {
    this.title = title || ""; 
    this.author = author || "";
}
Book.prototype = {
    toString: function() {return '"' + this.title + '," by ' + this.author;},
    enshelf: function(shelf) {
        if (this.shelf) unshelf();
        shelf.books.push(this);
        this.shelf = shelf;
    },
    unshelf: function() { 
        if (!this.shelf) return alert("This book is already unshelved!");
        this.shelf.books = this.shelf.books.splice(this.shelf.books.indexOf(this), 1);
        this.shelf = null;
}   };

///////////////////////  testing code  /////////////////////////////

var lib = new Library( [new Shelf(), new Shelf(), new Shelf()] );
var book1 = new Book("Moby Dick", "Herman Melville");
var book2 = new Book("The Adventures of Huckleberry Finn", "Mark Twain");
var book3 = new Book("To Kill a Mocking Bird", "Harper Lee");

lib.report();
book2.unshelf();

book1.enshelf(lib.shelves[0]);
book3.enshelf(lib.shelves[0]);
book2.enshelf(lib.shelves[1]);
lib.report();

book1.unshelf();
lib.report();

