# 1
# Creating a module for Author
#sequelize model:generate --name Author --attributes first_name:string,family_name:string,date_of_birth:Date,date_of_death:date

#  Creating a module for Book
sequelize model:generate --name Book --attributes title:string,author:string,summary:string,isbn:string,genre:string
