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
  defaultLanguage: 'en',
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
  });
});