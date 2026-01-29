"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    CheckCircle, Lightbulb, HelpCircle,
    BookOpen, Layers, Terminal, Activity,
    ChevronRight, ArrowUpRight
} from "lucide-react"
import Link from "next/link"

interface Slide {
    slideNumber: number
    type: string
    title: string
    subtitle?: string
    content?: any
    items?: string[]
    questions?: string[]
}

interface TopicData {
    id: string
    title: string
    unitId: string
    slides: Slide[]
}

export function TopicViewer({ data }: { data: TopicData }) {
    // Generate Table of Contents
    const toc = data.slides.filter(s => s.type !== "title" && s.type !== "summary").map(s => ({
        id: `section-${s.slideNumber}`,
        title: s.title
    }))

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto p-4 lg:p-8 animate-in fade-in duration-700">
            {/* Main Content Column */}
            <div className="flex-1 space-y-12">

                {/* Topic Header */}
                <div className="space-y-4 pb-6 border-b">
                    <div className="flex items-center gap-2 text-primary font-medium">
                        <span className="p-1 px-3 rounded-full bg-primary/10 text-xs uppercase tracking-wider">
                            {data.unitId.replace("-", " ")}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-foreground/80">{data.title}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                        {data.title}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                        {data.slides[0]?.content?.text || "Explore the core concepts and methodologies in this comprehensive guide."}
                    </p>
                </div>

                {/* Render Sections */}
                <div className="space-y-16">
                    {data.slides.map((slide, index) => {
                        // Skip Title slide as it's used in header
                        if (slide.type === "title") return null;

                        return (
                            <section
                                key={index}
                                id={`section-${slide.slideNumber}`}
                                className="scroll-mt-24 group"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex items-center justify-center h-8 w-8 rounded-full border border-muted-foreground/30 text-xs font-mono text-muted-foreground">
                                        {slide.slideNumber}
                                    </div>
                                    <h2 className="text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                                        {slide.title}
                                    </h2>
                                </div>
                                <div className="pl-0 md:pl-12">
                                    <SlideContent slide={slide} />
                                </div>
                            </section>
                        )
                    })}
                </div>

                {/* Footer Navigation */}
                <div className="pt-12 border-t mt-12 flex justify-between items-center bg-muted/20 p-8 rounded-2xl">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Finished this topic?</p>
                        <h3 className="text-lg font-semibold">Ready for the next challenge?</h3>
                    </div>
                    <Button size="lg" className="rounded-full px-8" asChild>
                        <Link href="/">
                            Next Topic <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Sticky Table of Contents Sidebar */}
            <div className="hidden lg:block w-80 shrink-0">
                <div className="sticky top-24 p-6 rounded-xl border bg-card/50 backdrop-blur-sm">
                    <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                        On this page
                    </h4>
                    <nav className="space-y-1 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                        {toc.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => scrollToSection(item.id)}
                                className="block w-full text-left px-3 py-2 text-sm text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-md transition-all truncate"
                            >
                                {item.title}
                            </button>
                        ))}
                    </nav>
                    <Separator className="my-4" />
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                            <Activity className="h-4 w-4" />
                            <span>Estimated Time: 25 mins</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full justify-start text-xs rounded-full">
                            <BookOpen className="mr-2 h-3.5 w-3.5" /> Mark as Read
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Sub-component to render specific slide types
function SlideContent({ slide }: { slide: Slide }) {
    const { type, content, items, questions } = slide;

    switch (type) {
        case "list":
        case "grid":
            return (
                <div className="grid md:grid-cols-2 gap-4">
                    {items?.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 rounded-lg border bg-card/50 hover:bg-card hover:shadow-md transition-all">
                            <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                            <span className="text-foreground/90">{item}</span>
                        </div>
                    ))}
                </div>
            )

        case "exam":
        case "quiz":
            return (
                <div className="space-y-4">
                    {questions?.map((q, i) => (
                        <Card key={i} className="overflow-hidden border-orange-200/50 dark:border-orange-900/50">
                            <div className="bg-orange-50 m-1 md:m-1.5 p-4 rounded-md dark:bg-orange-950/20 flex gap-4">
                                <HelpCircle className="h-5 w-5 text-orange-600 mt-1 shrink-0" />
                                <div>
                                    <p className="font-medium text-foreground">{q}</p>
                                    <Button variant="ghost" size="sm" className="mt-3 text-orange-600 hover:text-orange-700 hover:bg-orange-100 flex items-center gap-1 p-0 h-auto font-normal">
                                        Show Answer <ChevronRight className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )

        case "project":
        case "activity":
        case "case_study":
            return (
                <Card className="bg-gradient-to-br from-blue-50/50 via-background to-background dark:from-blue-900/10 border-blue-100 dark:border-blue-900 overflow-hidden">
                    <CardContent className="p-6">
                        {content.description && <p className="mb-6 text-foreground/80 leading-relaxed">{content.description}</p>}

                        <div className="grid gap-6 md:grid-cols-2">
                            {content.problem && (
                                <div className="space-y-2">
                                    <h4 className="flex items-center gap-2 text-sm font-bold text-red-600 uppercase tracking-wide">
                                        <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div> Problem
                                    </h4>
                                    <p className="text-sm text-muted-foreground bg-background/50 p-3 rounded-md border">{content.problem}</p>
                                </div>
                            )}
                            {content.solution && (
                                <div className="space-y-2">
                                    <h4 className="flex items-center gap-2 text-sm font-bold text-green-600 uppercase tracking-wide">
                                        <div className="h-1.5 w-1.5 rounded-full bg-green-600"></div> Solution
                                    </h4>
                                    <p className="text-sm text-muted-foreground bg-background/50 p-3 rounded-md border">{content.solution}</p>
                                </div>
                            )}
                            {content.outcome && (
                                <div className="space-y-2 md:col-span-2">
                                    <h4 className="flex items-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-wide">
                                        <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div> Outcome
                                    </h4>
                                    <p className="text-sm text-muted-foreground bg-background/50 p-3 rounded-md border">{content.outcome}</p>
                                </div>
                            )}
                        </div>

                        {/* Specific fields for Projects */}
                        {content.idea && (
                            <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                                <h4 className="flex items-center gap-2 font-semibold text-primary mb-2">
                                    <Terminal className="h-4 w-4" /> Project Idea
                                </h4>
                                <p className="text-lg font-medium mb-4">{content.idea}</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                    <div className="bg-background p-3 rounded border">
                                        <span className="font-semibold text-muted-foreground block text-xs uppercase mb-1">Input</span>
                                        {content.input}
                                    </div>
                                    <div className="bg-background p-3 rounded border">
                                        <span className="font-semibold text-muted-foreground block text-xs uppercase mb-1">Process</span>
                                        {content.process}
                                    </div>
                                    <div className="bg-background p-3 rounded border">
                                        <span className="font-semibold text-muted-foreground block text-xs uppercase mb-1">Output</span>
                                        {content.output}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Specific field for Activity */}
                        {content.activity && (
                            <div className="mt-4 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30">
                                <h4 className="flex items-center gap-2 font-bold text-yellow-700 dark:text-yellow-500 mb-2">
                                    <Activity className="h-4 w-4" /> Activity
                                </h4>
                                <p className="text-foreground/90">{content.activity}</p>
                            </div>
                        )}

                    </CardContent>
                </Card>
            )

        case "diagram":
        case "illustration":
            return (
                <div className="my-8 flex flex-col items-center w-full">
                    {content.imageSrc ? (
                        <div className="flex flex-col items-center">
                            <div className="relative overflow-hidden rounded-2xl shadow-xl border-4 border-muted/20 bg-muted/5 w-full max-w-4xl">
                                <img
                                    src={content.imageSrc}
                                    alt={slide.title}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <p className="mt-4 text-sm font-medium text-muted-foreground bg-muted/30 px-4 py-2 rounded-full">
                                {(content.caption || content.description)}
                            </p>
                        </div>
                    ) : (
                        <div className="w-full max-w-5xl p-8 rounded-3xl border bg-muted/10 relative">
                            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                <Layers className="h-24 w-24" />
                            </div>

                            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8 text-center">{slide.title}</h4>

                            <div className="flex flex-wrap items-center justify-center gap-y-8 gap-x-4 px-4 relative z-10">
                                {content.steps?.map((step: string, i: number) => (
                                    <React.Fragment key={i}>
                                        <div className="bg-card border-2 border-primary/20 shadow-sm p-4 rounded-xl text-center w-full sm:w-[150px] transition-all hover:border-primary hover:shadow-md hover:-translate-y-1">
                                            <div className="text-[10px] font-black text-primary/40 mb-1 uppercase tracking-tighter">Step {i + 1}</div>
                                            <span className="text-xs font-bold leading-tight">{step}</span>
                                        </div>
                                        {i < (content.steps.length - 1) && (
                                            <div className="flex items-center justify-center text-primary/30 rotate-90 sm:rotate-0">
                                                <ChevronRight className="h-5 w-5" strokeWidth={3} />
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            {content.description && (
                                <p className="mt-10 text-center text-sm text-muted-foreground italic px-6 font-medium max-w-2xl mx-auto">
                                    "{content.description}"
                                </p>
                            )}
                        </div>
                    )}
                </div>
            )

        case "summary":
            return (
                <div className="bg-gradient-to-br from-primary/5 to-secondary/50 rounded-2xl p-8 border border-primary/10">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <CheckCircle className="h-6 w-6 text-primary" /> Key Takeaways
                    </h3>

                    <div className="space-y-6">
                        {content.linkage && (
                            <div>
                                <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">Context</h4>
                                <p className="text-lg leading-relaxed">{content.linkage}</p>
                            </div>
                        )}

                        <Separator />

                        <div className="grid md:grid-cols-2 gap-8">
                            {content.nextTopic && (
                                <div>
                                    <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">Next Up</h4>
                                    <div className="flex items-center gap-3 p-4 bg-background rounded-lg border">
                                        <ArrowUpRight className="h-5 w-5 text-primary" />
                                        <span className="font-medium">{content.nextTopic}</span>
                                    </div>
                                </div>
                            )}
                            {content.preparation && (
                                <div>
                                    <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">Preparation</h4>
                                    <div className="flex items-center gap-3 p-4 bg-background rounded-lg border">
                                        <BookOpen className="h-5 w-5 text-primary" />
                                        <span className="font-medium text-foreground/80">{content.preparation}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )

        default:
            // Standard text rendering
            return (
                <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
                    {content?.text && <p>{content.text}</p>}

                    {content?.hook && (
                        <div className="flex gap-4 p-5 bg-primary/5 rounded-xl border border-primary/10 items-start">
                            <Lightbulb className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                            <p className="italic text-foreground/80 font-medium font-serif text-xl">"{content.hook}"</p>
                        </div>
                    )}

                    {content?.definition && (
                        <div className="pl-6 border-l-4 border-primary py-2 my-6">
                            <h4 className="text-sm font-bold text-primary uppercase tracking-wide mb-1">Definition</h4>
                            <p className="text-xl font-medium italic text-foreground">
                                {content.definition}
                            </p>
                        </div>
                    )}

                    {/* Generic Key-Value rendering for miscellaneous fields */}
                    <div className="grid gap-4">
                        {Object.entries(content || {}).map(([key, value]) => {
                            if (["text", "hook", "items", "outcomes", "definition", "problem", "solution", "outcome", "idea", "input", "process", "output", "activity", "description", "questions", "caption", "imagePlaceholder", "steps", "linkage", "nextTopic", "preparation", "imageSrc"].includes(key)) return null;

                            return (
                                <div key={key} className="bg-muted/30 p-4 rounded-lg border">
                                    <span className="block text-xs font-bold uppercase text-muted-foreground mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                    {Array.isArray(value) ? (
                                        <ul className="list-disc pl-5 space-y-1">
                                            {value.map((v, i) => <li key={i} className="text-base">{v}</li>)}
                                        </ul>
                                    ) : (
                                        <span className="text-base font-medium">{String(value)}</span>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {content?.outcomes && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-xl border border-green-100 dark:border-green-900/50">
                            <h4 className="flex items-center gap-2 font-bold text-green-700 dark:text-green-400 mb-4">
                                <CheckCircle className="h-5 w-5" /> Learning Outcomes
                            </h4>
                            <ul className="grid sm:grid-cols-2 gap-3">
                                {content.outcomes.map((o: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                                        {o}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )
    }
}
