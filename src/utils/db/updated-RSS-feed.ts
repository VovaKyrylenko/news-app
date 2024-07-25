import { parseStringPromise } from "xml2js";
import { fetchRSSData } from "../fetch-RSS-data";
import { prisma } from "@/lib/db";

export const updateRSSFeed = async () => {
  try {
    const rssData = await fetchRSSData();
    const data = await parseStringPromise(rssData);
    const items = data.rss.channel[0].item;

    for (const item of items) {
      const title = item.title[0];
      const description = item.description[0];
      const link = item.link[0];
      const pubDate = new Date(item.pubDate[0]);
      const imageLink = item["media:thumbnail"][0].$.url;

      await prisma.news.upsert({
        where: { link },
        create: { title, description, link, pubDate, imageLink },
        update: {},
      });
    }

    console.log("RSS feed updated and stored.");
  } catch (error) {
    console.error("Error updating RSS feed:", error);
  }
};
