
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET(){
    const lat = process.env.FARM_LATITUDE!
    const lng = process.env.FARM_LONGITUDE!;
    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weathercode,temperature_2m_max,precipitation_sum&timezone=Asia%2FTokyo`);
    const result = await weatherResponse.json();
    //console.log(result)  
    const tomorrowWeathercode = Number(result?.daily.weathercode[1]);
    const tomorrowTemp = Number(result?.daily.temperature_2m_max[1]);
    const tomorrowPrecipitation = Number(result?.daily.precipitation_sum[1]);
    console.log(tomorrowWeathercode,tomorrowTemp,tomorrowPrecipitation);
    const users = await prisma.user.findMany();
    let weatherMessage = `明日は降水量${tomorrowPrecipitation}mmの予報です。注意してください`;
    if (tomorrowWeathercode >= 95 || tomorrowPrecipitation > 50) {
        weatherMessage = "明日は台風・大雨の可能性があります。屋外作業は十分注意してください";
      }
    if(tomorrowPrecipitation > 20){
        for(const user of users){
        try{
            await prisma.notification.create({
                data:{
                  type:"WEATHER",
                  message:weatherMessage,
                  userId:user.id,
                  isNotified:false
                }
            })
        }catch(error){
           console.log("通知の作成に失敗しました.",error)
        }
    }
    }
    const month = new Date().getMonth() + 1;
    const dayWeek = new Date().getDay();
    if(dayWeek === 1 && month >= 6 && 9 >= month){
        for(const user of users){
            try{
                await prisma.notification.create({
                    data:{
                        userId:user.id,
                        message:"今週も害虫の発生に注意してください。葉の裏まで確認しましょう",
                        isNotified:false,
                        type:"PEST"
                    }
                })
            }catch(error){
                console.log("通知作成に失敗しました。",error);
            }
        }
    }
    if(tomorrowTemp > 33){
        for(const user of users){
            try{
                await prisma.notification.create({
                    data:{
                        type:"TEMPERATURE",
                        userId:user.id,
                        isNotified:false,
                        message:`明日は最高気温${tomorrowTemp}度の予報です。水分補給をしっかりしてください`
                    }
                })
            }catch(error){
                console.log("メールの作成に失敗しました。",error)
            }
        }
    }
    const lowStock = await prisma.inventory.findMany({
        where:{stock:{lt:10}},
        include:{crop:true}
    });
    if(lowStock.length > 0){
        const cropName = lowStock.map(inv => inv.crop.name).join("・");
        for(const user of users){
            try{
                await prisma.notification.create({
                    data:{
                        userId:user.id,
                        type:"OTHER",
                        isNotified:false,
                        message:`在庫が少なくなっています。${cropName}`
                    }
                })
            }catch(error){
                console.log("通知の作成に失敗しました。",error)
            }
        }
    }
    return NextResponse.json({ok:true});  
    
}