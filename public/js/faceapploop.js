$(document).ready(function() {

  if (window.JpegCamera) {

    var camera; // placeholder
    var cheat_count = 0;



    // Compare the photographed image to the current Rekognition collection
    //var compare_image =
    function compare_image() {
      //console.log("Compare image is called "+window.location.search.substring(1));
      var test_taker = window.location.search.substring(1);
      var snapshot = camera.capture();
      var api_url = "/compare";
      //$("#loading_img").show();
      if(cheat_count >= 3){
        window.location.replace("/")
        alert("CHEATER !!!")
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
          // create speech response
        //  window.location.replace("/questions")
          // $.post("/speech", {tosay: "Good " + greetingTime(moment()) + " " + data.id}, function(response) {
          //   $("#audio_speech").attr("src", "data:audio/mpeg;base64," + response);
          //   $("#audio_speech")[0].play();
          // });
        } else {
          cheat_count+=1
          console.log("Users not found");
          $("#upload_result").html(data.message);
        }
        $("#loading_img").hide();
        this.discard();
      }).fail(function(status_code, error_message, response) {
        $("#upload_status").html("Upload failed with status " + status_code + " (" + error_message + ")");
        $("#upload_result").html(response);
        $("#loading_img").hide();
      });
    };


    // var timer = function getRandomInt() {
    //     return Math.floor(Math.random() * 16) + 5;
    // }
    // Define what the button clicks do.

    setInterval(compare_image, 6000);
    //$("#compare_image").click(compare_image);

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
