"use client";
import { Crop,CreateInvent } from "@/actions/inventory";
import { UpdateInventory,DeleteInventory } from "@/actions/inventory";
import CreateInventory from "@/actions/inventory";
import InventoryForm from "./InventoryForm";
import DeleteButton from "./DeleteButtons";
type Inventories = CreateInvent & {
    id:string,//ここのidはkeyのidを指定している
    crop:Crop//中身を再利用importして
}
export default function InventoryList({crops,inventories}:{crops:Crop[],inventories:Inventories[]}){
    return (
        <div className="p-6">
          <div className="mb-6">
            <InventoryForm
              crops={crops}
              onSubmit={CreateInventory}
              title="+追加"
              buttonLabel="追加"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {inventories.map(inv => (
              <div key={inv.id} className="border border-gray-200 shadow-md rounded-2xl p-4 flex flex-col gap-2">
                <p className="text-xl font-bold text-green-900">{inv.crop.name}</p>
                <p className="text-gray-500">{inv.stock} {inv.unit}</p>
                <p className="text-gray-500">{inv.price}円</p>
                <InventoryForm
                  crops={crops}
                  initialData={{ stock: inv.stock, unit: inv.unit, cropId: inv.cropId ,price:inv.price}}
                  onSubmit={(input) => UpdateInventory(inv.id, input)}
                  title="✏️編集"
                  buttonLabel="変更"
                />
                <DeleteButton id={inv.id} onDelete={DeleteInventory}/>
              </div>
            ))}
          </div>
        </div>
      );
}