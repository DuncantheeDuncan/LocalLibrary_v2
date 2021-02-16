#sudo systemctl start postgresql # starting the psql sever
# export process.env.DEV_DATABASE_URL
export  DATABASE_URL=postgres://cihxygqv:tduTbwnzzL9m0h8ImmENf-RnNa9tgUka@ziggy.db.elephantsql.com:5432/cihxygqv # exporting our database
# DATABASE_URL=postgres://cihxygqv:tduTbwnzzL9m0h8ImmENf-RnNa9tgUka@ziggy.db.elephantsql.com:5432/cihxygqv # exporting our database

DEBUG=express-locallibrary-tutorial:* npm run devstart
