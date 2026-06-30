import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { SITE } from "@/config/site";
import { getPublishedArticles } from "@/lib/content";

/** RSS 2.0 feed of all published articles, newest first. */
export const GET: APIRoute = async (context) => {
  const articles = await getPublishedArticles();

  return rss({
    title: `${SITE.name} — Articles`,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.publishDate,
      link: `/articles/${article.id}`,
      categories: article.data.tags,
    })),
    customData: "<language>en-us</language>",
  });
};
