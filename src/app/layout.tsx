import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { SiteHeader } from "@/components/site-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Information Retrieval Systems - Academic Suite",
    description: "B22EQ0601 Information Retrieval Course Application",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex min-h-screen flex-col bg-background">
                    <SiteHeader />
                    <div className="flex-1 flex overflow-hidden h-[calc(100vh-3.5rem)]">
                        <Sidebar className="hidden md:block w-72 shrink-0 border-r" />
                        <main className="flex-1 overflow-auto p-6 bg-secondary/10">
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}
