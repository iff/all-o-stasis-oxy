import * as Avers from "avers";
import Router from "next/router";
import { App } from "./app";
import * as Storage from "./storage";
import { GymConfig } from "./env";

function mkBoulder(app: App, config: GymConfig): Storage.Boulder {
  const now = Date.now();
  let boulder = Avers.mk(Storage.Boulder, { setter: [app.data.session.objId], setDate: now });
  boulder.grade = config.grades[0];
  boulder.sector = config.sectors[0];
  return boulder;
}

function clBoulder(app: App, boulder: any): Storage.Boulder {
  const now = Date.now();
  return Avers.mk(Storage.Boulder, { setter: [app.data.session.objId], setDate: now, ...boulder });
}

export const resetBoulderCollections = (app: App): void => {
  Avers.resetObjectCollection(app.data.bouldersCollection);
  Avers.resetObjectCollection(app.data.ownedBoulderCollection);
  Avers.resetObjectCollection(app.data.activeBouldersCollection);
  Avers.resetObjectCollection(app.data.draftBouldersCollection);
};

export function createBoulder(app: App, config: GymConfig) {
  const promise = Avers.createObject(app.data.aversH, "boulder", mkBoulder(app, config)).then((id) => {
    resetBoulderCollections(app);
    Router.push(`/boulder/${id}`);
    return id;
  });

  Avers.startNextGeneration(app.data.aversH);

  return promise;
}

export function cloneBoulder(app: App, boulderE: Avers.Editable<Storage.Boulder>) {
  const promise = Avers.createObject(app.data.aversH, "boulder", clBoulder(app, boulderE.content)).then((id) => {
    resetBoulderCollections(app);
    Router.push(`/boulder/${id}`);
    return id;
  });

  Avers.startNextGeneration(app.data.aversH);

  return promise;
}

export function role(app: App): string {
  const objId = app.data.session.objId;
  if (!objId) {
    return "user";
  }

  return Avers.lookupContent<Storage.Account>(app.data.aversH, objId)
    .fmap((accountE) => accountE.role)
    .get("user");
}

// filter on the client
export function sectorBoulders(app: App, sectorName: string): Avers.Editable<Storage.Boulder>[] {
  return app.data.activeBouldersCollection.ids
    .get<string[]>([])
    .map((boulderId) => Avers.lookupEditable<Storage.Boulder>(app.data.aversH, boulderId).get(null))
    .filter((x) => x !== null && x.content.sector === sectorName && !x.content.removed) as any;
}

export function activeBoulders(app: App): Avers.Editable<Storage.Boulder>[] {
  return app.data.activeBouldersCollection.ids
    .get<string[]>([])
    .map((boulderId) => Avers.lookupEditable<Storage.Boulder>(app.data.aversH, boulderId).get(null))
    .filter((x) => x !== null && !x.content.removed && x.content.isDraft == 0) as any;
}

export function draftBoulders(app: App): Avers.Editable<Storage.Boulder>[] {
  return app.data.draftBouldersCollection.ids
    .get<string[]>([])
    .map((boulderId) => Avers.lookupEditable<Storage.Boulder>(app.data.aversH, boulderId).get(null))
    .filter((x) => x !== null && !x.content.removed && x.content.isDraft !== 0) as any;
}

export function emptyGym(app: App) {
  const boulders = activeBoulders(app);
  const confirmation = window.prompt(
    "Wirklich alle (" +
      boulders.length +
      ") Boulder in der HALLE entfernen?\n\n" +
      "Gib 'HALLE LEEREN' ein, um das entfernen ALLER Boulders zu bestätigen:",
  );

  if (confirmation === "HALLE LEEREN") {
    removeBoulders(app, boulders);
  }
}

export function emptySector(app: App, sectorName: string) {
  const boulders = sectorBoulders(app, sectorName);
  const confirmation = window.prompt(
    "Wirklich alle (" +
      boulders.length +
      ") Boulder im Sektor " +
      sectorName +
      " entfernen?\n\n" +
      "Gib 'ENTFERNEN' ein, um das entfernen zu bestätigen:",
  );

  if (confirmation === "ENTFERNEN") {
    removeBoulders(app, boulders);
  }
}

function removeBoulders(app: App, boulders: Avers.Editable<Storage.Boulder>[]) {
  const now = Date.now();
  boulders.forEach((boulder) => {
    boulder.content.removed = now.valueOf();
  });

  resetBoulderCollections(app);
}
