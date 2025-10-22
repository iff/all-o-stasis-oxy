import * as fluela from "./fluela/index.tsx"
import * as leutsch from "./leutsch/index.tsx"

const gyms = {
  fluela,
  leutsch
};

const gym = gyms[process.env.GYM];
export default gym;
