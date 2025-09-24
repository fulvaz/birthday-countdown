/**
 * i18n-manager.js - 国际化管理器
 * 支持动态加载语言文件，并根据data-id属性替换HTML元素内容
 */

class I18nManager {
  constructor(options = {}) {
    this.currentLanguage = options.defaultLanguage || 'en'; // 默认语言
    this.translations = {}; // 存储翻译数据
    this.supportedLanguages = options.supportedLanguages || ['en', 'es', 'fr', 'de', 'ja', 'zh', 'ar', 'pt', 'ru', 'ko'];
    this.languageImports = options.languageImports || {}; // 语言导入映射
  }
  
  /**
   * 获取所有可用的语言文件名（不含扩展名）
   * @returns {Array} - 语言文件名数组
   */
  getLanguageFilenames() {
    // 返回支持的语言列表，这些就是i18n目录下的文件名（不含扩展名）
    return this.supportedLanguages;
  }

  /**
   * 初始化国际化管理器
   */
  init() {
    // 从localStorage获取保存的语言设置
    // const savedLanguage = localStorage.getItem('selectedLanguage');
    // if (savedLanguage && this.supportedLanguages.includes(savedLanguage)) {
    //   this.currentLanguage = savedLanguage;
    // }

    // 加载当前语言
    return this.loadLanguage(this.currentLanguage);
  }

  /**
   * 动态加载语言文件
   * @param {string} lang - 语言代码
   * @returns {Promise} - 加载完成的Promise
   */
  loadLanguage(lang) {
    // 检查是否有对应语言的导入映射
    if (!this.languageImports[lang]) {
      console.error(`No import mapping for language: ${lang}`);
      // 如果不是默认语言，则尝试加载默认语言
      if (lang !== 'en') {
        return this.loadLanguage('en');
      }
      return Promise.resolve({});
    }

    // 使用映射中的导入函数加载语言文件
    return this.languageImports[lang]()
      .then(module => {
        this.translations = module.default;
        this.applyTranslations();
        return this.translations;
      })
      .catch(error => {
        console.error(`Failed to load language file: ${lang}`, error);
        // 如果加载失败且不是默认语言，则尝试加载默认语言
        if (lang !== 'en') {
          return this.loadLanguage('en');
        }
        return {};
      });
  }

  /**
   * 更改当前语言
   * @param {string} lang - 新的语言代码
   * @returns {Promise} - 语言加载完成的Promise
   */
  changeLanguage(lang) {
    if (!this.supportedLanguages.includes(lang)) {
      console.error(`Unsupported language: ${lang}`);
      return Promise.reject(new Error(`Unsupported language: ${lang}`));
    }

    this.currentLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);
    
    return this.loadLanguage(lang);
  }

  /**
   * 应用翻译到HTML元素
   */
  applyTranslations() {
    // 查找所有带有data-id属性的元素
    const elements = document.querySelectorAll('[data-id]');
    
    elements.forEach(element => {
      const key = element.getAttribute('data-id');
      if (this.translations[key]) {
        element.textContent = this.translations[key];
      }
    });
  }

  /**
   * 获取特定key的翻译
   * @param {string} key - 翻译key
   * @returns {string} - 翻译文本或key本身（如果未找到翻译）
   */
  translate(key) {
    return this.translations[key] || key;
  }
  
  /**
   * 获取当前语言
   * @returns {string} - 当前语言代码
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }
  
  /**
   * 获取支持的语言列表
   * @returns {Array} - 支持的语言代码列表
   */
  getSupportedLanguages() {
    return this.supportedLanguages;
  }
}

// 导出 I18nManager 类
export { I18nManager };

// 创建单例实例
const i18nManager = new I18nManager();

export default i18nManager;