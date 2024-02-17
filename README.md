


## Description

Design and implement a backend service that exposes an interface to create/update/delete records in a single
operation.

## Installation

```bash
$ npm install
```

## Installation

```bash
$ npm install
```

## Prerequisite Installation
```
node
Nestjs-cli
PrismaDocker  

## Running the app

```bash

#Database
$ docker-compose up

# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Single API path
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



## License

Nest is [MIT licensed](LICENSE).
