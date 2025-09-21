# i18n-manager

## 概述

i18n-manager 是一个轻量级的国际化管理工具，专为前端应用设计，支持动态加载语言文件、自动替换 HTML 元素内容，并提供语言切换功能。该工具采用代码分割技术，确保只加载用户所需的语言资源，优化应用性能。

## 功能特点

- 支持多种语言
- 基于 data-id 属性的 HTML 元素内容替换
- 动态加载语言资源，支持代码分割
- 用户语言偏好持久化存储

## 对外暴露的方法

### 构造函数

```javascript
// 导入 I18nManager 类
import { I18nManager } from './i18n-manager';

// 创建语言导入映射
const languageImports = {
  en: () => import('./i18n/en.js'),
  zh: () => import('./i18n/zh.js'),
  // 其他语言...
};

// 创建实例
const i18nManager = new I18nManager({
  defaultLanguage: 'en',  // 默认语言
  supportedLanguages: ['en', 'zh'],  // 支持的语言列表
  languageImports: languageImports  // 语言导入映射
});
```

### init()

初始化国际化管理器，加载默认语言或用户之前选择的语言。

```javascript
// 初始化并获取翻译数据
i18nManager.init().then(() => {
  console.log('国际化初始化完成');
});
```

### changeLanguage(lang)

切换到指定语言，返回一个 Promise。

```javascript
// 切换到中文
i18nManager.changeLanguage('zh').then(() => {
  console.log('语言已切换到中文');
});
```

### getCurrentLanguage()

获取当前使用的语言代码。

```javascript
const currentLang = i18nManager.getCurrentLanguage();
console.log(`当前语言: ${currentLang}`);
```

### getSupportedLanguages()

获取支持的语言列表。

```javascript
const languages = i18nManager.getSupportedLanguages();
console.log(`支持的语言: ${languages.join(', ')}`);
```

### applyTranslations()

手动应用翻译到 DOM 元素。

```javascript
// 在动态添加元素后应用翻译
document.body.innerHTML += '<div data-id="welcome"></div>';
i18nManager.applyTranslations();
```

### translate(key)

获取特定 key 的翻译文本。

```javascript
const welcomeText = i18nManager.translate('welcome');
console.log(welcomeText); // 输出当前语言的欢迎文本
```

## HTML 标记

在 HTML 中使用 `data-id` 属性标记需要翻译的元素：

```html
<div data-id="welcome">Welcome</div>
<div data-id="language">Language</div>
```

## 语言文件格式

每种语言应创建独立的 JS 文件，格式如下：

```javascript
// en.js
export default {
  hi: 'Hello',
  welcome: 'Welcome to our website',
  language: 'Language'
};
```

## 最佳实践

1. **语言文件组织**：将所有语言文件放在 `src/i18n/` 目录下
2. **命名规范**：使用语言代码命名文件，如 `en.js`, `zh.js`
3. **键值一致性**：确保所有语言文件包含相同的键
4. **动态加载**：利用代码分割特性，按需加载语言资源
5. **语言选择器**：实现下拉菜单或按钮组供用户选择语言

## Webpack 配置

为支持代码分割和预加载，推荐以下 webpack 配置：

```javascript
module.exports = {
  // ...其他配置
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    // ...
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        i18n: {
          test: /[\\/]i18n[\\/]/,
          name: 'i18n',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      // ...
      scriptLoading: 'defer',
      preload: ['*.js'],
      prefetch: ['i18n-*.js'],
    }),
  ],
};
```

## 注意事项

- 确保所有语言文件中的键保持一致
- 对于复杂的翻译需求，考虑扩展支持参数插值功能
- 对于 RTL 语言（如阿拉伯语），可能需要额外的 CSS 调整

## 适用场景

- 多语言网站和应用
- 需要动态加载语言资源的 SPA
- 对首屏加载性能有要求的应用