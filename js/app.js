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

  // Элементы DOM
  const videosContainer = document.getElementById("videosContainer");
  const categoryButtons = document.querySelectorAll(".category-btn");
  const noVideosMessage = document.getElementById("noVideos");

  // Инициализация - показываем все видео
  displayVideos(videosData);

  // Обработчики для кнопок категорий
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

  // ⬇️⬇️⬇️ ФУНКЦИЯ АККОРДЕОНА ПЕРЕНЕСЕНА СЮДА ⬇️⬇️⬇️
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
});
