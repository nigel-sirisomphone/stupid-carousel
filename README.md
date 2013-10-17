Mini Carousel
==============================================================
@author Nigel Sirisomphone
@date 17/10/2013
==============================================================
Flyweight carousel plugin. This has a few simple
methods that handle navigation of the carousel.
Public Methods:  e.g. $(el).miniCarousel(x);
  []           : simply enter destination slide
  [whereAmI]   : return current slide
  [next]       : goes to next slide
  [previous]   : goes to previous slide
  [addItems]   : e.g. $(el).miniCarousel('addItems', array)
 
Options:
  itemSelector : item class e.g. '.child'
  itemWidth    : item width
  itemGutter   : gutter between items
  visibleItems : visible item count
  wrapperClass : wrapper class e.g. '.myCarousel'
  slideSpeed   : slide animation speed
  afterSlide   : run callback after slide complete

*TO DO*
- Add demo.
- Add methods to append & bind navigation controls.