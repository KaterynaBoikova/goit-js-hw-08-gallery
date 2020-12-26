import defItems from "./gallery-items.js";
const refs = {
    imagesUl: document.querySelector('.js-gallery'),
    modal: document.querySelector('.js-lightbox'),
    imageSrc: document.querySelector('.lightbox__image'),
    buttonClose: document.querySelector('.lightbox__button'),
    overlay: document.querySelector('.lightbox__overlay')
};
const allImagesLargeLinks = defItems.map((image)=>{return image.original});

const createGalleryItem = function(image){
    const createGalleryItemLi = document.createElement('li');
    createGalleryItemLi.classList.add('gallery__item');
    const createGalleryItemA = document.createElement('a');
    createGalleryItemA.classList.add('gallery__link');
    createGalleryItemA.setAttribute('href', image.original);
    const createGalleryItemImg = document.createElement('img');
    createGalleryItemImg.classList.add('gallery__image');
    createGalleryItemImg.setAttribute('src', image.preview);
    createGalleryItemImg.setAttribute('data-source', image.original);
    createGalleryItemImg.setAttribute('alt', image.description);
    createGalleryItemImg.setAttribute('data-index', defItems.indexOf(image));
    createGalleryItemA.appendChild(createGalleryItemImg);
    createGalleryItemLi.appendChild(createGalleryItemA);
    return createGalleryItemLi;
};
const galleryItems = defItems.map(image =>(createGalleryItem(image)));
refs.imagesUl.append(...galleryItems);

refs.imagesUl.addEventListener('click', onImageClick);
refs.buttonClose.addEventListener('click', onButtonClick);
refs.overlay.addEventListener('click', onOverlayClick);

function onImageClick(event){
   event.preventDefault();
    if(event.target.nodeName !=="IMG"){
        return;
    }
    const largeImageLink = event.target.dataset.source;
    const largeImageIndex = event.target.dataset.index;

    refs.modal.classList.add('is-open');

    refs.imageSrc.setAttribute('src', largeImageLink);
    refs.imageSrc.setAttribute('data-index',largeImageIndex);

    window.addEventListener('keydown', onEscPress);
    window.addEventListener('keydown', onArrowPress);
};
function onButtonClick(event){
    refs.modal.classList.remove('is-open');
    refs.imageSrc.setAttribute('src', ' ');
    window.removeEventListener('keydown', onEscPress);
    window.removeEventListener('keydown', onArrowPress);
};
function onOverlayClick(event){
    if(event.target === event.currentTarget){
        onButtonClick();
    }
};
function onEscPress(event){
    if(event.code === 'Escape'){
        onButtonClick();
    }
};
function onArrowPress(event){
    if(event.code === 'ArrowRight'){
        const currentIndex =  refs.imageSrc.getAttribute('data-index');
        if(+currentIndex === allImagesLargeLinks.length-1){return}
            refs.imageSrc.setAttribute('data-index', +currentIndex+1);
            refs.imageSrc.setAttribute('src', allImagesLargeLinks[+currentIndex+1]);
    }
    if(event.code === 'ArrowLeft'){
        const currentIndex =  refs.imageSrc.getAttribute('data-index');
        if(+currentIndex<=0){return}
        refs.imageSrc.setAttribute('data-index', +currentIndex-1);
        refs.imageSrc.setAttribute('src', allImagesLargeLinks[+currentIndex-1]);
    }
};