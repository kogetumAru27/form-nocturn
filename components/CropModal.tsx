"use client";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import createCrop from "@/actions/crop";
export default function AddCropModal(){
    const [name,setName] = useState("");
    const [image,setImage] = useState("");
    const [description,setDescription] = useState("");
    const [isOpen,setIsOpen] = useState(false);
    return(
        <div>
            <button onClick={() => setIsOpen(!isOpen)} className="bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 transition">+追加</button>
        {isOpen &&(
            <>
           <div className="fixed inset-0 bg-black/50 z-10" onClick={() => setIsOpen(false)} />
           <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-20 p-8 rounded-2xl">
           <h2 className="text-xl font-bold text-green-900 mb-6">作物を追加</h2>
             <form action={createCrop}className="flex flex-col gap-4">
             <input type="text" value={name} placeholder="名前" onChange={(e) => setName(e.target.value)} name="name"  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"/>
             <input type="hidden" name="image" value={image}/>
            <CldUploadWidget uploadPreset="farm-nocturn"  onSuccess={(result) => {
                const info = result.info as {secure_url:string}
                setImage(info.secure_url)
                }}>{({open}) => <button type="button" className="border border-green-700 text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition" onClick={() => open()}>画像をアップロード</button>}</CldUploadWidget>
             <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="特徴・栽培メモ" name="description" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"/>
             <button 
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                キャンセル
              </button>
             <button type="submit" className="flex-1 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition">追加</button>
         </form>
         </div>
         </>
        )}
        </div>
    )
}