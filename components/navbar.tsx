import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 flex h-14 items-center mx-auto">
        <Link 
          href="/" 
          title="Back to Home"
          aria-label="Back to Home"
          className="flex items-center space-x-2 font-geist-mono"
        >
          <span className="text-xl font-bold tracking-tight">
            MovieSearch
          </span>
        </Link>
      </div>
    </header>
  );
}; 