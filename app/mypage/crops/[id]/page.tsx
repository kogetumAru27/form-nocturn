import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
export default async function DetailCrops({params}:{params:Promise<{id:string}>}){
    const {id} = await params;
   const crop= await prisma.crop.findUnique({
        where:{id},
    });
    if(!crop) notFound();
    return(
        <div className="max-w-2xl mx-auto p-6">
            {crop.image && <img src={crop.image} alt={crop.name} className="w-full h-64 object-cover rounded-2xl mb-6"/>}
            <h1 className="text-3xl font-bold text-green-900 mb-2">{crop.name}の詳細</h1>
            <h2 className="text-lg text-gray-500 mb-2">作物の特徴、栽培法（コツなど）</h2>
            <p className="text-gray-700 leading-relaxed">{crop.description}</p>
        </div>
    );
}