
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

    
    

 var url = "https://discgolfsearch.com?ajax=get_events";
    $.getJSON(url, {
      
        format: "json"
    }).done(function (data) {
         var html='';
           
       $(data.hits).each(function(idx,hit){
            html +='<div class="event">';
            html +='<div class="event_date">'+hit.date_start+'</div>';
            html +='<div class="event_name">'+hit.name+'</div>';
            html +='<div class="location">'+hit.city+', '+hit.state+', '+hit.zip+'</div>';
            html +='<div class="type">'+hit.type+'</div>';
            html +='<div class="status">'+hit.registration_status+'<br/>'+hit.spots+' spots available</div>';
            html +='</div>';
            
       });
        $('#events').html(html);
        
    });
}
function loadMap() {
    window.open = cordova.InAppBrowser.open;
    openLink('https://discgolfsearch.com',false);
 
}
function openLink(link_url, url_bar) {
    var bar = 'location=no,clearsessioncache=yes,clearcache=yes';
    var target = '_self';
    if (url_bar) {
        bar = 'location=yes';
        target = '_system';
    }

    var ref = cordova.InAppBrowser.open(link_url, target, bar);
     ref.addEventListener('loadstart', function(event) {
     if (event.url.match("mobile/close")) {
         ref.close();
     }
 }); 
    

}


