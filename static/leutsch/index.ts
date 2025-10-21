import config from "config.json";

export const grades = config.grades;
export const sectors = config.target.map((item: { sector: string }) => item.sector);
export const targets = config.target;

export const LogoSVG = () => (
);

export const SectorPickerSVG = () => (
);
