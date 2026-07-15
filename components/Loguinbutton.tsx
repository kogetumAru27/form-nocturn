"use client";
import { signIn,signOut,useSession } from "next-auth/react";
import Link from "next/link";
export default function LoguinButton(){
    const {data:session} = useSession();
    if(session){
        return(
            <div className="flex items-center gap-4">
            <p className="text-green-900">{session.user.name}さん</p>
            <Link href="/mypage" className="bg-yellow-600 text-white px-4 py-2 rounded-full hover:bg-yellow-700 transition">
              マイページ
            </Link>
        
                  <button onClick={() =>signOut({callbackUrl:"/"})} className="order border-gray-200 px-4 py-2 rounded-full hover:bg-gray-200 hover:text-black transition">ログアウト</button>  
            </div>
    )
}
return (
    <button onClick={() => signIn("google")} className="border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-200 hover:text-black transition">ログイン</button>
)
}