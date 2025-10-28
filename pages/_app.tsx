import React from "react";
import * as Avers from "avers";
import { config, Data, App, infoTable } from "../src/app";
import { Env } from "../src/env";
import Head from "next/head";
import { getGymConfig } from "../static";
import { NextPageContext } from "next";

const MyApp = ({ Component, pageProps, gymName }) => {
  const gymConfig = React.useMemo(() => getGymConfig(gymName || 'dev'), [gymName]);
  const app = React.useMemo(() => {
    const aversH = Avers.newHandle({
      apiHost: config.databaseUrl,
      fetch: typeof window !== "undefined" ? window.fetch.bind(window) : () => new Promise(() => {}),
      createWebSocket: (path) => {
        const url = new URL(`${config.databaseUrl}${path}`);
        url.protocol = url.protocol.replace("http", "ws");
        return new WebSocket(url.toString());
      },
      now: typeof window !== "undefined" ? window.performance.now.bind(window.performance) : () => 0,
      infoTable,
    });

    const data = new Data(aversH);
    return new App(data);
  }, []);

  const [generationNumber, setGenerationNumber] = React.useState(0);
  React.useEffect(() => {
    let refreshId: undefined | number;

    const generationListener = () => {
      if (refreshId === undefined) {
        refreshId = requestAnimationFrame(() => {
          refreshId = undefined;
          setGenerationNumber(app.data.aversH.generationNumber);
        });
      }
    };

    Avers.attachGenerationListener(app.data.aversH, generationListener);
    Avers.restoreSession(app.data.session);

    const windowAny = window as any;
    windowAny.Avers = Avers;
    windowAny.app = app;

    return () => {
      if (refreshId !== undefined) {
        cancelAnimationFrame(refreshId);
      }
    };
  }, [app, setGenerationNumber]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Env.Provider value={{ app: new App(app.data), config: gymConfig }}>
        <Component generationNumber={generationNumber} app={app} {...pageProps} />
      </Env.Provider>
    </>
  );
};

MyApp.getInitialProps = async (ctx: NextPageContext) => {
  if (ctx.req) {
    const hostname = ctx.req.headers.host || '';
    const gymName = hostname.split('.')[0] || 'dev';
    return { gymName }
  } else {
    const gymName = window?.location.host.split('.')[0] || 'dev';
    return { gymName }
  }
}

export default MyApp;
