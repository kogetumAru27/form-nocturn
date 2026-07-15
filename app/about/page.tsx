export default function About(){
    return(
      <div className="min-h-screen bg-[#0a0e27] text-white">
    <div className="max-w-2xl mx-auto p-6 text-center">
    {/* ロゴ */}
    <img src="/logo.png" alt="Polaris" className="w-64 mx-auto mb-6" />
    
    <h1 className="text-3xl font-bold text-indigo-900 mb-4 text-yellow-300">天体カフェ Polaris</h1>
    <p className="text-yellow-300 mb-8">農場から直接届く、夜に溶ける一杯</p>
    
    {/* 場所 */}
    <p className="text-yellow-300 mb-2">長野県(場所は棚田を指定していますが僕とは何も関係ない景色のものを場所に指定しました)</p>
    <iframe 
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3207.0943267127936!2d138.09583703946092!3d36.503585072448345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601d9dc4faadfced%3A0x6e4fd53ce7b42243!2z5aeo5o2o44Gu5qOa55Sw!5e0!3m2!1sja!2sjp!4v1784011821885!5m2!1sja!2sjp" 
  width="600" 
  height="450" 
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy" 
  referrerPolicy="strict-origin-when-cross-origin"
  className="rounded-2xl mb-5"
/>
    {/* リンク */}
    <a 
      href="https://hoshi-cafe-eight.vercel.app" 
      target="_blank"
      className="inline-block bg-indigo-900 text-white px-6 py-3 rounded-full hover:bg-indigo-800 transition"
    >
      Polarisのサイトへ
    </a>
  </div>
  </div>
    )
}