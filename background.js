/*
 * Copyright 2015 The Native Client Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

'use strict';

// mount points are defined in naclprocess.js
// TODO(dt) make sure that datadirectory for tor is set to default for now
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('gui/index.html', {
    'bounds': {
      'width': 850,
      'height': 650,
    },
  });
});

chrome.runtime.onSuspend.addListener(function() {
  // TODO(dt) add code to facilitate graceful exit of tor.
});