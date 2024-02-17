


## Description

Holocene-BDC is a NestJS-based backend for managing items in a business-to-business distribution center. The application provides RESTful API endpoints for creating, updating, and managing items, as well as handling transactions involving multiple items.


## Features

Manage Items in Transactions: Perform multiple item operations (create, update, delete) within a single transaction.


##
Postman
https://documenter.getpostman.com/view/9521846/2sA2r7zi8p


## Installation

```bash
$ npm install
```


## Prerequisite Installation
```
node
Nestjs-cli
Prisma
Docker  
```

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
curl --location '43.204.92.175:3000/items/manage' \
--data '{
    "items": [
        {
            "name": "Item 80",
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
            "name": "update 81",
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
            "name": "update 82",
            "length": 10,
            "width": 5,
            "height": 10,
            "weight": 10,
            "color": "blue",
            "qty": 20,
            "stackable": true,
            "tiltable": false
        }
    ]
}'
```


## License

Nest is [MIT licensed](LICENSE).
