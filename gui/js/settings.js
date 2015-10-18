//this object will be passed to chrome.storage.set
var settings = {};
var to_be_saved = {
    configure_proxy: false,
    accessible_ports: false
};
var error_count = 0;

//settings key value pair
var default_settings = {
    theme: "light",
    proxy_type: "none",
    proxy_address: "none",
    proxy_port: "none",
    autostart_tor: false,
    accessible_ports: "all",
    tor_port: 9999
};

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get(default_settings, function (items) {
        //console.log(items);
        populate_gui(items);
    });
});

//populate_gui
function populate_gui(items) {
    //set theme
    if (items.theme == 'dark') {
        document.body.classList.add('dark');
        document.getElementById('dt').click();
    }
    //set proxy if not none
    if (items.proxy_type != "none") {
        document.getElementById('proxy').click();
        to_be_saved["configure_proxy"] = true;
        document.getElementById('proxy_text').innerHTML = items.proxy_type;
        document.getElementById('proxy__address').value = items.proxy_address;
        document.getElementById('proxy__port').value = items.proxy_port;
    }
    //set autostart toggle
    if (items.autostart_tor) {
        document.getElementById('autostart_tor').click();
    }
    //accessible ports
    if (items.accessible_ports != "all") {
        document.getElementById('acsport').click();
        to_be_saved["accessible_ports"] = true;
        document.getElementById('acsport__port').value = items.accessible_ports;
    }
    //set tor port
    document.getElementById('cport__port').value = items.tor_port;
}

//go back to home page button
document.getElementById('back_button').addEventListener("click", function () {
    save_settings();
    if (error_count == 0) {
        document.querySelector('body').classList.add('hide');
        setTimeout(function () {
            location.href = "main.html";
        }, 300);
    }
});
//on load effect
document.body.classList.add('closed');
setTimeout(function () {
    document.body.classList.add('open');
}, 10);
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
//proxy text click
document.getElementById('proxy_text_outer').addEventListener("click", function (e) {
    document.getElementById('proxy-inner__dropdown').click();
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
//accessible port 
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
        settings['autostart_tor'] = true;
    }
    else {
        settings['autostart_tor'] = false;
    }
});
//theme switch
document.getElementById('dt').addEventListener("click", function () {
    if (this.checked) {
        document.body.classList.add('dark');
        settings["theme"] = 'dark';
    }
    else {
        document.body.classList.remove('dark');
        settings["theme"] = 'light';
    }
});
//defaults settings
document.getElementById('defaults').addEventListener("click", function () {
    chrome.storage.local.set(default_settings, function () {
        document.querySelector('body').classList.add('hide');
        setTimeout(function () {
            location.href = "main.html";
        }, 300);
    });
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


function raise_error(error, id) {
    error_count++;
    //multiple errors
    if (error_count > 1) {
        document.getElementById("error_text").innerHTML = "Multiple Errors Occurred";
    }
    else {
        document.getElementById("error_text").innerHTML = error;
    }
    //show error dialog
    if (!document.querySelector(".error-text-container").classList.contains("visible")) {
        document.querySelector(".error-text-container").classList.add("visible");
    }

    //close error dialog
    document.querySelector('.error-text-button').addEventListener("click", function () {
        document.querySelector(".error-text-container").classList.remove("visible");
        //remove all dots
        var element = document.querySelectorAll('.error-indicator');
        Array.prototype.forEach.call(element, function (node) {
            node.parentNode.removeChild(node);
        });
    });

    //error dot
    var ref_el = document.getElementById(id);
    var error_dot = document.createElement("div");
    error_dot.classList.add("error-indicator");
    error_dot.style.left = ref_el.offsetLeft + 'px';
    error_dot.style.top = ref_el.offsetTop + 'px';
    insertAfter(error_dot, ref_el);

    console.log(error + " on id " + id);
}

//insertafter helper func
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function save_settings() {
    //reset error count
    error_count = 0;
    // ------ tor port ------------
    var tor_port = document.getElementById('cport__port').value;
    if (1000 < tor_port && tor_port <= 65535) {
        settings["tor_port"] = tor_port;
    } else {
        settings["tor_port"] = 9999;
        raise_error("invalid tor port, please enter a number between 1000-65535", 'cport__port');
    }

    // ---------- configure proxy ------------
    if (to_be_saved["configure_proxy"]) {
        var proxy_type = document.getElementById('proxy_text').innerHTML;
        console.log(proxy_type);
        if (proxy_type == "Proxy Type") {
            raise_error("please select a proxy type or disable it", 'proxy_text');
        } else {
            var proxy_port = document.getElementById('proxy__port').value;
            if (0 < proxy_port && proxy_port <= 65535 && document.getElementById('proxy__address').value != "") {
                settings["proxy_type"] = proxy_type;
                settings["proxy_address"] = document.getElementById('proxy__address').value;
                settings["proxy_port"] = proxy_port;
            } else {
                settings["proxy_type"] = "none";
                raise_error("invalid proxy host or port no", 'proxy_text');
            }
        }
    } else {
        settings["proxy_type"] = "none";
    }

    // ---------- accessible ports -----------
    if (to_be_saved["accessible_ports"]) {
        var accessible_ports = document.getElementById('acsport__port').value;
        var reachable_addresses;
        var error = false;
        var ports_list = accessible_ports.split(',');
        for (var port = 0; port < ports_list.length; port++) {
            if (!(0 < ports_list[port] && ports_list[port] < 65535)) {
                raise_error("invalid port list entered, please enter number(s) between 0-65535 separated by ,", "acsport__port");
                error = true;
                break;
            }
            console.log(ports_list[port]);
        }
        if (!error) {
            reachable_addresses = "*:" + accessible_ports.replace(/,/g, ",*:");
            console.log(ports_list);
            console.log(reachable_addresses);
            settings["accessible_ports"] = accessible_ports;
            settings["reachable_addresses"] = reachable_addresses;
        }
    } else {
        settings["reachable_addresses"] = "all";
        settings["accessible_ports"] = "all";
    }
    //---------------saving settings----------
    if (error_count == 0) {
        chrome.storage.local.set(settings, function () {
            console.log(to_be_saved);
            console.log(settings);
        });
    }
}
//save settings
document.getElementById('save').addEventListener("click", save_settings);