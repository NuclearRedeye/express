# Express Experiment

An experiment to learn more about express.js.

## Prerequisites

* You have a Linux or OSX machine. Windows should be supported but has not been tested.
* You have installed a recent version of [NVM](https://github.com/nvm-sh/nvm).
* You have installed a recent version of [Docker](https://www.docker.com/).

## Quick Start

```
nvm install && nvm use
npm install
npm run debug
```

You can then make requests to the server on http://localhost/users.

Alternatively, you can bundler the project into a container.

```sh
npm run release
docker build . -t nuclearredeye/express:local
docker run --rm -it -p 8080:80 nuclearredeye/express:local
```

You can then make requests to the server on http://localhost:8080/users.

## License

Licensed under [MIT](https://choosealicense.com/licenses/mit/)