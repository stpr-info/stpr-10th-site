import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getNewsById } from "@/lib/repo"
import { getGroupName } from "@/data/groups"
import { newsCategoryLabel } from "@/data/newsPosts"
import { IconChevronLeft } from "@/components/info/icons"

type Params = { params: Promise<{ id: string }> }

export const dynamic = "force-dynamic"

function fmtDateTime(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(iso)
  if (!m) return iso.slice(0, 10).replace(/-/g, "/")
  return `${m[1]}/${m[2]}/${m[3]} ${m[4]}:${m[5]}`
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params
  const post = await getNewsById(id)
  if (!post) return { title: "記事が見つかりません | STPR INFO" }
  return { title: `${post.title} | STPR INFO`, description: post.excerpt }
}

export default async function NewsDetailPage({ params }: Params) {
  const { id } = await params
  const post = await getNewsById(id)
  if (!post) notFound()

  return (
    <div className="page">
      <article className="news-detail">
        <Link href="/news" className="detail-back">
          <IconChevronLeft size={14} />
          NEWS一覧へ
        </Link>

        <div className={`detail-hero ${post.category === "goods" ? "pink" : ""}`}>
          {post.thumbnail && <img src={post.thumbnail} alt="" />}
        </div>

        <div className="detail-body">
          <div className="detail-meta">
            <span className="article-cat">{newsCategoryLabel(post.category)}</span>
            <span className="article-date">{fmtDateTime(post.publishedAt)}</span>
            <span className="group-badge">{getGroupName(post.groupSlug)}</span>
          </div>

          <h1 className="detail-title">{post.title}</h1>

          <div className="detail-author">
            <span className="author-icon">S</span>
            <span className="author-name">{post.author ?? "STPR運営"}</span>
          </div>

          {post.spoiler && (
            <div className="modal-spoiler">※ ネタバレを含みます。閲覧にご注意ください。</div>
          )}

          <div className="detail-content">{post.body}</div>
        </div>
      </article>
    </div>
  )
}
