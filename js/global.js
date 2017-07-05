
var ref = '';
var ext = '';
var main_url = 'https://discgolfsearch.com';
document.addEventListener("deviceready", loadMap, false);
//document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

    //window.addEventListener("message", receiveMessage, false);

    $.ajax({
        url: "https://discgolfsearch.com/?ajax=get_events",
        crossDomain: true,
        
         error: function(xhr, errortype, error) {
            console.log("AJAX: FAIL: " + errortype + " - " + error);
            $('h1').text("AJAX FAIL");
        },
 }).done(function (hits) {
            var html = '';
            console.log(hits);
            hits = JSON.parse (hits)
            $.each(hits, function (idx, hit) {

                html += '<div class="event">';
                html += '<div class="event_date">' + hit.date_start + '</div>';
                html += '<div class="event_name">' + hit.name + '</div>';
                html += '<div class="location">' + hit.city + ', ' + hit.state + ', ' + hit.zip + '</div>';
                html += '<div class="type">' + hit.type + '</div>';
                html += '<div class="status">' + hit.registration_status + '<br/>' + hit.spots + ' spots available</div>';
                html += '</div>';

            });
            $('#events').html(html);
        

    });
}

function loadMap() {
    window.open = cordova.InAppBrowser.open;

    ref = window.open(main_url, '_self', 'location=no');
    ref.addEventListener('loadstop', function () {
        $('#wrap').show();
        $('#wrap2').hide();
    });
    ref.addEventListener('loadstart', function (event) {

    });
}
function closeMap() {
    ref.close();
}
function go_link(url) {

    window.open = cordova.InAppBrowser.open;
    var ext = window.open(event.url, '_system');
}