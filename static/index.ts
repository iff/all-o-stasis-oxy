import dev from "./dev/index"
import fluela from "./fluela/index"
import leutsch from "./leutsch/index"

const gyms = {
  dev,
  fluela,
  leutsch
};

export const getGymConfig = (gymName: string) => {
  // dont want to change the domain name now
  if (gymName == "minimum") {
      gymName = "fluela";
  }
  return gyms[gymName as keyof typeof gyms] || gyms.dev;
};
