Mini Carousel
==============================================================
@author Nigel Sirisomphone
@date 17/10/2013

Flyweight carousel plugin. This has a few simple\r
methods that handle navigation of the carousel.\r
Public Methods:  e.g. $(el).miniCarousel(x);\r
  []           : simply enter destination slide\r
  [whereAmI]   : return current slide\r
  [next]       : goes to next slide\r
  [previous]   : goes to previous slide\r
  [addItems]   : e.g. $(el).miniCarousel('addItems', array)\r
\r
Options:\r
  itemSelector : item class e.g. '.child'\r
  itemWidth    : item width\r
  itemGutter   : gutter between items\r
  visibleItems : visible item count\r
  wrapperClass : wrapper class e.g. '.myCarousel'\r
  slideSpeed   : slide animation speed\r
  afterSlide   : run callback after slide complete\r
\r
*TO DO*
- Add demo.
- Add methods to append & bind navigation controls.