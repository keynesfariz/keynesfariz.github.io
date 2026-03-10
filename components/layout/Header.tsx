import Link from 'next/link';

export function Header() {
    return (
        <header className="flex items-center justify-between py-6 px-4 md:px-6 lg:px-8 max-w-4xl mx-auto w-full">
            <Link href="/" className="font-bold text-xl tracking-tighter hover:opacity-80 transition-opacity">
                fariz.me
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium">
                <Link href="/" className="hover:text-primary transition-colors">
                    Home
                </Link>
                <Link href="/about" className="hover:text-primary transition-colors">
                    About
                </Link>
                <Link href="/posts" className="hover:text-primary transition-colors">
                    Posts
                </Link>
            </nav>
        </header>
    );
}
