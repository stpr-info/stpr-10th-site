import type { Metadata } from "next"
import { getNews } from "@/lib/repo"
import NewsView from "@/components/info/NewsView"

export const metadata: Metadata = {
  title: "NEWS | STPR INFO",
  description: "STPR FAMILY 各グループの最新ニュース。",
}

export const dynamic = "force-dynamic"

export default async function NewsPage() {
  const posts = await getNews()
  return <NewsView posts={posts} />
}
