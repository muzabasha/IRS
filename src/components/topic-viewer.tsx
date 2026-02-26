"use client"

import * as React from "react"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    CheckCircle, Lightbulb, HelpCircle,
    BookOpen, Layers, Terminal, Activity,
    ChevronRight, ArrowUpRight, PlayCircle, Eye, EyeOff
} from "lucide-react"
import Link from "next/link"
import 'katex/dist/katex.min.css'
import katex from 'katex'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Slide {
    slideNumber: number
    type: string
    title: string
    subtitle?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content?: any
    items?: string[]
    questions?: string[]
    answers?: string[]
    formula?: {
        equation: string
        description?: string
        terms: Array<{
            symbol: string
            meaning: string
        }>
        calculation?: {
            exampleTitle?: string
            description?: string
            steps: Array<{
                label: string
                formula?: string
                result?: string
                note?: string
            }>
            input?: string
            output?: string
        }
    }
    subTopics?: SubTopic[]  // New: Support for hierarchical organization
}

interface SubTopic {
    title: string
    content: string | string[]
    type?: 'text' | 'list' | 'code' | 'example'
    subSubTopics?: SubSubTopic[]
}

interface SubSubTopic {
    title: string
    content: string | string[]
    type?: 'text' | 'list' | 'code' | 'example'
    keyPoints?: string[]
    examples?: string[]
}


interface TopicData {
    id: string
    title: string
    unitId: string
    slides: Slide[]
}

export function TopicViewer({ data }: { data: TopicData }) {
    const [isRead, setIsRead] = useState(false);
    const [isTocVisible, setIsTocVisible] = useState(true);

    // Load read status from localStorage
    React.useEffect(() => {
        const saved = localStorage.getItem(`read-${data.id}`);
        if (saved === 'true') setIsRead(true);

        // Load TOC visibility preference
        const tocVisible = localStorage.getItem('toc-visible');
        if (tocVisible !== null) setIsTocVisible(tocVisible === 'true');
    }, [data.id]);

    const toggleRead = () => {
        const nextState = !isRead;
        setIsRead(nextState);
        localStorage.setItem(`read-${data.id}`, String(nextState));
    };

    const toggleToc = () => {
        const nextState = !isTocVisible;
        setIsTocVisible(nextState);
        localStorage.setItem('toc-visible', String(nextState));
    };

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
            {/* Main Content Column - Dynamic width based on TOC visibility */}
            <div className={`space-y-12 transition-all duration-300 ease-in-out ${isTocVisible ? 'flex-1' : 'w-full max-w-5xl mx-auto'
                }`}>

                {/* Topic Header - Dynamic styling based on TOC visibility */}
                <div className={`space-y-4 pb-6 border-b transition-all duration-300 ${!isTocVisible ? 'max-w-4xl' : ''
                    }`}>
                    <div className="flex items-center gap-2 text-primary font-medium">
                        <span className="p-1 px-3 rounded-full bg-primary/10 text-xs uppercase tracking-wider">
                            {data.unitId.replace("-", " ")}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-foreground/80">{data.title}</span>
                    </div>
                    <h1 className={`font-bold tracking-tight text-foreground transition-all duration-300 ${!isTocVisible ? 'text-5xl md:text-6xl' : 'text-4xl md:text-5xl'
                        }`}>
                        {data.title}
                    </h1>
                    <p className={`text-muted-foreground leading-relaxed transition-all duration-300 ${!isTocVisible ? 'text-2xl max-w-4xl' : 'text-xl max-w-3xl'
                        }`}>
                        {data.slides[0]?.content?.text || "Explore the core concepts and methodologies in this comprehensive guide."}
                    </p>
                </div>

                {/* Render Sections - Dynamic styling based on TOC visibility */}
                <div className={`space-y-16 transition-all duration-300 ${!isTocVisible ? 'max-w-4xl' : ''
                    }`}>
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
                                    <div className={`flex items-center justify-center rounded-full border border-muted-foreground/30 text-xs font-mono text-muted-foreground transition-all duration-300 ${!isTocVisible ? 'h-10 w-10' : 'h-8 w-8'
                                        }`}>
                                        {slide.slideNumber}
                                    </div>
                                    <h2 className={`font-semibold tracking-tight group-hover:text-primary transition-all duration-300 ${!isTocVisible ? 'text-3xl' : 'text-2xl'
                                        }`}>
                                        {slide.title}
                                    </h2>
                                </div>
                                <div className={`transition-all duration-300 ${!isTocVisible ? 'pl-0 md:pl-14 text-lg' : 'pl-0 md:pl-12'
                                    }`}>
                                    <SlideContent slide={slide} isTocVisible={isTocVisible} />
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

            {/* Sticky Table of Contents Sidebar with Toggle - Dynamic width */}
            <div className={`hidden lg:block shrink-0 transition-all duration-300 ease-in-out ${isTocVisible ? 'w-80' : 'w-auto'
                }`}>
                <div className="sticky top-24">
                    {/* Toggle Button */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleToc}
                        className="mb-3 w-full justify-between rounded-lg"
                    >
                        <span className="text-sm font-medium">On this page</span>
                        {isTocVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>

                    {/* Collapsible TOC Content */}
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isTocVisible ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                            }`}
                    >
                        <div className="p-6 rounded-xl border bg-card/50 backdrop-blur-sm">
                            <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
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
                                <Button
                                    variant={isRead ? "default" : "outline"}
                                    size="sm"
                                    className={`w-full justify-start text-xs rounded-full transition-all ${isRead ? 'bg-green-600 hover:bg-green-700' : ''}`}
                                    onClick={toggleRead}
                                >
                                    {isRead ? (
                                        <><CheckCircle className="mr-2 h-3.5 w-3.5" /> Completed</>
                                    ) : (
                                        <><BookOpen className="mr-2 h-3.5 w-3.5" /> Mark as Read</>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Sub-component to render specific slide types
function SlideContent({ slide, isTocVisible = true }: { slide: Slide, isTocVisible?: boolean }) {
    const { type, content, items, questions, answers } = slide;
    const [showAnswer, setShowAnswer] = useState<Record<number, boolean>>({});
    const [copied, setCopied] = useState(false);

    const toggleAnswer = (idx: number) => {
        setShowAnswer(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Helper to get answer from either slide root or content object
    const getAnswer = (idx: number) => {
        if (answers && answers[idx]) return answers[idx];
        if (content?.answers && content.answers[idx]) return content.answers[idx];
        return null;
    };

    switch (type) {
        case "research_perspective":
            return (
                <div className="space-y-10">
                    <Card className="bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950 border-4 border-indigo-600 dark:border-indigo-400 text-slate-900 dark:text-slate-100 overflow-hidden shadow-2xl">
                        <div className="p-8 border-b-4 border-indigo-600 dark:border-indigo-400 bg-indigo-600 dark:bg-indigo-500 text-white">
                            <h3 className="text-3xl font-black flex items-center gap-3 uppercase tracking-wide">
                                <BookOpen className="h-8 w-8" /> 🔬 Research Front: Advanced Inquiries
                            </h3>
                            <p className="text-xl font-semibold mt-3">PhD & Postgraduate Level Theoretical Perspectives</p>
                        </div>
                        <CardContent className="p-10 space-y-12">
                            {content?.researchQuestions && content.researchQuestions.map((rq: { question: string, answer: string }, i: number) => (
                                <div key={i} className="space-y-6 bg-white dark:bg-slate-800 p-8 rounded-2xl border-2 border-indigo-300 dark:border-indigo-700 shadow-lg">
                                    <div className="flex gap-6">
                                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shrink-0 border-4 border-indigo-300 dark:border-indigo-600 text-white font-black text-2xl shadow-xl">
                                            Q{i + 1}
                                        </div>
                                        <h4 className="text-2xl font-bold leading-relaxed">
                                            {rq.question}
                                        </h4>
                                    </div>
                                    <div className="pl-22 bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-xl border-2 border-indigo-200 dark:border-indigo-700">
                                        <p className="text-xl font-semibold leading-relaxed">
                                            {rq.answer}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {content?.mathematicalModeling && (
                        <div className="p-10 rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 border-4 border-blue-600 dark:border-blue-400 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                                <Terminal className="h-40 w-40" />
                            </div>

                            <h4 className="text-2xl font-black uppercase tracking-wider text-blue-900 dark:text-blue-100 mb-10 border-b-4 border-blue-600 dark:border-blue-400 pb-6 bg-blue-100 dark:bg-blue-900/30 -mx-10 -mt-10 px-10 pt-10">
                                📐 Mathematical Modeling & Interpretative Derivation
                            </h4>

                            <div className="space-y-10 relative z-10">
                                <div className="space-y-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border-2 border-blue-300 dark:border-blue-700 shadow-lg">
                                    <span className="text-sm font-black text-blue-700 dark:text-blue-300 uppercase tracking-widest bg-blue-100 dark:bg-blue-900/50 px-4 py-2 rounded-full inline-block">Problem Statement</span>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 leading-relaxed">{content.mathematicalModeling.problemStatement}</p>
                                </div>

                                <div className="space-y-8">
                                    <span className="text-sm font-black text-blue-700 dark:text-blue-300 uppercase tracking-widest bg-blue-100 dark:bg-blue-900/50 px-4 py-2 rounded-full inline-block">Derivation Path</span>
                                    {content.mathematicalModeling.derivation.map((step: { step: string, equation?: string, interpretation: string }, idx: number) => (
                                        <div key={idx} className="flex gap-8 items-start group">
                                            <div className="flex flex-col items-center">
                                                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 border-4 border-blue-300 dark:border-blue-600 flex items-center justify-center text-white text-2xl font-black shrink-0 shadow-xl group-hover:scale-110 transition-transform">
                                                    {idx + 1}
                                                </div>
                                                {idx < content.mathematicalModeling.derivation.length - 1 && (
                                                    <div className="w-1 h-16 bg-gradient-to-b from-blue-500 to-blue-300 dark:from-blue-400 dark:to-blue-600 rounded-full my-2" />
                                                )}
                                            </div>
                                            <div className="space-y-6 flex-1">
                                                <p className="text-xl font-bold text-slate-900 dark:text-slate-100 leading-relaxed bg-white dark:bg-slate-800 p-5 rounded-xl border-2 border-blue-200 dark:border-blue-800 shadow-md">{step.step}</p>
                                                {step.equation && (
                                                    <div
                                                        className="my-4 p-8 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950 rounded-2xl border-4 border-amber-400 dark:border-amber-600 overflow-x-auto text-center shadow-xl"
                                                        style={{ fontSize: '1.8rem' }}
                                                        dangerouslySetInnerHTML={{
                                                            __html: katex.renderToString(step.equation, {
                                                                throwOnError: false,
                                                                displayMode: true
                                                            })
                                                        }}
                                                    />
                                                )}
                                                <div className="bg-blue-50 dark:bg-blue-900/30 p-5 rounded-xl border-2 border-blue-200 dark:border-blue-700">
                                                    <p className="text-lg text-slate-800 dark:text-slate-200 leading-relaxed">
                                                        <span className="font-black text-blue-700 dark:text-blue-300 mr-3 text-xl">💡 Interpretation:</span>
                                                        <span className="font-semibold">{step.interpretation}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-8 border-t-4 border-green-500 dark:border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-8 rounded-2xl shadow-xl">
                                    <div className="flex items-center gap-4 mb-6">
                                        <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                                        <span className="text-xl font-black text-green-700 dark:text-green-300 uppercase tracking-wider">✓ Solution Synthesis</span>
                                    </div>
                                    <p className="text-2xl text-slate-900 dark:text-slate-100 font-bold leading-relaxed">
                                        {content.mathematicalModeling.conclusion}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )

        case "python_demo":
            return (
                <Card className="overflow-hidden border-blue-500/20 bg-slate-950 text-slate-50 shadow-2xl transition-all hover:shadow-blue-500/5 group/card">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1.5 mr-2">
                                <div className="h-3 w-3 rounded-full bg-red-500/40 group-hover/card:bg-red-500/70 transition-colors" />
                                <div className="h-3 w-3 rounded-full bg-amber-500/40 group-hover/card:bg-amber-500/70 transition-colors" />
                                <div className="h-3 w-3 rounded-full bg-emerald-500/40 group-hover/card:bg-emerald-500/70 transition-colors" />
                            </div>
                            <Terminal className="h-4 w-4 text-blue-400" />
                            <span className="text-sm font-mono font-bold text-blue-300">implementation.py</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-[10px] text-slate-400 hover:text-white hover:bg-white/10"
                                onClick={() => copyToClipboard(content.code)}
                            >
                                {copied ? (
                                    <><CheckCircle className="h-3 w-3 mr-1 text-emerald-400" /> Copied</>
                                ) : (
                                    <><Terminal className="h-3 w-3 mr-1" /> Copy Code</>
                                )}
                            </Button>
                            <Badge variant="outline" className="text-[10px] border-blue-500/30 text-blue-400/80 bg-blue-500/5 hidden sm:flex">
                                Python 3.10+
                            </Badge>
                        </div>
                    </div>
                    <CardContent className="p-0">
                        <div className="relative group">
                            <SyntaxHighlighter
                                language="python"
                                style={vscDarkPlus}
                                customStyle={{
                                    margin: 0,
                                    padding: '2rem',
                                    fontSize: '0.95rem',
                                    backgroundColor: 'transparent',
                                    lineHeight: '1.6'
                                }}
                                showLineNumbers={true}
                                lineNumberStyle={{ minWidth: '3em', paddingRight: '1em', color: '#4b5563', textAlign: 'right' }}
                            >
                                {content.code}
                            </SyntaxHighlighter>
                        </div>

                        <div className="grid md:grid-cols-2 border-t border-white/10 bg-white/[0.01]">
                            <div className="p-6 border-b md:border-b-0 md:border-r border-white/10 space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-slate-600" /> Sample Input
                                </h4>
                                <pre className="text-xs font-mono text-slate-400 bg-black/40 p-4 rounded-xl border border-white/5 overflow-x-auto leading-relaxed">
                                    {content.input}
                                </pre>
                            </div>
                            <div className="p-6 space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Execution Output
                                </h4>
                                <pre className="text-xs font-mono text-blue-300/90 bg-blue-500/5 p-4 rounded-xl border border-blue-500/10 overflow-x-auto leading-relaxed">
                                    {content.output}
                                </pre>
                            </div>
                        </div>

                        {content.interpretation && (
                            <div className="p-8 bg-linear-to-br from-blue-500/[0.07] to-indigo-500/[0.07] border-t border-white/10">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-4 flex items-center gap-2">
                                    <Lightbulb className="h-3.5 w-3.5" /> Logic Interpretation
                                </h4>
                                <div className="text-sm text-slate-300 leading-relaxed space-y-2">
                                    {content.interpretation.split('\n').map((line: string, i: number) => (
                                        <p key={i} className="flex gap-3">
                                            <span className="text-blue-500/50 mt-1">•</span>
                                            <span>{line}</span>
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )

        case "list":
        case "grid":
            return (
                <div className="grid md:grid-cols-2 gap-6">
                    {items?.map((item, i) => (
                        <div key={i} className="flex items-start gap-4 p-6 rounded-xl border-2 border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:shadow-xl transition-all shadow-lg">
                            <div className="h-4 w-4 mt-1 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shrink-0 shadow-md" />
                            <span className="text-lg font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">{item}</span>
                        </div>
                    ))}
                </div>
            )

        case "exam":
        case "quiz":
            return (
                <div className="space-y-6">
                    {questions?.map((q, i) => (
                        <Card key={i} className="overflow-hidden border-4 border-orange-400 dark:border-orange-600 transition-all hover:border-orange-500 shadow-xl">
                            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 m-2 p-6 rounded-xl flex gap-6">
                                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shrink-0 text-white shadow-lg">
                                    <HelpCircle className="h-7 w-7" />
                                </div>
                                <div className="space-y-4 w-full">
                                    <p className="font-bold text-xl text-slate-900 dark:text-slate-100 leading-relaxed">{q}</p>

                                    {/* Only show answer button if 'answers' exists */}
                                    {getAnswer(i) && (
                                        <div className="pt-3">
                                            {showAnswer[i] ? (
                                                <div className="animate-in fade-in slide-in-from-top-2">
                                                    <div className="text-lg font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 p-5 rounded-xl border-2 border-green-400 dark:border-green-600 mb-3 shadow-md">
                                                        {getAnswer(i)}
                                                    </div>
                                                    <Button variant="ghost" size="lg" onClick={() => toggleAnswer(i)} className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold">
                                                        <EyeOff className="h-5 w-5 mr-2" /> Hide Answer
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Button variant="default" size="lg" onClick={() => toggleAnswer(i)} className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg px-6 py-3 shadow-lg">
                                                    <Eye className="h-5 w-5 mr-2" /> Show Answer
                                                </Button>
                                            )}
                                        </div>
                                    )}
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
                <Card className="bg-linear-to-br from-blue-50/50 via-background to-background dark:from-blue-900/10 border-blue-100 dark:border-blue-900 overflow-hidden transform transition-all hover:shadow-lg">
                    <CardContent className="p-6">
                        {content.description && <p className="mb-6 text-foreground/80 leading-relaxed text-lg">{content.description}</p>}

                        <div className="grid gap-6 md:grid-cols-2">
                            {content.problem && (
                                <div className="space-y-2">
                                    <h4 className="flex items-center gap-2 text-sm font-bold text-red-600 uppercase tracking-wide">
                                        <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div> Problem
                                    </h4>
                                    <p className="text-sm text-foreground/80 bg-background/80 p-4 rounded-md border shadow-sm">{content.problem}</p>
                                </div>
                            )}
                            {content.solution && (
                                <div className="space-y-2">
                                    <h4 className="flex items-center gap-2 text-sm font-bold text-green-600 uppercase tracking-wide">
                                        <div className="h-1.5 w-1.5 rounded-full bg-green-600"></div> Solution
                                    </h4>
                                    <p className="text-sm text-foreground/80 bg-background/80 p-4 rounded-md border shadow-sm">{content.solution}</p>
                                </div>
                            )}
                            {content.outcome && (
                                <div className="space-y-2 md:col-span-2">
                                    <h4 className="flex items-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-wide">
                                        <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div> Outcome
                                    </h4>
                                    <p className="text-sm text-foreground/80 bg-background/80 p-4 rounded-md border shadow-sm">{content.outcome}</p>
                                </div>
                            )}
                        </div>

                        {/* Specific fields for Projects */}
                        {content.idea && (
                            <div className="mt-6 p-5 rounded-xl bg-primary/5 border border-primary/10">
                                <h4 className="flex items-center gap-2 font-semibold text-primary mb-3 text-lg">
                                    <Terminal className="h-5 w-5" /> Project Idea
                                </h4>
                                <p className="text-xl font-medium mb-6 relative z-10">{content.idea}</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                    <div className="bg-background p-4 rounded-lg border shadow-sm group hover:border-primary/30 transition-colors">
                                        <span className="font-bold text-muted-foreground block text-xs uppercase mb-2 tracking-wider">Input</span>
                                        <span className="font-mono text-primary/80">{content.input}</span>
                                    </div>
                                    <div className="bg-background p-4 rounded-lg border shadow-sm group hover:border-primary/30 transition-colors">
                                        <span className="font-bold text-muted-foreground block text-xs uppercase mb-2 tracking-wider">Process</span>
                                        <span className="font-mono text-primary/80">{content.process}</span>
                                    </div>
                                    <div className="bg-background p-4 rounded-lg border shadow-sm group hover:border-primary/30 transition-colors">
                                        <span className="font-bold text-muted-foreground block text-xs uppercase mb-2 tracking-wider">Output</span>
                                        <span className="font-mono text-primary/80">{content.output}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Specific field for Activity */}
                        {content.activity && (
                            <div className="mt-4 p-5 rounded-xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30">
                                <h4 className="flex items-center gap-2 font-bold text-yellow-700 dark:text-yellow-500 mb-2">
                                    <Activity className="h-5 w-5" /> Activity
                                </h4>
                                <p className="text-foreground/90 font-medium">{content.activity}</p>
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
                        <div className="flex flex-col items-center w-full">
                            <div className="relative overflow-hidden rounded-2xl shadow-xl border-4 border-muted/20 bg-muted/5 w-full max-w-4xl aspect-video">
                                <Image
                                    src={content.imageSrc}
                                    alt={slide.title}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                                />
                            </div>
                            <p className="mt-4 text-sm font-medium text-muted-foreground bg-muted/30 px-4 py-2 rounded-full">
                                {(content.caption || content.description)}
                            </p>
                        </div>
                    ) : (
                        <div className="w-full max-w-5xl p-8 rounded-3xl border bg-muted/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                <Layers className="h-32 w-32" />
                            </div>

                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-12 text-center border-b pb-4 mx-auto max-w-xs">{slide.title}</h4>

                            <div className="flex flex-wrap items-center justify-center gap-y-12 gap-x-6 px-4 relative z-10">
                                {content.steps?.map((step: string, i: number) => (
                                    <React.Fragment key={i}>
                                        <div className="bg-card border-2 border-primary/20 shadow-lg p-5 rounded-2xl text-center w-full sm:w-[180px] min-h-[120px] flex flex-col justify-center items-center transition-all hover:border-primary hover:shadow-xl hover:-translate-y-1 relative group">
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-sm group-hover:scale-110 transition-transform">Step {i + 1}</div>
                                            <span className="text-sm font-bold leading-tight">{step}</span>
                                        </div>
                                        {i < (content.steps.length - 1) && (
                                            <div className="hidden sm:flex items-center justify-center text-primary/30">
                                                <ChevronRight className="h-8 w-8" strokeWidth={3} />
                                            </div>
                                        )}
                                        {/* Mobile down arrow */}
                                        {i < (content.steps.length - 1) && (
                                            <div className="flex sm:hidden w-full items-center justify-center text-primary/30 -my-4 z-0">
                                                <ChevronRight className="h-6 w-6 rotate-90" strokeWidth={3} />
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            {content.description && (
                                <p className="mt-12 text-center text-sm text-foreground/60 italic px-6 font-medium max-w-2xl mx-auto bg-background/50 p-4 rounded-xl border border-dashed">
                                    &ldquo;{content.description}&rdquo;
                                </p>
                            )}
                        </div>
                    )}
                </div>
            )

        case "summary":
            return (
                <div className="bg-linear-to-br from-primary/5 to-secondary/50 rounded-2xl p-8 border border-primary/10 shadow-sm">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                        <CheckCircle className="h-6 w-6 text-primary" /> Key Takeaways
                    </h3>

                    <div className="space-y-8">
                        {content.linkage && (
                            <div className="relative pl-6 border-l-2 border-primary/20">
                                <h4 className="font-semibold text-xs uppercase tracking-wide text-muted-foreground mb-2">Context</h4>
                                <p className="text-lg leading-relaxed text-foreground/90">{content.linkage}</p>
                            </div>
                        )}

                        <Separator />

                        <div className="grid md:grid-cols-2 gap-6">
                            {content.nextTopic && (
                                <Card className="border-none shadow-none bg-background/50">
                                    <div className="p-4">
                                        <h4 className="font-semibold text-xs uppercase tracking-wide text-muted-foreground mb-3">Next Up</h4>
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                                                <ArrowUpRight className="h-5 w-5" />
                                            </div>
                                            <span className="font-medium text-lg">{content.nextTopic}</span>
                                        </div>
                                    </div>
                                </Card>
                            )}
                            {content.preparation && (
                                <Card className="border-none shadow-none bg-background/50">
                                    <div className="p-4">
                                        <h4 className="font-semibold text-xs uppercase tracking-wide text-muted-foreground mb-3">Preparation</h4>
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                                                <BookOpen className="h-5 w-5" />
                                            </div>
                                            <span className="font-medium text-lg text-foreground/80">{content.preparation}</span>
                                        </div>
                                    </div>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            )

        default:
            // Standard text rendering
            return (
                <div className="space-y-8 text-xl leading-relaxed text-slate-900 dark:text-slate-100">
                    {/* Render text with smart paragraph splitting */}
                    {content?.text && (
                        <div className="space-y-6">
                            {content.text.split('\n').map((paragraph: string, idx: number) => (
                                paragraph.trim() && <p key={idx} className="font-semibold leading-relaxed">{paragraph}</p>
                            ))}
                        </div>
                    )}

                    {content?.hook && (
                        <div className="flex gap-6 p-8 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950 rounded-2xl border-4 border-amber-400 dark:border-amber-600 items-start shadow-xl">
                            <Lightbulb className="h-10 w-10 text-amber-600 dark:text-amber-400 shrink-0 mt-1" />
                            <p className="italic text-slate-900 dark:text-slate-100 font-bold text-2xl border-l-4 border-amber-500 dark:border-amber-400 pl-6 leading-relaxed">{content.hook}</p>
                        </div>
                    )}

                    {content?.definition && (
                        <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-2xl my-8 border-l-8 border-blue-600 dark:border-blue-400 shadow-xl">
                            <h4 className="text-xl font-black text-blue-700 dark:text-blue-300 uppercase tracking-wide mb-4 flex items-center gap-3 bg-blue-100 dark:bg-blue-900/50 px-4 py-2 rounded-full inline-block">
                                <BookOpen className="h-6 w-6" /> 📖 Definition
                            </h4>
                            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
                                {content.definition}
                            </p>
                        </div>
                    )}

                    {/* Mathematical Formula Rendering */}
                    {slide.formula && (
                        <div className="my-10 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-3xl border-4 border-blue-500 dark:border-blue-400 shadow-2xl">
                            <div className="flex items-center gap-3 mb-6 bg-blue-600 dark:bg-blue-500 text-white px-6 py-4 rounded-2xl -mx-8 -mt-8 mb-8">
                                <Terminal className="h-8 w-8" />
                                <h4 className="text-2xl font-black uppercase tracking-wide">📐 Mathematical Model</h4>
                            </div>

                            {slide.formula.description && (
                                <p className="text-xl text-slate-800 dark:text-slate-200 mb-6 font-semibold leading-relaxed bg-white dark:bg-slate-800 p-5 rounded-xl border-2 border-blue-200 dark:border-blue-700">{slide.formula.description}</p>
                            )}

                            {/* Render equation using KaTeX */}
                            <div
                                className="my-8 p-10 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950 rounded-2xl border-4 border-amber-400 dark:border-amber-600 overflow-x-auto text-center shadow-xl"
                                style={{ fontSize: '2rem' }}
                                dangerouslySetInnerHTML={{
                                    __html: katex.renderToString(slide.formula.equation, {
                                        throwOnError: false,
                                        displayMode: true
                                    })
                                }}
                            />

                            {/* Term Explanations */}
                            {slide.formula.terms && slide.formula.terms.length > 0 && (
                                <div className="mt-8 space-y-4">
                                    <h5 className="text-lg font-black uppercase tracking-wider text-blue-700 dark:text-blue-300 mb-4 bg-blue-100 dark:bg-blue-900/50 px-4 py-2 rounded-full inline-block">Term Definitions</h5>
                                    <div className="grid gap-4">
                                        {slide.formula.terms.map((term, idx) => (
                                            <div key={idx} className="flex items-start gap-4 p-5 bg-white dark:bg-slate-800 rounded-xl border-2 border-blue-300 dark:border-blue-700 shadow-lg hover:shadow-xl transition-shadow">
                                                <div
                                                    className="font-mono text-blue-700 dark:text-blue-300 font-black shrink-0 min-w-[80px] text-2xl"
                                                    dangerouslySetInnerHTML={{
                                                        __html: katex.renderToString(term.symbol, {
                                                            throwOnError: false
                                                        })
                                                    }}
                                                />
                                                <span className="text-lg text-slate-900 dark:text-slate-100 font-semibold leading-relaxed">{term.meaning}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Calculation Illustration */}
                            {slide.formula && slide.formula.calculation && (
                                <div className="mt-8 p-6 bg-white/40 dark:bg-gray-900/40 rounded-xl border border-blue-200/50 dark:border-blue-900/30">
                                    <h5 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2">
                                        <Activity className="h-4 w-4" />
                                        {slide.formula.calculation.exampleTitle || "Step-by-Step Calculation"}
                                    </h5>

                                    {slide.formula.calculation.description && (
                                        <p className="text-sm text-foreground/70 mb-6">{slide.formula.calculation.description}</p>
                                    )}

                                    <div className="space-y-4">
                                        {slide.formula.calculation.steps.map((step, idx) => (
                                            <div key={idx} className="relative pl-8 pb-4 last:pb-0">
                                                {/* Connecting line */}
                                                {idx !== (slide.formula?.calculation?.steps?.length ?? 0) - 1 && (
                                                    <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-blue-100 dark:bg-blue-900/50" />
                                                )}

                                                {/* Step number dot */}
                                                <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-[10px] font-bold text-blue-600 dark:text-blue-400 z-10">
                                                    {idx + 1}
                                                </div>

                                                <div className="space-y-2">
                                                    <p className="text-sm font-semibold text-foreground/90">{step.label}</p>

                                                    {step.formula && (
                                                        <div
                                                            className="text-sm font-mono text-blue-700 dark:text-blue-300 py-1"
                                                            dangerouslySetInnerHTML={{
                                                                __html: katex.renderToString(step.formula, { throwOnError: false })
                                                            }}
                                                        />
                                                    )}

                                                    {step.result && (
                                                        <div className="flex items-center gap-2">
                                                            <div className="text-[10px] font-bold uppercase text-muted-foreground">Result:</div>
                                                            <div className="text-sm font-bold text-foreground">{step.result}</div>
                                                        </div>
                                                    )}

                                                    {step.note && (
                                                        <p className="text-xs text-muted-foreground italic">Note: {step.note}</p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}

                                        {(slide.formula.calculation.input || slide.formula.calculation.output) && (
                                            <div className="mt-6 pt-4 border-t border-blue-100 dark:border-blue-900/30 grid grid-cols-2 gap-4">
                                                {slide.formula.calculation.input && (
                                                    <div>
                                                        <div className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Input Data</div>
                                                        <div className="text-sm font-medium p-2 bg-blue-50/50 dark:bg-blue-950/20 rounded border border-blue-100/50 dark:border-blue-900/20">{slide.formula.calculation.input}</div>
                                                    </div>
                                                )}
                                                {slide.formula.calculation.output && (
                                                    <div>
                                                        <div className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Final Result</div>
                                                        <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400 p-2 bg-indigo-50/50 dark:bg-indigo-950/20 rounded border border-indigo-100/50 dark:border-indigo-900/20">{slide.formula.calculation.output}</div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {/* Sub-Topics Rendering - Hierarchical Deep Dive */}
                    {slide.subTopics && slide.subTopics.length > 0 && (
                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <Layers className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">Deep Dive: Detailed Concepts</h4>
                            </div>

                            <div className="grid gap-4">
                                {slide.subTopics.map((sub, i) => (
                                    <SubTopicRenderer key={i} subTopic={sub} index={i} />
                                ))}
                            </div>
                        </div>
                    )}


                    {/* Generic Key-Value rendering for miscellaneous fields */}
                    <div className="grid gap-4 pt-4">
                        {Object.entries(content || {}).map(([key, value]) => {
                            if (["text", "hook", "items", "outcomes", "definition", "problem", "solution", "outcome", "idea", "input", "process", "output", "activity", "description", "questions", "caption", "imagePlaceholder", "steps", "linkage", "nextTopic", "preparation", "imageSrc", "answers"].includes(key)) return null;

                            return (
                                <div key={key} className="bg-muted/30 p-4 rounded-lg border flex flex-col sm:flex-row sm:gap-4 sm:items-baseline">
                                    <span className="block text-xs font-bold uppercase text-muted-foreground mb-1 sm:mb-0 sm:w-32 shrink-0">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
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
                        <div className="mt-8 bg-linear-to-r from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-xl border border-green-100 dark:border-green-900/50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <CheckCircle className="h-24 w-24" />
                            </div>
                            <h4 className="flex items-center gap-2 font-bold text-green-700 dark:text-green-400 mb-4 relative z-10">
                                <CheckCircle className="h-5 w-5" /> Learning Outcomes
                            </h4>
                            <ul className="grid sm:grid-cols-2 gap-3 relative z-10">
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

function SubTopicRenderer({ subTopic, index }: { subTopic: SubTopic; index: number }) {
    const [isOpen, setIsOpen] = React.useState(index === 0);

    return (
        <div className="border rounded-xl bg-card/30 backdrop-blur-sm overflow-hidden transition-all hover:bg-card/50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-md bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                        {index + 1}
                    </div>
                    <span className="font-semibold text-foreground">{subTopic.title}</span>
                </div>
                {isOpen ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
            </button>

            {isOpen && (
                <div className="p-4 pt-0 border-t animate-in fade-in slide-in-from-top-2">
                    <div className="mt-4 prose prose-sm dark:prose-invert max-w-none">
                        {Array.isArray(subTopic.content) ? (
                            <ul className="list-disc pl-5 space-y-2">
                                {(subTopic.content as string[]).map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        ) : (
                            <p className="text-foreground/80 leading-relaxed">{subTopic.content}</p>
                        )}
                    </div>

                    {subTopic.subSubTopics && subTopic.subSubTopics.length > 0 && (
                        <div className="mt-6 space-y-4 border-l-2 border-indigo-100 dark:border-indigo-900/50 ml-3 pl-6">
                            {subTopic.subSubTopics.map((sst, i) => (
                                <SubSubTopicRenderer key={i} subSubTopic={sst} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function SubSubTopicRenderer({ subSubTopic }: { subSubTopic: SubSubTopic }) {
    return (
        <div className="space-y-3">
            <h5 className="font-bold text-sm flex items-center gap-2 text-foreground/90">
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                {subSubTopic.title}
            </h5>
            <div className="text-sm text-foreground/70 leading-relaxed ml-3.5">
                {Array.isArray(subSubTopic.content) ? (
                    <ul className="list-disc pl-5 space-y-1">
                        {(subSubTopic.content as string[]).map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                ) : (
                    <p>{subSubTopic.content}</p>
                )}
            </div>

            {(subSubTopic.keyPoints || subSubTopic.examples) && (
                <div className="grid sm:grid-cols-2 gap-3 ml-3.5">
                    {subSubTopic.keyPoints && (
                        <div className="bg-blue-50/50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-100/50 dark:border-blue-900/30">
                            <span className="text-[10px] uppercase font-bold text-blue-600 block mb-1">Key Insights</span>
                            <ul className="text-xs space-y-1 text-foreground/70">
                                {subSubTopic.keyPoints.map((p, i) => <li key={i} className="flex gap-2"><span>•</span> {p}</li>)}
                            </ul>
                        </div>
                    )}
                    {subSubTopic.examples && (
                        <div className="bg-amber-50/50 dark:bg-amber-950/20 p-3 rounded-lg border border-amber-100/50 dark:border-amber-900/30">
                            <span className="text-[10px] uppercase font-bold text-amber-600 block mb-1">Examples</span>
                            <ul className="text-xs space-y-1 text-foreground/70">
                                {subSubTopic.examples.map((e, i) => <li key={i} className="flex gap-2"><span>-</span> {e}</li>)}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

