
# level-server

Standalone [LevelDB](https://github.com/rvagg/node-levelup) file server. Put
data into it using [multilevel](https://github.com/juliangruber/multilevel)
and get it server over http.

## Usage

Given a database full of files at `./db`, create a http server on port 8000
and a multilevel server on port 9000:

```bash
$ level-server --path ./db --http 8000 --multilevel 9000
```

Then connect to it from a client:

```js
var multilevel = require('multilevel');
var getServer = require('multilevel-serve');
var net = require('net');

var db = multilevel.client(getServer.manifest);
var server = getServer(db);
```

Now you can use all of [level-serve](https://github.com/level-serve)'s api:

```js
server.store('foo', 'Bar! :D');
```

And then get this file via http:

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
  --path              Serve local database
  --addr              Serve remote database
  --http              Port to host http server on        [required]
  --multilevel, --ml  Port to host multilevel server on
  --help, -h          Print usage instructions
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
