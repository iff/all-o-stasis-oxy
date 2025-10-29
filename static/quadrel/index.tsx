import config from "./config.json";
import logo from "./logo.svg";

const databaseUrl = "https://apiv2.boulderhalle.app/quadrel";
const adminEmail = "admin@boulder.app";
const logoHref = "https://quadrel.ch";
const ThemeColorPrimary = "#A5D6A7";

const grades = config.grades;
const sectors = config.targets.map((item: { sector: string }) => item.sector);
const targets = config.targets;

function gradeColor(_grade: string): string {
    return "white";
}

function prettyPrintSector(sectorName: string): string {
  return sectorName
    .replace("trainingswand", "cave links")
    .replace("wkfour", "cave rechts")
    .replace("wkthree", "WW links")
    .replace("wktwo", "WW (Wettkampfwand)")
    .replace("wkone", "WW rechts")
    .replace("blockone", "block 1")
    .replace("blocktwo", "block 2")
    .replace("kurswandone", "kurswand")
    .replace("kurswandtwo", "block 3");
}

const SectorPickerSVG = () => (
<svg width="1922" height="1224" viewBox="0 0 1922 1224" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="SectorPicker">
<g id="sektoren 1" clip-path="url(#clip0)">
<rect width="1922" height="1224" fill="white"/>
</g>
<path id="Vector 2" d="M1591 691L1003 814L824.937 768.26L655.461 788L487 434H256V156.384H784V591H1591V691Z" fill="#464547" stroke="black" stroke-width="10"/>
<path id="Vector 3" d="M1559 1094H590L561 911L622 838L891 873L1112 899L1176 845L1439 795L1452 725L1559 706V1094Z" fill="#464547" stroke="black" stroke-width="10"/>
<path id="Vector 4" d="M512 896H251.364V619H518L580 731L528 803L512 896Z" fill="#464547" stroke="black" stroke-width="10"/>
<g id="sectors">
<path id="kurswandtwo" d="M305.045 819L286.724 837H484V819H305.045Z" fill="#1E2A4C" stroke="black" stroke-width="10"/>
<path id="kurswandone" d="M286.549 700.303L286.655 699.548L286.981 698.86L300.481 670.36L300.867 669.546L301.512 668.918L320.512 650.418L321.447 649.507L322.707 649.17L358.207 639.67L358.843 639.5H359.5H418.674L270.5 637.082V735.17L282.024 732.426L286.549 700.303ZM478.345 640.474L465.177 640.259L465.489 640.492L494.989 662.492L496.07 663.298L496.599 664.538L527.303 736.5H545.888L508.582 662.337L478.345 640.474Z" fill="#1E2A4C" stroke="black" stroke-width="10"/>
<path id="blocktwo" d="M723.077 932.625L723.741 928.891L727.516 928.523L763.516 925.023L764.117 924.965L764.714 925.051L955.214 952.551L957.892 952.938L959.034 955.391L1007.69 1060H1016.96L967.162 942.262L941.626 930.862L704.773 899.645L678.955 911.46L659.42 1019.39L658.676 1023.5H654.5H628V1027H706.31L723.077 932.625Z" fill="#1E2A4C" stroke="black" stroke-width="10"/>
<path id="blockone" d="M1405.99 910.734L1410.24 990.5H1414.5V867.368L1400.49 861.688L1244.58 891.384L1186.78 905.956L1167.07 929.254L1170.37 1022.23L1187.76 1027.38L1192 921.799L1192.19 917.252L1196.73 917.007L1400.73 906.007L1405.73 905.738L1405.99 910.734Z" fill="#1E2A4C" stroke="black" stroke-width="10"/>
<path id="wkone" d="M1311 647.231L1309.75 646.837L1308.47 647.108L1234.13 662.832L1213.85 625H1525.3L1520.07 642.664L1381.3 669.351L1311 647.231Z" fill="#1E2A4C" stroke="black" stroke-width="10"/>
<path id="wktwo" d="M1203.46 625.034L1224.14 665.572L995.559 718.47L971.32 717.194L945.621 627.926L1203.46 625.034Z" fill="#1E2A4C" stroke="black" stroke-width="10"/>
<path id="wkthree" d="M935.745 628.029L960.386 713.626L818.833 657.848L817.662 657.387L816.413 657.535L725.821 668.25L693.461 635.89L689.844 629.932L935.745 628.029Z" fill="#1E2A4C" stroke="black" stroke-width="10"/>
<path id="wkfour" d="M744.943 620.073L686.344 620.922L687.989 595.846L688.083 594.425L687.413 593.168L614.298 455.942L743.057 455.035L744.943 620.073Z" fill="#1E2A4C" stroke="black" stroke-width="10"/>
<path id="cave" d="M538.399 210H628.751H704.919H743V317.862V446H608.67L526.681 323.498L543.578 285.01L544.081 283.864L543.985 282.617L538.399 210Z" fill="#1E2A4C" stroke="black" stroke-width="10"/>
<path id="trainingswand" d="M301 210H529.374L534.921 281.184L518.687 319.966L327.772 318.038L301 225.293V210Z" fill="#1E2A4C" stroke="black" stroke-width="10"/>
</g>
</g>
<defs>
<clipPath id="clip0">
<rect width="1922" height="1224" fill="white"/>
</clipPath>
</defs>
</svg>
);

export default {
  grades,
  sectors,
  targets,
  databaseUrl,
  adminEmail,
  logoHref,
  LogoSVG: logo,
  SectorPickerSVG,
  ThemeColorPrimary,
  gradeColor,
  prettyPrintSector,
};
