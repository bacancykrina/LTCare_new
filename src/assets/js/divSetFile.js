  var divPos = {};

  $(document).ready(function () {
      $(document).mousemove(function (e) {
          var offset = $("#container").offset();
          if (typeof offset != 'undefined') {
              divPos = {
                  left: (e.pageX - offset.left) + 45,
                  top: e.pageY - offset.top - 150
              };
          }
      });

      $(document).click(function (e) {
          $('#vitalChartPopup').hide();
          $('#labChartPopup').hide();

      });
  });

  function isScrolledIntoView(elem)
  {
      $('#container').height('auto');
      var docViewTop = $(window).scrollTop();
      var docViewBottom = docViewTop + $(window).height();
      var elemTop = $(elem).offset().top;
      var elemBottom = elemTop + $(elem).height() + 100;
      return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }

  function handleScroll($el) {
      var elH = $el.outerHeight(),
          H = $(window).height(),
          r = $el[0].getBoundingClientRect(), t=r.top, b=r.bottom;
      var posDiv = Math.max(0, t>0? Math.min(elH, H-t) : (b<H?b:H)); 
      if(posDiv !== elH) {
         if (posDiv > elH) {
             //move down
         } else {
             //move up
             var upPos = elH - posDiv;
             $("body, html").animate({ 
              scrollTop: $(window).scrollTop() +  upPos
            }, 1000);
         }
      }
  }