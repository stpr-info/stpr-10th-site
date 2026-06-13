import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getLiveBySlug } from "@/lib/repo"
import { LiveDetailBody } from "@/components/live/LiveDetailBody"

type Params = { params: Promise<{ slug: string }> }

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const live = await getLiveBySlug(slug)
  if (!live) return { title: "ライブが見つかりません" }
  return {
    title: live.title,
    description: live.description ?? undefined,
    openGraph: { title: live.title, images: live.keyVisual ? [live.keyVisual] : [] },
  }
}

export default async function LiveDetailPage({ params }: Params) {
  const { slug } = await params
  const live = await getLiveBySlug(slug)
  if (!live || live.isActive === false) notFound()
  return <LiveDetailBody live={live} />
}
