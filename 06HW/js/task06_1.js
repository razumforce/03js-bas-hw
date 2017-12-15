"use strict";
// task #1 - картинки
var IMAGES = ['image1', 'image2', 'image3'];
var CURRENT_IMG = 0;

window.onload = init;
var interval = setInterval(pressRight, 3000);

function init() {
  var gallery = document.getElementById('gallery');
  gallery.onclick = changeBigPicture;

  var body = document.body;
  body.onclick = stopCarousel;

  var arrows = document.getElementsByTagName('i');
  for (var i = 0; i < arrows.length; i++) {
    if (arrows[i].classList.contains('fa-chevron-left')) arrows[i].onclick = pressLeft;
    if (arrows[i].classList.contains('fa-chevron-right')) arrows[i].onclick = pressRight;
  }

  showImage();
}

function changeBigPicture(eventObj) {
  if (eventObj.target.classList.contains('gallery_item')) {
    console.log(eventObj.isTrusted);
    var appDiv = document.getElementById('big_picture');
    appDiv.innerHTML = '';
    var eventElement = eventObj.target;
    clearItemBorder(CURRENT_IMG);
    CURRENT_IMG = IMAGES.indexOf(eventElement.id);
    setItemBorder(CURRENT_IMG);
    var imageNamePart = eventElement.src.split('/').reverse()[0].replace('_s', '');
    var src = 'img/orig/' + imageNamePart;
    var imageDomElement = document.createElement('img');
    imageDomElement.onerror = imgSrcError;
    imageDomElement.src = src;
    appDiv.appendChild(imageDomElement);
    if (!eventObj.isTrusted) eventObj.stopPropagation(); // пропускаем факт нажатия дальше ТОЛЬКО для реального нажатия
  }
}

function imgSrcError(eventObj) {
  eventObj.target.src = 'img/orig/404.jpg';
}

function stopCarousel() {
  clearInterval(interval);
}

function pressRight() {
  clearItemBorder(CURRENT_IMG++);
  if (CURRENT_IMG === IMAGES.length) CURRENT_IMG = 0;
  setItemBorder(CURRENT_IMG);
  showImage();
}

function pressLeft() {
  clearItemBorder(CURRENT_IMG--);
  if (CURRENT_IMG < 0) CURRENT_IMG = IMAGES.length - 1;
  setItemBorder(CURRENT_IMG);
  showImage();
}

function showImage() {
  var image = document.getElementById(IMAGES[CURRENT_IMG]);
  var event = new Event('click', {bubbles: true, cancelable: true});
  image.dispatchEvent(event);
}

function clearItemBorder(imageNumber) {
  var image = document.getElementById(IMAGES[imageNumber]);
  if (image.classList.contains('selected')) image.classList.remove('selected');
}

function setItemBorder(imageNumber) {
  var image = document.getElementById(IMAGES[imageNumber]);
  if (!image.classList.contains('selected')) image.classList.add('selected');
}