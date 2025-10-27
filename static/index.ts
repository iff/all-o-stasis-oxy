import dev from "./dev/index"
import fluela from "./fluela/index"
import leutsch from "./leutsch/index"

const gyms = {
  dev,
  fluela,
  leutsch
};

export const getGymConfig = (gymName: string) => {
  return gyms[gymName as keyof typeof gyms] || gyms.dev;
};

const gym = gyms.dev; // default
const {
    grades, 
    sectors, 
    targets, 
    databaseUrl,
    adminEmail,
    LogoSVG, 
    SectorPickerSVG,
    ThemeColorPrimary,
    ThemeColorPrimaryText,
    ThemeColorSecondary,
} = gym;
export {
    grades,
    sectors, 
    targets, 
    databaseUrl,
    adminEmail,
    LogoSVG, 
    SectorPickerSVG,
    ThemeColorPrimary,
    ThemeColorPrimaryText,
    ThemeColorSecondary,
};
