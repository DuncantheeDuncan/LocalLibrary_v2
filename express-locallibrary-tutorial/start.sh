#sudo systemctl start postgresql # starting the psql sever
export DATABASE_URL=postgres://cihxygqv:tduTbwnzzL9m0h8ImmENf-RnNa9tgUka@ziggy.db.elephantsql.com:5432/cihxygqv # exporting our database

DEBUG=express-locallibrary-tutorial:* npm run devstart
