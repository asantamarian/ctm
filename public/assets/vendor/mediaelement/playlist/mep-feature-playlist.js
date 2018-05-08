/**
 * @file MediaElement Playlist Feature (plugin).
 * @author Andrew Berezovsky <andrew.berezovsky@gmail.com>
 * Twitter handle: duozersk
 * @author Original author: Junaid Qadir Baloch <shekhanzai.baloch@gmail.com>
 * Twitter handle: jeykeu
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */

(function($) {
  $.extend(mejs.MepDefaults, {
    loopText: 'Repeat On/Off',
    shuffleText: 'Shuffle On/Off',
    nextText: 'Next Track',
    prevText: 'Previous Track',
    playlistText: 'Show/Hide Playlist'
  });

  $.extend(MediaElementPlayer.prototype, {
    // LOOP TOGGLE
    buildloop: function(player, controls, layers, media) {
      var t = this;

      var loop = $('<div class="mejs-button mejs-loop-button ' + ((player.options.loop) ? 'mejs-loop-on' : 'mejs-loop-off') + '">' +
        '<button type="button" aria-controls="' + player.id + '" title="' + player.options.loopText + '"></button>' +
        '</div>')
        // append it to the toolbar
        .appendTo(controls)
        // add a click toggle event
        .click(function(e) {
          player.options.loop = !player.options.loop;
          $(media).trigger('mep-looptoggle', [player.options.loop]);
          if (player.options.loop) {
            loop.removeClass('mejs-loop-off').addClass('mejs-loop-on');
            //media.setAttribute('loop', 'loop');
          }
          else {
            loop.removeClass('mejs-loop-on').addClass('mejs-loop-off');
            //media.removeAttribute('loop');
          }
        });

      t.loopToggle = t.controls.find('.mejs-loop-button');
    },
    loopToggleClick: function() {
      var t = this;
      t.loopToggle.trigger('click');
    },
    // SHUFFLE TOGGLE
    buildshuffle: function(player, controls, layers, media) {
      var t = this;

      var shuffle = $('<div class="mejs-button mejs-shuffle-button ' + ((player.options.shuffle) ? 'mejs-shuffle-on' : 'mejs-shuffle-off') + '">' +
        '<button type="button" aria-controls="' + player.id + '" title="' + player.options.shuffleText + '"></button>' +
        '</div>')
        // append it to the toolbar
        .appendTo(controls)
        // add a click toggle event
        .click(function(e) {
          player.options.shuffle = !player.options.shuffle;
          $(media).trigger('mep-shuffletoggle', [player.options.shuffle]);
          if (player.options.shuffle) {
            shuffle.removeClass('mejs-shuffle-off').addClass('mejs-shuffle-on');
          }
          else {
            shuffle.removeClass('mejs-shuffle-on').addClass('mejs-shuffle-off');
          }
        });

      t.shuffleToggle = t.controls.find('.mejs-shuffle-button');
    },
    shuffleToggleClick: function() {
      var t = this;
      t.shuffleToggle.trigger('click');
    },
    // PREVIOUS TRACK BUTTON
    buildprevtrack: function(player, controls, layers, media) {
      var t = this;

      var prevTrack = $('<div class="mejs-button mejs-prevtrack-button mejs-prevtrack">' +
        '<button type="button" aria-controls="' + player.id + '" title="' + player.options.prevText + '"></button>' +
        '</div>')
        .appendTo(controls)
        .click(function(e){
          $(media).trigger('mep-playprevtrack');
          player.playPrevTrack();
        });

      t.prevTrack = t.controls.find('.mejs-prevtrack-button');
    },
    prevTrackClick: function() {
      var t = this;
      t.prevTrack.trigger('click');
    },
    // NEXT TRACK BUTTON
    buildnexttrack: function(player, controls, layers, media) {
      var t = this;

      var nextTrack = $('<div class="mejs-button mejs-nexttrack-button mejs-nexttrack">' +
        '<button type="button" aria-controls="' + player.id + '" title="' + player.options.nextText + '"></button>' +
        '</div>')
        .appendTo(controls)
        .click(function(e){
          $(media).trigger('mep-playnexttrack');
          player.playNextTrack();
        });

      t.nextTrack = t.controls.find('.mejs-nexttrack-button');
    },
    nextTrackClick: function() {
      var t = this;
      t.nextTrack.trigger('click');
    },
    // PLAYLIST TOGGLE
    buildplaylist: function(player, controls, layers, media) {
      var t = this;



      var playlistToggle = $('<div class="mejs-button mejs-playlist-button ' + ((player.options.playlist) ? 'mejs-hide-playlist' : 'mejs-show-playlist') + '">' +
        '<button type="button" aria-controls="' + player.id + '" title="' + player.options.playlistText + '"></button>' +
        '</div>')
        .appendTo(controls)
        .click(function(e) {
          player.options.playlist = !player.options.playlist;
          $(media).trigger('mep-playlisttoggle', [player.options.playlist]);
          if (player.options.playlist) {
            layers.children('.mejs-playlist').show();
            playlistToggle.removeClass('mejs-show-playlist').addClass('mejs-hide-playlist');
          }
          else {
            layers.children('.mejs-playlist').hide();
            playlistToggle.removeClass('mejs-hide-playlist').addClass('mejs-show-playlist');
          }
        });

      t.playlistToggle = t.controls.find('.mejs-playlist-button');
    },
    playlistToggleClick: function() {
      var t = this;
      t.playlistToggle.trigger('click');
    },
    // PLAYLIST WINDOW
    buildplaylistfeature: function(player, controls, layers, media) {

     // console.log(player);
      controls.wrap('<div class="mejs-controls-wrap"></div>')



      var albumbox = $('<div class="mejs-albumbox"><img src="assets/albums/cover-default.png" /></div>');
      this.albumbox = albumbox;
      controls.before(albumbox);

        var songtitlecontrol = $('<h2 class="mejs-songtitlecontrol"></h2>');
        this.songtitlecontrol = songtitlecontrol;
        controls.before(songtitlecontrol);







      var playlist = $('<div class="mejs-playlist mejs-layer">' +
        '<ul class="mejs"></ul>' +
        '</div>')
        .appendTo(layers);
      if (!player.options.playlist) {
        playlist.hide();
      }
      if (player.options.playlistposition == 'bottom') {
        playlist.css('top', player.options.audioHeight + 'px');
      }
      else {
        playlist.css('bottom', player.options.audioHeight + 'px');
      }

      var getTrackName = function(trackUrl) {
        var trackUrlParts = trackUrl.split("/");
        if (trackUrlParts.length > 0) {
          return decodeURIComponent(trackUrlParts[trackUrlParts.length-1]);
        }
        else {
          return '';
        }
      };

      // calculate tracks and build playlist
      var tracks = [];
      //$(media).children('source').each(function(index, element) { // doesn't work in Opera 12.12
      $('#'+player.id).find('.mejs-mediaelement source').each(function(index, element) {


        if ($.trim(this.src) != '') {


          var track = {};
          track.source = $.trim(this.src);
          if ($.trim(this.title) != '') {
            track.name = $.trim(this.title);
          }
          else {
            track.name = getTrackName(track.source);
          }

          //add download button
          var download_btn = $(element).data('download-url');
          if(typeof(download_btn) != "undefined"){
            track.downloadurl = download_btn;
            track.download = true;
          }
          else{
            track.download = false;
          }

          //add album art
          var cover = $(element).data('cover');
          if(typeof(cover) != "undefined"){
            track.cover = cover;

          }
          else{
            track.cover = 'assets/albums/cover-default.png';

          }

          tracks.push(track);
        }
      });


      var songindex = 1;
      for (var track in tracks) {
        var songindex_str = ('00'+songindex).slice(-2);

        var download_html = '';
        if(tracks[track].download){
          download_html = '<a class="musicdownload cbx-btn" href="'+tracks[track].downloadurl+'">Download</a>';
        }

        //var play_html = '<a class="musicplay" href="#">Play</a>';

        layers.find('.mejs-playlist > ul').append('<li data-album="'+tracks[track].cover+'" data-url="' + tracks[track].source + '" title="' + tracks[track].name + '"><span class="musictracknumber">' +songindex_str+'.</span> '+ tracks[track].name +download_html+ '</li>');
        songindex++;
      }

      $(this.songtitlecontrol).text(tracks[0].name);

      // set the first track as current
      layers.find('li:first').addClass('current played');
      // play track from playlist when clicking it
      layers.find('.mejs-playlist > ul li').click(function(e) {
        if (!$(this).hasClass('current')) {
          $(this).addClass('played');
          player.playTrack($(this));
        }
        else {
          player.play();
        }
      });

      // when current track ends - play the next one
      media.addEventListener('ended', function(e) {
        player.playNextTrack();
      }, false);
    },
    playNextTrack: function() {
      var t = this;
      var tracks = t.layers.find('.mejs-playlist > ul > li');
      var current = tracks.filter('.current');
      var notplayed = tracks.not('.played');
      if (notplayed.length < 1) {
        current.removeClass('played').siblings().removeClass('played');
        notplayed = tracks.not('.current');
      }
      if (t.options.shuffle) {
        var random = Math.floor(Math.random()*notplayed.length);
        var nxt = notplayed.eq(random);
      }
      else {
        var nxt = current.next();
        if (nxt.length < 1 && t.options.loop) {
          nxt = current.siblings().first();
        }
      }
      if (nxt.length == 1) {
        nxt.addClass('played');
        t.playTrack(nxt);
      }
    },
    playPrevTrack: function() {
      var t = this;
      var tracks = t.layers.find('.mejs-playlist > ul > li');
      var current = tracks.filter('.current');
      var played = tracks.filter('.played').not('.current');
      if (played.length < 1) {
        current.removeClass('played');
        played = tracks.not('.current');
      }
      if (t.options.shuffle) {
        var random = Math.floor(Math.random()*played.length);
        var prev = played.eq(random);
      }
      else {
        var prev = current.prev();
        if (prev.length < 1 && t.options.loop) {
          prev = current.siblings().last();
        }
      }
      if (prev.length == 1) {
        current.removeClass('played');
        t.playTrack(prev);
      }
    },
    playTrack: function(track) {




      var trackname = '';
      //track.source = $.trim(this.src);
      if ($.trim(track.attr('title')) != '') {
        trackname = $.trim(track.attr('title'));
      }
      else {
        trackname = getTrackName(track.attr('data-url'));
      }

      //console.log(trackname);

      var t = this;
      t.pause();
      t.setSrc(track.attr('data-url'));
      t.load();
      t.play();
      track.addClass('current').siblings().removeClass('current');

      //set album art
      $(this.albumbox).find('img').attr('src', track.attr('data-album'));
      $(this.songtitlecontrol).text(trackname);


    },
    playTrackURL: function(url) {
      var t = this;
      var tracks = t.layers.find('.mejs-playlist > ul > li');
      var track = tracks.filter('[data-url="'+url+'"]');
      t.playTrack(track);

    }
  });

})(mejs.$);
