# 个人作品集骨架（全中文版）

王咏琪的游戏营销作品集，纯静态、可直接部署到 GitHub Pages。结构为“首页 / 案例 / 经历 / OC 互动页 / 简历”，已填入简历中的真实经历与数据。

## 页面结构

- `index.html`：首页，个人信息、精选项目、经历速览、能力标签、联系方式
- `resume/index.html`：网页简历，可打印 / 导出 PDF
- `portfolio/index.html`：旧案例库入口，已改为跳转首页
- `portfolio/project.html`：网易古风 MMO 案例详情
- `experience/index.html`：经历时间线
- `demo/oc.html`：王咏琪的 OC 互动页（文字游戏式对话框 + 建模 / 独立文游 / 同人 / cosplay / 美工）
- `demo/games.html`：游戏经历（重点游戏拆解 + 完整 37 款清单）
- `assets/css/style.css`：全站样式
- `assets/js/main.js`：移动端导航、作品筛选、打印、年份

## 本地预览

在 `ban` 目录运行：

```powershell
node work\serve.mjs my-portfolio 4174
```

然后打开：

```text
http://127.0.0.1:4174/
```

## 当前内容

- 首页：黑红“王咏琪 作品集”，3D 场景做背景；核心案例入口（网易游戏社媒运营 / KOC / KOL / 线下赛事 / 圈层创作）、结果数字、经历与简历入口
- 简历：教育、网易互娱、LOFTER、新东方文旅、苏州地铁、项目经历、技能与奖项
- 首页即案例入口：不再单独设案例库页，案例从首页卡片直接进入
- 案例详情：网易古风 MMO 用户增长、平面广告素材优化、KOC 内容网络、KOL 达人雷达、苏州地铁品牌内容
- 经历：可点击的时间轴，点开任意节点右侧立即展开职责、动作与结果；默认展开网易互娱
- OC 互动页：文字游戏式对话框，可点击查看 C4D 建模、独立文游、同人案例、cosplay 与美工
- 游戏经历：按品类拆版本节奏、商业化与内容生态，附完整 37 款游戏清单

## 后续替换

1. 首页右侧 3D 图：`assets/img/hero-3d.jpg`（只作为视觉背景，不作为能力主线）
2. 案例详情中的素材占位：替换成项目截图、直播数据、达人内容与素材库界面
3. OC 互动页：后续可继续补充视频、可交互组件或 3D 作品
4. 简历页：可直接打印 / 导出 PDF，也可以替换成正式 PDF 下载

## 改颜色

打开 `assets/css/style.css`，改 `:root` 里的变量：

```css
:root {
  --ink: #171512;
  --paper: #f4efe4;
  --accent: #d94f2b;
  --jade: #1f6f5c;
  --gold: #c49a3a;
}
```

## 部署到 GitHub Pages

1. 新建一个 GitHub 仓库，例如 `my-portfolio`。
2. 把 `my-portfolio` 目录里的文件推到仓库根目录。
3. 打开仓库 `Settings → Pages`。
4. `Build and deployment` 选择 `Deploy from a branch`。
5. 分支选 `main`，目录选 `/ (root)`，保存。
6. 等 1–2 分钟，访问 `https://你的用户名.github.io/my-portfolio/`。

`.nojekyll` 已经放在根目录，避免 GitHub Pages 忽略静态文件。

## 内容建议

- 首页只放 3–4 个最强项目，不要把十几个项目全堆在首屏。
- 每个项目都写“背景—目标—我的动作—结果—复盘”。
- 结果尽量用数字、上线状态、奖项或复用情况证明。
- 不放未授权的图片、字体、游戏素材；当前骨架本身不依赖图片。
- 简历页可以直接用浏览器“打印 → 另存为 PDF”生成投递版。
