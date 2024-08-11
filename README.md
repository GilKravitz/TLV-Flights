# Flight Data API

This api is a simple express server that provides endpoints to get information about flights from TLV airport.
The data retrived from the https://data.gov.il/dataset/flydata/resource/e83f763b-b7d7-479e-b172-ae981ddc6de5 api.

From the API docs we can see that the data is updated every 15 min e.g (12:00, 12:15, 12:30 ...), so to avoid fetching the data from the remote api every time a request is made, the server caches the data in memory (using cron) and invalidates the cache every 15 min.

## Features

- All operations are done through the cache, which means most of the time the complexity is O(1).
- The cache is stored in memory for simplicity (node-cache), but it can be easily replaced with a more robust solution like Redis.

## Build and Run the Server

```bash
# install dependencies
npm install

# start the server
npm start
```

## Run the Server in a Docker Container

```bash
# build the image
docker build -t flight-data-api .

# run the container
docker run -p 3000:3000 flight-data-api
```

## Swagger Documentation

For more information about the api endpoints and how to use them, you can check the swagger documentation by navigating to `http://localhost:3000/api-docs`.
