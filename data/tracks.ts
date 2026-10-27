/**
 * 歌曲数据
 * ------------------------------------------------------------
 * 以后添加或替换歌曲，只需要修改这个文件：
 *
 * 1. 把 MP3 放到   /public/audio/   （例如 track-01.mp3）
 * 2. 把封面放到   /public/covers/  （例如 track-01.jpg，建议正方形）
 * 3. 修改下面对应歌曲的 title / year / genre / description / duration
 *
 * 如果某首歌的封面文件不存在，网站会自动显示一张抽象艺术封面。
 * 现在 /public/audio 里的 MP3 是临时生成的 demo 音频，上传真实歌曲时直接覆盖同名文件即可。
 */

export type Track = {
  id: number;
  title: string;
  year: string;
  genre: string;
  description: string;
  cover: string;
  audio: string;
  duration: string;
  /** 设为 true 的歌曲会出现在首页「最近在听」，同时也是「播放最新作品」按钮播放的歌 */
  featured?: boolean;
};

export const tracks: Track[] = [
  {
    id: 1,
    title: "晚风",
    year: "2026",
    genre: "AI 辅助创作 · 轻音乐",
    description: "有些旋律不是为了表达什么，只是想把某一个安静的晚上留下来。",
    cover: "/covers/track-01.jpg",
    audio: "/audio/track-01.mp3",
    duration: "00:43",
    featured: true,
  },
  {
    id: 2,
    title: "窗边的雨",
    year: "2026",
    genre: "钢琴 · 氛围",
    description: "下雨的时候不想出门，就把雨声慢慢写成了几个和弦。",
    cover: "/covers/track-02.jpg",
    audio: "/audio/track-02.mp3",
    duration: "00:43",
  },
  {
    id: 3,
    title: "早班车",
    year: "2026",
    genre: "民谣 · 流行",
    description: "清晨的街道还很空，车窗外的城市一点点亮起来。",
    cover: "/covers/track-03.jpg",
    audio: "/audio/track-03.mp3",
    duration: "00:43",
  },
  {
    id: 4,
    title: "旧唱片",
    year: "2025",
    genre: "复古 · 爵士",
    description: "第一次尝试的作品之一，带着一点试探，也带着一点老歌的味道。",
    cover: "/covers/track-04.jpg",
    audio: "/audio/track-04.mp3",
    duration: "00:43",
  },
  {
    id: 5,
    title: "远山",
    year: "2026",
    genre: "器乐 · 新世纪",
    description: "想象自己站在很远的地方，看云从山顶慢慢走过去。",
    cover: "/covers/track-05.jpg",
    audio: "/audio/track-05.mp3",
    duration: "00:43",
  },
  {
    id: 6,
    title: "午后咖啡",
    year: "2026",
    genre: "Lo-fi · 轻松",
    description: "一杯咖啡的时间，刚好够写完一段旋律。",
    cover: "/covers/track-06.jpg",
    audio: "/audio/track-06.mp3",
    duration: "00:43",
  },
  {
    id: 7,
    title: "老朋友",
    year: "2025",
    genre: "民谣",
    description: "写给那些很久没见、但一见面就像从没分开过的人。",
    cover: "/covers/track-07.jpg",
    audio: "/audio/track-07.mp3",
    duration: "00:43",
  },
  {
    id: 8,
    title: "夜航",
    year: "2026",
    genre: "电子 · 氛围",
    description: "夜里很安静，适合把想法交给一段缓慢的电子声音。",
    cover: "/covers/track-08.jpg",
    audio: "/audio/track-08.mp3",
    duration: "00:43",
  },
  {
    id: 9,
    title: "小城故事",
    year: "2026",
    genre: "流行 · 抒情",
    description: "一些很小的日常，也值得被认真地唱出来。",
    cover: "/covers/track-09.jpg",
    audio: "/audio/track-09.mp3",
    duration: "00:43",
  },
  {
    id: 10,
    title: "未完成",
    year: "2026",
    genre: "实验 · 器乐",
    description: "还在修改中的一首歌。就像这个爱好一样，还在继续。",
    cover: "/covers/track-10.jpg",
    audio: "/audio/track-10.mp3",
    duration: "00:43",
  },
];
