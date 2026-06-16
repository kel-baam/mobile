import { Note } from "../types/Note";
import { EMOJI_MAP } from "./emojiToText";
export const getIconStats = (entries: Note[]) => {
  const total = entries.length;

  const counts: Record<string, number> = {};
  entries.forEach((entry) => {
    counts[entry.icon] = (counts[entry.icon] ?? 0) + 1;
  });

   const stats = Object.keys(EMOJI_MAP).map((icon) => ({
    icon,
    count: counts[icon] ?? 0, 
    pct: parseFloat(counts[icon]?((counts[icon] ?? 0) / total * 100).toFixed(2): "0")  }));

  return stats
};