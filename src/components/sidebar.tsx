"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CheckCircle2, Circle, BookOpen, GraduationCap } from "lucide-react"

import syllabus from "@/data/syllabus.json"

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12 h-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="space-y-4 py-6 h-full flex flex-col">
        <div className="px-6 py-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-lg font-bold tracking-tight">
              IR Systems
            </h2>
          </div>
          <p className="px-1 text-xs font-mono text-muted-foreground/70 uppercase tracking-widest">
            B22EQ0601 • Sem VI
          </p>
        </div>
        <div className="px-4 flex-1 overflow-auto py-2">
          <div className="mb-4">
            <h3 className="px-2 text-xs font-medium text-muted-foreground mb-2">QUICK LINKS</h3>
            <div className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start font-normal text-sm h-auto py-2 text-muted-foreground hover:text-foreground"
                asChild
              >
                <Link href="/lab">
                  <span className="text-lg leading-none mr-2">🧪</span>
                  <span>IR Models Lab</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start font-normal text-sm h-auto py-2 text-muted-foreground hover:text-foreground"
                asChild
              >
                <a href="https://scholar-sparkle-web.lovable.app/" target="_blank" rel="noopener noreferrer">
                  <span className="text-lg leading-none mr-2">👨‍🏫</span>
                  <span>Instructor</span>
                </a>
              </Button>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="px-2 text-xs font-medium text-muted-foreground mb-2">COURSE MODULES</h3>
            <Accordion type="single" collapsible className="w-full" defaultValue="unit-1">
              {syllabus.units.map((unit) => (
                <AccordionItem key={unit.id} value={unit.id} className="border-b-0 mb-1">
                  <AccordionTrigger className="text-sm font-medium hover:no-underline px-3 py-2 rounded-md hover:bg-secondary/50 data-[state=open]:bg-secondary/50 transition-all">
                    <span className="text-left leading-tight">{unit.id.toUpperCase()}: {unit.title.split(":")[0]}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-2">
                    <div className="space-y-0.5 ml-2 border-l border-primary/20 pl-2">
                      {unit.topics.map((topic) => {
                        const isActive = pathname === `/unit/${unit.id}/topic/${topic.id}`
                        return (
                          <Button
                            key={topic.id}
                            variant={isActive ? "secondary" : "ghost"}
                            size="sm"
                            className={cn(
                              "w-full justify-start font-normal text-sm h-auto py-2 whitespace-normal text-left mb-0.5",
                              isActive ? "bg-primary/10 text-primary hover:bg-primary/15" : "text-muted-foreground hover:text-foreground"
                            )}
                            asChild
                          >
                            <Link href={`/unit/${unit.id}/topic/${topic.id}`}>
                              {isActive ? (
                                <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2 shrink-0" />
                              ) : (
                                <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30 mr-2 shrink-0" />
                              )}
                              <span className="line-clamp-2">{topic.title}</span>
                            </Link>
                          </Button>
                        )
                      })}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start font-semibold text-sm text-primary/80 mt-2 hover:text-primary hover:bg-primary/5 py-2"
                        asChild
                      >
                        <Link href={`/unit/${unit.id}/assessment`}>
                          <div className="flex items-center gap-2">
                            <span className="text-lg leading-none">📝</span>
                            <span>Unit Assessment</span>
                          </div>
                        </Link>
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Footer of sidebar */}
        <div className="px-6 py-4 border-t bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground">System Online</span>
          </div>
        </div>
      </div>
    </div>
  )
}
