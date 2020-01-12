# Interns Managment Pro

Full stack App javascript MEAN Stack MongoDB, Express, Angular2+, NodeJs
with beautiful UI/UX from scratch to deploy on Docker & K8s

## Getting Started

Interns Management Pro is an app that allows for HR Department In Veon/Djezzy saving much time in the operation of handling interns in the company (more than 2000 interns each year) the app is made using javascript stack the following instructions show how you can use the project and deploy it in a private cloud

### Development environment

### Prerequisites 

 First you need  to install node.js , mongodb, and Angular CLI  on your machine  
    to run the server side of the app : 

```
$cd Express-server 

$npm install
```
 ```
 $nodemon app.js 

```

make sure that the mongodb is running , Now the API is running on localhost:3000/api
   <br/> to run the client-app : 

```
$cd front-app

$npm install
```
 ```
 $ng serve

```
and now the client-app is running on localhsot:4200

Login Page

![Alt text](./images/image1.png?raw=true "Title")

Home Page


![Alt text](./images/image2.png?raw=true "Title")



## Deployment

### Docker
after installing docker on your machine you run a production version on docker by using docker-comps make sure that you change the url on app.js to stagedb:27017 and simply run the command docker-compose up  on the root folder
```
$docker-compose up 
```

drop the app 

```
$docker-compose down 
```
or you can build your own docker image and push it to your repo
```
$cd Express-server

$docker build -t my-app:v1 . 
```

you can customize the build of the app image by changing the Dockerfile in Express-server/Dockerfile


### Kubernetes K8s

you can deploy this app on kubernetes system easily by applying the k8s yaml files, make sure that you upload the app image to the docker hub or private registry and change the image name config in stage-deployment.yaml  and then apply the following command in the root folder

```
$kubectl apply -f k8s

```

and that's it, now you MEAN Stack  App  is deployed on kubernetes cluster , "always you can change the config" 

to drop the deployment

```
$kubectl delete  -f k8s

```




## Authors

* **Messelleka Abdellah** - *DevOps Engineer @* - [Djezzy](http://www.djezzy.dz/)



## License

This project is licensed under the MIT License 

## Credits

Made with ❤️ by Abdellah & Safaa
