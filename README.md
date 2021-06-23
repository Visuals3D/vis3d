# Visuals3D CLI 

This cli tool is able to generate multiple frequently used code templates for https://visuals3d.de micro service based Cloud projects. The goal of this cli tool is to speed up the development process of new cloud based back end applications. And provide a plug and play development environment.
Including full **docker** support, **unit testing**, **openapi** specs, **api testing**, **linting**, **test coverage**, **hot reload**, **debugging** with Visual Studio Code, **Kubernetes** presets for production deployment and a full **gitlab-ci** pipeline for building testing and deployment.



![](https://raw.githubusercontent.com/Visuals3D/vis3d/master/images/thumbnail.jpg)

## Install

```bash
npm install -g @visuals3d/vis3d
```



## Run 

### Create Microservice

A Single boilerplate Micro service to built on top of.

```bash
vis3d generate microservice my-mycroservice-name 
```

#### Options

- **-- yes**  => skip promts and use defaults
- **--git** => initialise a git repo for the new service
- **--install** => automatically install npm packages for new service


### Create Service

A internal service inside a micro service to outsource logic inside an api. This must be run in a micro service folder

```bash
vis3d generate service my-service-name 
```



## Features:



### Typescript & Express

The heart of the micro service is a ExpressJs Server with full Typescript support



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

To deploy the micro service on a production system running kubernetes use the provided kubernetes yaml files in the **kube** folder. 

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

The micro service includes a full gitlab ci pipeline. The pipeline is able to build the code and the image and push the image to a docker hub registry. In the testing stage the code will be tested via unit tests and the api will be tested by building and running the whole service inside a dind container and executing insomnia cli tests against it. 
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

The .insomnia folder or a insomnia.yaml file in the root folder is used to edit openapi documentation, create and run tests as well as debug the micro service api. 
This file is also used to auto generate api schema's and documentation.
This also allows multi repository micro service projects to be developed in isolation against api specifications.





### Insomnia cli support 

insomnia-inso cli support for a better work flow as well as automation for testing a running version of the service against the openapi specifications and run custom tests for ci/cd pipelines.

```bash
npm run test:api
```





### OpenApi Support and auto generated Typescript Schemas

This Micro service Api is documented via open-api specifications inside a .insomnia folder or a insomnia.yaml file will be used to generate a html documentation of the whole api via 

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









