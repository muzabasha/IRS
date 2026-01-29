import Link from "next/link"
import { Search, BookOpen, Menu, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "@/components/sidebar"

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center px-4">
                <div className="md:hidden mr-2">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-72">
                            <Sidebar className="w-full border-r-0" />
                        </SheetContent>
                    </Sheet>
                </div>
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <img src="/reva_logo.png" alt="REVA University" className="h-8 w-auto min-w-[32px]" />
                        <span className="hidden sm:inline-block font-bold border-l pl-3 ml-2 text-primary whitespace-nowrap">
                            IR Courseware
                        </span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
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
                        <div className="text-sm font-medium hidden sm:block whitespace-nowrap">
                            Dr. Syed Muzamil Basha
                        </div>
                        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold">SMB</span>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

