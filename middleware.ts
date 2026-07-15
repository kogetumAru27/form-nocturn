import { getToken } from "next-auth/jwt";
import { NextRequest,NextResponse } from "next/server";
export default async function middleware(request:NextRequest){
    const token = await getToken({req:request});
    if(!token){
        if(request.nextUrl.pathname.startsWith("/mypage")){
            return NextResponse.redirect(new URL("/",request.url));
        }
    }
    return NextResponse.next();
}
export const config = {
    matcher: ["/mypage/:path*"]
}
