import font from "../fonts/bigCommentFont.json";

export function renderAscii(text: string): string {
  const glyphMap = font.glyphs as Record<string, string[]>;

  // ✅ 원본 개행 기준으로 분리
  const inputLines = text.split(/\r?\n/);

  const outputBlocks: string[] = [];

  for (const line of inputLines) {
    const upper = line.toUpperCase();

    // 한 줄짜리 ASCII 블록 생성
    const asciiLines = Array(font.height).fill("");

    for (const ch of upper) {
      const glyph =
        glyphMap[ch] ??
        Array(font.height).fill("#".repeat(font.width));

      for (let i = 0; i < font.height; i++) {
        asciiLines[i] += glyph[i] + font.gap;
      }
    }

    outputBlocks.push(asciiLines.join("\n"));
  }

  // ✅ 블록 사이를 개행으로 연결
  return outputBlocks.join("\n");
}
