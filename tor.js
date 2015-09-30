/*
 * Copyright 2015 The Native Client Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

NaClTerm.nmf = '../tor.nmf';

/* check whether another instance of this app is running
 #TODO(dt) check if default port is occupied
 #TODO(dt) check if(allowed) another tor process is running outside chrome. */
function anotherTorRunning(){
  // since chrome 34 multiple windows in apps are not allowed by default
  // thus returning false without any checking, (for now)
  // return NaClTerm.started;
  return false;
}

function populateArgv() {
  //TODO(dt) get parameters from storage once GUI is ready.
  //tor socks proxy port
  NaClTerm.argv = ['--SOCKSPort', '6969'];
  //playing it safe for now,tor creates relays/bridges through
  // these addresses only
  NaClTerm.argv = NaClTerm.argv.concat(['ReachableAddresses','*:80,*:443']);
}

function runTor() {
  if(!anotherTorRunning()){
    populateArgv();
    NaClTerm.init();
  }
}

window.onload = function() {
  /*lib.init(function() {
    runTor();
  });*/
};