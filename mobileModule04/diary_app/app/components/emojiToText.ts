export const EMOJI_MAP: Record<string, string> = {
  "happy": "😀",
  "sad": "😢",
  "angry": "😡",
  "love": "😍",
  "laughing": "😂",
  "sleepy": "😴",
  "fire": "🔥",
};
export function emojiToText(key: string): string {
  return EMOJI_MAP[key] || "unknown";
}