import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { LayoutWrapper } from "@/components/layout-wrapper";

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
                    <LayoutWrapper>
                        {children}
                    </LayoutWrapper>
                </div>
            </body>
        </html>
    );
}
