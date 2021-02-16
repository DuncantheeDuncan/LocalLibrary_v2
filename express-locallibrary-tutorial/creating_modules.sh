# 1
# creates a file in  database/models and database/migrations
# Creating a module for Author
#sequelize model:generate --name Author --attributes first_name:string,family_name:string,date_of_birth:Date,date_of_death:date

# Creating a module for Book
# sequelize model:generate --name Book --attributes title:text,author:text,summary:text,isbn:string,genre:enum

# Creating a module for Bookinstance
# sequelize model:generate --name Bookinstance --attributes book:text,imprint:text,due_back:Date,status:enum 

# Creating a module for Genre
# sequelize model:generate --name Genre --attributes name:string
