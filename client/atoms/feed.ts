import { Manga } from "@/types";
import { atom } from "jotai";

export const feedAtom = atom<Manga[]>([]);
