import { describe, test, expect } from "vitest";
import { getMangaDetails } from "../src";
import OnaniMasterKurosawaData from "./data/details-onani-master-kurosawa.json";
import MatoSeiheiNoSlave from "./data/details-mato-seihei-no-slave.json";
import BlueFlame from "./data/details-blue-flame.json";

const mangasUrls = [
  {
    label: "Onani Master Kurosawa",
    id: "onani-master-kurosawa",
    shouldBeExpect: OnaniMasterKurosawaData,
  },
  {
    label: "Blue Flame",
    id: "blue-flame",
    shouldBeExpect: BlueFlame,
  },
  {
    label: "Mato Seihei No Slave ",
    id: "mato-seihei-no-slave",
    shouldBeExpect: MatoSeiheiNoSlave,
  },
];

describe.each(mangasUrls)(
  "details of $label",
  async ({ label, id, shouldBeExpect }) => {
    const details = await getMangaDetails(id);

    test("test details information", async () => {
      expect(details).toEqual(shouldBeExpect);
    });
  },
);
