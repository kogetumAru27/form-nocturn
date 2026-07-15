import { prisma } from "@/lib/prisma";
import MypageTabs from "@/components/MypageTab";
import InventoryList from "@/components/InventoryList";
import Dashboard from "@/components/Dashboard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export default async function Mypage(){
  const session = await getServerSession(authOptions);
  if (!session) return <p>ログインしてください</p>;
   const inventories= await prisma.inventory.findMany({
    include:{crop:true}
   });
   const crops = await prisma.crop.findMany();
   const recentWorklogs= await prisma.workLog.findMany({
    include:{crop:true},
    orderBy:{date:"desc"},
    take:5
   });
   const notification = await prisma.notification.findMany({
    where:{userId:session.user.id!,isNotified:false},
    orderBy:{createdAt:"desc"}
   })
   return(
      <MypageTabs dashboardContent = {
        <div>
          <Dashboard recentWorklogs={recentWorklogs} inventories={inventories} notification={notification}/>
        </div>
      }
      inventoryContent={
        <div>
        <InventoryList inventories={inventories} crops={crops}/>
      </div>
      }
      />
   )
}
  

  
  