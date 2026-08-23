import modelData from '../data/potbelly-models.json';

export interface ModelRecord {
  id: string;
  recordCode: string;
  title: string;
  /** Null for records whose original files carried no date — currently `my-scene`. */
  date: string | null;
  dateLabel: string;
  year: string;
  sequence: string;
  sourceFormat: string;
  sourceFileName: string;
  modelUrl: string;
  posterUrl: string;
  sourceUrl: string;
  vertices: number;
  triangles: number;
  webBytes: number;
  sourceBytes: number;
}

/** Source order, exactly as authored. Never mutated. */
export const records = modelData as ModelRecord[];

export const totalRecords = records.length;

/** Undated records sort last; among dated records, newest first. */
function byDateDesc(a: ModelRecord, b: ModelRecord): number {
  if (a.date === b.date) return 0;
  if (a.date === null) return 1;
  if (b.date === null) return -1;
  return a.date < b.date ? 1 : -1;
}

/** The `count` most recently dated records. */
export function newest(count: number): ModelRecord[] {
  return [...records].sort(byDateDesc).slice(0, count);
}

/**
 * Resolve an intentional record selection in the supplied order.
 *
 * Curated surfaces should fail at build time when catalogue data changes rather
 * than quietly substituting a different record.
 */
export function selectRecords(ids: readonly ModelRecord['id'][]): ModelRecord[] {
  return ids.map((id) => {
    const record = records.find((candidate) => candidate.id === id);
    if (!record) throw new Error(`Unknown potbelly record: ${id}`);
    return record;
  });
}

/** Deep link into the 3D database, which selects the record from the hash. */
export function recordHref(record: ModelRecord): string {
  return `/potbelly-sculptures/3d-database#${record.id}`;
}
