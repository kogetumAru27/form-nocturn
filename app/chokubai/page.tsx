import { prisma } from "@/lib/prisma";
export default  async function Chokubai(){
    const choku = await prisma.inventory.findMany({
        include:{crop:true}
    });
    return(
        <div className="max-w-5xl mx-auto p-6">
          <h1 className="text-3xl font-bold text-green-900 mb-8">直売所</h1>
          <div className="grid grid-cols-3 gap-6">
            {choku.map(c => (
              <div key={c.id} className="border border-gray-200 shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition">
                {c.crop.image && (
                  <img 
                    src={c.crop.image} 
                    alt={c.crop.name} 
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <p className="text-xl font-bold text-green-900">{c.crop.name}</p>
                  <p className="text-gray-700 mt-2">¥{c.price?.toLocaleString() ?? "-"} / {c.unit}</p>
                  <p className="text-sm text-gray-500 mt-1">在庫:{c.stock}{c.unit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
}