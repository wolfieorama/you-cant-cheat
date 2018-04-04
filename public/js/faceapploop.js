$(document).ready(function() {
  if (window.JpegCamera) {
    var camera; // placeholder
    var cheat_count = 0;

    // function tempAlert(msg,duration)
    // {
    //  var el = document.createElement("div");
    //  el.setAttribute("style","position:absolute;top:40%;left:20%;background-color:white;");
    //  el.innerHTML = msg;
    //  setTimeout(function(){
    //   el.parentNode.removeChild(el);
    //  },duration);
    //  document.body.appendChild(el);
    // }
    function compare_image() {
      //console.log("Compare image is called "+window.location.search.substring(1));
      var test_taker = window.location.search.substring(1);
      $("#header_quiz").html("Welcome to your Quiz, " + test_taker);
      var snapshot = camera.capture();
      var api_url = "/compare";
      if(cheat_count >= 3){
        alert("CHEATER !!!")
        sleep(4000)
        window.location.replace("/")
      }
      snapshot.upload({api_url: api_url}).done(function(response) {
        var data = JSON.parse(response);
        if (data.id !== undefined) {
          $("#upload_result").html(data.message + ": " + data.id + ", Confidence: " + data.confidence);
          console.log("Users "+test_taker.trim()+","+data.id.trim())
          console.log(test_taker.trim() === data.id.trim());
          if(test_taker.trim() === data.id.trim()){
            console.log("Users "+test_taker+","+data.id);
          }
          else{
            cheat_count+=1
            console.log("Hey "+data.id+" why are you cheating!!!!!!!!!!!!");
          }
        } else {
          cheat_count+=1
          console.log("Users not found");
          $("#upload_result").html(data.message);
        }
        $("#loading_img").hide();
        this.discard();
      }).fail(function(status_code, error_message, response) {
        cheat_count+=1
        $("#upload_status").html("No face found by Camera ");
        $("#upload_result").html(response);
        $("#loading_img").hide();
      });
    };

    function sleep(milliseconds) {
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
          break;
        }
      }
    }

    setInterval(compare_image, 6000);

    // Initiate the camera widget on screen
    var options = {
      shutter_ogg_url: "js/jpeg_camera/shutter.ogg",
      shutter_mp3_url: "js/jpeg_camera/shutter.mp3",
      swf_url: "js/jpeg_camera/jpeg_camera.swf"
    }


    camera = new JpegCamera("#camera", options).ready(function(info) {
      $("#loading_img").hide();
    });

  }

});
