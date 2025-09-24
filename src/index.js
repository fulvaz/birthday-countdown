import { I18nManager } from './i18n-manager';
import './styles.css';


// 创建语言导入映射
const languageImports = {
  en: () => import(/* webpackChunkName: "i18n-en" */ './i18n/en.js'),
  es: () => import(/* webpackChunkName: "i18n-es" */ './i18n/es.js'),
  fr: () => import(/* webpackChunkName: "i18n-fr" */ './i18n/fr.js'),
  de: () => import(/* webpackChunkName: "i18n-de" */ './i18n/de.js'),
  ja: () => import(/* webpackChunkName: "i18n-ja" */ './i18n/ja.js'),
  zh: () => import(/* webpackChunkName: "i18n-zh" */ './i18n/zh.js'),
  ar: () => import(/* webpackChunkName: "i18n-ar" */ './i18n/ar.js'),
  pt: () => import(/* webpackChunkName: "i18n-pt" */ './i18n/pt.js'),
  ru: () => import(/* webpackChunkName: "i18n-ru" */ './i18n/ru.js'),
  ko: () => import(/* webpackChunkName: "i18n-ko" */ './i18n/ko.js')
};

// 创建i18n管理器实例
const i18nManager = new I18nManager({
  defaultLanguage: window.entryLang,
  supportedLanguages: ['en', 'es', 'fr', 'de', 'ja', 'zh', 'ar', 'pt', 'ru', 'ko'],
  languageImports: languageImports
});

// 初始化国际化管理器
document.addEventListener('DOMContentLoaded', () => {
  // 初始化i18n管理器
  i18nManager.init().then(() => {
    // 设置语言选择器的初始值
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
      languageSelect.value = i18nManager.getCurrentLanguage();
      
      // 添加语言切换事件监听
      languageSelect.addEventListener('change', (event) => {
        i18nManager.changeLanguage(event.target.value);
      });
    }
    
    // 设置默认生日日期（当前年份减去18年）
    initDefaultBirthdayDate();
    
    // 添加计算按钮点击事件
    setupButtonEvents();
    
    // 自动开始倒计时
    autoStartCountdown();
  });
});

// 设置默认生日日期为当前年份减去18年
function initDefaultBirthdayDate() {
  const currentDate = new Date();
  const defaultYear = currentDate.getFullYear() - 18;
  
  // 获取生日年份选择器
  const yearSelect = document.getElementById('birthday-year');
  const monthSelect = document.getElementById('birthday-month');
  const daySelect = document.getElementById('birthday-day');
  
  if (yearSelect && monthSelect && daySelect) {
    // 填充年份选择器
    populateYearOptions(yearSelect, defaultYear);
    
    // 填充月份选择器
    populateMonthOptions(monthSelect);
    
    // 填充日期选择器
    populateDayOptions(daySelect, 1, 31);
    
    // 设置默认值
    yearSelect.value = defaultYear;
    monthSelect.value = currentDate.getMonth() + 1; // 月份从0开始，所以+1
    daySelect.value = currentDate.getDate() + 1;
    
    // 添加月份变更监听，以更新天数
    monthSelect.addEventListener('change', () => updateDaysInMonth(monthSelect, daySelect, yearSelect));
    yearSelect.addEventListener('change', () => updateDaysInMonth(monthSelect, daySelect, yearSelect));
  }
}

// 填充年份选择器
function populateYearOptions(yearSelect, defaultYear) {
  // 清空现有选项
  yearSelect.innerHTML = '';
  
  // 添加年份选项（从当前年份-100到当前年份）
  const currentYear = new Date().getFullYear();
  for (let year = currentYear - 100; year <= currentYear; year++) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }
}

// 填充月份选择器
function populateMonthOptions(monthSelect) {
  // 清空现有选项
  monthSelect.innerHTML = '';
  
  // 添加月份选项（1-12）
  for (let month = 1; month <= 12; month++) {
    const option = document.createElement('option');
    option.value = month;
    option.textContent = month;
    monthSelect.appendChild(option);
  }
}

// 填充日期选择器
function populateDayOptions(daySelect, min, max) {
  // 清空现有选项
  daySelect.innerHTML = '';
  
  // 添加日期选项
  for (let day = min; day <= max; day++) {
    const option = document.createElement('option');
    option.value = day;
    option.textContent = day;
    daySelect.appendChild(option);
  }
}

// 根据月份和年份更新日期选择器中的天数
function updateDaysInMonth(monthSelect, daySelect, yearSelect) {
  const month = parseInt(monthSelect.value, 10);
  const year = parseInt(yearSelect.value, 10);
  
  // 获取指定月份的天数
  const daysInMonth = new Date(year, month, 0).getDate();
  
  // 保存当前选中的日期
  const selectedDay = daySelect.value;
  
  // 更新日期选择器
  populateDayOptions(daySelect, 1, daysInMonth);
  
  // 尝试恢复之前选中的日期，如果超出范围则选择最后一天
  daySelect.value = Math.min(selectedDay, daysInMonth);
}

// 设置按钮事件
function setupButtonEvents() {
  // 计算按钮点击事件
  const calculateBtn = document.getElementById('calculate-btn');
  if (calculateBtn) {
    calculateBtn.addEventListener('click', calculateCountdown);
  }
  
  // 分享按钮点击事件
  const copyLinkBtn = document.getElementById('copy-link-btn');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', copyCountdownLink);
  }
  
  const shareFacebookBtn = document.getElementById('share-facebook');
  if (shareFacebookBtn) {
    shareFacebookBtn.addEventListener('click', () => shareToSocialMedia('facebook'));
  }
  
  const shareTwitterBtn = document.getElementById('share-twitter');
  if (shareTwitterBtn) {
    shareTwitterBtn.addEventListener('click', () => shareToSocialMedia('twitter'));
  }
  
  const shareWhatsappBtn = document.getElementById('share-whatsapp');
  if (shareWhatsappBtn) {
    shareWhatsappBtn.addEventListener('click', () => shareToSocialMedia('whatsapp'));
  }
}

// 计算倒计时
function calculateCountdown() {
  // 获取用户输入的生日日期
  const year = parseInt(document.getElementById('birthday-year').value, 10);
  const month = parseInt(document.getElementById('birthday-month').value, 10);
  const day = parseInt(document.getElementById('birthday-day').value, 10);
  // const eventName = document.getElementById('event-name').value || 'Birthday';
  
  // 创建目标日期对象
  const targetDate = new Date(year, month - 1, day); // 月份从0开始，所以减1
  
  // 开始倒计时
  startCountdown(targetDate);
}

// 页面加载时自动开始倒计时
function autoStartCountdown() {
  // 使用当前设置的日期值
  const year = parseInt(document.getElementById('birthday-year').value, 10);
  const month = parseInt(document.getElementById('birthday-month').value, 10);
  const day = parseInt(document.getElementById('birthday-day').value, 10);
  
  // 如果日期选择器已经有值，则自动开始倒计时
  if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
    // const eventName = document.getElementById('event-name').value || 'Birthday';
    const targetDate = new Date(year, month - 1, day);
    startCountdown(targetDate);
  }
}

// 开始倒计时
function startCountdown(targetDate, eventName) {
  // 清除之前的倒计时
  if (window.countdownInterval) {
    clearInterval(window.countdownInterval);
  }
  
  // 更新倒计时函数
  const updateCountdown = () => {
    const currentDate = new Date();
    
    // 计算今年的目标日期
    let thisYearTargetDate = new Date(currentDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
    
    // 如果今年的日期已经过了，则计算明年的日期
    if (thisYearTargetDate < currentDate) {
      thisYearTargetDate = new Date(currentDate.getFullYear() + 1, targetDate.getMonth(), targetDate.getDate());
    }
    
    // 计算时间差（毫秒）
    const timeDiff = thisYearTargetDate - currentDate;
    
    // 计算天、时、分、秒
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    // 更新显示
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    
  };
  
  // 立即更新一次
  updateCountdown();
  
  // 设置定时器，每秒更新一次
  window.countdownInterval = setInterval(updateCountdown, 1000);
}

// 复制倒计时链接
function copyCountdownLink() {
  // 获取当前页面URL
  const url = window.location.href;
  
  // 复制到剪贴板
  navigator.clipboard.writeText(url)
    .then(() => {
      alert('Link copied to clipboard!');
    })
    .catch(err => {
      console.error('Failed to copy link: ', err);
    });
}

// 分享到社交媒体
function shareToSocialMedia(platform) {
  // 获取当前页面URL
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent('Check out my countdown!');
  
  let shareUrl = '';
  
  switch (platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
      break;
    case 'whatsapp':
      shareUrl = `https://api.whatsapp.com/send?text=${text} ${url}`;
      break;
    default:
      return;
  }
  
  // 打开分享窗口
  window.open(shareUrl, '_blank', 'width=600,height=400');
}