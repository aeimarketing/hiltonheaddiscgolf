
var ref = '';
var ext = '';
var url = '';
var loop = '';
var old_url = '';
var l = 0;
var main_url = 'https://hiltonheaddiscgolf.com';
 
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

     $.ajax({
        url: main_url+"/app_front.php",
        crossDomain: true,
        error: function (xhr, errortype, error) {
            console.log("AJAX: FAIL: " + errortype + " - " + error);
            $('h1').text("AJAX FAIL");
        }
    }).done(function (html) {
      
       
        var old_date = '';
        
       
        $('#front').html(html);
     

    });
       

   
}


function loadSite() {


    window.open = cordova.InAppBrowser.open;

    ref = window.open(main_url, '_blank', 'location=no,toolbar=no');


    ref.addEventListener("loadstop", function () {
        $('.hide_first_load').show();
        $('.hide_after_first_load').hide();
        //send events to browser
        
        // Clear out the url in localStorage for subsequent opens.
//        ref.executeScript({code: "localStorage.setItem( 'url', '' );"});
//
//        // Start an interval
//        clearInterval(loop);
//        loop = setInterval(function () {
//
//            // Execute JavaScript to check for the existence of a url in the
//            // child browser's localStorage.
//            ref.executeScript(
//                    {
//                        code: "localStorage.getItem( 'url' )"
//                    },
//                    function (values) {
//
//                        var url = values[ 0 ];
//
//                        if (old_url != '' && url == '') {
//                            old_url = '';
//                        }
//                        ref.executeScript({code: "localStorage.setItem( 'url', '' );"});
//                        // If a url was set, clear the interval and close the InAppBrowser.
//                        if (url != '' && url != old_url) {
//
//                            old_url = url;
//
//                            //open url in local browser
//                            remo = window.open(url, '_system');
//
//                        }
//                    }
//            );
//
//        }, 500);

    });
}
function closeMap() {
    ref.close();

}
