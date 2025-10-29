import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          res.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect /field/* routes
  if (req.nextUrl.pathname.startsWith('/field/') && !session) {
    return NextResponse.redirect(new URL('/welcome', req.url));
  }

  // Protect /settings route
  if (req.nextUrl.pathname.startsWith('/settings') && !session) {
    return NextResponse.redirect(new URL('/welcome', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/field/:path*', '/settings'],
};
