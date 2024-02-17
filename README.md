

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>


## Description

Design and implement a backend service that exposes an interface to create/update/delete records in a single
operation.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

##Single API path
```/items/manage```


## Sample Curl Request

```bash
curl --location 'localhost:3000/items/manage' \
--header 'Content-Type: application/json' \
--data '{
    "items": [
        {
            
            "name": "Item 22",
            "length": 10,
            "width": 5,
            "height": 10,
            "weight": 10,
            "color": "red",
            "qty": 20,
            "stackable": true,
            "tiltable": false
        },
        {
            "id": 21,
            "name": "update 21",
            "length": 10,
            "width": 5,
            "height": 10,
            "weight": 10,
            "color": "red",
            "qty": 20,
            "stackable": true,
            "tiltable": false
        }      
    ]
}'
```


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## License

Nest is [MIT licensed](LICENSE).
