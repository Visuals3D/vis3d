# Visuals3D CLI 



A small cli to generate Visuals3D Microservices 



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

