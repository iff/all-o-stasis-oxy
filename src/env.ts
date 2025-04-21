import * as Avers from "avers";
import * as React from "react";
import { config, Data, App, infoTable } from "./app";

export interface Env {
  app: App;
}

export const Env = React.createContext<Env>({
  app: ((): App => {
    const aversH = Avers.newHandle({
      apiHost: config.databaseUrl,
      fetch:
        typeof window !== "undefined"
          ? window.fetch.bind(window)
          : async () => {
              throw new Error("fetch");
            },
      createWebSocket: (path) => {
        const url = new URL(`${config.databaseUrl}${path}`);
        url.protocol = url.protocol.replace("http", "ws");
        return new WebSocket(url.toString());
      },
      now: typeof window !== "undefined" ? window.performance.now.bind(window.performance) : () => 0,
      infoTable
    });

    const data = new Data(aversH);
    return new App(data);
  })()
});

export const useEnv = () => {
  return React.useContext(Env);
};
