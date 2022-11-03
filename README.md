comandos clave

docker-compose ps          // ver base de datos
docker-compose up -d postgres // subir esta base de datos
docker-compose up -d pgadmin 
docker-compose exec postgres bash // abrir el bash de postgrs
psql -h localhost -d my_store -U nico // conectarte con esta base de datos

una vezn en la base de datos:
\d+
