import config from "./config.json";
import logo from "./logo.svg";

const databaseUrl = "https://apiv2.boulderhalle.app/blockchaefer";
const adminEmail = "admin@boulder.app";
const logoHref = "https://www.blockchaefer.ch";
const ThemeColorPrimary = "#464547";
const ThemeTextPrimary = "#e3e3e3";
const ThemeColorSecondary = "#9a9595";

const grades = config.grades;
const sectors = config.targets.map((item: { sector: string }) => item.sector);
const targets = config.targets;

function gradeColor(grade: string): string {
  return grade;
}

function prettyPrintSector(sectorName: string): string {
  return sectorName
    .replace(/one/i, " 1")
    .replace(/two/i, " 2")
    .replace(/three/i, " 3")
    .replace(/four/i, " 4")
    .replace(/ruess/i, "rüss")
    .replace(/oe/i, "ö")
    .replace(/ae/i, "ä")
    .replace(/Ue/i, "Ü");
}

const LogoSVG = () => (
  <img src={logo} alt="Blockchaefer Logo" style={{ height: '100%', width: 'auto' }} />
);

const SectorPickerSVG = () => (
  <svg width="2412" height="1393" viewBox="0 0 2412 1393" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SectorPicker">
      <path
        id="Vector 1"
        d="M670.5 608.5L721.5 548.5L759.5 521.5L884 476L1008 495.5L1126 476L1376 427L1621 486L1734 296V197V89H2341V1286H1594L453.5 1285V1229.5L510 1220.5L625 1170L853 1192L911 1186H1268L1539 1195H1594L1657 1073L1689 1023L1735 1000L1869 972L1994 1094H2087L2194.5 753L2202.5 626.5L2087 516L1943 572L1804 702L1707.5 805.5L1641 851.5L1397.5 856L1244.5 804L1129.5 836L907.5 827L717.5 715L670.5 608.5Z"
        fill="#464547"
        stroke="black"
        stroke-width="10"
      />
      <path
        id="Vector 2"
        d="M485.218 211L332.356 373L344.307 549.5L317.917 673H298V95L1734 89V134H1634.42L1386.45 166L1347.12 177.5L1298.32 154.5H1107.62H1035.42L994.092 189V247H975.171V239H930.358V247H912.433V199.5H723.223H535.01H506.628L485.218 211Z"
        fill="#464547"
        stroke="black"
        stroke-width="10"
      />
      <g id="sectors">
        <path
          id="bananehoeli"
          d="M251.134 981.5L445 979.551V1026.03L220 1027.47V814.895L445 810.108V855.087L250.995 858.501L246.083 858.587V863.5V976.5V981.551L251.134 981.5Z"
          fill="#1E2A4C"
          stroke="black"
          stroke-width="10"
        />
        <path
          id="sigiflueh"
          d="M431.544 274.387L431.358 274.565L431.191 274.761L343.191 378.261L341.873 379.811L342.012 381.84L350 499.17V575.014L323.178 711.61L294.5 786.097V679.5V89H499V209.864L431.544 274.387Z"
          fill="#1E2A4C"
          stroke="black"
          stroke-width="10"
        />
        <path
          id="ruessbaedli"
          d="M1782.79 395.699L1847.84 419.352L1755.55 538H1668.5H1220H1165V460.989L1364.01 415.626L1607.9 470.379L1611.63 471.215L1613.42 467.839L1681.07 340.003L1712.54 308.536L1714 307.071V305V143V138H1709H1633H1632.55L1632.11 138.079L1344.94 189.75L1305 166.147V89.5H1344H1779.5V298V391V394.502L1782.79 395.699Z"
          fill="#1E2A4C"
          stroke="black"
          stroke-width="10"
        />
        <path
          id="aareschlucht"
          d="M1998.71 1084.27L2000.21 1086H2002.5H2081H2084.76L2085.8 1082.39L2181.16 753.061L2269.8 795.573L2143.87 1155.23L1985.59 1165.92L1841.85 1089.58L1840.36 1088.8L1838.71 1089.06L1726.71 1107.06L1724.1 1107.48L1722.98 1109.86L1672.84 1216.04L1598 1244.27V1191.33L1649.42 1041.02L1686.88 997.241L1729.42 967.756L1877.54 943.881L1998.71 1084.27Z"
          fill="#1E2A4C"
          stroke="black"
          stroke-width="10"
        />
        <path
          id="limmatspitz"
          d="M1011.87 490.87L1012.91 491.112L1013.96 490.908L1157 463.067V536.153L1033.42 540H906H905.298L904.623 540.193L798.123 570.693L796.1 571.273L795.1 573.125L764.6 629.625L763.159 632.294L764.861 634.805L795.361 679.805L796.109 680.909L797.308 681.494L878.308 720.994L879.252 721.454L880.3 721.496L1042.8 727.996L1042.9 728H1043H1241V815.264L1130.42 847.958L907.482 835.077L708.918 719.495L657.822 603.807L703.354 548.79L777.252 501.495L884.343 461.213L1011.87 490.87Z"
          fill="#1E2A4C"
          stroke="black"
          stroke-width="10"
        />
        <path
          id="gaebistorferhorn"
          d="M1034.02 161L1032.61 160.995L1031.4 161.73L945.628 213.981L509 208.067V89.5H858.5H1140.5H1295V161.981L1034.02 161Z"
          fill="#1E2A4C"
          stroke="black"
          stroke-width="10"
        />
        <path
          id="wasserschloss"
          d="M1682.08 721.499L1684.04 721.468L1685.46 720.107L1818.78 592.145L1869.2 646.991L1713.61 815.298L1645.3 868H1392.89L1250 815.51V728.421L1682.08 721.499Z"
          fill="#1E2A4C"
          stroke="black"
          stroke-width="10"
        />
        <path
          id="haexehoeli"
          d="M1818.65 584.582L1818.4 584.312L1818.11 584.083L1764.01 541.178L1856.93 423.129L1950.8 446.354L1951.86 446.615L1952.93 446.414L2088.84 420.807L2260.34 542.818L2276.49 662.242L2271.79 785.283L2183.11 743.868L2187 629.169L2187.08 626.765L2185.25 625.201L2081.25 536.201L2078.94 534.225L2076.12 535.365L1950.12 586.365L1949.49 586.621L1948.95 587.037L1874.55 644.27L1818.65 584.582Z"
          fill="#1E2A4C"
          stroke="black"
          stroke-width="10"
        />
        <path
          id="spinni"
          d="M1595.5 1245.04L453 1254.46V1217.76L507.795 1208.94L508.511 1208.82L509.164 1208.51L621.369 1154.63L851.442 1180.47L852.019 1180.53L852.596 1180.46L1226.93 1135.54L1588.43 1189.75L1595.5 1195.4V1202V1245.04Z"
          fill="#1E2A4C"
          stroke="black"
          stroke-width="10"
        />
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
  logoHref,
  LogoSVG,
  SectorPickerSVG,
  ThemeColorPrimary,
  ThemeTextPrimary,
  ThemeColorSecondary,
  gradeColor,
  prettyPrintSector,
};
