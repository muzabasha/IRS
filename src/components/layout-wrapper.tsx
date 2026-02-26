'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    // Load sidebar state from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('sidebar-open')
        if (saved !== null) {
            setSidebarOpen(JSON.parse(saved))
        }

        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Save sidebar state to localStorage
    const toggleSidebar = () => {
        const newState = !sidebarOpen
        setSidebarOpen(newState)
        localStorage.setItem('sidebar-open', JSON.stringify(newState))
    }

    return (
        <div className="flex-1 flex overflow-hidden h-[calc(100vh-3.5rem)] relative">
            {/* Sidebar Toggle Button */}
            <Button
                variant="outline"
                size="icon"
                className={cn(
                    "fixed top-20 z-50 shadow-lg transition-all duration-300",
                    sidebarOpen && !isMobile ? "left-[17rem]" : "left-4"
                )}
                onClick={toggleSidebar}
                title={sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
            >
                {sidebarOpen ? (
                    <PanelLeftClose className="h-4 w-4" />
                ) : (
                    <PanelLeftOpen className="h-4 w-4" />
                )}
            </Button>

            {/* Sidebar */}
            <div
                className={cn(
                    "transition-all duration-300 ease-in-out shrink-0 border-r",
                    isMobile ? "hidden" : "",
                    sidebarOpen ? "w-72 opacity-100" : "w-0 opacity-0 overflow-hidden"
                )}
            >
                <Sidebar className="w-72" />
            </div>

            {/* Main Content */}
            <main
                className={cn(
                    "flex-1 overflow-auto p-4 md:p-6 bg-secondary/10 transition-all duration-300"
                )}
            >
                {children}
            </main>
        </div>
    )
}
