export type SearchableItem = {
  title: string;
  search: string;
};

export type RankedSearchItem<T> = {
  item: T;
  score: number;
};

export const normalizeSearchText = (value = '') =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const differsByOneEdit = (queryTerm: string, candidate: string) => {
  const lengthDifference = queryTerm.length - candidate.length;
  if (Math.abs(lengthDifference) > 1) return false;

  if (lengthDifference === 0) {
    const mismatches: number[] = [];
    for (let index = 0; index < queryTerm.length; index += 1) {
      if (queryTerm[index] === candidate[index]) continue;
      mismatches.push(index);
      if (mismatches.length > 2) return false;
    }

    if (mismatches.length === 1) return true;
    if (mismatches.length !== 2) return false;

    const [first, second] = mismatches;
    return (
      second === first + 1 &&
      queryTerm[first] === candidate[second] &&
      queryTerm[second] === candidate[first]
    );
  }

  const longer = lengthDifference > 0 ? queryTerm : candidate;
  const shorter = lengthDifference > 0 ? candidate : queryTerm;
  let longerIndex = 0;
  let shorterIndex = 0;
  let edits = 0;

  while (longerIndex < longer.length && shorterIndex < shorter.length) {
    if (longer[longerIndex] === shorter[shorterIndex]) {
      longerIndex += 1;
      shorterIndex += 1;
      continue;
    }

    edits += 1;
    if (edits > 1) return false;
    longerIndex += 1;
  }

  return true;
};


const scoreTerm = (term: string, titleWords: string[], searchWords: string[]) => {
  if (titleWords.includes(term)) return 120;
  if (searchWords.includes(term)) return 78;

  if (term.length >= 3) {
    if (titleWords.some((word) => word.startsWith(term))) return 62;
    if (searchWords.some((word) => word.startsWith(term))) return 40;
  }

  if (term.length < 5) return null;

  if (titleWords.some((word) => differsByOneEdit(term, word))) return 36;
  if (searchWords.some((word) => differsByOneEdit(term, word))) return 22;

  return null;
};

export function rankSearchItems<T extends SearchableItem>(
  items: readonly T[],
  rawQuery: string,
): RankedSearchItem<T>[] {
  const query = normalizeSearchText(rawQuery);
  if (!query) return [];

  const terms = query.split(' ').filter(Boolean);

  return items
    .map((item) => {
      const title = normalizeSearchText(item.title);
      const search = normalizeSearchText(item.search);
      const titleWords = title.split(' ').filter(Boolean);
      const searchWords = search.split(' ').filter(Boolean);
      let score = 0;

      for (const term of terms) {
        const termScore = scoreTerm(term, titleWords, searchWords);
        if (termScore === null) return null;
        score += termScore;
      }

      if (title === query) score += 600;
      else if (title.startsWith(`${query} `)) score += 260;
      else if (title.includes(query)) score += 180;
      else if (search.includes(query)) score += 90;

      return { item, score };
    })
    .filter((match): match is RankedSearchItem<T> => match !== null)
    .sort((first, second) => second.score - first.score || first.item.title.localeCompare(second.item.title));
}
