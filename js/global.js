
var ref='';
var ext='';
var main_url='http://discgolfsearch.com';
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    loadMap();
    window.addEventListener("message", receiveMessage, false);
}
function loadMap() {
    window.open = cordova.InAppBrowser.open;
   
    ref = window.open(main_url, '_self','location=no');
    ref.addEventListener('loadstop', function() {
         $('#wrap').show();
    });
    ref.addEventListener('loadstart', function (event) {
       
    });
}
function closeMap(){
       ref.close();
}
function go_link(url){
   
    window.open = cordova.InAppBrowser.open;
    var ext = window.open(event.url, '_system' );
}