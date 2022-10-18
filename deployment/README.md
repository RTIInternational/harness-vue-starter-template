
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