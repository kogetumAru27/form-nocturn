"use client";
import {  useState } from "react";
import { CreateInvent } from "@/actions/inventory";
type Crop = {
    id: string;
    name: string;
}
type FormProps = {
    crops:Crop[]
    initialData?:CreateInvent;
    onSubmit:(input:CreateInvent) => Promise<{success?:boolean; error?:string}>
    title:string;
    buttonLabel:string
}
export default function  InventoryForm({crops,initialData,onSubmit,title,buttonLabel}:FormProps){
    const [stock,setStock] = useState<number | null>(initialData?.stock ?? null);
    const [unit,setUnit] = useState(initialData?.unit ?? "");
    const [cropId,setCropId] = useState(initialData?.cropId ?? "");
    const [price,setPrice] =useState(initialData?.price ?? null);
    const [isopen,setisopen] = useState(false);
    const [error,setError] = useState("")
    return(
        <div>
            <button onClick={() => setisopen(!isopen)} className="bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 transition">{title}</button>
            {isopen && (
                <>
                <div onClick={() => setisopen(false)} className="fixed inset-0 bg-black/50 z-40"/>
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-50 p-8 rounded-2xl w-96 flex flex-col gap-4">
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    if(!cropId){
                        setError("作物を選択してください");
                        return;
                    }
                    if (stock === null) {
                        setError("在庫数を入力してください");
                        return;
                      }
                    if(price === null){
                        setError("金額を入力してください");
                        return;
                    }
                    const result = await onSubmit({stock,unit,cropId,price});
                    if(result?.success) setisopen(false);
                    if(result?.error) setError(result.error);
                }} className="flex flex-col gap-4">
                    <input type="number" min={0} value={stock ?? ""} placeholder="在庫数" onChange={(e) => setStock(e.target.value?Number(e.target.value):null)} className="border border-gray-300 shadow-md rounded-lg px-4 py-2"/>
                    <input type="text" placeholder="単位" value={unit} onChange={(e) => setUnit(e.target.value)} className="border border-gray-300 shadow-md rounded-lg px-4 py-2"/>
                    <select value={cropId} onChange={(e) => setCropId(e.target.value)}  className="border border-gray-300 shadow-md rounded-lg px-4 py-2">
                        <option value="">作物を選択</option>
                        {crops.map(crop => (<option key={crop.id} value={crop.id}>{crop.name}</option>))}
                    </select>
                    <input type="number" min={0} placeholder="価格(円)" value={price ?? ""}  onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : null)}  className="border border-gray-300 rounded-lg px-4 py-2"/>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button onClick={() => setisopen(false)} className="flex-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition">キャンセル</button>
                    <button type="submit"   className="flex-1 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition">{buttonLabel}</button>
                </form>
                </div>
                </>
            )}
        </div>
    )
}