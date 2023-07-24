# SideDrawer JavaScript SDK

SDK for the SideDrawer API

## Installation

To install the SDK, use:

```bash
npm install -S @sidedrawer/sdk
```

## Example

Import SDK

```javascript
import SideDrawer from "@sidedrawer/sdk";
```

```javascript
const SideDrawer = require("@sidedrawer/sdk");
```

```html
<script type="text/javascript" src="/dist/index.browser.js"></script>
```

Create an instance of the SDK:

```javascript
const sd = new SideDrawer({
    accessToken: '...'
}); // you can target a different environment, using { baseUrl: 'https://...' }
```

Then you can use the different modules to communicate with our APIs. Examples:

Search Records

```javascript
const sd = new SideDrawer({
    accessToken: '...'
});

const records = await sd.records.search({
    sidedrawerId: '...',
    displayInactive: false,
    locale: 'en-US'
});
```

Upload File to Record

```javascript
const sd = new SideDrawer({
    accessToken: '...'
});

const controller = new AbortController();
const file = document.querySelector('#file-input').files[0];

await sd.files.upload({
  // params
  sidedrawerId: "...",
  recordId: "...",
  file, // Blob or ArrayBuffer
  fileName: "...",
  uploadTitle: "...",
  fileType: "...",
  fileExtension: "..",
  // options
  signal: controller.signal,
  maxRetries: 1,
  maxConcurrency: 1
});
```

Download File from a Record

Browser:

```typescript
const file: Blob = sd.files.download({
    sidedrawerId: "...",
    recordId: "...",
    fileNameWithExtension: "...",
});

const file: Blob = sd.files.download({
    sidedrawerId: "...",
    recordId: "...",
    fileToken: "...",
});
```

NodeJs

```typescript
const file: ArrayBuffer = sd.files.download({
    sidedrawerId: "...",
    recordId: "...",
    fileNameWithExtension: "...",
});

const file: ReadableStream = sd.files.download({
    sidedrawerId: "...",
    recordId: "...",
    fileToken: "...",
    responseType: "stream"
});
```

Create an instance of single SDK module:

```javascript
import { Context, Records } from "@sidedrawer/sdk";

const context = new Context({
    accessToken: '...'
});

const records = new Records(context);
```

or

```javascript
const SideDrawer = require("@sidedrawer/sdk");

const context = new SideDrawer.Context({
    accessToken: '...'
});

const records = new SideDrawer.Records(context);
```
