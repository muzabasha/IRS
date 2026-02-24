'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { ArrowLeft, CheckCircle, XCircle, ExternalLink, BookOpen } from 'lucide-react'

export default function Unit1QuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
    const [showResults, setShowResults] = useState(false)
    const [score, setScore] = useState(0)

    const quizQuestions = [
        {
            id: 1,
            question: "What is the main limitation of the Boolean Model?",
            options: [
                "It's too slow for large datasets",
                "It cannot rank documents by relevance",
                "It requires too much storage",
                "It only works with English text"
            ],
            correct: 1,
            explanation: "The Boolean Model returns binary results (match or no match) without ranking, making it difficult to prioritize results when thousands of documents match."
        },
        {
            id: 2,
            question: "In the Vector Space Model, what does TF-IDF stand for?",
            options: [
                "Term Frequency - Inverse Document Frequency",
                "Text Format - Indexed Data File",
                "Total Files - Individual Document Frequency",
                "Term Filter - Inverse Data Format"
            ],
            correct: 0,
            explanation: "TF-IDF (Term Frequency - Inverse Document Frequency) weights terms based on how often they appear in a document (TF) and how rare they are across all documents (IDF)."
        },
        {
            id: 3,
            question: "What similarity measure does the Vector Space Model use?",
            options: [
                "Euclidean Distance",
                "Manhattan Distance",
                "Cosine Similarity",
                "Hamming Distance"
            ],
            correct: 2,
            explanation: "Cosine Similarity measures the angle between document and query vectors, ranging from 0 (orthogonal/unrelated) to 1 (identical direction/highly similar)."
        },
        {
            id: 4,
            question: "What does the BM25 algorithm improve upon compared to basic TF-IDF?",
            options: [
                "It's faster to compute",
                "It uses less memory",
                "It handles term saturation and document length normalization",
                "It works with images"
            ],
            correct: 2,
            explanation: "BM25 addresses TF saturation (diminishing returns for repeated terms) and normalizes for document length, preventing bias toward longer documents."
        },
        {
            id: 5,
            question: "In Structured Text Retrieval, what does the 'interval containment' model do?",
            options: [
                "Measures time intervals between queries",
                "Finds text within specific document structures (like XML tags)",
                "Calculates the interval between word occurrences",
                "Determines the time to retrieve a document"
            ],
            correct: 1,
            explanation: "Interval containment allows queries to specify both content and structure, like finding 'Shakespeare' within <author> tags in XML documents."
        },
        {
            id: 6,
            question: "What is the Berry-Picking model in browsing?",
            options: [
                "A method for selecting the best search results",
                "An iterative search process where queries evolve based on findings",
                "A technique for picking relevant keywords",
                "A way to organize search results"
            ],
            correct: 1,
            explanation: "Berry-Picking models how users gather information bit by bit across multiple queries, with each result informing the next query - like picking berries from different bushes."
        },
        {
            id: 7,
            question: "What is 'information scent' in browsing models?",
            options: [
                "The metadata attached to documents",
                "Cues that indicate whether a link will lead to relevant information",
                "The timestamp of when information was created",
                "The source of the information"
            ],
            correct: 1,
            explanation: "Information scent refers to cues (like link text, snippets, URLs) that help users predict whether following a link will lead to relevant information."
        },
        {
            id: 8,
            question: "In the Probabilistic Model, what does P(R|d,q) represent?",
            options: [
                "Probability of retrieving document d",
                "Probability that document d is relevant given query q",
                "Probability of query q matching document d",
                "Probability of ranking document d first"
            ],
            correct: 1,
            explanation: "P(R|d,q) is the probability that document d is relevant (R) given the query q - the core of probabilistic ranking."
        },
        {
            id: 9,
            question: "What is the main advantage of the Vector Space Model over Boolean Model?",
            options: [
                "It's faster",
                "It uses less memory",
                "It provides ranked results with partial matching",
                "It's easier to implement"
            ],
            correct: 2,
            explanation: "VSM ranks documents by similarity scores (0 to 1) and allows partial matching - documents can be somewhat relevant even if not all query terms are present."
        },
        {
            id: 10,
            question: "What does the 'k1' parameter control in BM25?",
            options: [
                "The number of results to return",
                "Term frequency saturation",
                "Document length normalization",
                "Query expansion factor"
            ],
            correct: 1,
            explanation: "The k1 parameter (typically 1.2-2.0) controls how quickly term frequency saturates - higher k1 means more weight on term frequency."
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
                    <Link href="/lab">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Labs
                    </Link>
                </Button>
                <Badge variant="outline">Unit 1 Assessment</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold">Unit 1: IR Models Quiz</h1>
                <p className="text-lg text-muted-foreground">
                    Test your understanding of Information Retrieval models
                </p>
            </div>

            {/* Study Resources */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Study Resources
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                        Review these comprehensive study guides before taking the quiz:
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                        <a
                            href="https://notebooklm.google.com/notebook/2e3c71e9-42bd-4aeb-b933-eabaaa20129e?artifactId=a5538253-db9a-42a0-9dba-598e2d82d430"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                        >
                            <ExternalLink className="h-4 w-4 text-primary" />
                            <div>
                                <p className="font-semibold text-sm">Study Guide 1</p>
                                <p className="text-xs text-muted-foreground">NotebookLM - IR Models Overview</p>
                            </div>
                        </a>
                        <a
                            href="https://notebooklm.google.com/notebook/fec69f51-95b9-4ba3-9217-40b0f8886df4?artifactId=9837ee1d-7e02-4d96-b17e-dc47067b42a7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                        >
                            <ExternalLink className="h-4 w-4 text-primary" />
                            <div>
                                <p className="font-semibold text-sm">Study Guide 2</p>
                                <p className="text-xs text-muted-foreground">NotebookLM - Advanced Concepts</p>
                            </div>
                        </a>
                    </div>
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
                                    <Link href="/lab">Return to Labs</Link>
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
                            <li>• Review the study guides before starting</li>
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
