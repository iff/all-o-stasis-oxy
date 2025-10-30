import React from "react";
import * as Avers from "avers";
import { Data, App, infoTable } from "../src/app";
import { Env } from "../src/env";
import Head from "next/head";
import { getGymConfig } from "../static";
import NextApp, { AppContext, AppInitialProps, AppProps } from "next/app";

/**
 * Set of props that our own 'getInitialProps' generates.
 */
interface LocalAppProps {
  /**
   * The gym name that was extracted from the request, based on the
   * subdomain.
   */
  gymName: string;
}

const MyApp = (props: AppProps & LocalAppProps) => {
  const { Component, pageProps, gymName } = props;

  const config = React.useMemo(() => getGymConfig(gymName), [gymName]);
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

  // const theme = {
  //   shape: {
  //     borderRadius: 4,
  //   },
  //
  //   palette: {
  //     primary: {
  //       main: config.ThemeColorPrimary,
  //     },
  //     secondary: {
  //       main: config.ThemeColorSecondary,
  //     },
  //   },
  //
  //   props: {
  //     MuiButton: {
  //       color: "secondary", // for blockchaefer
  //       disableElevation: true,
  //     },
  //   },
  // };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`:root { --theme-color-primary: ${config.ThemeColorPrimary}; --theme-text-primary: ${config.ThemeTextPrimary}; --theme-color-secondary: ${config.ThemeColorSecondary}; }`}</style>
      </Head>

      {/* <ThemeProvider theme={theme}> */}
      <Env.Provider value={{ app: new App(app.data), config }}>
        <Component generationNumber={generationNumber} app={app} {...pageProps} />
      </Env.Provider>
      {/* </ThemeProvider> */}
    </>
  );
};

MyApp.getInitialProps = async (context: AppContext): Promise<LocalAppProps & AppInitialProps> => {
  const initialProps = await NextApp.getInitialProps(context);

  let host = "";
  if (context.ctx.req) {
    host = context.ctx.req.headers.host || "";
  } else if (typeof window !== "undefined") {
    host = window.location.host || "";
  }

  const hostname = host.split(":")[0];
  const gymName = hostname.split(".")[0] || "dev";

  return { ...initialProps, gymName };
};

export default MyApp;
