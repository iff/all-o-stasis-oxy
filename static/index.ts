import dev from "./dev/index";
import fluela from "./fluela/index";
import leutsch from "./leutsch/index";

const gyms = {
  dev,
  fluela,
  leutsch,
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
