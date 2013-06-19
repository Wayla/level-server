#!/usr/bin/env node

/**
 * Module dependencies.
 */

var optimist = require('optimist');
var Serve = require('level-serve');
var http = require('http');
var multilevel = require('multilevel');
var addServer = require('multilevel-serve');
var level = require('level');
var net = require('net');

var argv = optimist
  .usage('Host a standalone LevelDB file server.\nUsage: $0 [options]')

  .describe('path', 'Serve local database')
  .describe('addr', 'Serve remote database')

  .describe('http', 'Port to host http server on')
  .demand('http')

  .describe('multilevel', 'Port to host multilevel server on')
  .alias('multilevel', 'ml')

  .describe('keyEncoding', 'keyEncoding for levelUp')
  .describe('valueEncoding', 'valueEncoding for levelUp')

  .describe('help', 'Print usage instructions')
  .alias('help', 'h')

  .argv;

if (argv.help || !argv.path && !argv.addr) return optimist.printHelp();

/**
 * Get `db`.
 */

var db;

if (argv.path) {
  // local db
  var opts = {};
  if (argv.keyEncoding) opts.keyEncoding = argv.keyEncoding;
  if (argv.valueEncoding) opts.valueEncoding = argv.valueEncoding;
  db = level(argv.path, opts);
} else {
  // remote db
  db = multilevel.client();
  var con;
  if (/^[0-9]+$/.test(argv.addr)) {
    con = net.connect(argv.addr);
  } else {
    var segs = argv.addr.split(':');
    con = net.connect(segs[1], segs[0]);
  }
  db.pipe(con).pipe(db);
}

/**
 * Create server.
 */

var server = Serve(db);

/**
 * Host http server.
 */

http.createServer(function (req, res) {
  server.handle(req, res);
}).listen(argv.http);

/**
 * Host multilevel server.
 */

if (argv.multilevel) {
  addServer(db, server);
  net.createServer(function (con) {
    con.pipe(multilevel.server(db)).pipe(con);
  }).listen(argv.multilevel);
}
