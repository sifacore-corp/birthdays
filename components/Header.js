
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from 'next-auth/react';

const Header = () => {
  const router = useRouter();
  const isActive = (pathname) => router.pathname === pathname;
  const { data: session, status } = useSession();

  let left;
  let right;

  if (status === 'loading') {
    right = <p>"Validating Session"</p>
    left = "Feed"
  }

  if (session) {
    left = <Link href="/" className="bold" data-active={isActive('/')}>{left}</Link>;
    right = (<><p>{session.user.name} ({session.user.email})</p>
      <Link href="/create">
        <button>
          New post
        </button>
      </Link>
      <button onClick={() => signOut()}> <a>Log out</a></button>
    </>)
  } else {
    right = (<Link href="/api/auth/signin" data-active={isActive('/signup')}>Log in</Link>)
  }

  return (
    <nav>
      <div className="left">{left}</div>
      <div className="right">{right}</div>
    </nav>
  )

}

export default Header
