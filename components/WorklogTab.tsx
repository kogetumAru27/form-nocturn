"use client";
import { useState } from "react";
import { WorkType } from "@/app/generated/prisma";
import DeleteButton from  "@/components/DeleteButtons";
import { DeleteWorkLog, UpdateWorkLogs } from "@/actions/worklog";
import WorkLogForm from "./WorkLogForm";
const WorkTypeLabel: { [key: string]: string } = {
  SEEDING: "種まき",
  TRANSPLANT: "定植",
  WATERING: "水やり",
  FERTILIZING: "施肥",
  WEEDING: "草取り",
  PESTICIDE: "防除",
  HARVESTING: "収穫",
  OTHER: "その他",
}
type WorkLogData = {
  id: string,
  date: Date,
  workType: WorkType,
  cropName: string,
  note: string | null,
  image: string | null,
  weather:string | null,
  quantity:number | null,
  unit:string | null,
  duration:number | null,
  cropId:string
};
type Crop = {
  id: string;
  name: string;
}
export default function WorkLogTab({ works,crops }: { works: WorkLogData[],crops:Crop[] }) {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const filtered = works.filter(log =>
    new Date(log.date).getMonth() + 1 === selectedMonth
  );

  return (
    <div className="p-6">
      {/* 月タブ */}
      <div className="flex gap-2 flex-wrap mb-6">
        {months.map(month => (
          <button
            key={month}
            onClick={() => setSelectedMonth(month)}
            className={`px-4 py-2 rounded-full border transition ${
              selectedMonth === month
                ? "bg-green-700 text-white"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            {month}月
          </button>
        ))}
      </div>

      {/* 日誌カード */}
      {filtered.length === 0 ? (
        <p className="text-gray-500">この月の日誌はありません</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filtered.map(log => (
            <div key={log.id} className="border border-gray-200 shadow-md rounded-2xl p-4">
              {log.image && <img src={log.image} alt={log.cropName} className="w-full h-32 object-cover rounded-xl mb-3"/>}
              <p className="font-bold text-green-900">{log.cropName}</p>
              <p className="text-gray-500 text-sm">{WorkTypeLabel[log.workType]}</p>
              <p className="text-gray-500 text-sm">{log.weather}</p>
              <p className="text-gray-500 text-sm">{new Date(log.date).toLocaleDateString("ja-JP")}</p>
              {log.note && <p className="text-gray-400 text-sm mt-2 line-clamp-2">{log.note}</p>}
              <DeleteButton id={log.id} onDelete={DeleteWorkLog}/>
              <WorkLogForm   crops={crops}onSubmit={(input) => UpdateWorkLogs(log.id, input)} title="✏️編集" buttonLabel="変更" initialData={{
                date:new Date(log.date).toISOString().split("T")[0],
                workType: log.workType,
                note: log.note ?? "",
                weather: log.weather ?? "",
                quanitity: log.quantity ?? null,
                unit: log.unit ?? "",
                duration: log.duration ?? null,
                cropId: log.cropId,
                image: log.image ?? null,
              }}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}