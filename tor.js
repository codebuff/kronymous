/*
 * Copyright 2015 The Native Client Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

NaClTerm.nmf = 'tor.nmf';
//NaClTerm.cwd = '/home/user';

/* check whether another instance of this app is running
 #TODO(dt) check if default port is occupied
 #TODO(dt) check if(allowed) another tor process is running outside chrome. */
function anotherTorRunning(){
  // since chrome 34 multiple windows in apps are not allowed by default
  // thus returning false without any checking, (for now)
  // return NaClTerm.started;
  return false;
}
function saveTorArgs() { // this fucntion is redundant for now
  var torArgs_ = 'defaults';
  chrome.storage.local.set({
    torArgs: torArgs_
  }, function () {
        //
    });
}
// here argv is just one string
function populateArgv() { // this fucntion is redundant for now
  chrome.storage.local.get({
    torArgs: 'default'
  }, function (items) {
    if(items.torArgs === "default"){
      // just to be sure
       NaClTerm.argv = ['--SOCKSPort', '9999'];
      //playing it safe for now,
      NaClTerm.argv = NaClTerm.argv.concat(['ReachableAddresses','*:80,*:443']);
      //TODO(dt) remove this once gui is ready
      //NaClTerm.argv = ['-f', '/mnt/http/torrc'];
    }
        //console.log(items.torArgs);
  });
}
function runTor() {
    if(!anotherTorRunning()){
        populateArgv();
        NaClTerm.init();
    }else{
        console.log("another tor instance running,exiting...");
        window.open('', '_self', '');
        window.close();

    }
}
window.onload = function() {
    lib.init(function() {
        runTor();
    });
};
