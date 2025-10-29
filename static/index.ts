import blockchaefer from "./blockchaefer/index";
import dev from "./dev/index";
import fluela from "./fluela/index";
import leutsch from "./leutsch/index";
import quadrel from "./quadrel/index";

const gyms = {
  blockchaefer,
  dev,
  fluela,
  leutsch,
  quadrel,
};

export const getGymConfig = (gymName: string) => {
  // dont want to change the domain names now
  if (gymName == "minimum") {
    gymName = "fluela";
  } else if (gymName == "minimum-leutsch") {
    gymName = "leutsch";
  }
  return gyms[gymName as keyof typeof gyms] || gyms.dev;
};
