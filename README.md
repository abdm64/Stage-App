# Intern Managment Pro

Full stack App javascript MEAN Stack MongoDB, Express, Angular2+, NodeJs
from idea to deploy on Docker & K8s

## Getting Started

Intern Management Pro is an app that allow to HR Department In Veon/Djezzy savig much time in the operation of handling interns in the company more than 1000 interns each year the app is made using javascript  stack the following  instructions show how you can use the project and deploy it in private cloud 

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

make sure that the mongodb is running , Now the API is running on localhost:3000/api;
 to run the client-app : 

```
$cd front-app

$npm install
```
 ```
 $ng serve

```
and now the app is running on localhsot:4200

Login Page

![Alt text](./images/image1.png?raw=true "Title")

Home Page


![Alt text](./images/image2.png?raw=true "Title")



## Deployment

### Docker
after intalling docker on your machine you run production version on docker by using docker-compsoe 
make sur that you change url on app.js to stagedb:27017 and simply run the cammand docker-compose up  on the root folder
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

$docker build -t myApp:v1 . 
```

you can customize the build of the app image by changing the Dockerfile in Express-server/Dockerfile


### Kubernetes K8s

you can deploy this app on kubernetes system easily by applying the k8s yaml files, make sure taht you upload the app image to the docke hub or private registry and change image parameter in stage-deployment.yaml to  use your private image name and then apply the following cammand in the root folder

```
$kubectl apply -f k8s

```

and that's it now you Mean App that is deploy on kubernetes cluster , alwayse you can change the prameter 

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
