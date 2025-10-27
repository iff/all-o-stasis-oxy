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

Configuration is done through the config in `static/gym/${NEXT_PUBLIC_GYM}`.
