// Простой JavaScript для фильтрации видео
document.addEventListener("DOMContentLoaded", function () {
  // Данные видео (в будущем можно вынести в отдельный JSON)
  const videosData = [
    {
      id: 1,
      title: "Брошь",
      category: "beading",
      videoId: "f48fe3bb7424ef86e74a37f6101305cd",
      description:
        "Брошь Божья коровка из бисера. Мастер-класс. Как сделать крылья из фатина. 1 часть.",
      materials: [
        "Бисер № 15, № 12, № 10",
        "Страз в оправе 18х25 мм",
        "Биконусы 2 мм, 3 мм",
        "Бусины квадратные 2 мм и 3 мм",
        "Бусины-рондели 2 мм",
        "Пайетки 3 мм",
        "Пины с шариком",
        "Проволока",
        "Булавка",
        "Мононить",
        "Нитки для бисера",
        "Фетр",
        "Кожа",
        "Картон",
        "Клей",
      ],
      tags: ["бисероплетение"],
    },
    {
      id: 2,
      title: "Брошь",
      category: "beading",
      videoId: "5a97a7698d19372cc4627f5edd11c68e",
      description:
        "Брошь Божья коровка из бисера. Мастер-класс. Как сделать крылья из фатина. 2 часть.",
      materials: [
        "Бисер № 15, № 12, № 10",
        "Страз в оправе 18х25 мм",
        "Биконусы 2 мм, 3 мм",
        "Бусины квадратные 2 мм и 3 мм",
        "Бусины-рондели 2 мм",
        "Пайетки 3 мм",
        "Пины с шариком",
        "Проволока",
        "Булавка",
        "Мононить",
        "Нитки для бисера",
        "Фетр",
        "Кожа",
        "Картон",
        "Клей",
      ],
      tags: ["бисероплетение"],
    },
    {
      id: 3,
      title: "Сетка",
      category: "beading",
      videoId: "4964603059593286b5e4de7f55301475",
      description: "Сетка из бисера широкая узкая Видеоурок 3",
      materials: ["Бисер(Чехия), марка Preciosa, номера 03165, 18565"],
      tags: [
        "бисероплетение",
        "сетка_из_бисера",
        "техника_сетки",
        "ромбовидная_сетка",
        "для_начинающих",
        "основы_бисероплетения",
        "браслеты_из_бисера",
        "колье_из_бисера",
        "узкая_сетка",
        "широкая_сетка",
        "мастер_класс",
      ],
    },
  ];

  // Элементы DOM для видео
  const videosContainer = document.getElementById("videosContainer");
  const categoryButtons = document.querySelectorAll(
    "#videos-content .category-btn"
  );
  const noVideosMessage = document.getElementById("noVideos");

  // Инициализация видео - показываем все видео
  displayVideos(videosData);

  // Обработчики для кнопок категорий видео
  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Убираем активный класс у всех кнопок
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      // Добавляем активный класс текущей кнопке
      this.classList.add("active");

      const category = this.dataset.category;
      filterVideos(category);
    });
  });

  // Функция фильтрации видео
  function filterVideos(category) {
    let filteredVideos;

    if (category === "all") {
      filteredVideos = videosData;
    } else {
      filteredVideos = videosData.filter(
        (video) => video.category === category
      );
    }

    displayVideos(filteredVideos);

    // Показываем/скрываем сообщение "нет видео"
    if (filteredVideos.length === 0) {
      noVideosMessage.style.display = "block";
    } else {
      noVideosMessage.style.display = "none";
    }
  }

  // Функция отображения видео
  function displayVideos(videos) {
    videosContainer.innerHTML = "";

    videos.forEach((video) => {
      const videoCard = createVideoCard(video);
      videosContainer.appendChild(videoCard);
    });
  }

  // Функция создания карточки видео
  function createVideoCard(video) {
    const article = document.createElement("article");
    article.className = "video-card";
    article.dataset.category = video.category;

    const materialsChips = video.materials
      .map(
        (material) =>
          `<div class="material-chip">
            <i class="fas fa-circle"></i>
            <span>${material}</span>
         </div>`
      )
      .join("");

    const tags = video.tags
      .map((tag) => `<span class="video-tag">${tag}</span>`)
      .join("");

    article.innerHTML = `
        <h3>${video.title}</h3>
        <div class="video-container">
            <iframe src="https://rutube.ru/play/embed/${video.videoId}/"></iframe>
        </div>
        <div class="video-meta">
            <div class="video-description">
                ${video.description}
            </div>
            <div class="video-materials">
                <div class="materials-header">
                    <h4>Материалы:</h4>
                    <button class="materials-toggle">
                        <span>Показать</span>
                        <span class="materials-count">${video.materials.length}</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
                <div class="materials-chips">
                    ${materialsChips}
                </div>
            </div>
            <div class="video-tags">
                ${tags}
            </div>
        </div>
    `;

    return article;
  }

  // Функция аккордеона для материалов
  function initMaterialsAccordion() {
    document.addEventListener("click", function (e) {
      if (e.target.closest(".materials-toggle")) {
        const toggle = e.target.closest(".materials-toggle");
        const chipsContainer = toggle
          .closest(".video-materials")
          .querySelector(".materials-chips");

        chipsContainer.classList.toggle("expanded");
        toggle.classList.toggle("active");

        const span = toggle.querySelector("span:first-child");
        span.textContent = toggle.classList.contains("active")
          ? "Скрыть"
          : "Показать";
      }
    });
  }

  // Запускаем аккордеон
  initMaterialsAccordion();

  // Обработчики для переключения вкладок
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.dataset.tab;

      // Убираем активный класс у всех кнопок и контента
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Добавляем активный класс текущей кнопке и контенту
      this.classList.add("active");
      document.getElementById(tabId + "-content").classList.add("active");
    });
  });

  // ==================== КОД ДЛЯ ФОТО-ГАЛЕРЕИ ====================

  // Данные фотографий (хранятся в localStorage)
  let photosData = JSON.parse(localStorage.getItem("photosData")) || [
    {
      id: 1,
      title: "Тесты",
      description: "Красивая работа из бисера",
      category: "beading",
      imageUrl:
        "https://via.placeholder.com/300x200/4a90e2/ffffff?text=Бисероплетение",
    },
    {
      id: 2,
      title: "Пример вязания",
      description: "Теплая вязаная вещь",
      category: "knitting",
      imageUrl:
        "https://via.placeholder.com/300x200/50c878/ffffff?text=Вязание",
    },
  ];

  // Функция для сохранения данных в localStorage
  function savePhotosData() {
    localStorage.setItem("photosData", JSON.stringify(photosData));
  }

  // Функция для отображения фотографий
  function displayPhotos(category = "all") {
    const photosContainer = document.getElementById("photosContainer");
    const noPhotos = document.getElementById("noPhotos");

    photosContainer.innerHTML = "";

    const filteredPhotos =
      category === "all"
        ? photosData
        : photosData.filter((photo) => photo.category === category);

    if (filteredPhotos.length === 0) {
      noPhotos.style.display = "block";
      photosContainer.style.display = "none";
      return;
    }

    noPhotos.style.display = "none";
    photosContainer.style.display = "grid";

    filteredPhotos.forEach((photo) => {
      const photoCard = createPhotoCard(photo);
      photosContainer.appendChild(photoCard);
    });
  }

  // Функция создания карточки фото
  function createPhotoCard(photo) {
    const photoCard = document.createElement("div");
    photoCard.className = "photo-card";
    photoCard.setAttribute("data-id", photo.id);

    photoCard.innerHTML = `
      <img src="${photo.imageUrl}" alt="${photo.title}" class="photo-image">
      <div class="photo-info">
        <div class="photo-title">${photo.title}</div>
        <div class="photo-description">${photo.description}</div>
        <div class="photo-category">${getCategoryName(photo.category)}</div>
      </div>
    `;

    // Добавляем обработчик клика для просмотра фото
    photoCard.addEventListener("click", () => openPhotoViewer(photo));

    return photoCard;
  }

  // Функция для получения читаемого названия категории
  function getCategoryName(category) {
    const categories = {
      beading: "Бисероплетение",
      sculpting: "Лепка",
      knitting: "Вязание",
    };
    return categories[category] || category;
  }

  // Функция для открытия просмотрщика фото
  function openPhotoViewer(photo) {
    const modal = document.getElementById("photoViewModal");
    const fullSizeImg = document.getElementById("fullSizePhoto");
    const title = document.getElementById("viewerPhotoTitle");
    const description = document.getElementById("viewerPhotoDescription");
    const category = document.getElementById("viewerPhotoCategory");

    fullSizeImg.src = photo.imageUrl;
    title.textContent = photo.title;
    description.textContent = photo.description;
    category.textContent = getCategoryName(photo.category);

    modal.style.display = "block";
  }

  // Функция для загрузки фото
  function handlePhotoUpload(event) {
    event.preventDefault();

    const title = document.getElementById("photoTitle").value;
    const description = document.getElementById("photoDescription").value;
    const category = document.getElementById("photoCategory").value;
    const fileInput = document.getElementById("photoFile");

    if (!fileInput.files[0]) {
      alert("Пожалуйста, выберите файл");
      return;
    }

    const file = fileInput.files[0];

    // Проверяем размер файла (максимум 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Файл слишком большой. Максимальный размер: 5MB");
      return;
    }

    // Создаем URL для загруженного файла
    const imageUrl = URL.createObjectURL(file);

    // Создаем новый объект фото
    const newPhoto = {
      id: Date.now(), // Используем timestamp как ID
      title: title,
      description: description,
      category: category,
      imageUrl: imageUrl,
    };

    // Добавляем фото в массив
    photosData.unshift(newPhoto);

    // Сохраняем в localStorage
    savePhotosData();

    // Закрываем модальное окно
    closeUploadModal();

    // Очищаем форму
    document.getElementById("uploadPhotoForm").reset();
    document.getElementById("imagePreview").style.display = "none";

    // Обновляем отображение фотографий
    displayPhotos(getCurrentPhotoCategory());

    alert("Фото успешно добавлено!");
  }

  // Функция для предпросмотра изображения
  function previewImage(event) {
    const preview = document.getElementById("imagePreview");
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        preview.style.display = "block";
      };

      reader.readAsDataURL(file);
    } else {
      preview.style.display = "none";
    }
  }

  // Функции для работы с модальными окнами
  function openUploadModal() {
    document.getElementById("uploadModal").style.display = "block";
  }

  function closeUploadModal() {
    document.getElementById("uploadModal").style.display = "none";
  }

  function closeViewModal() {
    document.getElementById("photoViewModal").style.display = "none";
  }

  // Функция для получения текущей активной категории фото
  function getCurrentPhotoCategory() {
    const activeBtn = document.querySelector(
      "#photos-content .category-btn.active"
    );
    return activeBtn ? activeBtn.dataset.category : "all";
  }

  // Инициализация фото-галереи
  function initPhotoGallery() {
    displayPhotos();

    // Обработчики для категорий фото
    const photoCategoryBtns = document.querySelectorAll(
      "#photos-content .category-btn"
    );
    photoCategoryBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        photoCategoryBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        displayPhotos(btn.dataset.category);
      });
    });

    // Обработчики для модальных окон
    document
      .getElementById("uploadPhotoBtn")
      .addEventListener("click", openUploadModal);
    document
      .getElementById("closeUploadModal")
      .addEventListener("click", closeUploadModal);
    document
      .getElementById("cancelUpload")
      .addEventListener("click", closeUploadModal);
    document
      .getElementById("closeViewModal")
      .addEventListener("click", closeViewModal);

    // Обработчик формы загрузки
    document
      .getElementById("uploadPhotoForm")
      .addEventListener("submit", handlePhotoUpload);

    // Обработчик предпросмотра изображения
    document
      .getElementById("photoFile")
      .addEventListener("change", previewImage);

    // Закрытие модальных окон при клике вне контента
    window.addEventListener("click", function (event) {
      const uploadModal = document.getElementById("uploadModal");
      const viewModal = document.getElementById("photoViewModal");

      if (event.target === uploadModal) {
        closeUploadModal();
      }
      if (event.target === viewModal) {
        closeViewModal();
      }
    });
  }

  // Инициализируем фото-галерею
  initPhotoGallery();
});
