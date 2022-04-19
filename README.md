# Visuals3D CLI 

This cli tool is able to generate multiple frequently used code templates for https://visuals3d.de microservice based Cloud projects. The goal of this cli tool is to speed up the development process of new cloud based backend applications. And provide a plug and play development environment.
The tool can generate single microservices and server side rendered webpages.
Including full **docker** support, **unit testing**, **openapi** specs, **api testing**, **linting**, **test coverage**, **hot reload**, **debugging** with Visual Studio Code, **Kubernetes** presets for production deployment and a full **gitlab-ci** pipeline for building testing and deployment.



![](https://raw.githubusercontent.com/Visuals3D/vis3d/master/images/thumbnail.jpg)

## Install

```bash
npm install -g @visuals3d/vis3d
```



## Run 

### Create Microservice

A Single boilerplate microservice to built on top of.

```bash
vis3d generate microservice my-mycroservice-name 
```

#### Options

- **-- yes**  => skip promts and use defaults
- **--git** => initialise a git repo for the new service
- **--install** => automatically install npm packages for new service


### Create Service

A internal service inside a microservice to outsource logic inside an api. This must be run in a microservice folder

```bash
vis3d generate service my-service-name 
```


### Create Webpage

A clean nodejs express based server side rendered webpage with docker support for development and production.

```bash
vis3d generate webpage my-webpage-name 
```



## Microservice Features:



### Typescript & Express

The heart of the microservice is a ExpressJs Server with full Typescript support



### Nodemon Hot reload

This Service supports Hot reload in development, even when using docker



### Full Docker support

This Microservice can be run as a docker container both in production and in development. 

To run the service in development use:

```shell
docker-compose up -d
```

To build a container for production use the provided multistage build Dockerfile:

```shell
docker build
```



### Kubernetes Presets

To deploy the microservice on a production system running kubernetes use the provided kubernetes yaml files in the **kube** folder. 

Everything needed to deploy the service and make it accessible from the outside is provided. Note that the kubernetes cluster needs a nginx ingress-controller installed to use the provided ingress files.

```shell
kubectl apply -f ./kube/volumes/<service name>.volumes.yaml
kubectl apply -f ./kube/ingress/<service name>.ingress.prod.yaml
kubectl apply -f ./kube/services/<service name>.service.prod.yaml
kubectl apply -f ./kube/config/<service name>.config.prod.yaml
kubectl apply -f ./kube/deployment/<service name>.deployment.prod.yaml
```

There is a secrets template available as well. But secrets should be managed very carefully and especially not be stored in a file pushed onto a development git repository. It is meant to be used only in development or demo staging.


### Gitlab Ci Pipeline

![](https://raw.githubusercontent.com/Visuals3D/vis3d/master/images/ci-pipeline.png)

The microservice includes a full gitlab ci pipeline. The pipeline is able to build the code and the image and push the image to a docker hub registry. In the testing stage the code will be tested via unit tests and the api will be tested by building and running the whole service inside a dind container and executing insomnia cli tests against it. 
If that is all successful the Image will be taged with latest and the version number provided in the package.json file and pushed into the container registry. 
From there the last rollout task inside the deploy stage can be triggered manualy to deploy the new image and kube configurations to a remote kubernetes cluster.

This script is more a gideline then a production ready solution. Nothing fits for everyone.

The following variables are needed in gitlab to run this script:

- CI_REGISTRY = domain name of your registry provider (docker.io)
- CI_REGISTRY_EMAIL = the email connected to your registry
- CI_REGISTRY_IMAGE = the name of the registry repo
- CI_REGISTRY_PASSWORD = the password for your registry
- CI_REGISTRY_USER = the username of your registry
- KUBE_CONFIG = the kube config file as a file variable




### Visuals Studio Code Attachable Debugger

The service will start with an open port (9229) to attach a debugger to. Default settings for Visuals Studio Code are available. Just go to the debugging page in vsCode and hit the green Arrow next to the "Attach" selection. The Debugger will be attached and you can set breakpoints etc. 





### Insomnia Openapi Design and Testing support

The .insomnia folder or a insomnia.yaml file in the root folder is used to edit openapi documentation, create and run tests as well as debug the microservice api. 
This file is also used to auto generate api schema's and documentation.
This also allows multi repository microservice projects to be developed in isolation against api specifications.





### Insomnia cli support 

insomnia-inso cli support for a better work flow as well as automation for testing a running version of the service against the openapi specifications and run custom tests for ci/cd pipelines.

```bash
npm run test:api
```





### OpenApi Support and auto generated Typescript Schemas

This microservice Api is documented via open-api specifications inside a .insomnia folder or a insomnia.yaml file will be used to generate a html documentation of the whole api via 

```bash
npm run docs
```

Also a auto generation of the full api schema is integrated. Every time the Hot Reload is triggered the schema will be updated to always provide the newest interfaces.
The schema will be generated into ./models/generated/api/api.schema.ts
It can be triggered manually by

```bash
npm run generate:schema
```





### Unit Testing

Simple Typescript Unit testing is implemented via mocha and chai. The tests have to be written inside the **tests** folder in files with names like *.test.ts. The tests can be run like so:

```bash
npm run test
```



### Test Coverage

Test coverage can be calculated and printed as a list via **nyc**

```bash
npm run test:coverage
```

For CI/CD procedures this script call will fail if the test coverage is below 90% average over all lines



### Typescript Linting

As a typescript linter **eslint** is included and can be called via

```bash
npm run lint
npm run lint:fix
```

The **lint:fix** call allows eslint to fix minor problems in the code automatically. This should be used in development and the version without fix is meant for CI/CD pipelines if you wish to have manipulated code for ci builds.



### Public Folder

The Service provides a public folder which will be copied into the typescript compiled folder to be usable in production.




## Webpage Features:



### ExpressJS

Usage of expressjs as a solid baseline that harmonises well with nodejs.



### Handlebars

A very user friendly templating engine for expressjs that uses real html with some additional syntax to allow complex templating for larger website projects.



### Typescript

Full typescript support added on top of nodejs with compilation for development and production build in.



### Docker

Also full docker support fo development and production. Docker-compose files can be used to spin up development and production environments with a single line on every docker friendly machine. 



### Nginx

Nginx reverse proxy as http server used in the production docker-compose file to deploy for production in a docker swarm cluster or just with docker-compose.



### Hot reload

The generated webpage has build in hot reload within the development docker container but it will not refresh the browser on code changes automatically. 













