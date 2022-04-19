using nodejs framework adonis I created
story-api

it has basic crud operation for stories
and can store on MySql Database


1.install all dependency command:(npm install)
2.modify the values inside .env
3.run migration to create tables for database command:(node ace migration:run)
4.run server command:(node ace serve --watch)

Routes available:
localhost=127.0.0.1

GET {localhost}/               => display base url(basic text message)
GET {localhost}/stories        => get list of all stories(can be filtered and paginate)
GET {localhost}/stories/{id}   => get 1 story result with id as parameter
POST{localhost}/stories        => add new story link(with validation)
PUT {localhost}/stories/{id}   => update story  using id as identifier 
DELETE{localhost}/stories/{id} => delete story  using id as identifier 

GET {localhost}/getTimeStories =>  scrape latest stories from https://time.com and save it database


