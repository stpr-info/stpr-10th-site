import { redirect } from "next/navigation"

// ルート（/）は 10周年特設サイトのトップへリダイレクトする。
export default function Home() {
  redirect("/stpr-10th-anniversary")
}
