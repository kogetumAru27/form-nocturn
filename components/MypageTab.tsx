"use client";
import { useState } from "react";
type Tab = "dashboard" | "inventory" ;
export default function MypageTabs({dashboardContent,inventoryContent}:{dashboardContent:React.ReactNode,inventoryContent:React.ReactNode}){
    const [tab,settab] = useState<Tab>("dashboard");
    return(
        <div>
        <div className="flex gap-4 justify-center">
        <button 
  onClick={() => settab("dashboard")} 
  className={`px-6 py-2 rounded-full border transition ${
    tab === "dashboard" 
      ? "bg-green-700 text-white border-green-700" 
      : "border-gray-300 hover:bg-gray-100"
  }`}
>
  ダッシュボード
</button>
<button 
  onClick={() => settab("inventory")} 
  className={`px-6 py-2 rounded-full border transition ${
    tab === "inventory" 
      ? "bg-green-700 text-white border-green-700" 
      : "border-gray-300 hover:bg-gray-100"
  }`}
>
  在庫管理
</button>
        </div>
         {tab === "dashboard" && dashboardContent}
         {tab === "inventory" && inventoryContent}
        </div>
    )
}