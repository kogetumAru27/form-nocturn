"use client";
import { updateSaleRecode,deleteSaleRecode } from "@/actions/sales";
import createSaleRecord from "@/actions/sales";
import { SaleInvent } from "@/actions/sales";
import { Crop } from "@/actions/inventory";
import DeleteButton from "./DeleteButtons";
import SalesForm from "./SaleForm";
type SaleRecordData= SaleInvent & {
    id:string,
    crop:Crop
}
export default function SaleList({crops,salesRecode}:{crops:Crop[],salesRecode:SaleRecordData[]}){
    return (
        <div className="p-6">
          <div className="mb-6">
            <SalesForm onSubmit={createSaleRecord} title="+販売記録を追加" buttonLabel="追加" crops={crops}/>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {salesRecode.map(sale => (
              <div key={sale.id} className="border border-gray-200 shadow-md rounded-2xl p-4 flex flex-col gap-2">
                <p className="text-xl font-bold text-green-900">{sale.crop.name}</p>
                <p className="text-gray-500 text-sm">{sale.saleChannel}</p>
                <p className="text-gray-700">{sale.totalQuantity}{sale.unit}</p>
                <p className="text-lg font-bold text-green-700">¥{sale.totalPrice.toLocaleString()}</p>
                <div className="flex gap-2 mt-2">
                  <SalesForm 
                    onSubmit={(input) => updateSaleRecode(sale.id, input)} 
                    initialData={{
                      saleChannel: sale.saleChannel,
                      totalPrice: sale.totalPrice,
                      totalQuantity: sale.totalQuantity,
                      cropId: sale.cropId,
                      unitPrice: sale.unitPrice,
                      unit: sale.unit
                    }} 
                    crops={crops} 
                    title="✏️編集" 
                    buttonLabel="変更"
                  />
                  <DeleteButton onDelete={deleteSaleRecode} id={sale.id}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}