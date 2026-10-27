/**
 * 网站文字与图片内容
 * ------------------------------------------------------------
 * 所有照片路径和主要文案都集中在这里。
 *
 * 替换照片：直接把图片上传到 /public/images/，文件名与下面的路径一致即可，
 *           不需要修改任何 React 组件。图片不存在时会自动显示占位设计。
 * 修改祝福：编辑下面的 momMessage / daughterMessage（用空行分段）。
 */

export const siteContent = {
  artistName: "李靖睿",
  artistEnglishName: "Jason Li",
  artistSubtitle: "用好奇心写歌，用旋律收藏生活。",
  artistRole: "独立音乐创作者 · AI 音乐探索者",

  artistBio: [
    "Jason 是一个很少主动谈起自己，却总愿意认真听别人说话的人。",
    "在朋友眼里，他温和、细致，也总是在别人需要的时候伸手帮忙。",
    "最近，他开始把自己的好奇心放进音乐里。AI 成为了新的创作工具，而旋律则像是另一种记录生活的方式。",
    "这里没有所谓正式的“音乐生涯”，更多的是一些兴趣、实验，以及一个人慢慢发现自己还可以创造什么的过程。",
  ],

  artistFacts: [
    { label: "最近的新爱好", value: "AI 编曲" },
    { label: "创作状态", value: "持续更新中" },
    { label: "朋友眼中的 Jason", value: "温和，好相处，总愿意帮忙" },
    { label: "作品数量", value: "约 10 首，持续增加" },
  ],

  // TODO: 将 /public/images/jason-hero.jpg 替换为 Jason 的人物照片（建议竖图 4:5）
  heroImage: "/images/jason-hero.jpg",
  // TODO: 将 /public/images/jason-about.jpg 替换为 Jason 的生活照片（建议竖图 3:4）
  aboutImage: "/images/jason-about.jpg",
  aboutImageCaption: "Jason，在某个普通的下午",

  // TODO: 后续上传家庭照片（文件名保持一致即可）
  familyPhotos: [
    "/images/family-01.jpg",
    "/images/family-02.jpg",
    "/images/family-03.jpg",
    "/images/family-04.jpg",
    "/images/family-05.jpg",
    "/images/family-06.jpg",
  ],

  archive: [
    {
      year: "2025",
      title: "第一次尝试",
      text: "开始接触 AI 音乐生成。从“试试看”开始。",
    },
    {
      year: "2026",
      title: "越来越认真",
      text: "开始留下更多完整的作品。风格、旋律和想法也慢慢有了自己的方向。",
    },
    {
      year: "2026",
      title: "这个网站诞生了",
      text: "大约十首歌之后，这些作品终于有了一个属于自己的地方。",
    },
  ],

  // ───────── 以下是生日彩蛋的内容 ─────────
  birthdayYear: "2026",

  momMessage: `【这里之后填写妈妈的生日祝福】`,
  momSignature: "爱你的，妈妈",

  daughterMessage: `【这里之后填写 Charlotte 的生日祝福】`,
  daughterSignature: "爱你的，Charlotte",
};

export type SiteContent = typeof siteContent;
