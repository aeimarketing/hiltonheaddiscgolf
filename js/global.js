
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
        var old_date='';
        hits = JSON.parse(hits);
        $.each(hits, function (idx, hit) {
           
            
            html += '<div class="event">';
            html += '<div class="event_name">' + hit.name + '</div>';
             html += '<div class="event_date">' + hit.date_start + '</div>';
            html += '<div class="type">' + hit.type + '</div>';
            html += '<div class="location">' + hit.city + ', ' + hit.state + '</div>';

           // html += '<div class="status">' + hit.registration_status + '<br/>' + hit.spots + ' spots available</div>';
            html += '</div>';

        });
        $('#events').html(html);
        loadMap();

    });
}


function loadMap() {


    window.open = cordova.InAppBrowser.open;

    ref = window.open(main_url, '_blank', 'location=no,toolbar=no');
    ref.addEventListener('loadstart', function (event) {

        $('.hide_first_load').show();
        $('.hide_after_first_load').hide();
    });

    ref.addEventListener("loadstop", function () {

        //send events to browser
        ref.executeScript({code: "$('#imported_events_list').html('"+$('#events').html()+"');$('#event_cal_box').show();"});

        // Clear out the url in localStorage for subsequent opens.
        ref.executeScript({code: "localStorage.setItem( 'url', '' );"});

        // Start an interval
        clearInterval(loop);
        loop = setInterval(function () {
            
            // Execute JavaScript to check for the existence of a url in the
            // child browser's localStorage.
            ref.executeScript(
                    {
                        code: "localStorage.getItem( 'url' )"
                    },
                    function (values) {

                        var url = values[ 0 ];
                        
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
