  var async = require('async');
  const { body,validationResult } = require('express-validator');
  const Sequelize = require('sequelize');
  const moment =require('moment');

  var models = require( '../database/models/');
  var Author = models.Author;
  var Book = models.Book;

  // Display list of all Authors. -
  exports.author_list = function(req, res, next) {
    Author.findAll().then(function(author_list){
      res.render('author_list',{
        title:'Author List',
        author_list:author_list,
      });
    });
  };

  // Display detail page for a specific Author. -
  exports.author_detail = function(req, res, next) {
    async.parallel({
      author: function(callback) {
        Author.findByPk(req.params.id).then(function(value) {callback(null, value);},function(err){callback(err);});
      },

      author_books: function(callback){
        // Book.findOne({where:{author: req.params.id }},'title summary').then(function(value){callback(null,value);},function(err){callback(err)})
        Book.findByPk(req.params.id).then(function(value){callback(null,value);},function(err){callback(err)});
      }
    },
    function(err, results) {

          if (err) { return next(err); } // Error in API usage.
          if (results.author==null) { // No results.
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
          }

          // Successful, so render.
          res.render('author_detail', {author: results.author, authors_books: results.author_books });
        });
  };

  // Display Author create form on GET. -
  exports.author_create_get = function(req, res, next) {
    res.render('author_form', { title: 'Create Author'});
  };

  // Display Author delete form on GET. -
  exports.author_delete_get = function(req, res, next) {
    async.parallel({
      author: function(callback) {
        Author.findByPk(req.params.id).then(function(value) {callback(null, value);},function(err){callback(err);});
      },
      authors_books: function(callback) {
       Book.findByPk(req.params.id).then(function(value){callback(null,value);},function(err){callback(err)});
     },
   }, function(err, results) {
    if (err) { return next(err); }
          if (results.author==null) { // No results.
            res.redirect('/catalog/authors');
          }
          
          // Successful, so render.
          res.render('author_delete', { title: 'Delete Author', author: results.author, author_books: results.authors_books } );
        });
  };

  // Handle Author delete on POST. -
  exports.author_delete_post = function(req, res, next) {
    async.parallel({
      author: function(callback) {
        Author.findByPk(/*req.params.id*/req.body.authorid).then(function(value) {callback(null, value);},function(err){callback(err);});
      },
      authors_books: function(callback) {
        Book.findByPk(/*req.params.id*/req.body.authorid).then(function(value) {callback(null, value);},function(err){callback(err);});
      },
    }, function(err, results) {
      if (err) { return next(err); }
          // Success
          
          if (results.authors_books =null) {
              // Author has books. Render in same way as for GET route.
              res.render('author_delete', { title: 'Delete Author', author: results.author, author_books: results.authors_books } );
              return;
            }
            else {
              // Author has no books. Delete object and redirect to the list of authors.  
              Author.destroy({where:{id:req.body.authorid}}).then(function(){
                res.redirect('/catalog/authors')
              })
            }
          });
  };

  // Display Author update form on GET.
  exports.author_update_get = function (req, res, next) {
    Author.findByPk(req.params.id).then(author => {
     if (err) { return next(err); }

      if (author == null) { // No results.
        var err = new Error('Author not found');
        err.status = 404;
        return next(err);
      }
      res.render('author_form', { title: 'Update Author', author: author });
    })
  };

  // Handle Author create on POST. -
  exports.author_create_post = [
      // Validate and sanitise fields.
      body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
      .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
      body('family_name').trim().isLength({ min: 1 }).escape().withMessage('Family name must be specified.')
      .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
      body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(),
      body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),

      // Process request after validation and sanitization.
      (req, res, next) => {

          // Extract the validation errors from a request.
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
              // There are errors. Render form again with sanitized values/errors messages.
              res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() });
              return;
            }
            else {
              // Data from form is valid.
              var author = new Author(
              {
                first_name: req.body.first_name,
                family_name: req.body.family_name,
                date_of_birth: req.body.date_of_birth,
                date_of_death: req.body.date_of_death
              });
              
              author.save().then(function(){
                res.redirect('/catalog/author/'+author.id);
              })

            }
          }
          ];

  // Handle Author update on POST. - Dates from input
  exports.author_update_post = [// LAST STOP
      // Validate and santize fields.
      body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
      .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
      body('family_name').trim().isLength({ min: 1 }).escape().withMessage('Family name must be specified.')
      .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
      body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(), // outputs Wed Feb 10 2021 02:00:00 GMT+0200 (South Africa Standard Time)
      body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),

      // Process request after validation and sanitization.
      (req, res, next) => {

          // Extract the validation errors from a request.
          const errors = validationResult(req);
          // Create Author object with escaped and trimmed data (and the old id!)
          var author = new Author(
          {
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death,
            _id: req.params.id
          }
          );

          if (!errors.isEmpty()) {
              // There are errors. Render the form again with sanitized values and error messages.
              res.render('author_form', { title: 'Update Author', author: author, errors: errors.array() });
              return;
            }
            else {
              Author.update(
              // Values to update
              {
                first_name: req.body.first_name, 
                family_name: req.body.family_name,
                date_of_birth: req.body.date_of_birth,
                date_of_death:req.body.date_of_death,
              },{
               where: {id: req.params.id}
             }
             ).then(count => { 
              res.redirect('/catalog/author/'+req.params.id); });
           }
         }
         ];
