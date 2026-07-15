import Link from "next/link";
import LoguinButton from "@/components/Loguinbutton";
import { Metadata } from "next";
export const metadata :Metadata = {
  title: "Farm Nocturn | 月明かりの下で育てた農産物",
  description: "棚田で育てたコーヒー豆・野菜・果物をお届けします",
}
export default async function Home(){
  return (
    <>
      {/* ログインエリア 右上固定 */}
      <div className="fixed top-4 right-4 z-50">
          <LoguinButton />
      </div>

      {/* メインコンテンツ */}
      <main className="max-w-3xl mx-auto px-6 py-20">
        <img src="logo2.png" alt="farm-nocturn" className="w-64 mx-auto mb-6 rounded-2xl"/>
        {/* 農場紹介 */}
        <section className="mb-20 shadow-md p-10 rounded-2xl">
          <h1 className="text-5xl font-bold text-green-900 mb-4">Farm Nocturn</h1>
          <p className="text-lg text-green-800 leading-relaxed">
            月明かりの下で育てた、こだわりの農産物をお届けします。
            コーヒー豆をはじめ、アスパラガス・わさび・じゃがいも・玉ねぎなどの野菜、
            ブルーベリー・梨などの果物を丁寧に栽培しています。
            自然の恵みをそのままに、棚田の風景とともに。
          </p>
        </section>
  
        {/* Polarisセクション */}
        <section className="bg-indigo-900 text-white rounded-2xl p-10">
          <h2 className="text-3xl font-bold mb-4">天体カフェ Polaris</h2>
          <p className="mb-6">農場から直接届く、夜に溶ける一杯</p>
          <Link href="/about" className="bg-yellow-600 text-white px-6 py-3 rounded-full hover:bg-yellow-700 transition">
            詳しく見る
          </Link>
        </section>
      </main>
    </>
  );
}
