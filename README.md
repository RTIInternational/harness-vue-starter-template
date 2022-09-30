# Harness-Vue Starter Template

This is a starter template for building websites using RTI International's [Harness-Vue](https://next.harnessjs.org) and [Harness-Vue-Bootstrap](https://bootstrap.harnessjs.org) tools. This repository contains a Vue 3 application built with [create-vue](https://github.com/vuejs/create-vue), with Harness-Vue and Harness-Vue-Bootstrap preinstalled and configured as well as some example components and an example Harness page. 

Run `npm install` to install dependencies and `npm run dev` to run a development server. For other commands and functionality, please see [the documentation for Vite](https://vitejs.dev/guide/).


## Linting and Testing
Included in this repository is a basic linting configuration using eslint/prettier and vue 3's essential linting strategy. Testing is included via [vitest](https://vitest.dev/).
## Deployment
This repository includes information on two deployment strategies.

### Docker
Using the [Vue CLI documentation](https://cli.vuejs.org/guide/deployment.html#docker-nginx). Included in this repository are a Dockerfile that creates an nginx server that serves the built application, as well as an nginx.conf configuration file. In order to build a docker image from this repository, simply run the following:

```bash
docker build . -t <name-of-your-image>
```

To run this container on port `8080`, run the following (substituting the port number to a port of your choosing as needed):

```bash
docker run -d -p 8080:80 <name-of-your-image>
```

### AWS Static Site
For a cost-effective and performant method of hosting this application on AWS, please see the `static-site-deployment.md` document in the `/deployment` directory of this repository.

## CI/CD
This repository includes example CI/CD for Github Actions that runs linting and testing as well as deployment to AWS S3 for the main branch.