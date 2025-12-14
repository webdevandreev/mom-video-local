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
      description: "Брошь Божья коровка из бисера. Мастер-класс. Как сделать крылья из фатина. 1 часть.",
      materials: ["Бисер № 15, № 12, № 10", "Страз в оправе 18х25 мм", "Биконусы 2 мм, 3 мм", "Бусины квадратные 2 мм и 3 мм", "Бусины-рондели 2 мм", "Пайетки 3 мм", "Пины с шариком", "Проволока", "Булавка", "Мононить", "Нитки для бисера", "Фетр", "Кожа", "Картон", "Клей"],
      tags: ["бисероплетение"],
    },
    {
      id: 2,
      title: "Брошь",
      category: "beading",
      source: "rutube",
      videoId: "5a97a7698d19372cc4627f5edd11c68e",
      description: "Брошь Божья коровка из бисера. Мастер-класс. Как сделать крылья из фатина. 2 часть.",
      materials: ["Бисер № 15, № 12, № 10", "Страз в оправе 18х25 мм", "Биконусы 2 мм, 3 мм", "Бусины квадратные 2 мм и 3 мм", "Бусины-рондели 2 мм", "Пайетки 3 мм", "Пины с шариком", "Проволока", "Булавка", "Мононить", "Нитки для бисера", "Фетр", "Кожа", "Картон", "Клей"],
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
      tags: ["бисероплетение", "сетка_из_бисера", "техника_сетки", "ромбовидная_сетка", "для_начинающих", "основы_бисероплетения", "браслеты_из_бисера", "колье_из_бисера", "узкая_сетка", "широкая_сетка", "мастер_класс"],
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
      id: 4,
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
      id: 5,
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
      id: 6,
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
      id: 7,
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
      id: 8,
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
      id: 9,
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
      id: 10,
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
  const categoryButtons = document.querySelectorAll("#videos-content .category-btn");
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
    const pinUrl = video.pinUrl || `https://www.pinterest.com/pin/${video.videoId}/`;
    
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
    const filteredVideos = category === "all" 
      ? videosData 
      : videosData.filter(video => video.category === category);
    
    displayVideos(filteredVideos);
    noVideosMessage.style.display = filteredVideos.length === 0 ? "block" : "none";
  }

  // Функция отображения видео
  async function displayVideos(videos) {
    videosContainer.innerHTML = "";
    
    for (const video of videos) {
      const videoCard = await createVideoCard(video);
      videosContainer.appendChild(videoCard);
    }
  }

  // Функция создания карточки видео
  async function createVideoCard(video) {
    const article = document.createElement("article");
    article.className = "video-card";
    article.dataset.category = video.category;
    article.dataset.source = video.source;

    const materialsChips = video.materials
      .map(material => `
        <div class="material-chip">
          <i class="fas fa-circle"></i>
          <span>${material}</span>
        </div>`)
      .join("");

    const tags = video.tags
      .map(tag => `<span class="video-tag">${tag}</span>`)
      .join("");

    const embedCode = await getVideoEmbed(video);

    // Для Pinterest не показываем обычный заголовок (он уже в карточке)
    const titleHtml = video.source === "pinterest" 
      ? '' 
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
          ${video.source !== "pinterest" ? `<div class="video-description">${video.description}</div>` : ''}
          ${materialsChips ? `
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
          </div>` : ''}
          ${tags ? `<div class="video-tags">${tags}</div>` : ''}
        </div>
    `;

    return article;
  }

  // Функция аккордеона для материалов
  function initMaterialsAccordion() {
    document.addEventListener("click", function (e) {
      const toggle = e.target.closest(".materials-toggle");
      if (toggle) {
        const chipsContainer = toggle.closest(".video-materials").querySelector(".materials-chips");
        chipsContainer.classList.toggle("expanded");
        toggle.classList.toggle("active");
        const span = toggle.querySelector("span:first-child");
        span.textContent = toggle.classList.contains("active") ? "Скрыть" : "Показать";
      }
    });
  }

  // Запускаем аккордеон
  initMaterialsAccordion();

  // Обработчики для переключения вкладок
  document.querySelectorAll(".tab-btn").forEach(button => {
    button.addEventListener("click", function () {
      document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(content => content.classList.remove("active"));
      
      this.classList.add("active");
      document.getElementById(this.dataset.tab + "-content").classList.add("active");
    });
  });

  // Добавляем hover эффекты для Pinterest карточек
  setTimeout(() => {
    document.querySelectorAll('.pinterest-card').forEach(card => {
      card.onmouseenter = function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 30px rgba(230, 0, 35, 0.2)';
      };
      card.onmouseleave = function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
      };
    });
  }, 100);

  // Остальной код фото-галереи остается без изменений...
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

    // Обработчик удаления
    //const deleteBtn = photoCard.querySelector(".delete-photo-btn");
    //deleteBtn.addEventListener("click", (e) => {
    //  e.stopPropagation(); // Предотвращаем открытие просмотрщика
    //  deletePhoto(photo.id);
   // });

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
      showNotification("📁 Файл слишком большой. Максимальный размер: 5MB", "error", 3000);
      return;
    }

    // Создаем FormData для отправки на сервер
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    // Показываем уведомление о загрузке (без блокировки интерфейса!)
    const loadingNotification = showNotification("⏳ Загружаем фото на сервер...", "info", 0);

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
        showNotification("❌ Ошибка загрузки: " + uploadResult.error, "error", 4000);
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
    const activeBtn = document.querySelector("#photos-content .category-btn.active");
    return activeBtn ? activeBtn.dataset.category : "all";
  }

  // Инициализация фото-галереи
  function initPhotoGallery() {
    refreshPhotoGallery();

    // Обработчики для категорий фото
    const photoCategoryBtns = document.querySelectorAll("#photos-content .category-btn");
    photoCategoryBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        photoCategoryBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        displayPhotos(btn.dataset.category);
      });
    });

    // Обработчики для модальных окон
    document.getElementById("uploadPhotoBtn").addEventListener("click", openUploadModal);
    document.getElementById("closeUploadModal").addEventListener("click", closeUploadModal);
    document.getElementById("cancelUpload").addEventListener("click", closeUploadModal);
    document.getElementById("closeViewModal").addEventListener("click", closeViewModal);

    // Обработчик формы загрузки
    document.getElementById("uploadPhotoForm").addEventListener("submit", handlePhotoUpload);

    // Обработчик предпросмотра изображения
    document.getElementById("photoFile").addEventListener("change", previewImage);

    // Закрытие модальных окон при клике вне контента
    window.addEventListener("click", function (event) {
      const uploadModal = document.getElementById("uploadModal");
      const viewModal = document.getElementById("photoViewModal");

      if (event.target === uploadModal) closeUploadModal();
      if (event.target === viewModal) closeViewModal();
    });
  }

  // Инициализируем фото-галерею
  initPhotoGallery();
});