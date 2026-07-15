import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AddCropModal from "@/components/CropModal";
import DeleteButton from "@/components/CropCard";
import UpdateButton from "@/components/EditCropModal";
import Link from "next/link";
export default async function Crops(){
    const session = await getServerSession(authOptions);
    if(!session) return <p>ログインしてください</p>;
    const crops = await prisma.crop.findMany();
    return (
        <div>
          <div className="p-6">
            <AddCropModal />
          </div>
          <div className="grid grid-cols-3 gap-4 p-6">
            {crops.map(crop => (
              <div key={crop.id} className="border border-gray-200 shadow-md rounded-2xl p-4 cursor-pointer hover:shadow-xl transition-all duration-300">
                <Link href={`/mypage/crops/${crop.id}`}>
                {crop.image && <img src={crop.image} alt={crop.name} className="w-full h-40 object-cover rounded-xl mb-4"/>}
                <p className="text-xl font-bold text-green-900">{crop.name}</p>
                <p className="text-gray-500 text-sm line-clamp-2">{crop.description}</p>
                </Link>
                <div className="flex gap-2 mt-4">
                <DeleteButton id={crop.id}/>
                <UpdateButton crop={crop}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}