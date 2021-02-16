
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var GenreSchema = new Schema({
	name : {type: String, required: true , minlength: 3, maxlength: 100}
});


// Virtual for gendre
GenreSchema
.virtual('url')
.get(function() {
	return '/catalog/genre/' + this._id;
});


// GenreSchema
// .virtual('name')
// .get(function(){
// 	return '/catalog/genre/' +this.name;
// });

//Export model
module.exports = mongoose.model('Genre', GenreSchema);