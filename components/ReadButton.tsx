"use client";
import { useState } from "react";
type ReadButtonProps={
    id:string,
    onRead:(id:string) => Promise<{success?:boolean,error?:string}>
}
export default function ReadButton({id,onRead}:ReadButtonProps){
    const [error,setError] = useState("");
    return (
        <div>
            <button onClick={async(e) => {
                e.stopPropagation();
                if(!window.confirm("既読にしますか？"))return;
                const result = await onRead(id);
                if(result?.error)return setError(result.error ?? "エラーが発生しました。"); 
                
            }} className="text-sm border border-green-600 text-green-700 px-3 py-1 rounded-full hover:bg-green-50 transition">既読</button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    )
}