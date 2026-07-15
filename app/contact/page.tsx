import ContactForm from "@/components/ContactForm";

export default function Contact(){
    return (
        <div className="max-w-2xl mx-auto p-6">
          <h1 className="text-3xl font-bold text-green-900 mb-8">お問い合わせ</h1>
          <div className="mb-8">
        <p className="text-gray-700 mb-2">📍 長野県千曲市 姨捨の棚田周辺</p>
        <p className="text-gray-700 mb-4">📞 000-0000-0000</p>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3207.0943267127936!2d138.09583703946092!3d36.503585072448345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601d9dc4faadfced%3A0x6e4fd53ce7b42243!2z5aeo5o2o44Gu5qOa55Sw!5e0!3m2!1sja!2sjp!4v1784011821885!5m2!1sja!2sjp" 
          width="100%" 
          height="300" 
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy" 
          referrerPolicy="strict-origin-when-cross-origin"
          className="rounded-2xl"
        />
      </div>
          <ContactForm />
        </div>
      );
}