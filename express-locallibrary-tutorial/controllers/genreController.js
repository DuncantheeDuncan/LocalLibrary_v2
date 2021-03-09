// var Genre = require('../models/genre');
// var Book = require('../models/book');
var async = require('async');
const { body,validationResult } = require("express-validator");
const Sequelize = require('sequelize');
const db = require('../database/models/index')

var models = require( '../database/models/');
var Book = models.Book;
var Genre = models.Genre;

// Display list of all Genre.
exports.genre_list = function(req, res, next) {

Genre.findAll().then(function(list_genres){

  res.render('genre_list', { title: 'Genre List', list_genres:  list_genres});
});


  // Genre.find()
  //   .sort([['name', 'ascending']])
  //   .exec(function (err, list_genres) {
  //     if (err) { return next(err); }
  //     // Successful, so render.
  //     res.render('genre_list', { title: 'Genre List', list_genres:  list_genres});
  //   });

};

// // Display detail page for a specific Genre.
exports.genre_detail = function(req, res, next) {
	// res.send('wowo')

    async.parallel({
        genre: function(callback) {

            // Genre.findById(req.params.id)
              // .exec(callback);
              Genre.findByPk(req.params.id).then(function(value) {callback(null, value);},function(err){callback(err);});
        },

        genre_books: function(callback) {
        	//db
          // Book.find({ 'genre': req.params.id })
          // .exec(callback);
          Book.findByPk(req.params.id).then(function(value) {callback(null, value);},function(err){callback(err);});
         // Book.sequelize.query('SELECT * FROM "public"."Book"').then(function(value){callback(null, value);})
        },

    }, function(err, results) {
        if (err) { return next(err); }
        if (results.genre==null) { // No results.
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        // console.log('what is inside '+ results.genre_books.length)
        // for(var i=0;i<results.genre_books.length;i++){
        // 	console.log('log '+ results.genre_books[i].name)
        // }


        res.render('genre_detail', { title: 'Genre Detail', genre: results.genre, genre_books: results.genre_books } );
    });

};



// Display Genre create form on GET. 
exports.genre_create_get = function(req, res, next) {//-
    res.render('genre_form', { title: 'Create Genre'});
};

// Handle Genre create on POST. 
exports.genre_create_post = [//-
// Validate and santise the name field.
    body('name', 'Genre name must contain at least 3 characters').trim().isLength({ min: 3 }).escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        
     // Create a genre object with escaped and trimmed data.
        var genre = new Genre(
          { name: req.body.name }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array()});
        return;
        }
        else {
            // Data from form is valid.
            // Check if Genre with same name already exists.

            Genre.findAll().then(function(genre_list){
                console.log('length '+ genre_list.length)
                for(let i=0;i <genre_list.length;i++){

                    if (req.body.name.toUpperCase() === genre_list[i].name.toUpperCase()) {
                        res.redirect('/catalog/genre/'+genre_list[i].id);
                    }else{

                        if (i == genre_list.length - 1)
                            genre.save().then(function(){res.redirect('/catalog/genre/'+genre.id);})

                    }
                }
                
             

              
            });

        }
    }
];


// // Display Genre delete form on GET.
exports.genre_delete_get = function(req, res, next) {//-

    async.parallel({
        genre: function(callback) {
            // Genre.findByPk(req.params.id).exec(callback);
            Genre.findByPk(req.params.id).then(function(value) {callback(null, value);},function(err){callback(err);});
        },
        genre_books: function(callback) {
            // Book.find({ 'genre': req.params.id }).exec(callback);
            Book.findByPk(req.params.id).then(function(value) {callback(null, value);},function(err){callback(err);});
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.genre==null) { // No results.
            res.redirect('/catalog/genres');
        }
        // Successful, so render.
        res.render('genre_delete', { title: 'Delete Genre', genre: results.genre, genre_books: results.genre_books } );
    });

};

// // Handle Genre delete on POST.
exports.genre_delete_post = function(req, res, next) {//-

    async.parallel({
        genre: function(callback) {
            // Genre.findById(req.params.id).exec(callback);
            Genre.findByPk(req.params.id).then(function(value) {callback(null, value);},function(err){callback(err);});
        },
        genre_books: function(callback) {
            // Book.find({ 'genre': req.params.id }).exec(callback);
            Book.findByPk(req.params.id).then(function(value) {callback(null, value);},function(err){callback(err);});
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        if (results.genre_books!=null) {
            
            // Genre has books. Render in same way as for GET route.
            res.render('genre_delete', { title: 'Delete Genre', genre: results.genre, genre_books: results.genre_books } );
            return;
        }
        else {
            console.log('enters')
            // Genre has no books. Delete object and redirect to the list of genres.
            // Genre.findByIdAndRemove(req.body.id, function deleteGenre(err) {
            	Genre.destroy({where:{id:req.params.id}}).then(function(){
                // if (err) { return next(err); }
                // Success - go to genres list.
                res.redirect('/catalog/genres');
                
                // res.send('woooow')
            });

        }
    });

};

// // Display Genre update form on GET.
exports.genre_update_get = function(req, res, next) {

    // Genre.findByPk(req.params.id, function(err, genre) {
    	Genre.findByPk(req.params.id).then(genre =>{
    		 if (err) { return next(err); }
        if (genre==null) { // No results.
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }

        res.render('genre_form', { title: 'Update Genre', genre: genre });
    	})
        // if (err) { return next(err); }
        // if (genre==null) { // No results.
        //     var err = new Error('Genre not found');
        //     err.status = 404;
        //     return next(err);
        // }
        // Success.
        // res.render('genre_form', { title: 'Update Genre', genre: genre });
    // });

};

// Handle Genre update on POST.
exports.genre_update_post = [
   
    // Validate and sanitze the name field.
    body('name', 'Genre name must contain at least 3 characters').trim().isLength({ min: 3 }).escape(),
    

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request .
        const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data (and the old id!)
        var genre = new Genre(
          {
          name: req.body.name,
          _id: req.params.id
          }
        );


        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('genre_form', { title: 'Update Genre', genre: genre, errors: errors.array()});
        return;
        }
        else {
            // Data from form is valid. Update the record.
            // Genre.findByIdAndUpdate(req.params.id, genre, {}, function (err,thegenre) {
            //     if (err) { return next(err); }
            //        // Successful - redirect to genre detail page.
            //        res.redirect(thegenre.url);
            //     });

            Genre.update(
            {
            	name:req.body.name
            },{
            	where: {id:req.params.id}
            }
            ).then(count => {
            	res.redirect('/catalog/genre/'+req.params.id)
            })
        }
    }
];