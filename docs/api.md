# 生日倒计时工具 API 文档

## 1. 核心 API

### 1.1 I18nManager

国际化管理器，负责处理多语言支持和语言切换。

#### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|-------|------|-------|------|
| `constructor` | `defaultLang` (String) | I18nManager 实例 | 创建国际化管理器实例，设置默认语言 |
| `setLanguage` | `lang` (String) | Boolean | 设置当前语言，成功返回 true |
| `getLanguage` | 无 | String | 获取当前语言代码 |
| `translate` | `key` (String) | String | 根据键获取当前语言的翻译文本 |
| `isRTL` | 无 | Boolean | 检查当前语言是否为从右到左(RTL)语言 |
| `getAvailableLanguages` | 无 | Array | 获取所有可用语言的列表 |

#### 使用示例

```javascript
// 创建国际化管理器实例
const i18n = new I18nManager('en');

// 设置语言
i18n.setLanguage('zh');

// 获取翻译
const greeting = i18n.translate('greeting');
```

### 1.2 CountdownTimer

倒计时计时器，负责计算和显示倒计时。

#### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|-------|------|-------|------|
| `constructor` | `targetDate` (Date), `options` (Object) | CountdownTimer 实例 | 创建倒计时实例，设置目标日期 |
| `start` | 无 | 无 | 开始倒计时 |
| `stop` | 无 | 无 | 停止倒计时 |
| `reset` | 无 | 无 | 重置倒计时 |
| `setTargetDate` | `date` (Date) | 无 | 设置新的目标日期 |
| `getRemainingTime` | 无 | Object | 获取剩余时间对象 (天、时、分、秒) |
| `onComplete` | `callback` (Function) | 无 | 设置倒计时完成时的回调函数 |

#### 使用示例

```javascript
// 创建倒计时实例
const birthday = new Date('2023-12-31');
const countdown = new CountdownTimer(birthday, {
  updateInterval: 1000,
  format: 'verbose'
});

// 开始倒计时
countdown.start();

// 设置完成回调
countdown.onComplete(() => {
  console.log('生日到啦！');
});
```

### 1.3 ThemeManager

主题管理器，负责处理应用主题切换。

#### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|-------|------|-------|------|
| `constructor` | `defaultTheme` (String) | ThemeManager 实例 | 创建主题管理器实例，设置默认主题 |
| `setTheme` | `theme` (String) | Boolean | 设置当前主题，成功返回 true |
| `getTheme` | 无 | String | 获取当前主题名称 |
| `toggleDarkMode` | 无 | String | 切换明暗模式，返回新的主题名称 |
| `getAvailableThemes` | 无 | Array | 获取所有可用主题的列表 |

#### 使用示例

```javascript
// 创建主题管理器实例
const themeManager = new ThemeManager('light');

// 切换到暗色模式
themeManager.setTheme('dark');

// 切换明暗模式
const newTheme = themeManager.toggleDarkMode();
```

## 2. 组件说明

### 2.1 LanguageSelector

语言选择器组件，允许用户切换应用语言。

#### 属性

| 属性名 | 类型 | 默认值 | 描述 |
|-------|------|-------|------|
| `languages` | Array | 所有可用语言 | 可选语言列表 |
| `currentLang` | String | 'en' | 当前选中的语言 |
| `onChange` | Function | 无 | 语言变更时的回调函数 |
| `showFlags` | Boolean | true | 是否显示国旗图标 |

#### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|-------|------|-------|------|
| `render` | 无 | HTMLElement | 渲染并返回组件 DOM 元素 |
| `update` | `lang` (String) | 无 | 更新当前选中的语言 |

### 2.2 DatePicker

日期选择器组件，用于选择目标生日日期。

#### 属性

| 属性名 | 类型 | 默认值 | 描述 |
|-------|------|-------|------|
| `date` | Date | 当前日期 | 选中的日期 |
| `minDate` | Date | 无 | 可选的最小日期 |
| `maxDate` | Date | 无 | 可选的最大日期 |
| `format` | String | 'YYYY-MM-DD' | 日期格式 |
| `onChange` | Function | 无 | 日期变更时的回调函数 |

#### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|-------|------|-------|------|
| `render` | 无 | HTMLElement | 渲染并返回组件 DOM 元素 |
| `setDate` | `date` (Date) | 无 | 设置选中的日期 |
| `getDate` | 无 | Date | 获取当前选中的日期 |

### 2.3 CountdownDisplay

倒计时显示组件，用于显示倒计时时间。

#### 属性

| 属性名 | 类型 | 默认值 | 描述 |
|-------|------|-------|------|
| `time` | Object | 无 | 包含天、时、分、秒的时间对象 |
| `labels` | Object | 默认标签 | 时间单位的标签文本 |
| `showSeconds` | Boolean | true | 是否显示秒数 |
| `animation` | String | 'fade' | 数字变化的动画效果 |

#### 方法

| 方法名 | 参数 | 返回值 | 描述 |
|-------|------|-------|------|
| `render` | 无 | HTMLElement | 渲染并返回组件 DOM 元素 |
| `update` | `time` (Object) | 无 | 更新显示的时间 |
| `setLabels` | `labels` (Object) | 无 | 设置时间单位的标签文本 |

## 3. 事件

### 3.1 应用事件

| 事件名 | 触发时机 | 事件数据 | 描述 |
|-------|---------|---------|------|
| `language-change` | 语言变更时 | `{ lang: String }` | 当应用语言变更时触发 |
| `theme-change` | 主题变更时 | `{ theme: String }` | 当应用主题变更时触发 |
| `countdown-start` | 倒计时开始时 | `{ targetDate: Date }` | 当倒计时开始时触发 |
| `countdown-complete` | 倒计时结束时 | `{ targetDate: Date }` | 当倒计时达到目标日期时触发 |

### 3.2 事件监听示例

```javascript
// 监听语言变更事件
document.addEventListener('language-change', (event) => {
  console.log(`语言已变更为: ${event.detail.lang}`);
});

// 监听倒计时完成事件
document.addEventListener('countdown-complete', (event) => {
  console.log('生日到啦！');
  showBirthdayMessage();
});
```

## 4. 本地存储

应用使用浏览器的 localStorage 存储用户设置和偏好。

### 4.1 存储键

| 键名 | 类型 | 描述 |
|-----|------|------|
| `birthday-app-language` | String | 用户选择的语言 |
| `birthday-app-theme` | String | 用户选择的主题 |
| `birthday-app-target-date` | String | 目标生日日期 (ISO 格式) |
| `birthday-app-reminders` | JSON String | 用户设置的提醒配置 |

### 4.2 存储操作示例

```javascript
// 保存语言设置
localStorage.setItem('birthday-app-language', 'zh');

// 获取目标日期
const targetDate = new Date(localStorage.getItem('birthday-app-target-date'));

// 保存提醒设置
const reminders = [
  { days: 7, type: 'notification' },
  { days: 1, type: 'email' }
];
localStorage.setItem('birthday-app-reminders', JSON.stringify(reminders));
```

## 5. 样式定制

### 5.1 CSS 变量

应用使用 CSS 变量实现主题定制，可以通过覆盖这些变量来自定义应用外观。

| 变量名 | 默认值 | 描述 |
|-------|-------|------|
| `--primary-color` | `#4a6cf7` | 主要颜色 |
| `--secondary-color` | `#6c757d` | 次要颜色 |
| `--gradient-start` | `#5d5fef` | 渐变起始颜色 |
| `--gradient-end` | `#9d9efa` | 渐变结束颜色 |
| `--background-color` | `#f8f9fa` | 背景颜色 |
| `--card-bg` | `#ffffff` | 卡片背景色 |
| `--light-text` | `#ffffff` | 浅色文本 |
| `--dark-text` | `#212529` | 深色文本 |
| `--muted-text` | `#6c757d` | 次要文本颜色 |
| `--radius` | `12px` | 圆角半径 |
| `--shadow` | `0 5px 15px rgba(0,0,0,0.1)` | 阴影效果 |

### 5.2 自定义主题示例

```css
:root {
  --primary-color: #ff6b6b;
  --secondary-color: #546de5;
  --gradient-start: #ff6b6b;
  --gradient-end: #ff9e9e;
  --background-color: #f0f2f5;
  --card-bg: #ffffff;
  --radius: 8px;
  --shadow: 0 10px 20px rgba(0,0,0,0.05);
}

/* 暗色主题 */
[data-theme="dark"] {
  --primary-color: #ff6b6b;
  --secondary-color: #546de5;
  --gradient-start: #ff6b6b;
  --gradient-end: #ff9e9e;
  --background-color: #121212;
  --card-bg: #1e1e1e;
  --light-text: #ffffff;
  --dark-text: #e0e0e0;
  --muted-text: #a0a0a0;
}
```