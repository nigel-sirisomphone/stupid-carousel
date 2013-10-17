/* ==============================================================
 * Mini Carousel
 * ==============================================================
 * @author Nigel Sirisomphone
 * @date 17/10/2013
 *
 * ==============================================================
 * Flyweight carousel plugin. This has a few simple
 * methods that handle navigation of the carousel.
 *
 * Public Methods:  e.g. $(el).miniCarousel(x);
 *
 *   []           : simply enter destination slide
 *   [whereAmI]   : return current slide
 *   [next]       : goes to next slide
 *   [previous]   : goes to previous slide
 *   [addItems]   : e.g. $(el).miniCarousel('addItems', array)
 *  
 * Options:
 *   itemSelector : item class e.g. '.child'
 *   itemWidth    : item width
 *   itemGutter   : gutter between items
 *   visibleItems : visible item count
 *   wrapperClass : wrapper class e.g. '.myCarousel'
 *   slideSpeed   : slide animation speed
 *   afterSlide   : run callback after slide complete
 */

;(function($) {
  var miniCarousel = function (element, options) {
    this.$element = $(element);
    this.options = opts = $.extend({}, miniCarousel.defaults, options);
    this._initItems();

    // set current frame to 1
    this.currentFrame = 1;

    // get wrapper width
    this.frameWidth = (this.$items.first().outerWidth() + opts.itemGutter) * opts.visibleItems;
    this._countFrames();

    // wrap elements in div
    this._initWrappers();
    this._setPanelDimension();
  }

  miniCarousel.prototype._initItems = function () {
    this.$items = this.$element.find(opts.itemSelector);

    this.$items.css({
      width: this.options.itemWidth
    , float: 'left'
    , marginRight: this.options.itemGutter
    });
  }

  miniCarousel.prototype._initWrappers = function () {
    this.$items
      .wrapAll(
        $('<div>').addClass(opts.wrapperClass)
      )
      .wrapAll(
        $('<div>').addClass('slide-panel')
      );

    this.$wrapper = this.$element.find('.' + opts.wrapperClass);
    this.$panel   = this.$element.find('.slide-panel');

    this.$wrapper.css({
      position: 'relative'
    , height: this.$items.first().height()
    });

    this.$panel.css('position', 'absolute');
  }

  miniCarousel.prototype._setPanelDimension = function () {
    this.$panel.css('width', (this.$items.first().outerWidth()+ this.options.itemGutter) * (this.$items.length + 1));
  }

  miniCarousel.prototype._countFrames =  function () {
    // count frames
    this.framesCount = Math.ceil(this.$items.length / opts.visibleItems);
  };

  miniCarousel.prototype.addItems = function (items) {
    var _self = this;

    // append to panel
    $.each(items, function (index, item) {
      _self.$panel.append(item)
    });

    this._initItems();

    this._countFrames();

    this._setPanelDimension();
  }

  miniCarousel.prototype.isLast = function () {
    return this.currentFrame == this.framesCount
  }

  miniCarousel.prototype._slide = function (pos) {
    var _self = this;

    this.$panel.animate({
      left: - (pos - 1) * this.frameWidth
    }, this.options.slideSpeed, function () {
      if (_self.options.afterSlide) _self.options.afterSlide()
    });
  }

  miniCarousel.prototype.go = function (pos) {
    // if target is out of bounds return
    if (pos > this.framesCount || pos <= 0) return;

    this.currentFrame = pos;

    // animate to pos * wrapper width
    this._slide(pos);
  }

  miniCarousel.prototype.next = function () {
    this.go(this.currentFrame + 1);
  }

  miniCarousel.prototype.previous = function () {
    this.go(this.currentFrame - 1);
  }

  miniCarousel.prototype.whereAmI = function () {
    return this.currentFrame;
  }

  $.fn.miniCarousel = function (option, param) {
    var returnValue = null
      , param = param || null
    ;

    this.each(function () {
      var $this   = $(this);
      var data    = $this.data('ns.miniCarousel');
      var options = $.extend({}, miniCarousel.defaults, $this.data(), typeof option == 'object' && option);
      var action  = typeof option == 'string' && option[0] != '_' ? option : options._slide;

      if (!data) $this.data('ns.miniCarousel', (data = new miniCarousel(this, options)));

      //

      if (typeof option == 'number') data.go(option)
      else if (action == 'whereAmI') returnValue = data[action]()
      else if (action) param != null ? data[action](param) : data[action]()
    });

    if (returnValue) return returnValue;

    return this;
  };

  miniCarousel.defaults = {
    // item width
    itemSelector: '.gallery'
  , itemWidth: 123
  , itemGutter: 10
  , visibleItems: 4
  , wrapperClass: 'miniCarouselWrapper'
  , slideSpeed: 500
  , afterSlide: null
  }
})(jQuery)