import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

const PublicUrl = ["/connexion", "/inscription",];

async function authenticate(): Promise<boolean> {
  if (!cookies().has("token") || !cookies().has("email")) {
    return false;
  }

  const token = cookies().get("token")?.value;
  const email = cookies().get("email")?.value;

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/isTokenValid`,
      { email, token },
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const params = request.nextUrl.searchParams
  const isPublicUrl = PublicUrl.includes(path);
  const isAuthenticated = await authenticate();

  if(params.has("email") && params.has("code") && isAuthenticated){
    if(params.get("email") === cookies().get("email")?.value){
      return NextResponse.next()    
    }
    return NextResponse.redirect(new URL("/connexion",request.url))
  }
    
  if (isAuthenticated && !isPublicUrl)  {
    return NextResponse.next();
  } 
  else  if (isPublicUrl) {
      if(isAuthenticated){
        if(cookies().get("role")?.value === "PERSONNEL")
            return NextResponse.redirect(new URL(`/ticket/${cookies().get("id")?.value}/${cookies().get("poste")?.value ==="Agent" ?"niveau1" : cookies().get("poste")?.value === "DirecteurES" ? "niveau2": 
              cookies().get("poste")?.value ==="Opérateur"? "niveau4":"niveau3"}`, request.url));
        return NextResponse.redirect(new URL("/home", request.url));
      } else {
        return NextResponse.next();
      }
  }

  return NextResponse.redirect(new URL("/connexion", request.url));
}


export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}