# 李靖睿 Jason Li · Music Archive

Jason 的个人音乐档案馆。使用 Next.js + React + TypeScript + Tailwind CSS + Framer Motion 构建，可直接部署到 Vercel，无需数据库。

> 小提示：网站里藏着一首「Hidden Track」。在「创作档案」的最底部。🤫

---

## 本地运行

```bash
npm install
npm run dev        # 开发模式：http://localhost:3000
npm run build      # 生产构建
npm start          # 运行生产版本
```

## 部署到 Vercel

1. 把这个文件夹推送到 GitHub。
2. 在 [vercel.com](https://vercel.com) 选择 **Add New → Project**，导入仓库。
3. 保持默认设置（Framework 会自动识别为 Next.js），点击 **Deploy**。

之后每次上传新歌曲或照片并推送，Vercel 会自动重新部署。

> 网站在**构建时**检查照片、封面、音频是否存在：存在就显示，不存在就显示占位设计。所以上传文件后需要重新构建 / 部署（Vercel 推送后会自动完成）。

---

## 如何添加歌曲

1. 上传 MP3 到 `/public/audio`，例如 `track-01.mp3` … `track-10.mp3`
   - 现在文件夹里的 10 个 MP3 是**临时生成的 demo 音频**（约 40 秒的轻柔钢琴音），用来测试播放器。上传真实歌曲时直接覆盖同名文件即可。
2. 添加封面到 `/public/covers`，例如 `track-01.jpg`（建议正方形，至少 800×800）
   - 没有封面的歌曲会自动使用一张抽象艺术封面，每首都不同。
3. 修改 `/data/tracks.ts`：曲名、年份、类型、一句话介绍、时长

```ts
{
  id: 1,
  title: "晚风",
  year: "2026",
  genre: "AI 辅助创作 · 轻音乐",
  description: "有些旋律不是为了表达什么，只是想把某一个安静的晚上留下来。",
  cover: "/covers/track-01.jpg",
  audio: "/audio/track-01.mp3",
  duration: "03:42",
  featured: true, // 出现在首页「最近在听」，也是「播放最新作品」播放的歌
}
```

想增加第 11 首歌：上传 `track-11.mp3`，再在数组末尾加一项即可。

## 如何替换 Jason 照片

上传到 `/public/images/`：

```
/public/images/jason-hero.jpg    首页大图（建议竖图 4:5）
/public/images/jason-about.jpg   「关于 Jason」生活照（建议竖图 3:4）
```

文件名保持一致即可，不需要修改任何组件。

## 如何上传家庭照片

上传到 `/public/images/`：

```
family-01.jpg
family-02.jpg
family-03.jpg
family-04.jpg
family-05.jpg
family-06.jpg
```

这些照片会出现在生日彩蛋的相册里，前 4 张也会作为彩蛋开场时背景中漂浮的照片。正方形最佳，其他比例会自动居中裁切。

## 如何修改生日祝福

编辑 `/data/siteContent.ts`：

```ts
momMessage: `第一段……

第二段……`,
momSignature: "爱你的，妈妈",

daughterMessage: `……`,
daughterSignature: "爱你的，Charlotte",
```

用**空行**分段。这个文件里也可以修改个人介绍（`artistBio`）、信息小卡片（`artistFacts`）、创作时间线（`archive`）等所有文案。

---

## 文件结构

```
app/
  layout.tsx          字体、页面标题
  page.tsx            页面结构（构建时检查图片 / 音频是否存在）
  globals.css         颜色、字体、纸张质感等全局样式
components/
  Navbar.tsx          导航栏
  Hero.tsx            首页（含「连续点击名字 5 次」小彩蛋）
  FeaturedTrack.tsx   最近在听
  MusicLibrary.tsx    音乐作品网格
  TrackCard.tsx       单首歌卡片
  MusicPlayer.tsx     全局播放器（同一时间只播放一首）+ 底部 Mini Player
  AboutJason.tsx      关于 Jason
  Archive.tsx         创作档案时间线
  HiddenTrack.tsx     隐藏曲目入口
  BirthdaySurprise.tsx 生日彩蛋全屏弹层
  BirthdayLetters.tsx 妈妈和 Charlotte 的祝福（liner notes 样式）
  FamilyAlbum.tsx     家庭相册
  Footer.tsx
  Cover.tsx / PhotoFrame.tsx / Vinyl.tsx / SectionHeading.tsx   通用视觉组件
data/
  tracks.ts           歌曲数据
  siteContent.ts      所有文案与照片路径
public/
  audio/              MP3
  covers/             歌曲封面
  images/             人物照片、家庭照片
```

## 无障碍

- 语义化 HTML、所有图片有 alt、按钮有 aria-label
- 键盘可操作；彩蛋弹层支持 Esc 关闭并保持焦点在弹层内
- 系统开启「减少动态效果」时自动关闭非必要动画
