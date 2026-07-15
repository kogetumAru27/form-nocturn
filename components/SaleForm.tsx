"use client";
import { useState} from "react";
import { SaleInvent } from "@/actions/sales";
import { Crop } from "@/actions/inventory";
type FormProps = {//外から受け取るものをまとめて型定義
    crops:Crop[];
    initialData?:SaleInvent;
    onSubmit:(input:SaleInvent) => Promise<{success?:boolean;error?:string}>
    title:string,
    buttonLabel:string
}
export default function SalesForm({crops,initialData,onSubmit,title,buttonLabel}:FormProps){
    const [unitPrice,setUnitPrice] = useState<number | null>(initialData?.unitPrice ?? null);
    const [totalQuantity,setTotalQuantity] = useState<number | null>(initialData?.totalQuantity ?? null);
    const [saleChannel,setsaleChennel]= useState(initialData?.saleChannel ?? "");
    const [cropId,setCropId] = useState(initialData?.cropId ?? "");
    const [unit,setUnit] = useState<string | null>(initialData?.unit ?? "");
    const [isOpen,setisOpen] = useState(false);
    const [error,setError] = useState("");
    const TotalPrice = unitPrice !== null && totalQuantity !==null ? unitPrice*totalQuantity:null
    return(
        <div>
          <button 
            onClick={() => setisOpen(!isOpen)}  
            className="bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 transition"
          >
            {title}
          </button>
          {isOpen && ( 
            <>
              <div onClick={() => setisOpen(false)} className="fixed inset-0 bg-black/50 z-40"/>
              <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-50 p-8 rounded-2xl w-96 flex flex-col gap-4">
                <h2 className="text-xl font-bold text-green-900">{title}</h2>
                <form onSubmit={async(e) => {
                  e.preventDefault();
                  if(!saleChannel){ setError("売れた場所を入力してください"); return }
                  if(totalQuantity === null){ setError("数量を入力してください"); return }
                  if(unitPrice === null){ setError("単価を入力してください"); return }
                  if(!unit){ setError("単位を選択してください"); return }
                  const result = await onSubmit({unitPrice,totalQuantity,saleChannel,totalPrice:TotalPrice!,cropId,unit});
                  if(result?.success) return setisOpen(false);
                  if(result?.error) return setError(result.error);
                }} className="flex flex-col gap-4">
                  <select 
                    value={cropId} 
                    onChange={(e) => setCropId(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="">作物の選択</option>
                    {crops.map(crop => (
                      <option key={crop.id} value={crop.id}>{crop.name}</option>
                    ))}
                  </select>
                  <input 
                    type="number" 
                    min={0} 
                    placeholder="単価" 
                    value={unitPrice ?? ""} 
                    onChange={(e) => setUnitPrice(e.target.value? Number(e.target.value):null)} 
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  />
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      min={0} 
                      placeholder="個数" 
                      value={totalQuantity ?? ""} 
                      onChange={(e) => setTotalQuantity(e.target.value?Number(e.target.value):null)} 
                      className="border border-gray-300 rounded-lg px-4 py-2 w-2/3"
                    />
                    <select 
                      value={unit ?? ""} 
                      onChange={(e) => setUnit(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 w-1/3"
                    >
                      <option value="">単位</option>
                      <option value="kg">kg</option>
                      <option value="g">g</option>
                      <option value="個">個</option>
                    </select>
                  </div>
                  <p className="text-lg font-bold text-green-700">売上:¥{TotalPrice?.toLocaleString() ?? 0}</p>
                  <input 
                    type="text" 
                    placeholder="場所(道の駅、スーパーなど)" 
                    value={saleChannel ?? ""} 
                    onChange={(e) => setsaleChennel(e.target.value)} 
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  />
                  {error && <p className="text-sm text-red-700">{error}</p>}
                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setisOpen(false)}
                      className="flex-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                    >
                      キャンセル
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
                    >
                      {buttonLabel}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      )
}