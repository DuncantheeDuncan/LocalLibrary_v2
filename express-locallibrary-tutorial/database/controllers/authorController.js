var async = require('async');
// var Book = require('../models/book')
var Author = require('../models/author');


const { body,validationResult } = require('express-validator');

// Display list of all Authors. -//
exports.author_list = function(req, res, next) {

  // Author.find()
  // .sort([['family_name', 'ascending']])
  // .exec(function (err, list_authors) {
  //     if (err) { return next(err); }
  //     console.log(list_authors);
  //     //Successful, so render
  //     res.render('author_list', { title: 'Author List', author_list: list_authors });
  // });


  Author.find('family_name').then(function(author){
  	
  })

};
