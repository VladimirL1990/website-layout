class Carousel {
  constructor(container, items, preview) {
    this.container = container;
    this.items = [...items]; // Преобразуем NodeList в массив
    this.previewImage = preview;

    this.currentIndex = 0; // Начальный индекс для текущего изображения

    this.addThumbnailClickEvent(); // Добавляем событие для кликов по миниатюрам
    this.addEventListeners(); // Добавляем событие для кнопок переключения
    this.updateGallery(); // Обновляем состояние галереи
  }

  // Обновление состояния галереи и миниатюр
  updateGallery() {
    this.items.forEach((el, i) => {
      el.classList.remove('active'); // Убираем класс active у всех миниатюр
      if (i === this.currentIndex) {
        el.classList.add('active'); // Добавляем класс active для текущей миниатюры
      }
    });
    this.updatePreviewImage(); // Обновляем главное изображение
  }

  // Обновление главного изображения
  updatePreviewImage() {
    const currentItem = this.items[this.currentIndex];
    this.previewImage.setAttribute('src', currentItem.getAttribute('src'));
  }

  // Установка состояния по направлению
  setCurrentState(direction) {
    if (direction === 'previous') {
      this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.items.length - 1;
    } else {
      this.currentIndex = (this.currentIndex < this.items.length - 1) ? this.currentIndex + 1 : 0;
    }
    this.updateGallery();
  }

  // Добавление событий для кнопок переключения
  addEventListeners() {
    const previousButton = document.querySelector('.gallery-controls-previous');
    const nextButton = document.querySelector('.gallery-controls-next');

    if (previousButton && nextButton) {
      previousButton.addEventListener('click', () => {
        this.setCurrentState('previous');
      });

      nextButton.addEventListener('click', () => {
        this.setCurrentState('next');
      });
    } else {
      console.error('Кнопки управления не найдены.');
    }
  }

  // Добавление событий для кликов по миниатюрам
  addThumbnailClickEvent() {
    this.items.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.currentIndex = index;
        this.updateGallery();
      });
    });
  }
}

// Инициализация карусели
document.addEventListener('DOMContentLoaded', () => {
  const galleryContainer = document.querySelector('.gallery-container');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const previewImage = document.querySelector('#preview-image');

  if (galleryContainer && galleryItems.length > 0 && previewImage) {
    new Carousel(galleryContainer, galleryItems, previewImage);
  } else {
    console.error('Не удалось инициализировать галерею: отсутствуют элементы.');
  }
});
