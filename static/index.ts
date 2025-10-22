import * as fluela from "./fluela/index"
import * as leutsch from "./leutsch/index"

const gyms = {
  fluela,
  leutsch
};

const gym = gyms[process.env.NEXT_PUBLIC_GYM];
export default gym;
