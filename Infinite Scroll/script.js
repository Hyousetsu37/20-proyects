const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
//Unsplash API
const count = 30;
const apiKey = "AAl2RYaZeNJ-yOYbMZB20Y9wxKtLpAHVAv1Ziy18yug";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//Check if all images are loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded > 1) {
    loader.hidden = true;
  }
  if (imagesLoaded === totalImages) {
    ready = true;
    console.log("ready", ready);
  }
}

//Helper function to set attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos(photosArray) {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    // create <a>to link to unsplash</a>
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener("load", imageLoaded);

    //put <img> inside <a></a> then put both inside the imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos(photosArray);
  } catch (error) {}
}

//Check if near bottom
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
