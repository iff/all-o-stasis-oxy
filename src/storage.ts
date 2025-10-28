import * as Avers from "avers";

export const roles: string[] = ["user", "setter", "admin"];

export class Account {
  login!: string;
  role!: string;
  email!: string;
  name!: string;
}
Avers.definePrimitive(Account, "login", "");
Avers.definePrimitive(Account, "role", roles[0]);
Avers.definePrimitive(Account, "email", "");
Avers.definePrimitive(Account, "name", "");

export class Boulder {
  setter!: string[];
  sector!: string;
  grade!: string;
  gradeNr!: number;
  setDate!: number;
  removed!: number;
  isDraft!: number;
  name!: string;
}

Avers.definePrimitive(Boulder, "setter", []);
Avers.definePrimitive(Boulder, "sector", "");
Avers.definePrimitive(Boulder, "grade", "");
Avers.definePrimitive(Boulder, "gradeNr", 0);
Avers.definePrimitive(Boulder, "setDate", 0);
Avers.definePrimitive(Boulder, "removed", 0);
Avers.definePrimitive(Boulder, "isDraft", 0);
Avers.definePrimitive(Boulder, "name", "");

export const gradeCompare = (grades: string[], a: string, b: string) => grades.indexOf(a) - grades.indexOf(b);

export function boulderCompare(grades: string[], a: Boulder, b: Boulder): number {
    if (a.grade === b.grade) {
        return a.gradeNr - b.gradeNr;
    } else {
        return grades.indexOf(a.grade) - grades.indexOf(b.grade);
    }
}

export function prettyPrintSector(sectorName: string): string {
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

export function prettySetDate(setDate: number): string {
  const d = new Date(setDate);
  return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
}

const aosNS = Symbol("all-o-stasis");

export interface BoulderStat {
  setOn: Date;
  removedOn: void | Date;
  setters: string[];
  sector: string;
  grade: string;
}

export const parseBoulderStat = (json: any): BoulderStat => ({
  ...json,
  setOn: new Date(Date.parse(json.setOn)),
  removedOn: json.removedOn ? new Date(Date.parse(json.removedOn)) : undefined
});

export const boulderStats = (aversH: Avers.Handle): Avers.Static<BoulderStat[]> => {
  const fetch = () =>
    aversH.config
      .fetch(`${aversH.config.apiHost}/stats/boulders`)
      .then(res => res.json())
      .then(bss => bss.map(parseBoulderStat));

  return new Avers.Static<BoulderStat[]>(aosNS, `boulderStats`, fetch);
};

export interface PublicProfile {
  name: string;
  avatar: string;
}

export const publicProfile = (aversH: Avers.Handle, accountId: string): Avers.Static<PublicProfile> => {
  const fetch = async () => {
    const res = await aversH.config.fetch(`${aversH.config.apiHost}/public-profile/${accountId}`);
    return res.json();
  };

  return new Avers.Static<PublicProfile>(aosNS, `publicProfile/${accountId}`, fetch);
};
