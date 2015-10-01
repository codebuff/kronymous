//this object will be passed to chrome.storage.set
var settings = {};
var to_be_saved = {
  configure_proxy: false,
  accessible_ports: false
};
//go back to home page button
document.getElementById('back_button').addEventListener("click", function () {
  location.href = "index.html";
});
//set theme
chrome.storage.local.get('theme', function (values) {
  if (values.theme == 'dark') {
    document.body.classList.add('dark');
  }
});
//on load effect
document.body.classList.add('closed');
setTimeout(function () {
  document.body.classList.add('open');
}, 10);
//call update settings view
updateSettingsValues();
//update settings view
function updateSettingsValues() {
  //loads saved values and reflects in the UI
  //theme switch
  chrome.storage.local.get('theme', function (values) {
    if (values.theme == 'dark') {
      //to simulate true
      document.getElementById('dt').click();
    }
  });
}
//proxy state change event
document.getElementById('proxy').addEventListener("click", function () {
  var chk = this.checked;
  if (chk) {
    document.getElementById('proxy_card').classList.add('expand');
    document.getElementById('proxy_card').classList.add('proxycard');
    to_be_saved["configure_proxy"] = true;
  }
  else {
    document.getElementById('proxy_card').classList.remove('expand');
    document.getElementById('proxy_card').classList.remove('proxycard');
    to_be_saved["configure_proxy"] = false;
  }
});
//proxy dropdown select
var lasttarget_proxy;
document.getElementById('select_proxy').addEventListener("click", function (e) {
  if (lasttarget_proxy) {
    lasttarget_proxy.classList.remove("selected");
  }
  //change the target element now
  lasttarget_proxy = e.target;
  lasttarget_proxy.classList.add("selected");
  //set text of drop down
  document.getElementById('proxy_text').innerHTML = e.target.getAttribute("data-text");
});
document.getElementById('acsport').addEventListener("click", function () {
  var chk = this.checked;
  if (chk) {
    document.getElementById('acsport_card').classList.add('expand');
    document.getElementById('acsport_card').classList.add('acsportcard');
    to_be_saved["accessible_ports"] = true;
  }
  else {
    document.getElementById('acsport_card').classList.remove('expand');
    document.getElementById('acsport_card').classList.remove('acsportcard');
    to_be_saved["accessible_ports"] = false;
  }
});
//autostart_tor
document.getElementById('autostart_tor').addEventListener("click", function () {
  if (this.checked) {
    chrome.storage.local.set({'autostart_tor': true});
  }
  else {
    chrome.storage.local.set({'autostart_tor': false});
  }
});
//theme switch
document.getElementById('dt').addEventListener("click", function () {
  if (this.checked) {
    document.body.classList.add('dark');
    chrome.storage.local.set({'theme': 'dark'});
  }
  else {
    document.body.classList.remove('dark');
    chrome.storage.local.set({'theme': 'light'});
  }
});
//bridges state change event
//document.getElementById('bridges').addEventListener("click", function () {
//    var chk = this.checked;
//    if (chk) {
//        document.getElementById('bridges_card').classList.add('expand');
//        document.getElementById('bridges_card').classList.add('bridgescard');
//    }
//    else {
//        document.getElementById('bridges_card').classList.remove('expand');
//        document.getElementById('bridges_card').classList.remove('bridgescard');
//    }
//});
////bridge dropdown select
//var lasttarget_bridge;
//document.getElementById('select_bridge').addEventListener("click", function (e) {
//    if (lasttarget_bridge) {
//        lasttarget_bridge.classList.remove("selected");
//    }
//    //change the target element now
//    lasttarget_bridge = e.target;
//    lasttarget_bridge.classList.add("selected");
//    //set text of drop down
//    document.getElementById('bridges_text').innerHTML = e.target.getAttribute("data-text");
//});
////radio button group events
//document.getElementById('bridges-custom__radio').addEventListener("click", function () {
//    if (this.checked) {
//        document.getElementById('bridges-custom__text').disabled = false;
//        document.getElementById('bridges-inner__dropdown').disabled = true;
//    }
//});
//document.getElementById('bridges-transport__radio').addEventListener("click", function () {
//    if (this.checked) {
//        document.getElementById('bridges-custom__text').disabled = true;
//        document.getElementById('bridges-inner__dropdown').disabled = false;
//    }
//});

function save_settings() {
  // ------ tor port ------------
  var tor_port = document.getElementById('cport__port').value;
  if (0 < tor_port && tor_port <= 65535) {
    settings["tor_port"] = tor_port;
  } else {
    settings["tor_port"] = 9999;
    //raise error and exit
  }

  // ---------- configure proxy ------------
  if (to_be_saved["configure_proxy"]) {
    var proxy_type = document.getElementById('proxy_text').innerHTML;
    console.log(proxy_type);
    if (proxy_type == "Proxy Type") {
      //raise error, exit
    } else {
      var proxy_port = document.getElementById('proxy__port').value;
      if (0 < proxy_port && proxy_port <= 65535) {
        settings["proxy_type"] = proxy_type;
        settings["proxy_address"] = document.getElementById('proxy__address').value;
        settings["proxy_port"] = proxy_port;
      } else {
        settings["proxy_type"] = "none";
        //raise error and exit
      }
    }
  } else {
    settings["proxy_type"] = "none";
  }

  // ---------- accessible ports -----------
  if (to_be_saved["accessible_ports"]) {
    var accessible_ports = document.getElementById('acsport__port').value;
    settings["accessible_ports"] = accessible_ports;
  } else {
    settings["accessible_ports"] = "all";
  }
  console.log(to_be_saved);
  console.log(settings);
}
//save settings
document.getElementById('save').addEventListener("click", save_settings);