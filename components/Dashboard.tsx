import { WorkType } from "@/app/generated/prisma";
import { Crop,CreateInvent } from "@/actions/inventory";
import ReadButton from "./ReadButton";
import markAsNotified from "@/actions/notification";
type workLog = {
    id:string,
    date:Date,
    workType:WorkType,
    crop:Crop
}
type Inventory = CreateInvent & {
    id:string
    crop:Crop
}
type notificationtype = {
  id:string,
  message:string,
  type:string
}
export default function Dashboard({recentWorklogs,inventories,notification}:{recentWorklogs:workLog[],inventories:Inventory[],notification:notificationtype[]}){
    return (
        <div className="p-6">
          <h2 className="text-xl font-bold text-green-900 mb-4">通知</h2>
          <div>
            {notification.length === 0?(<p>通知が見つかりませんでした</p>):(
              <div>
                {notification.map(n => (
                  <div key={n.id}  className="border border-yellow-300 bg-yellow-50 rounded-lg p-3 flex justify-between items-center">
                    <p>{n.message}</p>
                    <ReadButton id={n.id} onRead={markAsNotified}/>
                  </div>
                ))}
              </div>
            )}
          </div>
          <h2 className="text-xl font-bold text-green-900 mb-4">直近の作業</h2>
          <div className="space-y-2 mb-8">
            {recentWorklogs.map(log => (
              <div key={log.id} className="border border-gray-200 rounded-lg p-3">
                <p>{log.crop.name} - {log.workType}</p>
                <p className="text-sm text-gray-500">{new Date(log.date).toLocaleDateString("ja-JP")}</p>
              </div>
            ))}
          </div>
    
          <h2 className="text-xl font-bold text-green-900 mb-4">在庫サマリー</h2>
          <div className="grid grid-cols-3 gap-4">
            {inventories.map(inv => (
              <div key={inv.id} className="border border-gray-200 rounded-lg p-3">
                <p className="font-bold">{inv.crop.name}</p>
                <p>{inv.stock}{inv.unit}</p>
              </div>
            ))}
          </div>
        </div>
      );
}