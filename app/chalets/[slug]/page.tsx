import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ChaletDetail } from "@/components/chalets/chalet-detail"
import { chalets, getChalet, getOtherChalets } from "@/lib/chalets"

export function generateStaticParams() {
  return chalets.map((chalet) => ({ slug: chalet.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const chalet = getChalet(slug)
  if (!chalet) return { title: "Chalet | Bellevue Chalets" }
  return {
    title: `${chalet.name} | Bellevue Chalets`,
    description: chalet.cardDescription,
  }
}

export default async function ChaletPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const chalet = getChalet(slug)
  if (!chalet) notFound()

  return <ChaletDetail chalet={chalet} otherChalets={getOtherChalets(slug)} />
}
