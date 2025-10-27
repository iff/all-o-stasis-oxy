import config from "./config.json";

const databaseUrl = "https://apiv2-dev.boulderhalle.app/minimum";
const adminEmail = "admin@boulder.app";
const ThemeColorPrimary = "#C4BEC4";
const ThemeColorPrimaryText = "#333333";
const ThemeColorSecondary = "#424242";

const grades = config.grades;
const sectors = config.targets.map((item: { sector: string }) => item.sector);
const targets = config.targets;

const LogoSVG = () => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40">
  <text x="50" y="25" fontSize="20" fontWeight="bold" textAnchor="middle" fill="currentColor">
    DEV
  </text>
</svg>
);

const SectorPickerSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="2379" height="1393" fill="none" viewBox="0 0 2379 1393">
    <g id="SectorPicker" stroke="#000" strokeWidth="10">
      <g id="background" fill="#FECB93">
        <path id="background_2" d="M549 148v503H38.822l158.842-503z"></path>
        <path
          id="background_3"
          d="M1245 169h5v-63h444.35l128.97 62.499 1.03.501h82.84L2192 328.927v471.725L2055.63 881.5h-661.56l-283.02-127.558-3.14-1.419-2.45 2.441L978.929 881.5H680.557L632.5 833.914V546.129L728.883 169z"
        ></path>
        <path id="background_4" d="M184.021 768H480v324.42L419.865 1178H183.012z"></path>
        <path id="background_5" d="M2191 1337H789v-337h1402z"></path>
      </g>
      <g id="sectors" fill="#1E2A4C">
        <path id="hoefli" d="M192 1178.5h203V1325H37V736.5h374V766H187v412.5z"></path>
        <path
          id="kurswand"
          d="M286.872 556.685h197.123V651H36.732L204.214 96H549v115.556H283.114l-1.045 3.609-75.67 261.445-.833 2.88 2.148 2.092 75.669 73.685 1.456 1.418z"
        ></path>
        <path
          id="plaettliwand"
          d="M1297.54 60.5H1867v47.374l-51.16 49.278-116.51-19.583-.46-.077-.47.009-373.08 7.462-34.44-29.716-7.89-13.293z"
        ></path>
        <path
          id="starship"
          d="M800.5 410h3.991l.885-3.891L855.991 183.5H976.5v499.712l-125.422 77.48-114.737-24.381-25.153-143.176 30.882-69.607.623-1.404-.272-1.511L722.482 410z"
        ></path>
        <path
          id="dune"
          d="m1286.82 278.786 213.21 23.472 57.24 64.938 54.52 368.276-20.56 34.567-232.87-73.537-69.15-53.672-38.01-315.467z"
        ></path>
        <path
          id="bigboss"
          d="m1864.32 314.105 45.18-9.395 162.7 67.914 60.98 266.027-43.02 71.539-21.45 17.72-161 38.793-58.66-118.762z"
        ></path>
        <path id="spektrumfour" d="M789 1238h345v99H789z"></path>
        <path id="spektrumthree" d="M1501 1219v118h-345v-118z"></path>
        <path id="spektrumtwo" d="M1880 1175v162h-356v-162z"></path>
        <path id="spektrumone" d="M2243.96 1337H1904v-162.13l256.68-6.79z"></path>
      </g>
    </g>
  </svg>
);

export default {
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
