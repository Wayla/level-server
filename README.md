
# level-server

Standalone LevelDB file server.

## Usage

Given a database full of files at `./db`, create a http server on port 8000
that serves them:

```bash
$ level-server --path ./db --http 8000
```

Then:

```bash
$ curl http://localhost:8000/files/foo
Bar! :D
```

## API

```js
$ level-server --help
Host a standalone LevelDB file server.
Usage: level-server [options]

Options:
  --path      Serve local database
  --addr      Serve remote database
  --http      Port to host http server on  [required]
  --help, -h  Print usage instructions

Missing required arguments: http
```

## Installation

```js
$ npm install -g level-server
```

## License

(MIT)

Copyright (c) 2013 Wayla &lt;data@wayla.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
