#!/usr/bin/env node

/**
 * Module dependencies.
 */

var optimist = require('optimist');
var Serve = require('level-serve');
var http = require('http');
var multilevel = require('multilevel');
var level = require('level');
var net = require('net');

var argv = optimist
  .usage('Host a standalone LevelDB file server.\nUsage: $0 [options]')

  .describe('path', 'Serve local database')
  .describe('addr', 'Serve remote database')

  .describe('http', 'Port to host http server on')
  .demand('http')

  .describe('help', 'Print usage instructions')
  .alias('help', 'h')

  .argv;

if (argv.help || !argv.path && !argv.addr) return optimist.printHelp();

var db;

if (argv.path) {
  // local db
  db = level(argv.path);
} else {
  // remote db
  db = multilevel.client();
  var con;
  if (/[0-9]{2,5}/.test(argv.addr)) {
    con = net.connect(argv.addr);
  } else {
    var segs = argv.addr.split(':');
    con = net.connect(segs[1], segs[0]);
  }
  db.pipe(con).pipe(db);
}

var server = Serve(db);
http.createServer(function (req, res) {
  server.serve(req, res);
}).listen(argv.http);
