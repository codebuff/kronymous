/*
 * Copyright 2015 The Native Client Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

var saved_settings;

function set_settings(settings) {
    saved_settings = settings;
}
NaClTerm.nmf = '../tor.nmf';

/* check whether another instance of this app is running
 #TODO(dt) check if default port is occupied
 #TODO(dt) check if(allowed) another tor process is running outside chrome. */
function anotherTorRunning() {
    // since chrome 34 multiple windows in apps are not allowed by default
    // thus returning false without any checking, (for now)
    // return NaClTerm.started;
    return false;
}

function populateArgv() {
    //tor socks proxy port
    NaClTerm.argv = ['--SOCKSPort', saved_settings.tor_port];
    //tor creates relays/bridges through these addresses only
    //accessible ports
    if (saved_settings.accessible_ports != "all") {
        NaClTerm.argv = NaClTerm.argv.concat(['ReachableAddresses', saved_settings.reachable_addresses]);
    }
    // proxy settings
    if (saved_settings.proxy_type != "none"){
        var proxy_type = saved_settings.proxy_type;
        //if(proxy_type == "http") proxy_type = "HTTPProxy";
        if(proxy_type == "http/https") proxy_type = "HTTPSProxy";
        if(proxy_type == "socks4") proxy_type = "Socks4Proxy";
        if(proxy_type == "socks5") proxy_type = "Socks5Proxy";
        NaClTerm.argv = NaClTerm.argv.concat([proxy_type, saved_settings.proxy_address + ":" + saved_settings.proxy_port]);
    }

    if (saved_settings.adv_opt != "none") {
        NaClTerm.argv = NaClTerm.argv.concat(saved_settings.adv_opt.trim().split(" "));
    }

}

function runTor() {
    if (!anotherTorRunning()) {
        populateArgv();
        NaClTerm.init();
    }
}

window.onload = function () {
    /*lib.init(function() {
     runTor();
     });*/
};
