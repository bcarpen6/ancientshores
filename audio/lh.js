
  var music = document.createElement("audio");
  music.setAttribute("src", "http://bcarpen6.github.io/ancientshores/audio/airhorn.mp3");

  var horn = { active: 0,
    remove: function () {
      this.active = 0;
      music.pause();
    },
    load: function () {
      if (this.active != 1) {
        this.active = 1;
        music.currentTime = 0
        music.play();
      }
    }
  }

  var myClippy = { active: 0,
    load: function () {
      if (this.active != 1){
        this.active = 1;
        clippy.load('Clippy', function(agent) {
          agent.show();
          agent.moveTo(200,200);
          agent.speak('Hi there. It looks like you need help with your dashboard');
        });
      }
    },
    remove: function () {
      this.active = 0;
      $(".clippy").remove();
      $(".clippy-balloon").remove();
    }

  }

  var bieber = { active: 0,
    load: function () {
      if (this.active != 1) {
        this.active = 1;
        $(document).snowfall({
          maxSize: 70,
          minSize: 50,
          flakeCount: 40,
          maxSpeed: 10
        });
      }
    },
    remove: function () {
      this.active = 0;
      $(document).snowfall('clear');
    }
  }

  var hoff = { active: 0,
      load: function () {
        if (this.active != 1) {
          this.active = 1;
          $('body').append('<img id="hoff" src="http://i187.photobucket.com/albums/x9/blackcanary2000/blackcanary2000011/david-hasselhoff-as-michael-knight-in-knightrider-thumbs-up_zpsae2deb05.jpg" style="position:absolute; top: 10px;"/>');
          var img = $("#hoff"),
              width = img.get(0).width,
              screenWidth = $(window).width(),
              duration = 800;

          function animate() {
            img.css({"left": -width, "z-index": 999}).animate({
              "left": screenWidth
            }, duration);
          }

          animate();
        }

      },
      remove: function () {
        this.active = 0;
        $("#hoff").remove()
      }
    }

      var blink = { active: 0,
      load: function (message) {
        if (this.active != 1) {
          this.active = 1;
          $('body').append('<div id="blink" class="blink" style="font-size: 400px; position:absolute; top: 10px; z-index: 999">' + message + '</div>');
        }
       },
      remove: function () {
        this.active = 0;
        $("#blink").remove();
      }
    }

  function poll() {

    setTimeout(function() {
      $.ajax({ url: "https://spreadsheets.google.com/feeds/list/11r_ZDmzyzurUHBXD9KFm1bKIQd8DNkbI9_Od9fqfflg/od6/public/values?alt=json",
        success: function(data) {

          // clippy
          if (data.feed.entry[0]['gsx$clippy']['$t'] == "1") {
            myClippy.load();
          } else {
            myClippy.remove();
          }

          // bieber
          if (data.feed.entry[0]['gsx$bieber']['$t'] == "1") {
            bieber.load();
          } else {
            bieber.remove();
          }

          // hoff
          if (data.feed.entry[0]['gsx$hoff']['$t'] == "1") {
            hoff.load();
          } else {
            hoff.remove();
          }

          // horn
          if (data.feed.entry[0]['gsx$air-horn']['$t'] == "1") {
            horn.load();
          } else {
            horn.remove();
          }

          // horn
          if (data.feed.entry[0]['gsx$blink']['$t'] == "1") {
            blink.load(data.feed.entry[0]['gsx$blink-message']['$t']);
          } else {
            blink.remove();
          }


      }, dataType: "json", complete: poll });
    }, 100);
  };

  poll();

