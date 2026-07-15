import { prisma } from "@/lib/prisma";
import SaleList from "@/components/SaleList";
export default async function Sales(){
    const salesRecode = await prisma.saleRecord.findMany({
        include:{crop:true}
    });
    const crops = await prisma.crop.findMany();
    return(
        <div>
            <SaleList salesRecode={salesRecode} crops={crops}/>
        </div>
    )
}