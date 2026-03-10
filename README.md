# syllable-portable

A Node-free, lazy-loading English syllable counter optimized for Edge environments (Cloudflare Workers, Vercel Edge, etc.).

## Installation

```bash
npm install git+https://github.com/USER_NAME/syllable-portable.git
```

## Usage

```javascript
import { syllableCount } from 'syllable-portable';

const count = await syllableCount("hello world");
console.log(count); // 3
```

## Features
- **Zero Node.js Dependencies:** Works on any ESM-compatible platform.
- **Lazy Loading:** The 4.5MB dictionary is only loaded into memory when `syllableCount` is actually called.
- **Accurate:** Uses the CMU Pronouncing Dictionary for high-quality results.
