export const createGalleryCardsTemplate = picturesArr => {
  return picturesArr
    .map(pictureInfo => {
      return `
      <li class="gallery__item">
        <a class="gallery__link" href="${pictureInfo.bannerUrl}">
          <img
            class="gallery__image"
            src="${pictureInfo.url}"
            alt="${pictureInfo.alt}"
            width="${pictureInfo.width}"
            height="${pictureInfo.height}"
          />
        </a>
      </li>
      `;
    })
    .join('');
};
