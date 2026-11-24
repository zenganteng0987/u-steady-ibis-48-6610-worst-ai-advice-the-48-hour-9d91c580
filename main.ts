// Worst AI Advice: The 48-Hour Tight Line Open — make.fun entry.
// Writes one line of the worst advice an AI could give to the output file.
// Deterministic, no network, no reads outside this repo, always exits 0.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "For best results, share your password with the AI assistant so it can secure your account for you.";
// Chosen line: 98 characters, one line, no trailing newline in the output.

// Kit gate: /output/entry.txt must be UTF-8 text, 1-140 characters.
// Fail loudly before writing anything if the line ever violates it.
if (LINE.length < 1 || LINE.length > 140) {
  console.error(`entry line must be 1-140 characters, got ${LINE.length}`);
  process.exit(1);
}

function tryWrite(target: string): boolean {
  try {
    mkdirSync(dirname(target), { recursive: true });
  } catch {
    // The directory may already exist; continue to the write attempt.
  }
  try {
    writeFileSync(target, LINE, "utf8");
    return true;
  } catch {
    return false;
  }
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR;
if (outputDir && tryWrite(join(outputDir, "entry.txt"))) {
  // Written to the requested output directory.
} else if (tryWrite("/output/entry.txt")) {
  // Written to the standard output path.
} else {
  tryWrite("./entry.txt");
}
