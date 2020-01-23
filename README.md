# Interns Managment Pro

Full stack App javascript MEAN Stack MongoDB, Express, Angular2+, NodeJs
with beautiful UI/UX from scratch to deploy on Docker & K8s

## Getting Started

Interns Management Pro is an app that allows for HR Department In Veon/Djezzy saving much time in the operation of handling interns in the company (more than 2000 interns each year) the app is made using javascript stack the following instructions show how you can use the project and deploy it in a private cloud


## Development environment

### Before you begin

Download and Install NodeJS and NPM from https://nodejs.org/en/download/.

Install Angular CLI  globally Using NPM Cammand "npm install -g @angular/cli"

Download and Install MongoDB  from https://www.mongodb.com/download-center (you can use Mongodb Atlas)

### Running the Node.js API

Download or clone the  project code from http://172.16.60.37:30000/abdm64/stage-app

Install all required npm packages by running npm install from the command line in the  Express-server folder (where the package.json is located).

Start the api by running npm start from the command line in the Express-server folder, you should see the message Server listening on port 3000. You can test the api directly using an application such as Postman or you can test it with one of the page web, make sure the mongoDB is running 

```
$cd Express-server 

$npm install
```
 ```
 $npm start 

```
### Running an Angular  client app with the Node.js API

Download or clone the Angular client app  code from http://172.16.60.37:30000/abdm64/stage-app

Install all required npm packages by running npm install from the command line in the front-app  folder (where the package.json is located).

Start the application by running ng serve from the command line in the front-app  folder, this will launch a Server listening on port 4200 displaying the Angular application and it should be hooked up with the Node.js API

```
$cd front-app

$npm install
```
 ```
 $ng serve

```


Login Page

![Alt text](./images/image1.png?raw=true "Title")

Home Page


![Alt text](./images/image2.png?raw=true "Title")



## Production  environment

### Before you begin

Download and install Docker from https://github.com/docker/toolbox

Must have access to kubernetes cluster on AWS or GKE Google Kubernetes Engine or you can download and install minikube (test  purpose) on your machine from https://kubernetes.io/docs/tasks/tools/install-minikube/

Must build a production version of the angular client app by running ng build --prod from the command line in the front-app  folder don't forget to change the apiUrl  for production environment.

```
$ng build --prod

```

### Docker-compose 
   
   The easiest  way to launch the app on production environment with docker is using the docker-compose tools: 
   <br>
       run  "docker-compose up"  from the command line in the root folder (don't forget to change the database url with the name of service "stagedbone" apiUrl )

```
$docker-compose up 
```
### Docker image 

   Build your own docker image and push it to your repo  by running  "docker build -t my-app-name:v1 . "
   from the cammand line in Express-server folder you can push it to your own registy 


```
$cd Express-server

$docker build -t my-app-name:v1 . 
```




### Kubernetes K8s

 Deploying this app on kubernetes system can be so easy by applying the k8s yaml files, make sure that you upload the app image to the docker hub or private registry and change the image name config in stage-deployment.yaml  , then run "kubectl apply -f k8s" from the cammand line in the root folder

```
$kubectl apply -f k8s

```

 Remember : "always you can change the config and the api urls" 






## Author

* **Messelleka Abdellah** - *DevOps Engineer @* - [Djezzy](http://www.djezzy.dz/)



## License

This project is licensed under the MIT License 

## Credits

Made with ❤️ by Abdellah & Safaa
