# Example of an Auth Service using Keycloak

This is a example project to show a simple use case of Keycloack as auth service and how to interact with a web app and an api.

The web app is a simple React app that will authenticate against the Keycloak server

The API is a simple Flask app that will validate the requests by checking the token sent in headers against the keycloak server.

## Diagram

```mermaid
flowchart TB
    subgraph  Auth Service
        db[(postgresql)]:::db
        keycloak-server:::is -- uses --> db[(postgresql)]:::db
    end

    subgraph  Api Service
        db-api[(postgresql)]:::db-api
        flask-server:::is -- uses --> db-api[(sqlite)]:::db-api
    end

    web-app:::is -- authenticates against --> keycloak-server:::is
    web-app:::is -- request data from --> flask-server:::is
    flask-server:::is -- validate auth against --> keycloak-server:::is

    classDef is fill:#4994eb, color:#ffffff;
    classDef db fill:#fad505, color:#191919;
    classDef db-api fill:#008000, color:#191919;
```

## Installation and Setting Up

There are multiple ways to set this example. The simpler one is by running all services at the same time using Docker Compose:

```bash
docker-compose up
```

Second option is by running each service separately (using docker or manually)

### Keycloak Start and Setup

Follow [keycloak auth instructions](keycloak-auth/README.md)

After that, follow instructions set in [here](#realm-settings)

## Web Client Start and Setup

Follow [web client instructions](keycloak-web/README.md) (using the client settings created in the previous step)

If you click on `Login` button, a login form should appear, witht he ability to registered a new user. Follow those instructions and you will return to the home page with logged in data

## Keycloack Setup

### Realm Settings

Go to realm section and create a new one. For this example lets called it "myrealm"

![alt text](resources/create-my-realm.png)

We will be using the default login provided by Keycloak, so we will be allowing user registration too.
Go to Realm Settings and enable the `User Registration` option

![alt text](resources/realm-user-registration.png)

### Client Settings

Go to Clients section and create a new client. For this example lets called it "client-web"

![alt text](resources/create-my-client.png)

This will be the client for the webapp and we should provide the proper urls allowed to interact with this client.
For the sake of this test, we will use a wildcard (\*), but in PROD we should include the proper urls here

![alt text](resources/valid-urls.png)

In the Capability config we will only set Standard Flow and Direct Access grants

![Alt text](resources/client-web-capability.png)
