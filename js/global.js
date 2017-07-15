
var ref = '';
var ext = '';
var url = '';
var loop = '';
var old_url = '';
var l=0;
var main_url = 'https://discgolfsearch.com?mob';

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

    //window.addEventListener("message", receiveMessage, false);

    $.ajax({
        url: "https://discgolfsearch.com/?ajax=get_events",
        crossDomain: true,
        error: function (xhr, errortype, error) {
            console.log("AJAX: FAIL: " + errortype + " - " + error);
            $('h1').text("AJAX FAIL");
        }
    }).done(function (hits) {
        var html = '';

        hits = JSON.parse(hits);
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
    ref.addEventListener('loadstart', function (event) {


    });

    ref.addEventListener("loadstop", function () {

        // Clear out the url in localStorage for subsequent opens.
        ref.executeScript({code: "localStorage.setItem( 'url', '' );"});

        // Start an interval
        clearInterval(loop);
        loop = setInterval(function () {
            l++;
            if(l=10){
                alert(l);
            }
            // Execute JavaScript to check for the existence of a url in the
            // child browser's localStorage.
            ref.executeScript(
                    {
                        code: "localStorage.getItem( 'url' )"
                    },
                    function (values) {

                        var url = values[ 0 ];
                        alert(url);
                        if(old_url!='' && url==''){
                            old_url='';
                        }
                        ref.executeScript({code: "localStorage.setItem( 'url', '' );"});
                        // If a url was set, clear the interval and close the InAppBrowser.
                        if (url != '' && url != old_url) {
                            
                            old_url = url;
                            
                            //open url in local browser
                            remo = window.open(url, '_system');

                        }
                    }
            );

        }, 500);

    });
}
function closeMap() {
    ref.close();

}
