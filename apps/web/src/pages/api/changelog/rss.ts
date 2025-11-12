import type { NextApiRequest, NextApiResponse } from "next";
import changelogData from "@/data/changelog.json";
import type { ChangelogEntry } from "@/types/changelog";

/**
 * RSS Feed endpoint for changelog
 * Generates RSS 2.0 feed from changelog entries
 * Accessible at /api/changelog/rss
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const changelog = (changelogData as ChangelogEntry[]).sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nbcon.ai";
  const feedUrl = `${baseUrl}/api/changelog/rss`;
  const changelogUrl = `${baseUrl}/changelog`;

  // Generate RSS XML
  const rssItems = changelog
    .slice(0, 20) // Limit to latest 20 entries
    .map((entry) => {
      const entryUrl = `${baseUrl}/changelog/${entry.version}`;
      const pubDate = new Date(entry.date).toUTCString();
      const description = entry.fullNotes || entry.highlights.join(". ") || "";
      
      // Build category list
      const categories = Object.entries(entry.categories)
        .filter(([_, items]) => items && (Array.isArray(items) ? items.length > 0 : true))
        .map(([category]) => category.replace(/([A-Z])/g, " $1").trim())
        .join(", ");

      return `
    <item>
      <title>nbcon.ai v${entry.version} - ${entry.type.charAt(0).toUpperCase() + entry.type.slice(1)} Release</title>
      <link>${entryUrl}</link>
      <guid isPermaLink="true">${entryUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${description}]]></description>
      <category>${entry.type}</category>
      ${categories ? `<category>${categories}</category>` : ""}
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>nbcon.ai Changelog</title>
    <link>${changelogUrl}</link>
    <description>Stay up to date with the latest features, improvements, and fixes in nbcon.ai</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${changelog.length > 0 ? new Date(changelog[0].date).toUTCString() : new Date().toUTCString()}</pubDate>
    <ttl>60</ttl>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.status(200).send(rss);
}

