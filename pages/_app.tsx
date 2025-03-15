import React from "react";
import * as Avers from "avers";
import { config, Data, App, infoTable } from "../src/app";
import { parse } from "url";
import shallowEqual from "fbjs/lib/shallowEqual";
import { Env } from "../src/env";
import { useRouter } from "next/router";
import theme from "../src/theme";
import { ThemeProvider } from "@material-ui/core/styles";

export default ({ Component, pageProps }) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  const router = useRouter();
  React.useEffect(() => {
    // If window.location.href contains any additional query params, reflect them into
    // the router.
    const { query } = parse(window.location.href, true);
    const extendedQuery = { ...router.query, ...query };
    if (!shallowEqual(router.query, extendedQuery)) {
      const href = { pathname: router.pathname, query: extendedQuery };
      router.replace(href, router.asPath).catch(console.error);
    }
  }, [router]);

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
    <ThemeProvider theme={theme}>
      <Env.Provider value={{ app: new App(app.data) }}>
        <Component generationNumber={generationNumber} app={app} {...pageProps} />
      </Env.Provider>
    </ThemeProvider>
  );
};
