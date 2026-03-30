"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, CheckCircle2, ChevronRight, HelpCircle, Lightbulb, ListChecks, Target, Activity, Sparkles } from "lucide-react"
import questionBankData from "@/data/question-bank.json"
import 'katex/dist/katex.min.css'
import katex from 'katex'

export function QuestionBank() {
  const renderTextWithMath = (text: string) => {
    if (!text) return null;
    
    // Split by $ to find math blocks
    const parts = text.split(/(\$.*?\$)/g);
    
    return parts.map((part, i) => {
      if (part.startsWith('$') && part.endsWith('$')) {
        const formula = part.slice(1, -1);
        try {
          return (
            <span 
              key={i} 
              dangerouslySetInnerHTML={{ 
                __html: katex.renderToString(formula, { throwOnError: false, displayMode: false }) 
              }} 
            />
          );
        } catch (e) {
          return <span key={i}>{part}</span>;
        }
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
           <div className="h-10 w-10 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
             <ListChecks className="h-5 w-5" />
           </div>
           <h2 className="text-3xl font-bold tracking-tight text-foreground">HOT Question Bank</h2>
        </div>
        <p className="text-muted-foreground text-lg ml-12">
          Master the curriculum with Higher Order Thinking (HOT) assessments designed for deep cognitive engagement.
        </p>
      </div>

      <div className="grid gap-6">
        {[
          { id: "unit1", title: "Unit 1: Introduction to Information Retrieval & Modeling" },
          { id: "unit2", title: "Unit 2: Query Languages and Query Operations" },
          { id: "unit3", title: "Unit 3: User Interfaces and Visualization" },
          { id: "unit4", title: "Unit 4: Multimedia IR & Web Search" },
        ].map((unit) => (
          <Card key={unit.id} className="border-none shadow-lg bg-card/60 backdrop-blur-md overflow-hidden group transition-all hover:shadow-xl hover:translate-y-[-2px]">
            <CardHeader className="border-b bg-linear-to-r from-primary/5 via-transparent to-transparent">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">{unit.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-primary" />
                      10 Higher Order Thinking Questions • 100 Marks Total
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-semibold px-3 py-1">
                    100 Marks
                  </Badge>
                  <Button variant="outline" size="sm" className="hidden sm:flex h-9 rounded-xl border-primary/20 text-primary hover:bg-primary/5">
                    Download PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {(questionBankData as any)[unit.id].map((q: any, index: number) => (
                  <AccordionItem key={q.id} value={q.id} className="border-b last:border-0 px-6 hover:bg-muted/30 transition-colors">
                    <AccordionTrigger className="hover:no-underline py-6">
                      <div className="flex items-start gap-4 text-left w-full">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted text-sm font-bold text-muted-foreground mt-0.5 group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground transition-all">
                          {index + 1}
                        </div>
                        <div className="space-y-2 flex-1">
                          <p className="font-semibold text-foreground text-base leading-snug">{renderTextWithMath(q.question)}</p>
                          <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/5 text-primary text-[10px] uppercase font-bold tracking-wider border border-primary/10">
                              <Target className="h-3 w-3" />
                              10 Marks
                            </div>
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/5 text-orange-600 text-[10px] uppercase font-bold tracking-wider border border-orange-500/10">
                              <Sparkles className="h-3 w-3" />
                              HOT Question
                            </div>
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/5 text-blue-600 text-[10px] uppercase font-bold tracking-wider border border-blue-500/10 whitespace-nowrap">
                              <Activity className="h-3 w-3" />
                              Bloom&apos;s Level 4-6
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-8 pt-2">
                       <div className="ml-13 grid gap-6 lg:grid-cols-12 max-w-5xl">
                          {/* Scheme of Valuation */}
                          <div className="lg:col-span-4 space-y-4 rounded-3xl bg-linear-to-br from-indigo-500/5 to-primary/5 p-6 border border-primary/10 shadow-sm">
                            <div className="flex items-center gap-2.5 text-indigo-600 font-bold bg-white/50 dark:bg-black/20 w-fit px-4 py-2 rounded-2xl border border-indigo-500/10">
                              <ListChecks className="h-5 w-5" />
                              <h4 className="text-sm uppercase tracking-wide">Scheme of Valuation</h4>
                            </div>
                            <div className="space-y-4">
                               {q.scheme.map((item: string, i: number) => (
                                 <div key={i} className="flex items-start gap-3 group/item">
                                   <div className="h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform">
                                      <CheckCircle2 className="h-3 w-3 text-indigo-600" />
                                   </div>
                                   <p className="text-sm text-muted-foreground/90 font-medium leading-relaxed">
                                     {item}
                                   </p>
                                 </div>
                               ))}
                            </div>
                          </div>

                          {/* Detailed Solution */}
                          <div className="lg:col-span-8 space-y-4 rounded-3xl bg-linear-to-br from-emerald-500/5 to-teal-500/5 p-6 border border-emerald-500/10 shadow-sm relative overflow-hidden">
                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 h-32 w-32 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16" />

                            <div className="flex items-center gap-2.5 text-emerald-600 font-bold bg-white/50 dark:bg-black/20 w-fit px-4 py-2 rounded-2xl border border-emerald-500/10 relative z-10">
                              <Lightbulb className="h-5 w-5" />
                              <h4 className="text-sm uppercase tracking-wide">Detailed Solution</h4>
                            </div>
                            <div className="text-base text-muted-foreground leading-relaxed relative z-10 pl-2 border-l-2 border-emerald-500/20 italic font-medium">
                            {renderTextWithMath(q.solution)}
                            </div>
                            <div className="pt-4 flex flex-wrap gap-3 items-center justify-between relative z-10">
                               <p className="text-[10px] text-muted-foreground font-mono">Solution verified by Academic Board • B22EQ0601</p>
                               <Button variant="secondary" size="sm" className="rounded-xl h-9 px-5 bg-emerald-500 text-white hover:bg-emerald-600 border-none shadow-md shadow-emerald-500/20">
                                 View Step-by-Step Algorithm <ChevronRight className="ml-2 h-4 w-4" />
                               </Button>
                            </div>
                          </div>
                       </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


