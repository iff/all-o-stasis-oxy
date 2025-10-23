import fluela from "./fluela/index"
import leutsch from "./leutsch/index"

const gyms = {
  fluela,
  leutsch
};

const gym = gyms[process.env.NEXT_PUBLIC_GYM as keyof typeof gyms];
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
