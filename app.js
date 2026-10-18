/**
 * Google Style Start Page
 * Features:
 * 1. Seoul & Suwon Real-Time Weather (Open-Meteo API)
 * 2. Google Search with Voice, Lens, URL detection, Suggestion chips
 * 3. Daily & Random Quotes Engine with Copy & Categories
 * 4. Customizable Shortcuts with LocalStorage
 * 5. Digital Clock & Korean Date
 * 6. Light / Dark Theme Toggle
 * 7. Google Apps Launcher Menu
 */

// ==========================================================================
// 1. Quotes Database (풍부한 한국어 & 동서양 명언 데이터셋)
// ==========================================================================
const QUOTES_DATA = [
  {
    category: "도전과 행동",
    text: "시작하는 방법은 그만 말하고 행동하기 시작하는 것이다.",
    author: "월트 디즈니 (Walt Disney)"
  },
  {
    category: "인생과 지혜",
    text: "삶이 있는 한 희망은 있다.",
    author: "키케로 (Marcus Tullius Cicero)"
  },
  {
    category: "성공과 혁신",
    text: "단순함이 궁극의 정교함이다.",
    author: "레오나르도 다빈치 (Leonardo da Vinci)"
  },
  {
    category: "도전과 열정",
    text: "늘 갈망하고 우직하게 나아가라 (Stay hungry, stay foolish).",
    author: "스티브 잡스 (Steve Jobs)"
  },
  {
    category: "끈기와 인내",
    text: "승리는 가장 끈기 있는 자에게 돌아간다.",
    author: "나폴레옹 보나파르트 (Napoleon Bonaparte)"
  },
  {
    category: "성장과 배움",
    text: "배우기만 하고 생각하지 않으면 얻는 것이 없고, 생각하기만 하고 배우지 않으면 위태롭다.",
    author: "공자 (Confucius)"
  },
  {
    category: "용기와 결단",
    text: "죽고자 하면 살 것이요, 살고자 하면 죽을 것이다 (必死則生 必生則死).",
    author: "충무공 이순신"
  },
  {
    category: "인생과 태도",
    text: "어제와 똑같이 살면서 다른 미래를 기대하는 것은 정신병 초기증세다.",
    author: "알베르트 아인슈타인 (Albert Einstein)"
  },
  {
    category: "지혜와 성찰",
    text: "너 자신을 알라.",
    author: "소크라테스 (Socrates)"
  },
  {
    category: "꿈과 실천",
    text: "미래는 자신의 꿈의 아름다움을 믿는 사람들의 것이다.",
    author: "엘리너 루스벨트 (Eleanor Roosevelt)"
  },
  {
    category: "성공의 비결",
    text: "비관론자는 모든 기회에서 어려움을 찾아내고, 낙관론자는 모든 어려움에서 기회를 찾아낸다.",
    author: "윈스턴 처칠 (Winston Churchill)"
  },
  {
    category: "자신감과 가능성",
    text: "당신이 할 수 있다고 믿든 할 수 없다고 믿든, 당신이 옳다.",
    author: "헨리 포드 (Henry Ford)"
  },
  {
    category: "행복과 감사",
    text: "행복은 이미 만들어져 있는 것이 아니다. 그것은 당신 자신의 행동에서 비롯된다.",
    author: "달라이 라마 (Dalai Lama)"
  },
  {
    category: "도전과 용기",
    text: "실패를 두려워하지 마라. 실패는 성공으로 가는 과정의 디딤돌이다.",
    author: "마이클 조던 (Michael Jordan)"
  },
  {
    category: "시간과 습관",
    text: "오늘 할 수 있는 일을 내일로 미루지 마라.",
    author: "벤저민 프랭클린 (Benjamin Franklin)"
  },
  {
    category: "인생의 가치",
    text: "가장 큰 위험은 아무런 위험도 감수하지 않는 것이다.",
    author: "마크 저커버그 (Mark Zuckerberg)"
  },
  {
    category: "위로와 용기",
    text: "눈물과 함께 빵을 먹어보지 않은 자는 인생의 참맛을 알지 못한다.",
    author: "요한 볼프강 폰 괴테 (J. W. von Goethe)"
  },
  {
    category: "지혜와 겸손",
    text: "아는 것을 안다고 하고 모르는 것을 모른다고 하는 것, 이것이 진정한 앎이다.",
    author: "공자 (Confucius)"
  },
  {
    category: "성공과 원칙",
    text: "남들이 탐욕을 부릴 때 두려워하고, 남들이 두려워할 때 탐욕을 부려라.",
    author: "워런 버핏 (Warren Buffett)"
  },
  {
    category: "마음의 평화",
    text: "당신의 마음을 다스려라. 그렇지 않으면 마음이 당신을 지배할 것이다.",
    author: "호라티우스 (Horatius)"
  },
  {
    category: "사랑과 연대",
    text: "세상을 변화시키는 유일한 것은 사랑과 친절이다.",
    author: "마하트마 간디 (Mahatma Gandhi)"
  },
  {
    category: "도전과 쇄신",
    text: "바람이 불지 않을 때 바람개비를 돌리는 방법은 앞으로 달려가는 것이다.",
    author: "데일 카네기 (Dale Carnegie)"
  }
];

// ==========================================================================
// 2. Weather Engine (서울 & 수원 - Open-Meteo API)
// ==========================================================================
const WEATHER_COORDINATES = {
  seoul: {
    name: "서울",
    sub: "Seoul, KR",
    lat: 37.5665,
    lon: 126.9780
  },
  suwon: {
    name: "수원",
    sub: "Suwon, KR",
    lat: 37.2636,
    lon: 127.0286
  }
};

// WMO Weather Interpretation Codes
function interpretWmoCode(code, isDay = 1) {
  switch (code) {
    case 0:
      return { text: "맑음", emoji: isDay ? "☀️" : "🌙" };
    case 1:
      return { text: "대체로 맑음", emoji: isDay ? "🌤️" : "🌤️" };
    case 2:
      return { text: "구름 조금", emoji: "⛅" };
    case 3:
      return { text: "흐림", emoji: "☁️" };
    case 45:
    case 48:
      return { text: "안개", emoji: "🌫️" };
    case 51:
    case 53:
    case 55:
      return { text: "이슬비", emoji: "🌦️" };
    case 56:
    case 57:
      return { text: "어는 이슬비", emoji: "🌨️" };
    case 61:
    case 63:
    case 65:
      return { text: "비", emoji: "🌧️" };
    case 66:
    case 67:
      return { text: "진눈깨비", emoji: "🌧️" };
    case 71:
    case 73:
    case 75:
    case 77:
      return { text: "눈", emoji: "❄️" };
    case 80:
    case 81:
    case 82:
      return { text: "소나기", emoji: "🌦️" };
    case 85:
    case 86:
      return { text: "눈 소나기", emoji: "🌨️" };
    case 95:
    case 96:
    case 99:
      return { text: "뇌우", emoji: "⛈️" };
    default:
      return { text: "대체로 맑음", emoji: isDay ? "☀️" : "🌙" };
  }
}

async function fetchCityWeather(cityKey) {
  const city = WEATHER_COORDINATES[cityKey];
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather API Error: ${response.status}`);
  }
  return await response.json();
}

async function updateAllWeather() {
  const refreshBtn = document.getElementById("weather-refresh-btn");
  const updatedTimeEl = document.getElementById("weather-updated-time");
  
  if (refreshBtn) refreshBtn.classList.add("spinning");
  if (updatedTimeEl) updatedTimeEl.textContent = "날씨 정보 확인 중...";

  try {
    const [seoulResult, suwonResult] = await Promise.allSettled([
      fetchCityWeather("seoul"),
      fetchCityWeather("suwon")
    ]);

    // Handle Seoul Data
    if (seoulResult.status === "fulfilled") {
      renderWeatherData("seoul", seoulResult.value);
    } else {
      renderWeatherFallback("seoul", "서울 기상 정보 수신 대기");
    }

    // Handle Suwon Data
    if (suwonResult.status === "fulfilled") {
      renderWeatherData("suwon", suwonResult.value);
    } else {
      renderWeatherFallback("suwon", "수원 기상 정보 수신 대기");
    }

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    if (updatedTimeEl) {
      updatedTimeEl.textContent = `기준: ${hours}:${minutes} 업데이트`;
    }
  } catch (err) {
    console.error("날씨 정보 불러오기 실패:", err);
    if (updatedTimeEl) updatedTimeEl.textContent = "날씨 연결 실패";
  } finally {
    if (refreshBtn) {
      setTimeout(() => refreshBtn.classList.remove("spinning"), 600);
    }
  }
}

function renderWeatherData(cityKey, data) {
  const current = data.current;
  const daily = data.daily;

  const temp = Math.round(current.temperature_2m);
  const apparent = Math.round(current.apparent_temperature);
  const humidity = current.relative_humidity_2m;
  // Convert km/h to m/s: 1 km/h = 1 / 3.6 m/s
  const windMps = (current.wind_speed_10m / 3.6).toFixed(1);
  const isDay = current.is_day ?? 1;
  const weather = interpretWmoCode(current.weather_code, isDay);

  const maxTemp = daily?.temperature_2m_max ? Math.round(daily.temperature_2m_max[0]) : temp + 2;
  const minTemp = daily?.temperature_2m_min ? Math.round(daily.temperature_2m_min[0]) : temp - 3;

  // DOM Elements
  const tempEl = document.getElementById(`${cityKey}-temp`);
  const conditionEl = document.getElementById(`${cityKey}-condition`);
  const iconWrap = document.getElementById(`${cityKey}-weather-icon`);
  const rangeEl = document.getElementById(`${cityKey}-range`);
  const apparentEl = document.getElementById(`${cityKey}-apparent`);
  const humidityEl = document.getElementById(`${cityKey}-humidity`);
  const windEl = document.getElementById(`${cityKey}-wind`);

  if (tempEl) tempEl.textContent = temp;
  if (conditionEl) conditionEl.textContent = weather.text;
  if (iconWrap) iconWrap.innerHTML = `<span class="weather-emoji">${weather.emoji}</span>`;
  if (rangeEl) rangeEl.textContent = `${maxTemp}° / ${minTemp}°`;
  if (apparentEl) apparentEl.textContent = `${apparent}°C`;
  if (humidityEl) humidityEl.textContent = `${humidity}%`;
  if (windEl) windEl.textContent = `${windMps} m/s`;
}

function renderWeatherFallback(cityKey, reason) {
  const conditionEl = document.getElementById(`${cityKey}-condition`);
  if (conditionEl) conditionEl.textContent = reason;
}

// ==========================================================================
// 3. Quotes Engine (오늘의 명언)
// ==========================================================================
let currentQuoteIndex = 0;

function getDailyQuoteIndex() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return dayOfYear % QUOTES_DATA.length;
}

function displayQuote(index, animated = true) {
  const quote = QUOTES_DATA[index];
  const wrapper = document.getElementById("quote-content-wrapper");
  const categoryEl = document.getElementById("quote-category");
  const textEl = document.getElementById("quote-text");
  const authorEl = document.getElementById("quote-author");

  if (!quote || !textEl || !authorEl) return;

  if (animated && wrapper) {
    wrapper.classList.add("fading");
    setTimeout(() => {
      if (categoryEl) categoryEl.textContent = quote.category;
      textEl.textContent = `"${quote.text}"`;
      authorEl.textContent = quote.author;
      wrapper.classList.remove("fading");
    }, 200);
  } else {
    if (categoryEl) categoryEl.textContent = quote.category;
    textEl.textContent = `"${quote.text}"`;
    authorEl.textContent = quote.author;
  }
}

function nextQuote() {
  let nextIdx;
  do {
    nextIdx = Math.floor(Math.random() * QUOTES_DATA.length);
  } while (nextIdx === currentQuoteIndex && QUOTES_DATA.length > 1);

  currentQuoteIndex = nextIdx;
  displayQuote(currentQuoteIndex, true);
}

function copyCurrentQuote() {
  const quote = QUOTES_DATA[currentQuoteIndex];
  if (!quote) return;

  const textToCopy = `"${quote.text}" — ${quote.author}`;
  navigator.clipboard.writeText(textToCopy).then(() => {
    showToast("명언이 클립보드에 복사되었습니다! 📋");
  }).catch(() => {
    // Fallback
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    showToast("명언이 복사되었습니다! 📋");
  });
}

// ==========================================================================
// 4. Google Search Engine
// ==========================================================================
function setupGoogleSearch() {
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const clearBtn = document.getElementById("search-clear-btn");
  const luckyBtn = document.getElementById("btn-lucky");
  const voiceBtn = document.getElementById("voice-search-btn");
  const lensBtn = document.getElementById("lens-search-btn");
  const chipsContainer = document.getElementById("search-chips");

  if (!searchForm || !searchInput) return;

  // Toggle Clear button visibility
  searchInput.addEventListener("input", () => {
    if (searchInput.value.trim().length > 0) {
      clearBtn?.classList.add("visible");
    } else {
      clearBtn?.classList.remove("visible");
    }
  });

  // Clear button click
  clearBtn?.addEventListener("click", () => {
    searchInput.value = "";
    clearBtn.classList.remove("visible");
    searchInput.focus();
  });

  // Perform Search Logic
  function executeSearch(query) {
    const trimmed = query.trim();
    if (!trimmed) {
      searchInput.focus();
      return;
    }

    // Check if user entered an explicit URL or domain
    const isUrl = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i.test(trimmed);
    const hasProtocol = /^https?:\/\//i.test(trimmed);

    if (hasProtocol) {
      window.location.href = trimmed;
    } else if (isUrl && trimmed.includes(".")) {
      window.location.href = `https://${trimmed}`;
    } else {
      const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`;
      window.location.href = googleSearchUrl;
    }
  }

  // Form Submit
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    executeSearch(searchInput.value);
  });

  // "I'm Feeling Lucky" button
  luckyBtn?.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}&btnI=I`;
    } else {
      window.location.href = "https://doodles.google/";
    }
  });

  // Suggestion Chips Click
  chipsContainer?.addEventListener("click", (e) => {
    const target = e.target.closest(".chip");
    if (target && target.dataset.query) {
      searchInput.value = target.dataset.query;
      clearBtn?.classList.add("visible");
      executeSearch(target.dataset.query);
    }
  });

  // Voice Search (Speech Recognition)
  voiceBtn?.addEventListener("click", () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast("이 브라우저에서는 음성 인식을 지원하지 않습니다.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "ko-KR";
      recognition.interimResults = false;

      showToast("🎙️ 듣고 있습니다... 말씀해주세요.");

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        searchInput.value = transcript;
        clearBtn?.classList.add("visible");
        showToast(`음성 인식됨: "${transcript}"`);
        setTimeout(() => executeSearch(transcript), 600);
      };

      recognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        if (event.error === "not-allowed") {
          showToast("마이크 사용 권한이 거부되었습니다.");
        } else {
          showToast("음성 인식 중 오류가 발생했습니다.");
        }
      };

      recognition.start();
    } catch (err) {
      showToast("음성 검색을 시작할 수 없습니다.");
    }
  });

  // Google Lens Button
  lensBtn?.addEventListener("click", () => {
    window.open("https://lens.google.com/", "_blank");
  });

  // Global Keyboard Shortcut: '/' or 'Ctrl+K' focuses search input
  window.addEventListener("keydown", (e) => {
    if ((e.key === "/" || (e.ctrlKey && e.key === "k")) && document.activeElement !== searchInput) {
      // Don't trigger if typing inside modal or other inputs
      if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") {
        return;
      }
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
  });
}

// ==========================================================================
// 5. Digital Clock & Korean Date
// ==========================================================================
function updateClockAndDate() {
  const timeEl = document.getElementById("current-time");
  const dateEl = document.getElementById("current-date");
  if (!timeEl || !dateEl) return;

  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  timeEl.textContent = `${hours}:${minutes}`;

  const month = now.getMonth() + 1;
  const date = now.getDate();
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = days[now.getDay()];

  dateEl.textContent = `${month}월 ${date}일 (${dayName})`;
}

// ==========================================================================
// 6. Theme Engine (Light / Dark Mode)
// ==========================================================================
const THEME_KEY = "google_startpage_theme";

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

  document.body.setAttribute("data-theme", initialTheme);

  const themeBtn = document.getElementById("theme-toggle-btn");
  themeBtn?.addEventListener("click", toggleTheme);
}

function toggleTheme() {
  const currentTheme = document.body.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.body.setAttribute("data-theme", newTheme);
  localStorage.setItem(THEME_KEY, newTheme);
  showToast(newTheme === "dark" ? "다크 모드가 적용되었습니다 🌙" : "라이트 모드가 적용되었습니다 ☀️");
}

// ==========================================================================
// 7. Google Apps Launcher Dropdown
// ==========================================================================
function setupAppsLauncher() {
  const appsBtn = document.getElementById("apps-btn");
  const appsMenu = document.getElementById("apps-menu");

  if (!appsBtn || !appsMenu) return;

  appsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    appsMenu.classList.toggle("active");
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!appsMenu.contains(e.target) && e.target !== appsBtn) {
      appsMenu.classList.remove("active");
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      appsMenu.classList.remove("active");
      closeShortcutModal();
    }
  });
}

// ==========================================================================
// 8. Custom Shortcuts Management
// ==========================================================================
const SHORTCUTS_KEY = "google_startpage_custom_shortcuts";

function getCustomShortcuts() {
  try {
    const data = localStorage.getItem(SHORTCUTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function saveCustomShortcuts(shortcuts) {
  localStorage.setItem(SHORTCUTS_KEY, JSON.stringify(shortcuts));
}

function renderCustomShortcuts() {
  const grid = document.getElementById("shortcuts-grid");
  const addBtn = document.getElementById("add-shortcut-btn");
  if (!grid || !addBtn) return;

  // Remove existing custom shortcuts
  const existingCustom = grid.querySelectorAll(".custom-shortcut-item");
  existingCustom.forEach(el => el.remove());

  const shortcuts = getCustomShortcuts();
  shortcuts.forEach((item, index) => {
    const a = document.createElement("a");
    a.href = item.url;
    a.target = "_blank";
    a.rel = "noopener";
    a.className = "shortcut-item custom-shortcut-item";
    
    // First letter or emoji for icon
    const firstChar = item.name.trim().charAt(0).toUpperCase() || "★";

    a.innerHTML = `
      <div class="shortcut-icon-wrapper" style="background: linear-gradient(135deg, #4285F4, #34A853); color: #fff; font-weight: 700; font-size: 1.1rem;">
        ${firstChar}
      </div>
      <span class="shortcut-title" title="${item.name}">${item.name}</span>
    `;

    // Insert before the Add button
    grid.insertBefore(a, addBtn);
  });
}

function setupShortcutModal() {
  const addBtn = document.getElementById("add-shortcut-btn");
  const modal = document.getElementById("shortcut-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  const cancelBtn = document.getElementById("modal-cancel-btn");
  const form = document.getElementById("shortcut-form");
  const nameInput = document.getElementById("shortcut-name-input");
  const urlInput = document.getElementById("shortcut-url-input");

  if (!addBtn || !modal || !form) return;

  function openModal() {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    nameInput.value = "";
    urlInput.value = "";
    setTimeout(() => nameInput.focus(), 100);
  }

  window.closeShortcutModal = function() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  };

  addBtn.addEventListener("click", openModal);
  closeBtn?.addEventListener("click", window.closeShortcutModal);
  cancelBtn?.addEventListener("click", window.closeShortcutModal);

  // Close when clicking backdrop
  modal.addEventListener("click", (e) => {
    if (e.target === modal) window.closeShortcutModal();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    let url = urlInput.value.trim();

    if (!name || !url) return;

    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }

    const shortcuts = getCustomShortcuts();
    shortcuts.push({ name, url });
    saveCustomShortcuts(shortcuts);
    renderCustomShortcuts();
    window.closeShortcutModal();
    showToast(`"${name}" 바로가기가 추가되었습니다! 🔗`);
  });
}

// ==========================================================================
// 9. Toast Notification System
// ==========================================================================
let toastTimer = null;

function showToast(message, duration = 2800) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}

// ==========================================================================
// 10. Initialization
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Theme
  initTheme();

  // Initialize Clock & Date
  updateClockAndDate();
  setInterval(updateClockAndDate, 1000);

  // Initialize Weather (Seoul & Suwon)
  updateAllWeather();
  // Auto-refresh weather every 15 minutes
  setInterval(updateAllWeather, 15 * 60 * 1000);

  const weatherRefreshBtn = document.getElementById("weather-refresh-btn");
  weatherRefreshBtn?.addEventListener("click", () => {
    updateAllWeather();
    showToast("날씨 데이터를 갱신했습니다 🌤️");
  });

  // Initialize Quotes
  currentQuoteIndex = getDailyQuoteIndex();
  displayQuote(currentQuoteIndex, false);

  const nextQuoteBtn = document.getElementById("quote-next-btn");
  nextQuoteBtn?.addEventListener("click", nextQuote);

  const copyQuoteBtn = document.getElementById("quote-copy-btn");
  copyQuoteBtn?.addEventListener("click", copyCurrentQuote);

  // Initialize Search
  setupGoogleSearch();

  // Initialize Apps Launcher
  setupAppsLauncher();

  // Initialize Custom Shortcuts
  renderCustomShortcuts();
  setupShortcutModal();

  // Logo Easter Egg (click on Google logo plays subtle celebration animation)
  const logo = document.querySelector(".google-logo");
  logo?.addEventListener("click", () => {
    showToast("Google 시작 페이지에 오신 것을 환영합니다! 🎉");
  });
});
