import type { NextApiRequest, NextApiResponse } from "next";
import changelogData from "@/data/changelog.json";
import type { ChangelogEntry } from "@/types/changelog";

/**
 * Atom Feed endpoint for changelog
 * Generates Atom 1.0 feed from changelog entries
 * Accessible at /api/changelog/atom
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const changelog = (changelogData as ChangelogEntry[]).sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nbcon.ai";
  const feedUrl = `${baseUrl}/api/changelog/atom`;
  const changelogUrl = `${baseUrl}/changelog`;

  // Generate Atom XML
  const entries = changelog
    .slice(0, 20) // Limit to latest 20 entries
    .map((entry) => {
      const entryUrl = `${baseUrl}/changelog/${entry.version}`;
      const updated = new Date(entry.date).toISOString();
      const published = new Date(entry.date).toISOString();
      const description = entry.fullNotes || entry.highlights.join(". ") || "";
      
      // Build category list
      const categories = Object.entries(entry.categories)
        .filter(([_, items]) => items && (Array.isArray(items) ? items.length > 0 : true))
        .map(([category]) => category.replace(/([A-Z])/g, " $1").trim());

      const categoryTags = categories
        .map((cat) => `    <category term="${cat}" />`)
        .join("\n");

      return `
    <entry>
      <id>${entryUrl}</id>
      <title>nbcon.ai v${entry.version} - ${entry.type.charAt(0).toUpperCase() + entry.type.slice(1)} Release</title>
      <link href="${entryUrl}" rel="alternate" />
      <updated>${updated}</updated>
      <published>${published}</published>
      <summary type="html"><![CDATA[${description}]]></summary>
      <category term="${entry.type}" />
${categoryTags}
    </entry>`;
    })
    .join("");

  const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>${feedUrl}</id>
  <title>nbcon.ai Changelog</title>
  <link href="${changelogUrl}" rel="alternate" />
  <link href="${feedUrl}" rel="self" />
  <updated>${changelog.length > 0 ? new Date(changelog[0].date).toISOString() : new Date().toISOString()}</updated>
  <author>
    <name>nbcon.ai</name>
  </author>
  <subtitle>Stay up to date with the latest features, improvements, and fixes in nbcon.ai</subtitle>
  ${entries}
</feed>`;

  res.setHeader("Content-Type", "application/atom+xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.status(200).send(atom);
}

