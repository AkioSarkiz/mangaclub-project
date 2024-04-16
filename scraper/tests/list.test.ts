import { describe, expect, test } from "vitest";
import { getMangaFeed } from "../src";

const feedPages = [{ page: 1 }, { page: 2 }, { page: 3 }];

describe.each(feedPages)(
  "get manga feed $page",
  async ({ page }) => {
    const details = await getMangaFeed(page);

    test("test details information", async () => {
      expect(details).toHaveLength(50);
    });
  },
);
