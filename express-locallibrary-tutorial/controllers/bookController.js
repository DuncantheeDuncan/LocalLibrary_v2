var async = require('async');
const { body,validationResult } = require('express-validator');
// const {Model} = require('sequelize');
const Sequelize = require('sequelize');

var models = require( '../database/models/');

var Book = models.Book;
var Author = models.Author;
var Genre = models.Genre;
var Bookinstance = models.Bookinstance;



exports.index = function(req, res) {   

    async.parallel({
        book_count: function(callback) {
        // Book.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        models.Book.count().then(count =>{
            callback(null,count);
        })
    },
    book_instance_count: function(callback) {
        // BookInstance.countDocuments({}, callback);
        models.Bookinstance.count().then(count =>{
            callback(null,count);
        })
    },
    book_instance_available_count: function(callback) {
        // BookInstance.countDocuments({status:'Available'}, callback);
        models.Bookinstance.count().then(count =>{
            callback(null,count);
        })
    },
    author_count: function(callback) {
        // Author.countDocuments({}, callback);
        models.Author.count().then(count =>{
            callback(null,count);
        })
    },
    genre_count: function(callback) {
        // Genre.countDocuments({}, callback);
        models.Genre.count().then(count =>{
            callback(null,count);
        })
    }
}, function(err, results) {
    res.render('index', { title: 'Local Library Home', error: err, data: results });
});
};


// Display list of all books.
exports.book_list = function(req, res, next) {

    Book.findAll().then(function(list_books){
        console.log('test book '+ list_books[0].author)
        res.render('book_list',{
            title:'Book List',
            book_list:list_books,
        });
    });
};

// Display detail page for a specific book.
exports.book_detail = function(req, res, next) {

    async.parallel({
        book: function(callback) {
            Book.findByPk(req.params.id).then(function(value) {callback(null, value);},function(err){callback(err);});
        // Book.findById(req.params.id)
        //   .populate('author')
        //   .populate('genre')
        //   .exec(callback);
    },
    book_instance: function(callback) {

        Bookinstance.findByPk(req.params.id).then(function(value) {callback(null, value);},function(err){callback(err);});

    //   // BookInstance.find({ 'book': req.params.id })
    //   // .exec(callback);
},
}, function(err, results) {
if (err) { return next(err); }
    if (results.book==null) { // No results.
        var err = new Error('Book not found');
        err.status = 404;
        return next(err);
    }
    
    // Successful, so render.
    res.render('book_detail', { title: results.book.title, book: results.book, book_instances: results.book_instance } );
});

};


// Display book create form on GET. -
exports.book_create_get = function(req, res, next) {
// res.send('connected');
// Get all authors and genres, which we can use for adding to our book.
async.parallel({
    authors: function(callback) {
        // Author.find(callback);
        Author.findAll().then(function(value) {callback(null, value);},function(err){callback(err);});
                // Author.findByPk(req.params.id).then(function(value) {callback(null, value);},function(err){callback(err);});

            },
            genres: function(callback) {
        // Genre.find(callback);
                // Genre.findByPk(req.params.id).then(function(value) {callback(null, value);},function(err){callback(err);});
                Genre.findAll().then(function(value) {callback(null, value);},function(err){callback(err);});

            },
        }, function(err, results) {
            if (err) { return next(err); }
            res.render('book_form', { title: 'Create Book', author: results.authors, genres: results.genres });
        });

};

// Handle book create on POST. -
exports.book_create_post = [

// Convert the genre to an array.
(req, res, next) => {
    if(!(req.body.genre instanceof Array)){
        if(typeof req.body.genre ==='undefined')
            req.body.genre = [];
        else
            req.body.genre = new Array(req.body.genre);
    }
    next();
},

// Validate and sanitise fields.
body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
body('author', 'Author must not be empty.').trim().isLength({ min: 1 }).escape(),
body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }).escape(),
body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }).escape(),
body('genre.*').escape(),

// Process request after validation and sanitization.
(req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // Create a Book object with escaped and trimmed data.
    var book = new Book(
      { title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        isbn: req.body.isbn,
        genre: req.body.genre
    });


    if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/error messages.

        // Get all authors and genres for form.
        async.parallel({
            authors: function(callback) {
                Author.findAll().then(function(value) {callback(null, value);},function(err){callback(err);});
            },
            genres: function(callback) {
                Genre.findAll().then(function(value) {callback(null, value);},function(err){callback(err);});
            },
        }, function(err, results) {
            if (err) { return next(err); }

            // Mark our selected genres as checked.
            for (let i = 0; i < results.genres.length; i++) {
                if (genre.indexOf(results.genres[i].id) > -1) {
                    results.genres[i].checked='true';
                }
            }
            res.render('book_form', { title: 'Create Book',authors:results.authors, genres:results.genres, book: book, errors: errors.array() });
        });
        return;
    }
    else {
        // Data from form is valid. Save book.
        book.save();
        res.redirect('/catalog/books/');
        //TODO get an Id to redirect to
}
}
];

// Display book delete form on GET.
exports.book_delete_get = function(req, res) { // - git

    async.parallel({
        book: function(callback) {
            Book.findById(req.params.id).populate('author').populate('genre').exec(callback);
        },
        book_bookinstances: function(callback) {
            BookInstance.find({ 'book': req.params.id }).exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
    if (results.book==null) { // No results.
        res.redirect('/catalog/books');
    }
    // Successful, so render.
    res.render('book_delete', { title: 'Delete Book', book: results.book, book_instances: results.book_bookinstances } );
});
};

// Handle book delete on POST.
exports.book_delete_post = function(req, res, next) {

// Assume the post has valid id (ie no validation/sanitization).

async.parallel({
    book: function(callback) {
        Book.findById(req.body.id).populate('author').populate('genre').exec(callback);
    },
    book_bookinstances: function(callback) {
        BookInstance.find({ 'book': req.body.id }).exec(callback);
    },
}, function(err, results) {
    if (err) { return next(err); }
    // Success
    if (results.book_bookinstances.length > 0) {
        // Book has book_instances. Render in same way as for GET route.
        res.render('book_delete', { title: 'Delete Book', book: results.book, book_instances: results.book_bookinstances } );
        return;
    }
    else {
        // Book has no BookInstance objects. Delete object and redirect to the list of books.
        Book.findByIdAndRemove(req.body.id, function deleteBook(err) {
            if (err) { return next(err); }
            // Success - got to books list.
            res.redirect('/catalog/books');
        });

    }
});

};



// Display book update form on GET.
exports.book_update_get = function(req, res, next) {

// Get book, authors and genres for form.
async.parallel({
    book: function(callback) {
        console.log('enters');
        // Book.findByPk(req.params.id).populate('author').populate('genre').exec(callback);
        Book.findByPk(req.params.id /*req.body.authorid*/).then(function(value) {callback(null, value);},function(err){callback(err);});
        console.log('exits');
    },
    authors: function(callback) {
        // Author.find(callback);
        Author.findByPk(req.params.id /*req.body.authorid*/).then(function(value) {callback(null, value);},function(err){callback(err);});
    },
    genres: function(callback) {
        // Genre.findByPk(req.params.id);
        Genre.findByPk(req.params.id /*req.body.authorid*/).then(function(value) {callback(null, value);},function(err){callback(err);});
       // Genre.findAll({
       //      // limit: 2,
       //      where: {
       //          //your where conditions, or without them if you need ANY entry
       //      },
       //          order: [ [ 'createdAt', 'DESC' ]]
       //      })
       // .then(function(entries){
       //          //only difference is that you get users list limited to 1
       //      //entries[0]
       //      console.log('XxXxX '+ entries);
       //      }); 

   },
}, function(err, results) {

if (err) { return next(err); }
        if (results.book==null) { // No results.
            var err = new Error('Book not found');
            err.status = 404;
            return next(err);
        }
        // console.log('genre '+ results.genres.name)
        // Success.
        // Mark our selected genres as checked.
        // for (var all_g_iter = 0; all_g_iter < results.genres.length; all_g_iter++) {
        //     for (var book_g_iter = 0; book_g_iter < results.book.genre.length; book_g_iter++) {
        //         if (results.genres[all_g_iter].id.toString()===results.book.genre[book_g_iter].id.toString()) {
        //             results.genres[all_g_iter].checked='true';
        //         }
        //     }
        // }
        res.render('book_form', { title: 'Update Book', authors: results.authors, genres: results.genres, book: results.book });
    });

};



// Handle book update on POST.
exports.book_update_post = [

// Convert the genre to an array
(req, res, next) => {
    if(!(req.body.genre instanceof Array)){
        if(typeof req.body.genre==='undefined')
            req.body.genre=[];
        else
            req.body.genre=new Array(req.body.genre);
    }
    next();
},

// Validate and sanitise fields.
body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
body('author', 'Author must not be empty.').trim().isLength({ min: 1 }).escape(),
body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }).escape(),
body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }).escape(),
body('genre.*').escape(),

// Process request after validation and sanitization.
(req, res, next) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped/trimmed data and old id.
    var book = new Book(
      { title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        isbn: req.body.isbn,
        genre: (typeof req.body.genre==='undefined') ? [] : req.body.genre,
        _id:req.params.id //This is required, or a new ID will be assigned!
    });

    if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/error messages.

        // Get all authors and genres for form.
        async.parallel({
            authors: function(callback) {
                Author.find(callback);
            },
            genres: function(callback) {
                Genre.find(callback);
            },
        }, function(err, results) {
            if (err) { return next(err); }

            // Mark our selected genres as checked.
            for (let i = 0; i < results.genres.length; i++) {
                if (book.genre.indexOf(results.genres[i]._id) > -1) {
                    results.genres[i].checked='true';
                }
            }
            // res.render('book_form', { title: 'Update Book',authors: results.authors, genres: results.genres, book: book, errors: errors.array() });
            res.send('now accessing new function!!')
        });
        return;
    }
    else {
        // Data from form is valid. Update the record.
        Book.findByIdAndUpdate(req.params.id, book, {}, function (err,thebook) {
            if (err) { return next(err); }
               // Successful - redirect to book detail page.
               res.redirect(thebook.url);
           });
    }
}
];

// genre not showing in pug file 