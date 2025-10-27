import fluela from "./fluela/index"
import leutsch from "./leutsch/index"

const gyms = {
  fluela,
  leutsch
};

export const getGymConfig = (gymName: string) => {
  return gyms[gymName as keyof typeof gyms] || gyms.fluela;
};

const gym = gyms.fluela; // default
const {
    grades, 
    sectors, 
    targets, 
    AdminEmail,
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
    AdminEmail,
    LogoSVG, 
    SectorPickerSVG,
    ThemeColorPrimary,
    ThemeColorPrimaryText,
    ThemeColorSecondary,
};
