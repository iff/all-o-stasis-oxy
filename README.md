> The frontend of the boulder app

To run the app locally, use the following commands:

```
npm install
npm run dev
```

# Deployment

The app can be deployed to any static file server. Build the app with

```
npm run build
```

and then copy the `out/` folder to your server.

# Configuration

Configuration is done through environment variables and config in `static/gym/${NEXT_PUBLIC_GYM}`.

| Environment variable   | Default value           |
|------------------------|-------------------------|
| DATABASE_URL           | http://localhost:8000   |
| NEXT_PUBLIC_GYM        | fluela                  |

You can define the environment variables on the commandline:

```
$ DATABASE_URL=https://api.example.com npm run dev
```

or place them into a `.env` file in this folder. Next will automatically pick any variables which are defined there.

```
$ cat .env
DATABASE_URL=https://api.example.com
$ npm run dev
```
