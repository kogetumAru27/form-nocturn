"use client";
import { useState } from "react";
type DeleteButtonProps = {
    id:string,
    onDelete: (id: string) => Promise<{ success?: boolean; error?: string }>;
}
export default function DeleteButton({id,onDelete}:DeleteButtonProps){
    const [error,setError] = useState("");
    return(
        <div>
            <button onClick={async(e) => {
                e.stopPropagation();
                if(!window.confirm("削除しますか?"))return;
                const result = await onDelete(id);
                if(!result.error) setError(result.error ?? "エラーが発生しました")
        }} className="border border-red-400 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition">
            削除</button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    )
}