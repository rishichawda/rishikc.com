import type { CollectionEntry } from "astro:content";

export interface SeriesInfo {
  currentIndex: number;
  totalParts: number;
  previousPart?: SeriesPart;
  nextPart?: SeriesPart;
  allParts: SeriesPart[];
  isFirstPart: boolean;
  isLastPart: boolean;
  isOngoing: boolean;
}

export interface SeriesPart {
  title: string;
  path: string;
  isCurrent?: boolean;
}

/**
 * Extract series information for a given article
 * This function now requires all articles to build the complete series info
 */
export function getSeriesInfo(
  article: CollectionEntry<"articles">,
  allArticles: CollectionEntry<"articles">[]
): SeriesInfo | null {
  const series = article.data.series;
  
  if (!series || !series.title || series.currentPart === undefined) {
    return null;
  }

  // Get all articles in the same series
  const seriesArticles = getSeriesArticles(article, allArticles);
  
  if (seriesArticles.length === 0) {
    return null;
  }

  // Build parts array from series articles
  const allParts = seriesArticles.map(seriesArticle => ({
    title: seriesArticle.data.title,
    path: seriesArticle.data.path,
    isCurrent: seriesArticle.data.path === article.data.path
  }));

  const currentIndex = series.currentPart - 1; // Convert to 0-based index
  const previousPart = currentIndex > 0 ? allParts[currentIndex - 1] : undefined;
  const nextPart = currentIndex < allParts.length - 1 ? allParts[currentIndex + 1] : undefined;

  return {
    currentIndex: series.currentPart, // 1-based index for display
    totalParts: allParts.length,
    previousPart,
    nextPart,
    allParts,
    isFirstPart: currentIndex === 0,
    isLastPart: currentIndex === allParts.length - 1,
    isOngoing: series.ongoing || false
  };
}

/**
 * Get all articles that belong to the same series as the given article
 */
export function getSeriesArticles(
  currentArticle: CollectionEntry<"articles">, 
  allArticles: CollectionEntry<"articles">[]
): CollectionEntry<"articles">[] {
  const currentSeries = currentArticle.data.series;
  
  if (!currentSeries || !currentSeries.title) {
    return [];
  }

  return allArticles
    .filter(article => 
      article.data.series?.title === currentSeries.title &&
      article.data.series?.currentPart !== undefined
    )
    .sort((a, b) => {
      const aPart = a.data.series!.currentPart!;
      const bPart = b.data.series!.currentPart!;
      return aPart - bPart;
    });
}

/**
 * Check if an article is part of a series
 */
export function isPartOfSeries(article: CollectionEntry<"articles">): boolean {
  return !!(article.data.series && article.data.series.title && article.data.series.currentPart !== undefined);
}

/**
 * Get the series title from the metadata
 */
export function getSeriesTitle(series: NonNullable<CollectionEntry<"articles">["data"]["series"]>): string {
  return series.title || "";
}

/**
 * Get all series from a collection of articles
 */
export function getAllSeries(allArticles: CollectionEntry<"articles">[]): Array<{
  seriesTitle: string;
  articles: CollectionEntry<"articles">[];
  isOngoing: boolean;
  totalParts: number;
}> {
  const seriesMap = new Map<string, {
    seriesTitle: string;
    articles: CollectionEntry<"articles">[];
    isOngoing: boolean;
    totalParts: number;
  }>();

  allArticles.forEach(article => {
    if (isPartOfSeries(article)) {
      const seriesTitle = getSeriesTitle(article.data.series!);
      
      if (!seriesMap.has(seriesTitle)) {
        seriesMap.set(seriesTitle, {
          seriesTitle,
          articles: [],
          isOngoing: article.data.series!.ongoing || false,
          totalParts: 0
        });
      }
      
      seriesMap.get(seriesTitle)!.articles.push(article);
    }
  });

  // Convert to array and sort articles within each series
  const allSeries = Array.from(seriesMap.values()).map(series => ({
    ...series,
    articles: series.articles.sort((a, b) => {
      const aPart = a.data.series!.currentPart!;
      const bPart = b.data.series!.currentPart!;
      return aPart - bPart;
    }),
    totalParts: series.articles.length
  }));

  // Sort series by the publication date of their first article
  allSeries.sort((a, b) => {
    const aFirstDate = a.articles[0]?.data.date.getTime() || 0;
    const bFirstDate = b.articles[0]?.data.date.getTime() || 0;
    return bFirstDate - aFirstDate; // Most recent first
  });

  return allSeries;
}
