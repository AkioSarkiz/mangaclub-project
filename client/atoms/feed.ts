import { Manga } from "@/types";
import { atom } from "jotai";

export const mangaFeed = atom<Manga[]>([]);
