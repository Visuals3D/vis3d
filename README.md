# Visuals3D CLI 


This cli tool is able to generate multiple frequantly used code templates for Visuals3D Microservice based Cloud projects. The goal of this cli is to speed up the development process of new cloud based backend applications. And provide a plug and play development environment.



## Install

```bash
npm install -g @visuals3d/vis3d
```



## Run 

### Create Microservice

A Single boilerplate Microservice to built on top of.

```bash
vis3d generate microservice my-mycroservice-name 
```

#### Options

- **-- yes**  => skip promts and use defaults
- **--git** => initialise a git repo for the new service
- **--install** => automatically install npm packages for new service


### Create Service

A internal service inside a microservice to outsource logik inside an api. This must be run in a microservice folder

```bash
vis3d generate service my-service-name 
```

#### Options






## Features:



### Typescript & Express

The base is a expressjs Server with full Typescript support

### Nodemon Hot reload

This Service supports Hot reload in development, even when using docker

### Full Docker support

This Microservice can be run as a docker container both in production and in development

### Insomnia Openapi Design and Testing support

A insomnia.yaml file in the root folder is used to edit openapi documentation, create and run tests as well as debug the microservice api. 
This file is also used to autogenerate api schemas and documentation

### OpenApi Support and autogenerated Typescript Schemas

This Microservice Api is documented via open-api files inside a insomnia.yaml file this file will be used to generate a html documentation of the whole api via 

```bash
npm run docs
```

Also a autogeneration of the full api schema is integrated. Everytime the Hot Reload is triggered the schema will be updated to always provide the newest interfaces.
The schema will be generated into ./models/generated/api/api.schema.ts
It can be triggered manually by

```bash
npm run generate:schema
```

### Public Folder

The Service provides a public folder which will be copied into the typescript compile folder to be useable in production.

### Unit Testing

Simple Typescript Unit testing is implemented via mocha and chai.


## Roadmap:


### Insomnia cli support 

Adding insomnia testing to the workflow for the microservices as well as integration automation for testing a running version of the service against the openapi specifications and run custom tests for ci/cd pipelines and allow multi repository microservice projects 





