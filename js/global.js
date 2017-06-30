
var ref = '';
var ext = '';
var main_url = 'http://discgolfsearch.com';
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

    //window.addEventListener("message", receiveMessage, false);

    $.ajax({
        url: "http://discgolfsearch.com?ajax=get_events&jsoncallback=?",
        crossDomain: true,
        dataType: "json",
complete     :   function(data) {
        console.log(data);
    },
        success: function (data) {
            var html = '';
            console.log(data);
            $.each(data, function (idx,val) {
                var hit=this;
                html += '<div class="event">';
                html += '<div class="event_date">' + hit.date_start + '</div>';
                html += '<div class="event_name">' + hit.name + '</div>';
                html += '<div class="location">' + hit.city + ', ' + hit.state + ', ' + hit + '</div>';
                html += '<div class="type">' + hit.type + '</div>';
                html += '<div class="status">' + hit.registration_status + '<br/>' + hit.spots + ' spots available</div>';
                html += '</div>';

            });
            $('#events').html(html);
        }

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