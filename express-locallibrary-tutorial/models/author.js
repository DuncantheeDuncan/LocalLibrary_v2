const {DateTime } =require('luxon');

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxlength: 100},
    family_name: {type: String, required: true, maxlength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  // console.log("family name");
  return this.family_name + ', ' + this.first_name;
});



// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

// Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function() {
  return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) + ' - ' + DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
  
});


// https://github.com/mdn/express-locallibrary-tutorial/blob/0665300658e831665cb95d656a28c9f9562bdeae/models/author.js#L35
AuthorSchema
.virtual('date_of_birth_formatted')
.get(function () {
  // return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
  return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
});

AuthorSchema
.virtual('date_of_death_formatted')
.get(function () {
  // return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
  return this.date_of_death ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
});


//Export model
module.exports = mongoose.model('Author', AuthorSchema);