# syllable-portable

A Node-free, lazy-loading English syllable counter optimized for Edge environments (Cloudflare Workers, Vercel Edge, etc.).

## Installation

Since this package is not published to the npm registry, install it directly from GitHub:

```bash
# Using npm
npm install https://github.com/YOUR_USERNAME/syllable-portable.git

# Using bun
bun add https://github.com/YOUR_USERNAME/syllable-portable.git
```

## Usage

The `syllableCount` function is asynchronous because it lazy-loads the 1.4MB dictionary file only when needed.

```javascript
import { syllableCount } from 'syllable-portable';

async function main() {
  const count = await syllableCount("Hello world, this is a test.");
  console.log(count); // 8
}

main();
```

## Why use this?
- **Small Entry Bundle:** The main logic is only ~17KB. The large CMU dictionary is a separate chunk.
- **Lazy Loading:** The dictionary is only fetched and parsed if you actually call `syllableCount`. This keeps your edge function's initial cold start time very low.
- **Node-free:** No usage of `fs`, `path`, or other Node.js built-ins. Works in browsers, Cloudflare Workers, Deno, and Bun.
- **Accurate:** Uses the CMU Pronouncing Dictionary logic for high-quality syllable counts.

## Development

This project uses [Bun](https://bun.sh) for development and testing.

```bash
# Install dependencies
bun install

# Build the optimized dictionary and bundle the JS
bun run build

# Run tests
bun test
```
