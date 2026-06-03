// すとぷり 10周年メンバーデータ
// 画像は public/images/members/ 配下に後日配置（未配置でもビルドは通る）。

export type Member = {
  id: string
  name: string
  nameEn: string
  color: string
  bgColor: string
  visual10th?: string // public/images/members/{id}-visual.jpg
  miniChara?: string // public/images/members/{id}-mini.png
  catchphrase?: string
}

export const MEMBERS: Member[] = [
  { id: "rinu", name: "莉犬", nameEn: "RINU", color: "#C0392B", bgColor: "#FDE8E8" },
  { id: "root", name: "るぅと", nameEn: "ROOT", color: "#D4A017", bgColor: "#FDF6DC" },
  { id: "colon", name: "ころん", nameEn: "COLON", color: "#2980B9", bgColor: "#E8F4FD" },
  { id: "satomi", name: "さとみ", nameEn: "SATOMI", color: "#E91E8C", bgColor: "#FDE8F4" },
  { id: "jel", name: "ジェル", nameEn: "JEL", color: "#E07B20", bgColor: "#FDF0E0" },
  { id: "nanamori", name: "ななもり。", nameEn: "NANAMORi", color: "#7B52AB", bgColor: "#F0EBF8" },
]
