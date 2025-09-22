import { slideshow } from './modules/slideshow.js';
import { finishedWorks } from './modules/finished-works.js';
import { workImages } from './modules/work-images.js';

/* Main
############################################################################ */

document.addEventListener('DOMContentLoaded', function() {
  hljs.highlightAll();
  slideshow();
  finishedWorks();
  workImages();
});