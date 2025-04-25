docker run --name iks-mysql -e MYSQL_ROOT_PASSWORD=rootpass -p 3306:3306 -d mysql:9.3.0 || docker start iks-mysql
