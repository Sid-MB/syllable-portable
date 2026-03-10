import { expect, test, describe } from "bun:test";
import { syllableCount } from "../index.js";

describe("syllableCount", () => {
  test("counts syllables for simple words", async () => {
    expect(await syllableCount("hello")).toBe(2);
    expect(await syllableCount("world")).toBe(1);
  });

  test("counts syllables for dictionary words", async () => {
    expect(await syllableCount("dictionary")).toBe(4);
    expect(await syllableCount("syllable")).toBe(3);
  });

  test("counts syllables for acronyms", async () => {
    expect(await syllableCount("abc")).toBe(3);
    expect(await syllableCount("adhd")).toBe(4);
  });

  test("counts syllables for sentences", async () => {
    const text = "The quick brown fox jumps over the lazy dog";
    // The(1) quick(1) brown(1) fox(1) jumps(1) over(2) the(1) lazy(2) dog(1) = 11
    expect(await syllableCount(text)).toBe(11);
  });

  test("handles punctuation and casing", async () => {
    expect(await syllableCount("Dictionary.")).toBe(4);
    expect(await syllableCount("HELLO!!!")).toBe(2);
  });
});
