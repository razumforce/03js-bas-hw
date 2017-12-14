"use strict";
// task #1 - картинки

window.onload = init;

function init() {
  var images = document.getElementsByTagName('img');
  for (var i = 0; i < images.length; i++) {
    images[i].onclick = changeBigPicture;
  }
  var img1 = document.getElementById('image1');
  var event = new Event('click');
  img1.dispatchEvent(event);
}

function changeBigPicture(eventObj) {
  var appDiv = document.getElementById('big_picture');
  appDiv.innerHTML = '';
  var eventElement = eventObj.target;
  var imageNamePart = eventElement.src.split('/').reverse()[0].replace('_s', '');
  var src = 'img/orig/' + imageNamePart;
  var imageDomElement = document.createElement('img');
  imageDomElement.src = src;
  appDiv.appendChild(imageDomElement);
}

function main() {

}