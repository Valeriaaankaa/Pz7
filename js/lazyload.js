//АККОРДЕОН
$(document).ready(function() {
  //прикрепляем клик по заголовкам acc-head
	$('#accordeon .acc-head').on('click', f_acc);
});

function f_acc(){
//скрываем все кроме того, что должны открыть
  $('#accordeon .acc-body').not($(this).next()).slideUp(100);
 //открываем или скрываем блок под заголовком, по которому кликнули
    $(this).next().slideToggle(1000);
}

//ПЕРЕМЕЩЕНИЕ
$( function() {
  $( "#sortable" ).sortable();
  $( "#sortable" ).disableSelection();
} );

//КАРУСЕЛЬ
$(document).ready(function () {
  var carousel = $("#carousel").waterwheelCarousel({
    flankingItems: 3,
    movingToCenter: function ($item) {
      $('#callback-output').prepend('movingToCenter: ' + $item.attr('id') + '<br/>');
    },
    movedToCenter: function ($item) {
      $('#callback-output').prepend('movedToCenter: ' + $item.attr('id') + '<br/>');
    },
    movingFromCenter: function ($item) {
      $('#callback-output').prepend('movingFromCenter: ' + $item.attr('id') + '<br/>');
    },
    movedFromCenter: function ($item) {
      $('#callback-output').prepend('movedFromCenter: ' + $item.attr('id') + '<br/>');
    },
    clickedCenter: function ($item) {
      $('#callback-output').prepend('clickedCenter: ' + $item.attr('id') + '<br/>');
    }
  });

  $('#prev').bind('click', function () {
    carousel.prev();
    return false
  });

  $('#next').bind('click', function () {
    carousel.next();
    return false;
  });

  $('#reload').bind('click', function () {
    newOptions = eval("(" + $('#newoptions').val() + ")");
    carousel.reload(newOptions);
    return false;
  });

});
/////////////////////////////////////////
(function($) {

  var methods = {
    init : function( options ) {
      var options = $.extend({
        speed: 400,
        maxWidth: 600,
        imgPadding: 10,
        overlayOpacity: '0.5',
        viewTitle: false
      }, options);

      return this.each(function() {
        var $this    = $(this),
            i_path   = $this.attr('src'),
            i_title  = $this.attr('title'),
            imgSize  = (options.maxWidth - options.imgPadding * 2) + "px";

          $this.bind('click', function() {

            if ( options.viewTitle && i_title ) {
              var imgPadding = options.imgPadding + "px " + options.imgPadding + "px " + ( options.imgPadding + 30 ) + "px " + options.imgPadding + "px";
            } else {
              var imgPadding = options.imgPadding + "px";
            }

            var lz = '<div id="lz__overlay"></div>'
                   + '<div id="lz__magnify">'
                   + '  <img src="'+i_path+'">';

            if ( options.viewTitle && i_title ) { lz+= '  <p>'+i_title+'</p>'; }
            lz+= ' <span id="lz__close-popup">&times;</span> </div>';

            $('body').append(lz);

            $('#lz__magnify').css({
              "display": "none",

              "position": "fixed",
              "max-width": options.maxWidth + "px",
              "height": "auto",
              "z-index": "9999",
              "padding": imgPadding,
              "background": "#FFFFFF",
        	  });
            $('#lz__magnify img').css({
              "width": imgSize,
              "margin": 0
            });
            $('#lz__magnify p').css({
              "position": "absolute",
              "bottom": "0",
              "left": options.imgPadding,
              "margin": "0",
              "line-height": options.imgPadding + 30 + "px"
            });
            $('#lz__magnify').css({
        	    "left": ( $(document).width() - $('#lz__magnify').outerWidth() )/2,
        	    "top": ( ($(window).height() - $('#lz__magnify').outerHeight()) )/2
        	  });
            $('#lz__overlay').css({
              "display": "none",
              "background": "#000",
              "position": "fixed",
              "top": "0",
              "left": "0",
              "height": "100%",
              "width": "100%",
              "opacity": options.overlayOpacity,
              "z-index": "9990"
            });

            $('#lz__close-popup').css({
              "position": "absolute",
              "top": "5px",
              "right": "15px",
              "font-size": "32px",
              "font-family": "Georgia",
              "line-height": "32px",
              "cursor": "pointer"
            });

            $('#lz__overlay, #lz__magnify').fadeIn( options.speed );
            $('#lz__overlay, #lz__close-popup').bind('click', methods.hide);
          });

      });
    },
    hide : function( ) {
      $('#lz__overlay, #lz__magnify').fadeOut('fast', function() {
        $('#lz__close-popup, #lz__magnify, #lz__overlay').remove();
      });
    }
  };