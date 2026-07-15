"use client";
import { deleteCrops } from "@/actions/crop";
import { useState } from "react";
export default function DeleteButton({id}:{id:string}){
    const [error,setError] = useState("");
    return(
        <div>
            <button onClick={async(e) => {
                e.stopPropagation();
                if(!window.confirm("削除しますか？"))return
                const result = await deleteCrops(id);
                if(result.error){
                    setError(result.error)
                }
            }} className="border border-red-400 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition">削除</button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    )
}