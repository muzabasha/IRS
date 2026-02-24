'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { ArrowLeft, CheckCircle, XCircle, ExternalLink, BookOpen } from 'lucide-react'

export default function Unit4QuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
    const [showResults, setShowResults] = useState(false)
    const [score, setScore] = useState(0)

    const quizQuestions = [
        {
            id: 1,
            question: "What is the PageRank algorithm primarily used for?",
            options: [
                "Compressing web pages",
                "Ranking web pages based on link structure and importance",
                "Detecting spam emails",
                "Indexing multimedia content"
            ],
            correct: 1,
            explanation: "PageRank ranks web pages based on the link structure of the web, treating links as votes of importance. Pages linked by many important pages get higher scores."
        },
        {
            id: 2,
            question: "What does the damping factor (d) represent in PageRank?",
            options: [
                "The probability of following a link vs. random jump (typically 0.85)",
                "The number of outgoing links",
                "The page loading speed",
                "The document length"
            ],
            correct: 0,
            explanation: "The damping factor (typically 0.85) represents the probability that a user follows a link rather than jumping to a random page, modeling realistic browsing behavior."
        },
        {
            id: 3,
            question: "What is the primary purpose of a web crawler?",
            options: [
                "To rank web pages",
                "To systematically browse and download web pages for indexing",
                "To detect broken links only",
                "To compress web content"
            ],
            correct: 1,
            explanation: "Web crawlers (spiders/bots) systematically browse the web, downloading pages and following links to build a comprehensive index for search engines."
        },
        {
            id: 4,
            question: "What is robots.txt used for in web crawling?",
            options: [
                "To rank pages",
                "To specify which parts of a website crawlers should not access",
                "To compress web pages",
                "To detect duplicate content"
            ],
            correct: 1,
            explanation: "robots.txt is a file that website owners use to communicate with web crawlers, specifying which pages or sections should not be crawled or indexed."
        },
        {
            id: 5,
            question: "In content-based image retrieval, what does color histogram matching measure?",
            options: [
                "The size of images",
                "The similarity of color distributions between images",
                "The number of objects in images",
                "The image resolution"
            ],
            correct: 1,
            explanation: "Color histogram matching compares the distribution of colors in images. Similar histograms indicate similar color compositions, enabling content-based image retrieval."
        },
        {
            id: 6,
            question: "What is meta-search in the context of web search?",
            options: [
                "Searching only metadata",
                "Aggregating and combining results from multiple search engines",
                "Searching for search engines",
                "A type of image search"
            ],
            correct: 1,
            explanation: "Meta-search engines query multiple search engines simultaneously, aggregate their results, and present a unified ranking, leveraging the strengths of different engines."
        },
        {
            id: 7,
            question: "What crawling strategy does BFS (Breadth-First Search) follow?",
            options: [
                "Visits deepest pages first",
                "Visits pages level by level, exploring all neighbors before going deeper",
                "Visits random pages",
                "Visits only the homepage"
            ],
            correct: 1,
            explanation: "BFS explores the web level by level, visiting all pages at distance d before moving to distance d+1, ensuring broad coverage before going deep."
        },
        {
            id: 8,
            question: "What is the 'cold start' problem in multimedia IR?",
            options: [
                "Slow server response time",
                "Difficulty in retrieving content with no textual metadata or user interactions",
                "Network connectivity issues",
                "Storage limitations"
            ],
            correct: 1,
            explanation: "The cold start problem occurs when new multimedia content lacks textual descriptions, tags, or user interaction history, making it difficult to retrieve or recommend."
        },
        {
            id: 9,
            question: "In PageRank, what happens to the rank of a page with many outgoing links?",
            options: [
                "It increases its own rank",
                "It distributes its rank among all outgoing links, giving less to each",
                "It has no effect",
                "It only affects incoming links"
            ],
            correct: 1,
            explanation: "A page's rank is divided equally among its outgoing links. More outgoing links mean each linked page receives a smaller portion of the rank."
        },
        {
            id: 10,
            question: "What is the main challenge in multimedia information retrieval compared to text IR?",
            options: [
                "Multimedia files are always larger",
                "The semantic gap between low-level features and high-level concepts",
                "Multimedia requires more storage",
                "Multimedia is always copyrighted"
            ],
            correct: 1,
            explanation: "The semantic gap is the difference between low-level features (colors, textures, frequencies) that computers can extract and high-level semantic concepts (objects, emotions) that humans understand."
        }
    ]

    const handleAnswerSelect = (questionId: number, answerIndex: string) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: answerIndex
        })
    }

    const handleSubmit = () => {
        let correctCount = 0
        quizQuestions.forEach((q) => {
            if (selectedAnswers[q.id] === q.correct.toString()) {
                correctCount++
            }
        })
        setScore(correctCount)
        setShowResults(true)
    }

    const resetQuiz = () => {
        setCurrentQuestion(0)
        setSelectedAnswers({})
        setShowResults(false)
        setScore(0)
    }

    const currentQ = quizQuestions[currentQuestion]
    const isAnswered = selectedAnswers[currentQ.id] !== undefined

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-4">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 4 Labs
                    </Link>
                </Button>
                <Badge variant="outline">Unit 4 Assessment</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold">Unit 4: Multimedia & Web Search Quiz</h1>
                <p className="text-lg text-muted-foreground">
                    Test your understanding of multimedia IR, web crawling, PageRank, and meta-search
                </p>
            </div>

            {/* Study Resources */}
            <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Study Resources
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                        Review this comprehensive study guide before taking the quiz:
                    </p>
                    <a
                        href="https://notebooklm.google.com/notebook/35e67b85-0273-454f-8754-04d32b5fb1a8?artifactId=50f0e15d-fb55-4582-ab54-18b918c73dda"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                        <ExternalLink className="h-4 w-4 text-primary" />
                        <div>
                            <p className="font-semibold text-sm">Unit 4 Study Guide</p>
                            <p className="text-xs text-muted-foreground">NotebookLM - Multimedia & Web Search</p>
                        </div>
                    </a>
                </CardContent>
            </Card>

            {!showResults ? (
                <>
                    {/* Progress */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Question {currentQuestion + 1} of {quizQuestions.length}
                        </p>
                        <div className="flex gap-1">
                            {quizQuestions.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-2 w-8 rounded ${selectedAnswers[quizQuestions[i].id] !== undefined
                                        ? 'bg-primary'
                                        : i === currentQuestion
                                            ? 'bg-primary/50'
                                            : 'bg-secondary'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Question Card */}
                    <Card className="border-2 border-primary">
                        <CardHeader>
                            <CardTitle className="text-xl">{currentQ.question}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <RadioGroup
                                value={selectedAnswers[currentQ.id]}
                                onValueChange={(value) => handleAnswerSelect(currentQ.id, value)}
                            >
                                {currentQ.options.map((option, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                                    >
                                        <RadioGroupItem value={index.toString()} id={`q${currentQ.id}-${index}`} />
                                        <Label
                                            htmlFor={`q${currentQ.id}-${index}`}
                                            className="flex-1 cursor-pointer"
                                        >
                                            {option}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>

                            <div className="flex gap-2 pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                                    disabled={currentQuestion === 0}
                                >
                                    Previous
                                </Button>
                                {currentQuestion < quizQuestions.length - 1 ? (
                                    <Button
                                        onClick={() => setCurrentQuestion(currentQuestion + 1)}
                                        disabled={!isAnswered}
                                        className="flex-1"
                                    >
                                        Next Question
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={Object.keys(selectedAnswers).length !== quizQuestions.length}
                                        className="flex-1"
                                    >
                                        Submit Quiz
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </>
            ) : (
                <>
                    {/* Results */}
                    <Card className="border-2 border-primary">
                        <CardHeader>
                            <CardTitle className="text-2xl text-center">Quiz Results</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="text-center">
                                <div className="text-6xl font-bold text-primary mb-2">
                                    {score}/{quizQuestions.length}
                                </div>
                                <p className="text-xl text-muted-foreground">
                                    {score === quizQuestions.length
                                        ? '🎉 Perfect Score!'
                                        : score >= quizQuestions.length * 0.8
                                            ? '✨ Excellent!'
                                            : score >= quizQuestions.length * 0.6
                                                ? '👍 Good Job!'
                                                : '📚 Keep Learning!'}
                                </p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    {((score / quizQuestions.length) * 100).toFixed(0)}% Correct
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Review Your Answers:</h3>
                                {quizQuestions.map((q, index) => {
                                    const userAnswer = parseInt(selectedAnswers[q.id])
                                    const isCorrect = userAnswer === q.correct
                                    return (
                                        <Card key={q.id} className={isCorrect ? 'border-green-500' : 'border-red-500'}>
                                            <CardContent className="p-4">
                                                <div className="flex items-start gap-3">
                                                    {isCorrect ? (
                                                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                                                    ) : (
                                                        <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                                                    )}
                                                    <div className="flex-1">
                                                        <p className="font-semibold mb-2">
                                                            {index + 1}. {q.question}
                                                        </p>
                                                        <div className="space-y-1 text-sm">
                                                            <p>
                                                                <span className="text-muted-foreground">Your answer:</span>{' '}
                                                                <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                                                                    {q.options[userAnswer]}
                                                                </span>
                                                            </p>
                                                            {!isCorrect && (
                                                                <p>
                                                                    <span className="text-muted-foreground">Correct answer:</span>{' '}
                                                                    <span className="text-green-600">{q.options[q.correct]}</span>
                                                                </p>
                                                            )}
                                                            <p className="text-muted-foreground italic mt-2">
                                                                {q.explanation}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                            </div>

                            <div className="flex gap-2">
                                <Button onClick={resetQuiz} variant="outline" className="flex-1">
                                    Retake Quiz
                                </Button>
                                <Button asChild className="flex-1">
                                    <Link href="/lab/unit-4">Return to Unit 4 Labs</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </>
            )}

            {/* Quick Tips */}
            {!showResults && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">💡 Quick Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Review the study guide before starting</li>
                            <li>• You can navigate between questions before submitting</li>
                            <li>• All questions must be answered to submit</li>
                            <li>• You'll see detailed explanations after submission</li>
                            <li>• You can retake the quiz as many times as you want</li>
                        </ul>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
