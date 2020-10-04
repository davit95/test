
1) git clone git@github.com:davit95/test.git

Backend configuration

2) cd project/server

3) create .env empty file 

4) copy the contents of .env.example to .env file

5) in .env file set the following credentials
	DB_DATABASE=laravel
	DB_USERNAME=root
	DB_PASSWORD=secret

6) run composer install

7) for linux: 
	sudo chmod -R 777 storage/
	sudo chmod -R 777 bootstrap/

8) run:
	php artisan key:generate

9) run:
	php artisan serve

Frontend configuration

1) cd project/client

2) run:
	npm install

3) in http.js file change the baseUrl port from 8000 to the port which server runs in

4) npm start