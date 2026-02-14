"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
    CheckCircle2,
    XCircle,
    AlertCircle,
    ArrowRight,
    RotateCcw,
    ChevronRight,
    Timer,
    Trophy,
    Target,
    BookOpen,
    Home
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface Question {
    id: number
    text: string
    options: string[]
    correctIndex: number
    explanation: string
    topic: string
    remedial: string
}

interface QuizData {
    title: string
    questions: Question[]
}

export function QuizModule({ data }: { data: QuizData }) {
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'summary'>('intro')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedOption, setSelectedOption] = useState<number | null>(null)
    const [isAnswered, setIsAnswered] = useState(false)
    const [score, setScore] = useState(0)
    const [answers, setAnswers] = useState<{ questionId: number, isCorrect: boolean, topic: string }[]>([])
    const [startTime, setStartTime] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)

    const currentQuestion = data.questions[currentIndex]
    const progress = ((currentIndex) / data.questions.length) * 100


    const startQuiz = () => {
        setGameState('playing')
        setStartTime(Date.now())
    }

    const handleSubmit = () => {
        if (selectedOption === null) return
        setIsAnswered(true)
        const correct = selectedOption === currentQuestion.correctIndex
        if (correct) setScore(s => s + 1)

        setAnswers(prev => [...prev, {
            questionId: currentQuestion.id,
            isCorrect: correct,
            topic: currentQuestion.topic
        }])
    }

    const handleNext = () => {
        if (currentIndex < data.questions.length - 1) {
            setCurrentIndex(prev => prev + 1)
            setSelectedOption(null)
            setIsAnswered(false)
        } else {
            setGameState('summary')
            setDuration(Math.floor((Date.now() - startTime) / 1000))
        }
    }

    // --- RENDER INTRO ---
    if (gameState === 'intro') {
        return (
            <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="text-center mb-12 space-y-4">
                    <Badge variant="outline" className="px-4 py-1 text-primary border-primary/20 bg-primary/5 uppercase tracking-widest text-xs font-bold">
                        Unit Assessment
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
                        {data.title.split(':')[1] || data.title}
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Test your knowledge of the core concepts covered in this module.
                        A score of <span className="text-primary font-bold">70% or higher</span> is required to pass.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {[
                        { icon: Target, label: "Questions", value: data.questions.length },
                        { icon: Timer, label: "Est. Time", value: "10-15 min" },
                        { icon: Trophy, label: "Passing Score", value: "70%" },
                    ].map((stat, i) => (
                        <Card key={i} className="bg-card/50 backdrop-blur-sm border-primary/10 transition-all hover:border-primary/30">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                                    <stat.icon className="h-6 w-6 text-primary" />
                                </div>
                                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</div>
                                <div className="text-2xl font-bold">{stat.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Button size="lg" className="h-14 px-12 text-lg rounded-full shadow-xl shadow-primary/20 animate-pulse" onClick={startQuiz}>
                        Start Assessment <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        )
    }

    // --- RENDER SUMMARY ---
    if (gameState === 'summary') {
        const percentage = Math.round((score / data.questions.length) * 100)
        const isPassed = percentage >= 70

        return (
            <div className="max-w-5xl mx-auto py-8 px-4 animate-in fade-in zoom-in-95 duration-500">
                <div className="grid lg:grid-cols-12 gap-8 items-start">

                    {/* Main Score Card */}
                    <Card className="lg:col-span-12 overflow-hidden border-none shadow-2xl bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-md">
                        <div className={cn(
                            "h-2 w-full",
                            isPassed ? "bg-green-500" : "bg-red-500"
                        )} />
                        <CardContent className="p-8 md:p-12">
                            <div className="flex flex-col md:flex-row items-center gap-12">
                                <div className="relative h-48 w-48 flex items-center justify-center">
                                    <svg className="h-full w-full rotate-[-90deg]">
                                        <circle
                                            cx="96" cy="96" r="80"
                                            className="stroke-muted fill-none"
                                            strokeWidth="12"
                                        />
                                        <circle
                                            cx="96" cy="96" r="80"
                                            className={cn(
                                                "stroke-current fill-none transition-all duration-1000 ease-out",
                                                isPassed ? "text-green-500" : "text-red-500"
                                            )}
                                            strokeWidth="12"
                                            strokeDasharray={502.4}
                                            strokeDashoffset={502.4 - (502.4 * percentage) / 100}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-5xl font-black">{percentage}%</span>
                                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Score</span>
                                    </div>
                                </div>

                                <div className="flex-1 text-center md:text-left space-y-6">
                                    <div>
                                        <h2 className="text-3xl font-black mb-2">
                                            {isPassed ? "Congratulations!" : "Keep Working At It"}
                                        </h2>
                                        <p className="text-xl text-muted-foreground">
                                            {isPassed
                                                ? `You&apos;ve demonstrated a strong grasp of ${data.title.split(':')[0]}.`
                                                : "You&apos;re close, but you need 70% to pass this module."}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                        <Badge className="px-3 py-1 bg-primary/10 text-primary border-none text-sm">
                                            {score} / {data.questions.length} Correct
                                        </Badge>
                                        <Badge className="px-3 py-1 bg-muted text-muted-foreground border-none text-sm">
                                            Time Taken: {Math.floor(duration / 60)}m {duration % 60}s
                                        </Badge>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        {isPassed ? (
                                            <Button size="lg" className="rounded-full px-8 bg-green-600 hover:bg-green-700" asChild>
                                                <Link href="/"><Home className="mr-2 h-4 w-4" /> Back to Dashboard</Link>
                                            </Button>
                                        ) : (
                                            <Button size="lg" className="rounded-full px-8" onClick={() => window.location.reload()}>
                                                <RotateCcw className="mr-2 h-4 w-4" /> Try Again
                                            </Button>
                                        )}
                                        <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
                                            <Link href="#breakdown">View Breakdown</Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Topic Breakdown */}
                    <div id="breakdown" className="lg:col-span-12 mt-4">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Target className="h-5 w-5 text-primary" /> Performance Breakdown
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {data.questions.map((q, i) => (
                                <Card key={i} className="border-l-4 overflow-hidden" style={{ borderLeftColor: answers[i]?.isCorrect ? '#22c55e' : '#ef4444' }}>
                                    <CardContent className="p-4 space-y-2">
                                        <div className="flex justify-between items-start gap-4">
                                            <span className="text-sm font-medium leading-tight line-clamp-2">{q.text}</span>
                                            {answers[i]?.isCorrect ? <CheckCircle2 className="text-green-500 h-5 w-5 shrink-0" /> : <XCircle className="text-red-500 h-5 w-5 shrink-0" />}
                                        </div>
                                        {!answers[i]?.isCorrect && (
                                            <div className="mt-2 text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                                👉 <span className="font-bold">Remedial:</span> {q.remedial}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // --- RENDER PLAYING ---
    return (
        <div className="min-h-[80vh] flex flex-col max-w-5xl mx-auto px-4 py-6 animate-in fade-in duration-500">

            {/* Context Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div className="space-y-1">
                    <p className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Questions in progress</p>
                    <h2 className="text-2xl font-black tracking-tight line-clamp-1">{data.title.split(':')[1] || data.title}</h2>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Progress</div>
                        <div className="text-xl font-black">{Math.round(progress)}%</div>
                    </div>
                    <div className="h-10 w-10 flex items-center justify-center shrink-0">
                        <Progress value={progress} className="h-1.5 w-24" />
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 flex-1 items-start">

                {/* Question Area */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-black text-lg shadow-lg shadow-primary/20">
                                {currentIndex + 1}
                            </span>
                            <div className="h-px flex-1 bg-border" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold leading-snug tracking-tight text-foreground/90">
                            {currentQuestion.text}
                        </h3>
                    </div>

                    <div className="grid gap-4">
                        {currentQuestion.options.map((option, i) => {
                            const isSelected = selectedOption === i;
                            const isCorrect = isAnswered && i === currentQuestion.correctIndex;
                            const isWrong = isAnswered && isSelected && !isCorrect;

                            return (
                                <button
                                    key={i}
                                    disabled={isAnswered}
                                    onClick={() => setSelectedOption(i)}
                                    className={cn(
                                        "w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 group relative overflow-hidden",
                                        !isAnswered && !isSelected && "bg-card hover:bg-accent border-transparent hover:border-muted-foreground/20 hover:shadow-md",
                                        !isAnswered && isSelected && "bg-primary/5 border-primary shadow-lg shadow-primary/10",
                                        isAnswered && isCorrect && "bg-green-500/10 border-green-500 text-green-900 dark:text-green-300",
                                        isAnswered && isWrong && "bg-destructive/10 border-destructive text-destructive dark:text-red-400",
                                        isAnswered && !isSelected && !isCorrect && "opacity-40 grayscale-[0.5]"
                                    )}
                                >
                                    <div className={cn(
                                        "h-8 w-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors font-bold text-sm",
                                        !isSelected && "border-muted-foreground/30 text-muted-foreground",
                                        isSelected && !isAnswered && "border-primary bg-primary text-primary-foreground",
                                        isAnswered && isCorrect && "border-green-500 bg-green-500 text-white",
                                        isAnswered && isWrong && "border-destructive bg-destructive text-white"
                                    )}>
                                        {isAnswered && isCorrect ? <CheckCircle2 className="h-5 w-5" /> :
                                            isAnswered && isWrong ? <XCircle className="h-5 w-5" /> :
                                                String.fromCharCode(65 + i)}
                                    </div>
                                    <span className="text-lg font-medium pr-4">{option}</span>

                                    {isSelected && !isAnswered && (
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 animate-in fade-in slide-in-from-right-2">
                                            <Target className="h-5 w-5 text-primary opacity-30" />
                                        </div>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Info / Feedback Sidebar */}
                <div className="space-y-6">
                    <Card className="bg-muted/30 border-none">
                        <CardContent className="p-6 space-y-4">
                            {!isAnswered ? (
                                <>
                                    <div className="flex items-center gap-2 text-muted-foreground font-bold text-xs uppercase tracking-widest">
                                        <BookOpen className="h-4 w-4" /> Module focus
                                    </div>
                                    <p className="text-sm font-medium">{currentQuestion.topic}</p>
                                    <div className="h-px bg-border my-4" />
                                    <Button
                                        size="lg"
                                        className="w-full rounded-2xl h-14 text-lg font-bold shadow-xl shadow-primary/10"
                                        disabled={selectedOption === null}
                                        onClick={handleSubmit}
                                    >
                                        Check Answer
                                    </Button>
                                </>
                            ) : (
                                <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                                    <div className="space-y-2">
                                        <div className={cn(
                                            "flex items-center gap-2 font-black text-xs uppercase tracking-[0.2em]",
                                            selectedOption === currentQuestion.correctIndex ? "text-green-600" : "text-destructive"
                                        )}>
                                            {selectedOption === currentQuestion.correctIndex ? "Correct" : "Incorrect"}
                                        </div>
                                        <p className="text-sm leading-relaxed text-muted-foreground/90 bg-background/50 p-4 rounded-xl border">
                                            {currentQuestion.explanation}
                                        </p>
                                    </div>

                                    {selectedOption !== currentQuestion.correctIndex && (
                                        <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 text-xs">
                                            <span className="font-bold text-orange-600 dark:text-orange-400 block mb-1 uppercase tracking-widest">Recommended Action</span>
                                            {currentQuestion.remedial}
                                        </div>
                                    )}

                                    <Button
                                        size="lg"
                                        className="w-full rounded-2xl h-14 text-lg font-bold shadow-xl shadow-primary/20"
                                        onClick={handleNext}
                                    >
                                        {currentIndex === data.questions.length - 1 ? "End Assessment" : "Continue"} <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <div className="px-2 space-y-4 hidden lg:block">
                        <div className="flex justify-between items-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
                            <span>Score</span>
                            <span>{score} / {data.questions.length}</span>
                        </div>
                        <div className="flex gap-1">
                            {data.questions.map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "h-1.5 flex-1 rounded-full transition-all duration-500",
                                        i < currentIndex ? (answers[i]?.isCorrect ? "bg-green-500" : "bg-red-500") :
                                            i === currentIndex ? "bg-primary animate-pulse" : "bg-muted"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
