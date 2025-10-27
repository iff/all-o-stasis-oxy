import * as Avers from "avers";
import * as React from "react";
import { config, Data, App, infoTable } from "./app";
import { getGymConfig } from "../static/index";

export interface GymConfig {
  grades: any;
  sectors: string[];
  targets: any[];
  databaseUrl: string;
  adminEmail: string;
  LogoSVG: React.ComponentType;
  SectorPickerSVG: React.ComponentType;
  ThemeColorPrimary: string;
  ThemeColorPrimaryText: string;
  ThemeColorSecondary: string;
}

export interface Env {
  app: App;
  gymConfig: GymConfig;
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
  })(),
  gymConfig: getGymConfig("dev")
});

export const useEnv = () => {
  return React.useContext(Env);
};
