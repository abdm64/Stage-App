# Create image based on the official Node 6 image from the dockerhub
FROM node:12-alpine

# Create a directory where our app will be placed
RUN mkdir -p /usr/src

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /usr/src/app

# Expose the port the app runs in
EXPOSE 3000

CMD ["npm", "start"]

# to build image: $docker build -t my-app:v1 . 


# to run Image: $docker run -d -p 20:3000 --restart always --name stageappz stageapp:v1
