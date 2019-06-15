# Run docker command
docker login
docker build -t flagship .

# force remove all images
docker rmi $(docker images -a -q) -f