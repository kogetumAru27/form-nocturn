"use client";
import { useState } from "react";
import { editCrops } from "@/actions/crop";
import { CldUploadWidget } from "next-cloudinary";
type Crop ={
    id:string,
    name:string,
    image:string | null,
    description:string | null
}
export default function UpdateButton({crop}:{crop:Crop}){
    const [name,setName] = useState(crop.name);
    const [description,setDescription] =useState(crop.description ?? "");
    const [image,setImage] = useState(crop.image ?? "");
    const [isOpen,setIsOpen] = useState(false);
    const [error,setError] = useState("");
    return(
        <div>
            <button onClick={(e) =>{
                e.stopPropagation();
                setIsOpen(!isOpen);}} className="bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 transition"> ✏️編集</button>
            {isOpen && (
                <>
                    <form onSubmit={async(e) => {
                        e.stopPropagation();
                        if(!name){
                            setError("名前は必須です");
                            return
                        }
                        const result = await editCrops(crop.id,name,image,description);
                        if(result?.success) setIsOpen(false);
                        if(result?.error) setError(result.error);
                    }} className="flex flex-col gap-4">
                    <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/50 z-10"/>
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-50 p-8 rounded-2xl w-96 flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-green-900 mb-6">作物を変更</h2>
                        <input type="text" value={name} placeholder="名前" onChange={(e) => setName(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"/>
                        <CldUploadWidget uploadPreset="farm-nocturn" onSuccess={(result) => {
                            const info = result.info as {secure_url:string}
                            setImage(info.secure_url)
                        }}>{({open}) => <button type="button" onClick={() => open()} className="border border-green-700 text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition">画像を変更</button>}</CldUploadWidget>
                        <input type="text" value={description} placeholder="特徴" onChange={(e) => setDescription(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"/>
                        <button type="submit" className="flex-1 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition">変更</button>
                        {error && <p>{error}</p>}
                    </div>
                    </form>
                </>

            )}
        </div>
    )
}