import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {

  // Get the cookies from the request headers
  //const cookies = req.headers.get('cookie');
  const path = req.nextUrl.pathname;
  console.log("Request:", req)
  
  // If no cookies exist, return the response to continue
  // if (!cookies) {
  //   return NextResponse.next();
  // }

  // // Check if any cookie starts with 'CognitoIdentityServiceProvider'
  // const cognitoCookies = cookies.split(';').some(cookie => 
  //   cookie.trim().startsWith('CognitoIdentityServiceProvider')
  // );

  // // If a Cognito cookie is found, redirect to the home page
  // if (cognitoCookies) {
  //   return NextResponse.redirect(new URL('/chat/new', req.url));
  // }

  // Redirect all users who try to access /chat to /chat/new
  if (path === '/chat') {
    return NextResponse.redirect(new URL('/chat/new', req.url))
  }

  // If no Cognito cookies are found, continue the request
  return NextResponse.next();
}

//Restrict middleware to /login route
export const config = {
    matcher: ['/chat'],  // Apply middleware only to the /login route
    //matcher: ['/login', '/register', '/chat'], 
};