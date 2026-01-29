import Link from "next/link"
import { Search, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center px-4">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <img src="/reva_logo.png" alt="REVA University" className="h-8 w-auto" />
                        <span className="hidden font-bold sm:inline-block border-l pl-3 ml-2 text-primary">
                            IR Courseware
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">Dashboard</Link>
                        <Link href="/projects" className="transition-colors hover:text-foreground/80 text-foreground/60">Projects</Link>
                        <Link href="/analytics" className="transition-colors hover:text-foreground/80 text-foreground/60">Analytics</Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Search placeholder */}
                    </div>
                    <nav className="flex items-center gap-2">
                        <div className="text-sm font-medium hidden sm:block">
                            Dr. Syed Muzamil Basha
                        </div>
                        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                            <span className="text-xs font-bold">SMB</span>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}
