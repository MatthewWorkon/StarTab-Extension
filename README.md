<p align="center">
  <strong>StarTab — 宇宙启动页</strong><br>
  <em>Cosmic New Tab Command Center</em>
</p>

---

**StarTab** 用一个沉浸式宇宙星空界面取代浏览器默认的空白新标签页，同时提供完整的日常工作流工具集。它不只是一个视觉主题——它是一套真正可用的效率系统。

**StarTab** replaces the browser's blank new tab with an immersive starfield interface and a full daily workflow toolkit. It's not just a visual theme — it's a genuinely useful productivity system.

---

## 开源致谢 / Open Source Attribution

StarTab 基于开源项目 **[Tab Out](https://github.com/zarazhangrui/tab-out)** 进行二次开发构建，遵循其 MIT License 协议。

> **Tab Out** — *Keep tabs on your tabs.*
> Created by [Zara Zhang](https://github.com/zarazhangrui) ([@zarazhangrui](https://x.com/zarazhangrui))
> Repository: https://github.com/zarazhangrui/tab-out
> License: MIT

Tab Out 的核心设计理念为本项目奠定了基础，包括：

- 将 Chrome 新标签页替换为自定义看板界面（Chrome Manifest V3 架构）
- 将打开的标签页按域名分组展示为卡片网格
- 重复标签页检测与一键去重
- 关闭标签时的粒子爆炸动效与 Web Audio API 合成音效反馈
- 最常访问网站快捷入口

StarTab 在上述基础上进行了深度扩展与重构，加入了完整的书签管理、稍后阅读、垃圾箱、智能分类算法、WCAG 自适应主题系统、壁纸定制、内置工具集等功能模块，形成了一套独立的产品体系。

---

## 核心功能 / Core Features

### 🔍 智能搜索框 / Smart Search Bar

- 支持 Google、Bing、DuckDuckGo、百度、搜狗，随时切换，偏好持久保存
- 自动识别 URL 直接跳转，无需手动加 https://
- 搜索框及周围内容采用磨砂玻璃遮罩，无论设置何种壁纸均保持文字清晰可读
- 输入 `/` 调出内置工具菜单，快速访问宽高比计算器、圆角计算器等实用工具

### ⚡ 常用网站快捷入口 / Top Site Shortcuts

- 自动读取浏览历史，按访问频率排序展示最常用的 10 个网站
- 圆形 Favicon 图标 + 网站名称，横向排列，随访问频率动态更新顺序

### 📋 标签页看板 / Tab Kanban Board

- 将当前所有打开的标签页按域名自动分组，以卡片形式展示
- 智能三层分类算法（精确域名匹配 → 结构规则 → 关键词评分），自动识别 10 种网站类型：效率办公、工具、视频网站、社交媒体、阅读资讯、游戏娱乐、购物电商、学习教育、金融理财、未指明
- 每个条目固定高度，支持一键关闭标签、保存至"稍后阅读"、添加至收藏夹
- **误操作防护**：关闭单个标签后出现「恢复已关闭」按钮；执行「关闭全部」后出现「恢复上次关闭」按钮，一键恢复所有标签页（30 秒有效窗口）
- 时间筛选（近期/昨天/前天/上周）+ 类型筛选，快速定位目标标签
- 检测并提示重复标签，支持一键去重
- 彩色类型标签，10 种色系区分，一眼辨认

### 🔖 收藏夹（支持分组，跨设备同步）/ Bookmarks

- 点击标签看板中任意条目旁的书签图标，即可收藏当前页面
- 支持新建命名分组，以树状目录展示：可折叠/展开的分组节点 + 未分组根目录
- "移动到分组"弹窗：悬停书签条目时点击移动图标，弹出分组列表，一键归类
- 数据通过 `chrome.storage.sync` 跨设备实时同步，多台电脑共享同一份收藏
- 支持导出为 JSON 文件备份，支持导入覆盖（一键迁移）

### 🕐 稍后阅读 / Read Later

- 将暂时不需要但不想关闭的标签页保存下来，关闭标签同时保留链接
- 支持标记完成（归档）、重新打开、撤销归档
- 归档内容可搜索

### 🗑️ 垃圾箱 / Trash

- 所有删除操作（收藏夹删除、稍后阅读删除）统一进入垃圾箱
- 支持恢复到原位置，或永久删除
- 一键清空垃圾箱

### 🛠️ 内置工具 / Built-in Tools

通过搜索框输入 `/` 快速调出：

- **宽高比计算器** — 支持 11 种预设比例（16:9、4:3、1:1 等）及自定义比例输入，实时计算宽高像素值，提供常用尺寸快捷预设，「最近使用」自动记忆最近 3 次输入，一键复用
- **圆角内外径计算器** — 输入外框圆角半径 R 与间距 P，自动计算嵌套内框的正确圆角值 `r = R − P`，Canvas 实时可视化预览内外框及间距，一键复制 CSS `border-radius` 值，附设计规范公式说明（Apple HIG / Material Design 嵌套圆角规则）

---

## 个性化设置 / Personalisation

### 主题色 / Board Theme

- 纯色主题：12 款预设配色 + 自定义颜色选取器
- 渐变主题：双色渐变，支持 8 个方向，实时预览
- 文字和界面元素颜色根据背景自动适配，严格遵循 WCAG 2.1 可读性对比度标准

### 页面壁纸 / Wallpaper

- 输入任意公开 HTTPS 图片链接，一键替换星空背景
- 壁纸历史记录：自动保存最近 5 张，缩略图预览，一键切换
- 搜索区域采用动态磨砂遮罩，更换任何壁纸都不影响可读性

### 搜索引擎 / Search Engine

- 设置默认引擎，搜索框旁的下拉菜单可随时临时切换

---

## 视觉设计 / Visual Design

- 动态星空画布动画（基于 Canvas，支持闪烁星星、暖色地平线、岩石剪影）
- 自动暂停动画（切换到其他标签页时停止渲染，节省 CPU）
- 所有界面交互带有精细的过渡动画
- 关闭标签页时有粒子爆炸效果 + 音效反馈

---

## 隐私说明 / Privacy

StarTab 不收集任何个人数据，不向任何服务器发送浏览记录。所有数据仅存储在本地（`chrome.storage.local`）或你自己的 Google 账号同步存储（`chrome.storage.sync`，仅用于收藏夹跨设备同步）。

所需权限说明：

| 权限 | 用途 |
|------|------|
| `tabs` | 读取当前打开的标签页，用于展示标签看板 |
| `topSites` | 读取最常访问网站，用于快捷入口 |
| `storage` | 保存设置、收藏夹、稍后阅读等数据 |
| `bookmarks` | 收藏夹导入/导出兼容 |

---

## 更新日志 / Changelog

### v10.1 — 当前版本 / Current Release

**内置工具集 / Built-in Tools**

- 新增「圆角内外径计算器」：输入外框圆角 R 与间距 P，自动计算内框圆角 `r = R − P`，Canvas 实时可视化预览，一键复制 CSS 值
- 宽高比计算器弹窗加宽至 620px，修复横向滚动溢出问题
- 宽高比计算器新增「最近使用」区域：自动记忆最近 3 次输入尺寸，localStorage 持久化存储
- 预设尺寸点击时自动记录到「最近使用」
- 搜索框 placeholder 更新为「搜索网页，或输入 / 调出工具…」，引导用户发现内置工具

**版本号统一 / Version Consolidation**

- 全部文件头注释、页脚品牌标识、manifest.json 版本号统一更新为 v10.1 / 10.1.0

---

### v10.0

**斜杠命令工具菜单 / Slash Command Menu**

- 搜索框输入 `/` 弹出内置工具菜单，取代原有快捷方式行
- 首个内置工具：宽高比计算器（从设置中独立出来，更快捷访问）

---

### v9.0

**误操作防护：标签页关闭撤销 / Accidental-Close Undo**

- 关闭单个标签页后，「关闭全部」按钮旁立即出现绿色「恢复已关闭」按钮，点击重新打开刚才关闭的标签页并自动聚焦
- 点击「关闭全部」后，出现「恢复上次关闭」按钮，点击一键批量重新打开所有被关闭的标签页
- 两种恢复按钮互斥显示，逻辑清晰不混淆
- 30 秒有效窗口，超时自动消失（避免界面长期占用）

---

### v8.0

**收藏夹全面重构 / Bookmarks Rebuilt**

- 废弃拖拽放置方案，改用"移动到分组"弹窗，操作逻辑与浏览器原生书签管理一致
- 树状目录展示：未分组书签在上，分组以可折叠节点展示，状态持久化存储
- 删除书签统一走垃圾箱，删除分组后内容自动归还未分组区域

**Bug 修复**

- 修复 `const BM_KEY` 重复声明导致的 SyntaxError
- 修复新建分组表单在某些情况下无法响应点击的问题

---

### v7.0

- 收藏夹新增自定义分组功能（新建分组、拖拽归组）
- 壁纸历史记录：自动保存最近 5 张，缩略图预览，一键切换
- 修正导入/导出按钮图标方向错误

---

### v6.0

- 新增第三个面板标签"垃圾箱"，所有删除操作均进入暂存
- 标签看板每个条目新增"收藏"按钮
- 收藏夹书签新增"取消收藏"和"删除"双按钮
- 稍后阅读与收藏夹面板顺序对调

---

### v5.0

- 新增收藏夹面板，支持跨设备同步（chrome.storage.sync）
- 支持 JSON 格式导出/导入，一键迁移数据
- 三层分类算法上线，分类扩展至 10 种
- 纯色 + 渐变双模式主题，WCAG 2.1 自适应文字颜色

---

### v4.0

- 三策略网站自动分类（精确域名映射 → 结构规则 → 关键词评分）
- 自定义主题色（8 款预设 + 颜色选取器）
- 壁纸支持（HTTPS 图片链接替换星空背景）

---

### v3.0

- 引擎下拉菜单改用 `position:fixed` + 最高 z-index，解决遮挡问题
- 标签看板条目改为固定 32px 高度
- 搜索框磨砂玻璃卡片，保障壁纸可读性

---

### v2.0

- 动态星空 Canvas 背景
- 搜索引擎切换（5 种）
- Top 10 常用网站快捷入口
- 标签看板（按域名分组）
- 时间 + 类型双维度筛选
- 稍后阅读 + 归档
- 主题色选择、壁纸自定义

---

## 关键词标签 / Store Tags

`new tab` · `productivity` · `tab manager` · `bookmark manager` · `dark theme` · `start page` · `read later` · `custom new tab` · `space theme` · `tab kanban`

## 分类 / Category

**Productivity** → Workflow & Planning

## 隐私政策摘要 / Privacy Policy Summary

StarTab does not collect, transmit, or sell any user data.
All data is stored exclusively on-device via Chrome's built-in storage APIs.
No analytics, no tracking, no external network requests (beyond fetching favicons from Google's public favicon service and loading user-specified wallpaper URLs).

---

## 开源协议 / Open Source License

StarTab 基于以下开源项目构建：

| 项目 | 作者 | 协议 | 仓库 |
|------|------|------|------|
| Tab Out | Zara Zhang (@zarazhangrui) | MIT License | https://github.com/zarazhangrui/tab-out |

```
MIT License

Copyright (c) zarazhangrui

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

### StarTab 相对于 Tab Out 的主要差异 / Key Divergences from Tab Out

以下功能为 StarTab 全新设计，并非源自 Tab Out 原始代码：

| 模块 | StarTab 新增内容 |
|------|-----------------|
| 分类系统 | 三层自动分类算法（精确域名匹配 → 结构规则 → 关键词评分），无需 AI 调用 |
| 视觉层 | Canvas 动态星空、磨砂玻璃卡片、WCAG 2.1 自适应对比度主题引擎 |
| 书签管理 | 分组收藏夹（树状目录）+ chrome.storage.sync 跨设备同步 |
| 稍后阅读 | 独立队列 + 归档 + 全文搜索 |
| 垃圾箱 | 统一软删除暂存，支持恢复与永久删除 |
| 壁纸系统 | HTTPS 图片链接替换背景 + 最近 5 张历史快切 |
| 内置工具 | 斜杠命令菜单、宽高比计算器、圆角内外径计算器 |
| 存储层 | 版本化数据 schema + 顺序迁移引擎，保障历史数据无缝升级 |
| 架构 | 单文件扩展（无需 Node.js 服务端），开箱即用，零配置 |

Tab Out 原项目采用 Node.js 服务端 + SQLite + 外部 LLM API 的架构；StarTab 去除了服务端依赖，所有功能在浏览器扩展内完成，不调用任何外部 AI 接口。
