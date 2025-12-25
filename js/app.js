// Простой JavaScript для фильтрации видео
document.addEventListener("DOMContentLoaded", function () {
  // Данные видео (в будущем можно вынести в отдельный JSON)
  const videosData = [
    {
      id: 1,
      title: "Брошь",
      category: "beading",
      source: "rutube",
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
      source: "rutube",
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
      source: "rutube",
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
    {
      id: 4,
      title: "Урок бисероплетения с Pinterest",
      category: "sculpting",
      source: "pinterest",
      videoId: "4011087181305205",
      pinUrl: "https://www.pinterest.com/pin/4011087181305205/",
      description: "Мастер-класс по бисероплетению Лошадь",
      materials: ["бисер"],
      tags: ["бисероплетение"],
    },
    {
      id: 5,
      title: "Новый год в русском стиле",
      category: "sculpting",
      source: "pinterest",
      videoId: "1008102697850352396",
      pinUrl: "https://www.pinterest.com/pin/1008102697850352396/",
      description: "Новогодний шар на ёлку",
      materials: ["бисер", "пенопласт(шар)", ",бархат"],
      tags: ["бисероплетение"],
    },
    {
      id: 6,
      title: "Елочное украшение, шар",
      category: "sculpting",
      source: "pinterest",
      videoId: "1008102697850352396",
      pinUrl: "https://www.pinterest.com/pin/1008102697850352396/",
      description: "Новогодний шар на ёлку",
      materials: ["бисер", "пенопласт(шар)", ",бархат"],
      tags: ["бисероплетение"],
    },
    {
      id: 7,
      title: "Корзина",
      category: "sculpting",
      source: "pinterest",
      videoId: "14988611255344382",
      pinUrl: "https://www.pinterest.com/pin/14988611255344382/",
      description: "Корзина плетёнка в каркасе",
      materials: ["шнур", "клей", "спицы-каркас"],
      tags: ["плетение"],
    },
    {
      id: 8,
      title: "Серьги",
      category: "sculpting",
      source: "pinterest",
      videoId: "372391462960986799",
      pinUrl: "https://www.pinterest.com/pin/372391462960986799/",
      description: "Оплетение бусин с жемчугом Сваровски",
      materials: ["жемчуг Сваровски", "чешские стеклянные бусы", ",бисер тоно"],
      tags: ["бисероплетение"],
    },
    {
      id: 9,
      title: "Елочное украшение",
      category: "sculpting",
      source: "pinterest",
      videoId: "6051780745913336",
      pinUrl: "https://www.pinterest.com/pin/6051780745913336/",
      description: "Плетение по проволке пушистой нитью",
      materials: ["проволка", "пушистая нить"],
      tags: ["пушистая нить"],
    },
    {
      id: 10,
      title: "Новогоднее украшение",
      category: "sculpting",
      source: "pinterest",
      videoId: "25473554137991383",
      pinUrl: "https://www.pinterest.com/pin/25473554137991383/",
      description: "Красные и серебряные цветы",
      materials: ["проволка", "пушистая нить"],
      tags: ["пушистая нить"],
    },
    {
      id: 11,
      title: "Красна девица",
      category: "sculpting",
      source: "pinterest",
      videoId: "11118330333684756",
      pinUrl: "https://www.pinterest.com/pin/11118330333684756/",
      description: "Новогодний шар ручной работы",
      materials: ["бисер", "пенопласт(шар)", ",бархат"],
      tags: ["пушистая нить"],
    },
  ];

  // Элементы DOM для видео
  const videosContainer = document.getElementById("videosContainer");
  const categoryButtons = document.querySelectorAll(
    "#videos-content .category-btn"
  );
  const noVideosMessage = document.getElementById("noVideos");

  // Функция для получения iframe по источнику
  async function getVideoEmbed(video) {
    if (video.source === "pinterest") {
      return createPinterestCard(video);
    } else {
      return `<iframe src="https://rutube.ru/play/embed/${video.videoId}/"
                      style="width:100%; height:500px; border:none; border-radius:8px;"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                      loading="lazy">
              </iframe>`;
    }
  }

  // Функция создания карточки Pinterest (вся карточка - кнопка)
  function createPinterestCard(video) {
    const pinUrl =
      video.pinUrl || `https://www.pinterest.com/pin/${video.videoId}/`;

    return `
      <a href="${pinUrl}" target="_blank" class="pinterest-full-card">
        <div class="pinterest-card">
          <div class="pinterest-card-header">
            <div class="pinterest-icon">
              <i class="fab fa-pinterest"></i>
            </div>
            <div class="pinterest-title-section">
              <h3>${video.title}</h3>
              <span class="source-badge pinterest-badge">
                <i class="fab fa-pinterest"></i> Pinterest видео
              </span>
            </div>
          </div>
          
          <div class="pinterest-description">
            <p>${video.description}</p>
          </div>
          
          <div class="pinterest-action">
            <div class="pinterest-action-btn">
              <i class="fas fa-external-link-alt"></i>
              <span>Нажмите чтобы открыть в Pinterest</span>
            </div>
            <p class="pinterest-hint">
              <i class="fas fa-hand-pointer"></i> Нажмите на любую область этой карточки
            </p>
          </div>
        </div>
      </a>
    `;
  }

  // Инициализация видео
  console.log("🎬 Инициализация видео...");
  displayVideos(videosData);

  // Обработчики для кнопок категорий видео
  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      filterVideos(this.dataset.category);
    });
  });

  // Функция фильтрации видео
  function filterVideos(category) {
    const filteredVideos =
      category === "all"
        ? videosData
        : videosData.filter((video) => video.category === category);

    displayVideos(filteredVideos);
    noVideosMessage.style.display =
      filteredVideos.length === 0 ? "block" : "none";
  }

  // Функция отображения видео
  async function displayVideos(videos) {
    console.log(`📹 Отображаю ${videos.length} видео`);

    videosContainer.innerHTML = "";

    for (const video of videos) {
      const videoCard = await createVideoCard(video);
      videosContainer.appendChild(videoCard);
    }

    console.log("✅ Видео отображены");
  }

  // Функция создания карточки видео
  async function createVideoCard(video) {
    const article = document.createElement("article");
    article.className = "video-card";
    article.dataset.category = video.category;
    article.dataset.source = video.source;

    const materialsChips = video.materials
      .map(
        (material) => `
        <div class="material-chip">
          <i class="fas fa-circle"></i>
          <span>${material}</span>
        </div>`
      )
      .join("");

    const tags = video.tags
      .map((tag) => `<span class="video-tag">${tag}</span>`)
      .join("");

    const embedCode = await getVideoEmbed(video);

    // Для Pinterest не показываем обычный заголовок (он уже в карточке)
    const titleHtml =
      video.source === "pinterest"
        ? ""
        : `<div class="video-header">
          <h3>${video.title}</h3>
          <span class="source-badge rutube-badge">
            <i class="fas fa-video"></i> Rutube
          </span>
        </div>`;

    article.innerHTML = `
        ${titleHtml}
        <div class="video-container">
          ${embedCode}
        </div>
        <div class="video-meta">
          ${
            video.source !== "pinterest"
              ? `<div class="video-description">${video.description}</div>`
              : ""
          }
          ${
            materialsChips
              ? `
          <div class="video-materials">
            <div class="materials-header">
              <h4>Материалы:</h4>
              <button class="materials-toggle">
                <span>Показать</span>
                <span class="materials-count">${video.materials.length}</span>
                <i class="fas fa-chevron-down"></i>
              </button>
            </div>
            <div class="materials-chips">${materialsChips}</div>
          </div>`
              : ""
          }
          ${tags ? `<div class="video-tags">${tags}</div>` : ""}
        </div>
    `;

    return article;
  }

  // Функция аккордеона для материалов
  function initMaterialsAccordion() {
    document.addEventListener("click", function (e) {
      const toggle = e.target.closest(".materials-toggle");
      if (toggle) {
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
  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.addEventListener("click", function () {
      document
        .querySelectorAll(".tab-btn")
        .forEach((btn) => btn.classList.remove("active"));
      document
        .querySelectorAll(".tab-content")
        .forEach((content) => content.classList.remove("active"));

      this.classList.add("active");
      document
        .getElementById(this.dataset.tab + "-content")
        .classList.add("active");
    });
  });

  // Добавляем hover эффекты для Pinterest карточек
  setTimeout(() => {
    document.querySelectorAll(".pinterest-card").forEach((card) => {
      card.onmouseenter = function () {
        this.style.transform = "translateY(-5px)";
        this.style.boxShadow = "0 10px 30px rgba(230, 0, 35, 0.2)";
      };
      card.onmouseleave = function () {
        this.style.transform = "translateY(0)";
        this.style.boxShadow = "none";
      };
    });
  }, 100);

  // ==================== СИСТЕМА УВЕДОМЛЕНИЙ ====================
  function showNotification(message, type = "info", duration = 3000) {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `<div style="display: flex; align-items: center; gap: 10px;"><span>${message}</span></div>`;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("fade-out");
      setTimeout(() => notification.remove(), 300);
    }, duration);
    return notification;
  }

  // ==================== ФУНКЦИЯ ЗАГРУЗКИ НА СЕРВЕР ====================
  async function uploadPhotoToServer(formData) {
    try {
      const response = await fetch("/api/upload.php", {
        method: "POST",
        body: formData,
      });
      return await response.json();
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      return { success: false, error: "Сетевая ошибка" };
    }
  }

  // ==================== СЕРВЕРНОЕ ХРАНИЛИЩЕ ФОТО ====================

  // Загрузка фото с сервера
  async function loadPhotosFromServer() {
    try {
      const response = await fetch("/api/get_photos.php");
      const photos = await response.json();
      return photos.map((photo) => ({
        ...photo,
        imageUrl: "/uploads/users/" + photo.filename,
      }));
    } catch (error) {
      console.error("Ошибка загрузки фото:", error);
      return [];
    }
  }

  // Сохранение данных фото на сервер
  async function savePhotoData(photoData) {
    try {
      const response = await fetch("/api/save_photo_data.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(photoData),
      });
      return await response.json();
    } catch (error) {
      console.error("Ошибка сохранения данных:", error);
      return { success: false };
    }
  }

  // Обновление галереи с сервера
  async function refreshPhotoGallery() {
    const serverPhotos = await loadPhotosFromServer();
    photosData = serverPhotos; // Заменяем локальные данные серверными
    savePhotosData(); // Сохраняем в localStorage для кеша
    displayPhotos(getCurrentPhotoCategory());
  }

  // Данные фотографий (хранятся в localStorage)
  let photosData = JSON.parse(localStorage.getItem("photosData")) || [];

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

  // Функция удаления фото
  async function deletePhoto(photoId) {
    if (!confirm("Вы уверены, что хотите удалить это фото?")) {
      return;
    }

    try {
      const response = await fetch("/api/delete_photo.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: photoId }),
      });

      const result = await response.json();

      if (result.success) {
        showNotification("✅ Фото успешно удалено", "success");
        await refreshPhotoGallery(); // Обновляем галерею
      } else {
        showNotification("❌ Ошибка удаления: " + result.error, "error");
      }
    } catch (error) {
      console.error("Ошибка удаления:", error);
      showNotification("❌ Сетевая ошибка при удалении", "error");
    }
  }

  // Обновляем функцию createPhotoCard для добавления кнопки удаления:
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
        <button class="delete-photo-btn">
            <i class="fas fa-trash"></i> Удалить
        </button>
      </div>
    `;

    // Обработчик просмотра (только по клику на изображение)
    const photoImage = photoCard.querySelector(".photo-image");
    photoImage.addEventListener("click", () => openPhotoViewer(photo));

    return photoCard;
  }

  // Функция для получения читаемого названия категории
  function getCategoryName(category) {
    const categories = {
      beading: "Бисероплетение",
      sculpting: "Лепка",
      knitting: "Вязание",
      embroidery: "Вышивка",
      macrame: "Макраме",
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
  async function handlePhotoUpload(event) {
    event.preventDefault();

    const title = document.getElementById("photoTitle").value;
    const description = document.getElementById("photoDescription").value;
    const category = document.getElementById("photoCategory").value;
    const fileInput = document.getElementById("photoFile");

    if (!fileInput.files[0]) {
      showNotification("📷 Пожалуйста, выберите файл", "warning", 2000);
      return;
    }

    const file = fileInput.files[0];

    // Проверяем размер файла (максимум 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showNotification(
        "📁 Файл слишком большой. Максимальный размер: 5MB",
        "error",
        3000
      );
      return;
    }

    // Создаем FormData для отправки на сервер
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    // Показываем уведомление о загрузке (без блокировки интерфейса!)
    const loadingNotification = showNotification(
      "⏳ Загружаем фото на сервер...",
      "info",
      0
    );

    try {
      // 1. Отправляем файл на сервер
      const uploadResult = await uploadPhotoToServer(formData);

      if (uploadResult.success) {
        // 2. Сохраняем метаданные в JSON на сервере
        const saveResult = await savePhotoData({
          title: title,
          description: description,
          category: category,
          filename: uploadResult.filename,
        });

        if (saveResult.success) {
          // Убираем уведомление о загрузке
          loadingNotification.classList.add("fade-out");
          setTimeout(() => loadingNotification.remove(), 300);

          // Показываем успех
          showNotification("✅ Фото успешно загружено!", "success", 3000);

          // 3. Обновляем галерею с сервера
          await refreshPhotoGallery();

          // Закрываем модальное окно
          closeUploadModal();

          // Очищаем форму
          document.getElementById("uploadPhotoForm").reset();
          document.getElementById("imagePreview").style.display = "none";
        } else {
          loadingNotification.classList.add("fade-out");
          setTimeout(() => loadingNotification.remove(), 300);
          showNotification("❌ Ошибка сохранения данных фото", "error", 4000);
        }
      } else {
        loadingNotification.classList.add("fade-out");
        setTimeout(() => loadingNotification.remove(), 300);
        showNotification(
          "❌ Ошибка загрузки: " + uploadResult.error,
          "error",
          4000
        );
      }
    } catch (error) {
      loadingNotification.classList.add("fade-out");
      setTimeout(() => loadingNotification.remove(), 300);
      showNotification("❌ Сетевая ошибка при загрузке", "error", 4000);
    }
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

  // ==================== ИСПРАВЛЕННАЯ ФУНКЦИЯ initPhotoGallery() ====================
  // Инициализация фото-галереи
  function initPhotoGallery() {
    console.log("🚀 Инициализация фото-галереи...");

    // Загружаем фото
    refreshPhotoGallery();

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

    // ========== БЕЗОПАСНЫЕ ОБРАБОТЧИКИ С ПРОВЕРКОЙ ==========
    // 1. Кнопка загрузки фото
    const uploadBtn = document.getElementById("uploadPhotoBtn");
    if (uploadBtn) {
      uploadBtn.addEventListener("click", openUploadModal);
      console.log("✅ Обработчик добавлен для uploadPhotoBtn");
    } else {
      console.warn("⚠️ Элемент uploadPhotoBtn не найден");
    }

    // 2. Кнопка закрытия модального окна загрузки
    const closeUploadBtn = document.getElementById("closeUploadModal");
    if (closeUploadBtn) {
      closeUploadBtn.addEventListener("click", closeUploadModal);
      console.log("✅ Обработчик добавлен для closeUploadModal");
    }

    // 3. Кнопка отмены загрузки
    const cancelBtn = document.getElementById("cancelUpload");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", closeUploadModal);
      console.log("✅ Обработчик добавлен для cancelUpload");
    }

    // 4. Кнопка закрытия окна просмотра
    const closeViewBtn = document.getElementById("closeViewModal");
    if (closeViewBtn) {
      closeViewBtn.addEventListener("click", closeViewModal);
      console.log("✅ Обработчик добавлен для closeViewModal");
    }

    // 5. Форма загрузки
    const uploadForm = document.getElementById("uploadPhotoForm");
    if (uploadForm) {
      uploadForm.addEventListener("submit", handlePhotoUpload);
      console.log("✅ Обработчик добавлен для uploadPhotoForm");
    }

    // 6. Поле выбора файла
    const photoFile = document.getElementById("photoFile");
    if (photoFile) {
      photoFile.addEventListener("change", previewImage);
      console.log("✅ Обработчик добавлен для photoFile");
    }
    // ========== КОНЕЦ БЕЗОПАСНЫХ ОБРАБОТЧИКОВ ==========

    // Закрытие модальных окон при клике вне контента
    window.addEventListener("click", function (event) {
      const uploadModal = document.getElementById("uploadModal");
      const viewModal = document.getElementById("photoViewModal");

      if (uploadModal && event.target === uploadModal) closeUploadModal();
      if (viewModal && event.target === viewModal) closeViewModal();
    });

    console.log("✅ Фото-галерея успешно инициализирована");
  }

  // ==================== КОД ДЛЯ СХЕМ И ИНСТРУКЦИЙ ====================

  // ДОБАВЬТЕ ЭТОТ МАССИВ (тестовые данные схем)
  const instructionsData = [];

  // Функция для получения иконки категории (ДОБАВЬТЕ ЭТУ ФУНКЦИЮ)
  function getCategoryIcon(category) {
    const icons = {
      beading: "fa-gem",
      embroidery: "fas fa-thread",
      knitting: "fa-scroll",
      macrame: "fas fa-knot",
    };
    return icons[category] || "fa-file-alt";
  }

  // ==================== ФУНКЦИИ ДЛЯ ЗАГРУЗКИ СХЕМ ====================

  // Элементы DOM для схем
  const uploadSchemeBtn = document.getElementById("uploadSchemeBtn");
  const uploadSchemeModal = document.getElementById("uploadSchemeModal");
  const closeSchemeModalBtn = document.getElementById("closeSchemeModal");
  const cancelSchemeBtn = document.getElementById("cancelSchemeUpload");
  const uploadSchemeForm = document.getElementById("uploadSchemeForm");

  // Функции для работы с модальным окном схем
  function openSchemeModal() {
    uploadSchemeModal.style.display = "block";
  }

  function closeSchemeModal() {
    uploadSchemeModal.style.display = "none";
    uploadSchemeForm.reset();
    document.getElementById("schemePreview").style.display = "none";
    document.getElementById("previewImagePreview").style.display = "none";
  }

  // Обработчик предпросмотра файла схемы
  document
    .getElementById("schemeFile")
    ?.addEventListener("change", function (event) {
      const preview = document.getElementById("schemePreview");
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          // Для PDF показываем иконку, для изображений - превью
          if (file.type === "application/pdf") {
            preview.innerHTML = `
            <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
              <i class="fas fa-file-pdf" style="font-size: 48px; color: #e74c3c;"></i>
              <p style="margin-top: 10px; color: #666;">${file.name}</p>
              <p style="font-size: 0.8em; color: #999;">${(
                file.size /
                1024 /
                1024
              ).toFixed(2)} MB</p>
            </div>
          `;
          } else {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-height: 200px; width: auto;">`;
          }
          preview.style.display = "block";
        };
        reader.readAsDataURL(file);
      } else {
        preview.style.display = "none";
      }
    });

  // Обработчик предпросмотра изображения превью
  document
    .getElementById("schemePreviewImage")
    ?.addEventListener("change", function (event) {
      const preview = document.getElementById("previewImagePreview");
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          preview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-height: 150px; width: auto;">`;
          preview.style.display = "block";
        };
        reader.readAsDataURL(file);
      } else {
        preview.style.display = "none";
      }
    });

  // Функция для загрузки схемы на сервер
  async function handleSchemeUpload(event) {
    event.preventDefault();

    const title = document.getElementById("schemeTitle").value;
    const description = document.getElementById("schemeDescription").value;
    const category = document.getElementById("schemeCategory").value;
    const schemeFileInput = document.getElementById("schemeFile");
    const previewFileInput = document.getElementById("schemePreviewImage");

    if (!schemeFileInput.files[0]) {
      showNotification("📁 Пожалуйста, выберите файл схемы", "warning", 2000);
      return;
    }

    const schemeFile = schemeFileInput.files[0];
    const previewFile = previewFileInput.files[0];

    // Проверяем размер файла (максимум 10MB)
    if (schemeFile.size > 10 * 1024 * 1024) {
      showNotification(
        "📁 Файл слишком большой. Максимальный размер: 10MB",
        "error",
        3000
      );
      return;
    }

    // Показываем уведомление о загрузке
    const loadingNotification = showNotification(
      "⏳ Загружаем схему на сервер...",
      "info",
      0
    );

    try {
      // 1. Создаем FormData для отправки файлов
      const formData = new FormData();
      formData.append("schemeFile", schemeFile);
      if (previewFile) {
        formData.append("previewFile", previewFile);
      }

      // 2. Отправляем файлы на сервер
      const uploadResponse = await fetch("/api/upload_scheme.php", {
        method: "POST",
        body: formData,
      });

      // Проверяем ответ
      if (!uploadResponse.ok) {
        let errorMsg = `Ошибка ${uploadResponse.status}`;

        if (uploadResponse.status === 413) {
          errorMsg =
            "Файл слишком большой. Уменьшите размер файла (макс. 10MB)";
        } else if (uploadResponse.status === 500) {
          errorMsg = "Ошибка сервера. Проверьте права доступа к папкам.";
        }

        throw new Error(errorMsg);
      }

      const uploadResult = await uploadResponse.json();

      if (!uploadResult.success) {
        throw new Error(uploadResult.error || "Ошибка загрузки файла");
      }

      // 3. Сохраняем метаданные схемы в JSON
      const saveResponse = await fetch("/api/save_scheme_data.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
          category: category,
          file: uploadResult.schemeUrl,
          preview: uploadResult.previewUrl,
          fileType: uploadResult.fileType,
          fileSize: uploadResult.fileSize,
        }),
      });

      const saveResult = await saveResponse.json();

      if (!saveResult.success) {
        throw new Error(saveResult.error || "Ошибка сохранения данных");
      }

      // 4. Обновляем галерею с сервера
      await refreshSchemesGallery();

      // Убираем уведомление о загрузке
      loadingNotification.classList.add("fade-out");
      setTimeout(() => loadingNotification.remove(), 300);

      // Показываем успех
      showNotification("✅ Схема успешно добавлена!", "success", 3000);

      // Закрываем модальное окно
      closeSchemeModal();
    } catch (error) {
      console.error("Ошибка добавления схемы:", error);
      loadingNotification.classList.add("fade-out");
      setTimeout(() => loadingNotification.remove(), 300);

      // Более информативное сообщение об ошибке
      let errorMessage = error.message;
      if (error.message.includes("413")) {
        errorMessage = "Файл слишком большой! Максимальный размер: 10MB.";
      } else if (error.message.includes("Unexpected token")) {
        errorMessage = "Ошибка сервера. Проверьте настройки PHP.";
      }

      showNotification(`❌ ${errorMessage}`, "error", 5000);
    }
  }

  // Загрузка схем с сервера
  async function loadSchemesFromServer() {
    try {
      const response = await fetch("/api/get_schemes.php");
      if (!response.ok) throw new Error("Ошибка сети");

      const schemes = await response.json();

      // Очищаем и обновляем массив
      instructionsData.length = 0;
      instructionsData.push(...schemes);

      console.log(`📊 Загружено схем с сервера: ${schemes.length}`);
      return true;
    } catch (error) {
      console.error("Ошибка загрузки схем:", error);
      return false;
    }
  }

  // Обновление галереи схем с сервера
  async function refreshSchemesGallery() {
    const loaded = await loadSchemesFromServer();
    if (loaded) {
      const activeCategory = document.querySelector(
        "#instructions-content .category-btn.active"
      ).dataset.category;
      displayInstructions(activeCategory);
    }
  }

  // Обновите initInstructionsGallery:
  async function initInstructionsGallery() {
    console.log("🚀 Инициализация галереи схем...");

    const container = document.getElementById("instructionsContainer");
    if (!container) {
      console.error("❌ Контейнер схем не найден!");
      return;
    }

    // Загружаем схемы с сервера
    await loadSchemesFromServer();
    console.log(`📊 Загружено схем: ${instructionsData.length}`);
    displayInstructions("all");

    // Обработчики для категорий схем
    const instructionCategoryBtns = document.querySelectorAll(
      "#instructions-content .category-btn"
    );
    instructionCategoryBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        instructionCategoryBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        displayInstructions(btn.dataset.category);
      });
    });

    // Обработчики для загрузки схем
    if (uploadSchemeBtn) {
      uploadSchemeBtn.addEventListener("click", openSchemeModal);
      console.log("✅ Кнопка добавления схемы подключена");
    }

    if (closeSchemeModalBtn) {
      closeSchemeModalBtn.addEventListener("click", closeSchemeModal);
    }

    if (cancelSchemeBtn) {
      cancelSchemeBtn.addEventListener("click", closeSchemeModal);
    }

    if (uploadSchemeForm) {
      uploadSchemeForm.addEventListener("submit", handleSchemeUpload);
    }

    // Закрытие модального окна при клике вне контента
    if (uploadSchemeModal) {
      uploadSchemeModal.addEventListener("click", function (event) {
        if (event.target === uploadSchemeModal) {
          closeSchemeModal();
        }
      });
    }

    console.log("✅ Галерея схем успешно инициализирована");
  }

  // Функция отображения схем
  function displayInstructions(category = "all") {
    const container = document.getElementById("instructionsContainer");
    const noInstructions = document.getElementById("noInstructions");

    container.innerHTML = "";

    const filteredInstructions =
      category === "all"
        ? instructionsData
        : instructionsData.filter(
            (instruction) => instruction.category === category
          );

    if (filteredInstructions.length === 0) {
      noInstructions.style.display = "block";
      return;
    }

    noInstructions.style.display = "none";

    filteredInstructions.forEach((instruction) => {
      const card = createInstructionCard(instruction);
      container.appendChild(card);
    });
  }

  // Функция создания карточки схемы
  function createInstructionCard(instruction) {
    const card = document.createElement("div");
    card.className = "instruction-card";
    card.dataset.category = instruction.category;
    card.dataset.id = instruction.id;

    const fileIcon =
      instruction.fileType === "pdf" ? "fa-file-pdf" : "fa-file-image";

    // Создаем простой SVG плейсхолдер
    const colors = {
      beading: "#FF6B6B",
      knitting: "#4ECDC4",
      embroidery: "#FFE66D",
      macrame: "#95E1D3",
    };

    const categoryColor = colors[instruction.category] || "#4a90e2";
    const svgPlaceholder = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="${categoryColor}" opacity="0.1"/>
      <rect x="100" y="100" width="200" height="100" fill="${categoryColor}" opacity="0.3"/>
      <text x="200" y="150" font-family="Arial" font-size="24" fill="${categoryColor}" text-anchor="middle" dy="0.35em">
        ${instruction.fileType ? instruction.fileType.toUpperCase() : "PDF"}
      </text>
      <text x="200" y="250" font-family="Arial" font-size="16" fill="#666" text-anchor="middle">
        ${instruction.title.substring(0, 40)}
      </text>
    </svg>
  `;

    const encodedSvg = encodeURIComponent(svgPlaceholder);
    const placeholderUrl = `data:image/svg+xml;utf8,${encodedSvg}`;

    // Используем превью если есть, иначе плейсхолдер
    const previewUrl = instruction.preview || placeholderUrl;

    card.innerHTML = `
    <div class="instruction-preview">
      <img src="${previewUrl}" 
           alt="${instruction.title}"
           loading="lazy"
           onerror="this.onerror=null; this.src='${placeholderUrl}'">
    </div>
    <div class="instruction-info">
      <h3 class="instruction-title">${instruction.title}</h3>
      <p class="instruction-description">${
        instruction.description || "Описание не добавлено"
      }</p>
      
      <div class="instruction-file-info">
        <i class="fas ${fileIcon}"></i>
        <span>${
          instruction.fileType ? instruction.fileType.toUpperCase() : "ФАЙЛ"
        } • ${instruction.fileSize || "Размер не указан"}</span>
        <span style="margin-left: auto; color: #999; font-size: 0.8em;">
          <i class="far fa-calendar"></i> ${
            instruction.date || "Дата не указана"
          }
        </span>
      </div>
      
      <div class="instruction-meta">
        <span class="instruction-category">
          <i class="fas ${getCategoryIcon(instruction.category)}"></i>
          ${getCategoryName(instruction.category)}
        </span>
        <div class="instruction-actions">
    <button class="view-scheme-btn" data-id="${instruction.id}" data-file="${
      instruction.file
    }" data-type="${instruction.fileType}">
        <i class="fas fa-eye"></i>
        Просмотреть
    </button>
    <a href="${instruction.file}" 
       class="instruction-download-btn" 
       ${
         instruction.file && instruction.file !== "#"
           ? "download"
           : 'onclick="return false;"'
       }>
        <i class="fas fa-download"></i>
        Скачать
    </a>
    <button class="delete-scheme-btn" data-id="${instruction.id}">
        <i class="fas fa-trash"></i>
        Удалить
    </button>
</div>
      </div>
    </div>
  `;

    // Обработчик удаления
    const deleteBtn = card.querySelector(".delete-scheme-btn");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        e.preventDefault();
        const schemeId = this.getAttribute("data-id");
        if (schemeId) {
          deleteScheme(schemeId);
        }
      });
    }

    return card;
  }

  // Функция удаления схемы
  async function deleteScheme(schemeId) {
    if (
      !confirm(
        "Вы уверены, что хотите удалить эту схему?\n\nУдаление затронет:\n• Файл схемы на сервере\n• Превью (если есть)\n• Данные в JSON файле"
      )
    ) {
      return;
    }

    // Показываем уведомление об удалении
    const loadingNotification = showNotification(
      "⏳ Удаляем схему...",
      "info",
      0
    );

    try {
      // Отправляем запрос на удаление на сервер
      const response = await fetch("/api/delete_scheme.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: schemeId }),
      });

      const result = await response.json();

      // Убираем уведомление о загрузке
      loadingNotification.classList.add("fade-out");
      setTimeout(() => loadingNotification.remove(), 300);

      if (result.success) {
        showNotification("✅ Схема успешно удалена", "success", 3000);

        // Обновляем галерею схем
        await refreshSchemesGallery();
      } else {
        showNotification("❌ Ошибка удаления: " + result.error, "error", 4000);
      }
    } catch (error) {
      console.error("Ошибка удаления схемы:", error);

      loadingNotification.classList.add("fade-out");
      setTimeout(() => loadingNotification.remove(), 300);

      showNotification("❌ Сетевая ошибка при удалении", "error", 4000);
    }
  }

  // Функция предпросмотра PDF
  function previewPDF(instruction) {
    // Создаем модальное окно для просмотра PDF
    const modal = document.createElement("div");
    modal.className = "modal pdf-viewer-modal";
    modal.innerHTML = `
      <div class="modal-content">
        <div class="pdf-viewer-header">
          <h3>${instruction.title}</h3>
          <button class="close-modal">&times;</button>
        </div>
        <div class="pdf-viewer-content">
          <iframe src="${instruction.file}#toolbar=0&navpanes=0&scrollbar=0" 
                  title="${instruction.title}"></iframe>
        </div>
        <div class="pdf-viewer-actions">
          <a href="${instruction.file}" class="btn-primary" download>
            <i class="fas fa-download"></i> Скачать PDF
          </a>
          <button class="btn-secondary close-pdf-viewer">Закрыть</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = "block";

    // Обработчики закрытия
    const closeBtn = modal.querySelector(".close-modal");
    const closeViewerBtn = modal.querySelector(".close-pdf-viewer");

    closeBtn.addEventListener("click", () => {
      document.body.removeChild(modal);
    });

    closeViewerBtn.addEventListener("click", () => {
      document.body.removeChild(modal);
    });

    // Закрытие по клику вне контента
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }

  // ==================== ФИНАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ ====================

  // Инициализируем фото-галерею
  initPhotoGallery();

  // Инициализируем галерею схем
  initInstructionsGallery();

  console.log(
    "🎉 Все галереи успешно загружены! Видео:",
    videosData.length,
    "Схемы:",
    instructionsData.length
  );

  // Обработчик для кнопки Просмотреть
  document.addEventListener("click", function (e) {
    if (e.target.closest(".view-scheme-btn")) {
      const btn = e.target.closest(".view-scheme-btn");
      const fileUrl = btn.getAttribute("data-file");
      const fileType = btn.getAttribute("data-type");
      const schemeId = btn.getAttribute("data-id");

      // Просто открываем в новом окне (самый простой способ)
      window.open(fileUrl, "_blank");
    }
  });
}); // <-- закрывающая скобка DOMContentLoaded
