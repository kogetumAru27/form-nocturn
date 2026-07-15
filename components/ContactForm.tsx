"use client";
import { useState } from "react";
import sendContact from "@/actions/contact";
export default function ContactForm(){
    const [name,setName] = useState("");
    const [message,setmessage] = useState("");
    const [email,setEmail] = useState("");
    const [error,setError] = useState("");
    const [success,setSuccess] =useState(false);
    return(
        <form onSubmit={async(e) => {
        e.preventDefault();
        if(!name || !email || !message){
            setError("全ての項目を埋めてください");
            return
        }
        const result = await sendContact({name,email,message});
        if(result?.success){
            setSuccess(true);
            setName("");
            setEmail("");
            setmessage("");
        }
        if(result?.error) setError(result.error);
        }} className="flex flex-col gap-4">
            <input type="text" value={name} placeholder="名前" onChange={(e) => setName(e.target.value)}  className="border border-gray-300 rounded-lg px-4 py-2"/>
            <input type="e-mail" value={email} placeholder="メールアドレス" onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2"/>
            <textarea value={message} placeholder="お問い合わせ内容" onChange={(e) => setmessage(e.target.value)}  className="border border-gray-300 rounded-lg px-4 py-2 h-32 resize-none"/>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">送信完了しました</p>}
            <button type="submit"  className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
            >送信</button>
        </form>

    )
}