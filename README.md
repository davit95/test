
git clone git@github.com:davit95/test.git

Backend configuration

1) cd project/server

2) create .env empty file 

3) copy the contents of .env.example to .env file

4) in .env file set the following credentials
	DB_DATABASE=laravel

	DB_USERNAME=root
	
	DB_PASSWORD=secret

5) run composer install

6) for linux: 
	sudo chmod -R 777 storage/

	sudo chmod -R 777 bootstrap/

7) run:
	php artisan key:generate

8) run:
	php artisan serve

9) run
	php artisan migrate
	
	php artisan db:seed

	php artisan passport:install

Frontend configuration

1) cd project/client

2) run:
	npm install

3) in http.js file change the baseUrl port from 8000 to the port which server runs in

4) npm start