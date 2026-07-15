"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { WorkType } from "@/app/generated/prisma";
export type CreateWorkLogInput = {
  date: string;
  workType: WorkType;
  note: string;
  weather: string;
  quanitity: number | null;
  unit: string;
  duration: number | null;
  cropId: string,
  image: string| null
}
export default async function addWorkLog(input:CreateWorkLogInput){
    try{
        await prisma.workLog.create({
            data: {
              date: new Date(input.date),
              workType: input.workType,
              note: input.note,
              weather: input.weather,
              quantity: input.quanitity,  // ← quanitityに変更
              unit: input.unit,
              duration: input.duration,
              cropId: input.cropId,
              image: input.image
            }
          });
        revalidatePath("/mypage/worklogs");
        return {success:true}
    }catch(error){
        return{error:"日誌の追加に失敗しました"}

    }
}
export async function DeleteWorkLog(worklogId:string){
    try{
        await prisma.workLog.delete({
            where:{id:worklogId}
        });
        revalidatePath("/mypage/worklogs");
        return {success:true}
    }catch(error){
        return{error:"日誌の削除に失敗しました。"}
    }

}
export async function UpdateWorkLogs(workLogId:string,input:CreateWorkLogInput){
    try{
        await prisma.workLog.update({
            where:{id:workLogId},
            data:{
                date:new Date(input.date),
                workType:input.workType,
                note:input.note,
                weather:input.weather,
                quantity:input.quanitity,
                unit: input.unit,
                duration: input.duration,
                cropId: input.cropId,
                image:input.image
            }
        });
        revalidatePath("/mypage/worklogs");
        return  {success:true}
    }catch(error){
        return {error:"更新に失敗しました。"}
    }
}