export const fetchRSSData = async (): Promise<string> => {
  const response = await fetch("https://feeds.bbci.co.uk/news/rss.xml", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  return await response.text();
};
