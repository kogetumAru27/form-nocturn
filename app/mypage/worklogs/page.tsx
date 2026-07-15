import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import WorkLogTab from "@/components/WorklogTab";
import WorkLogForm from "@/components/WorkLogForm";
import addWorkLog from "@/actions/worklog";
export default async function WorkLog(){
    const session = await getServerSession(authOptions);
    if(!session) return <p>ログインしてください</p>
    const works = await prisma.workLog.findMany({
        include:{crop:true}
    });
    const workLogData = works.map(log => ({
        id: log.id,
        date: log.date,
        image:log.image,
        workType: log.workType,
        cropName: log.crop.name,
        note: log.note,
        weather:log.weather,
        quantity:log.quantity,
        unit:log.unit,
        duration:log.duration,
        cropId:log.cropId
      }));
      const crops = await prisma.crop.findMany();
    return(
        <div className="p-6">
            <WorkLogForm crops={crops} onSubmit={addWorkLog} title="+追加" buttonLabel="追加"/>
            <WorkLogTab works={workLogData} crops={crops}/>
        </div>
    );
}