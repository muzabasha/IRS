'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { ArrowLeft, CheckCircle, XCircle, ExternalLink, BookOpen } from 'lucide-react'

export default function Unit3QuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
    const [showResults, setShowResults] = useState(false)
    const [score, setScore] = useState(0)

    const quizQuestions = [
        {
            id: 1,
            question: "What does Fitts's Law predict in HCI?",
            options: [
                "The time to read text on screen",
                "The time to move to and select a target based on distance and size",
                "The number of clicks needed to complete a task",
                "The cognitive load of a user interface"
            ],
            correct: 1,
            explanation: "Fitts's Law predicts that movement time = a + b × log₂(D/W + 1), where D is distance to target and W is target width. Larger, closer targets are faster to select."
        },
        {
            id: 2,
            question: "What is the primary purpose of query autocompletion in search interfaces?",
            options: [
                "To reduce server load",
                "To help users formulate queries faster and reduce typing errors",
                "To collect user data",
                "To display advertisements"
            ],
            correct: 1,
            explanation: "Query autocompletion suggests completions as users type, helping them formulate queries faster, reducing typos, and exposing them to related query possibilities."
        },
        {
            id: 3,
            question: "What is a KWIC (Key Word In Context) snippet?",
            options: [
                "A summary of the entire document",
                "A text fragment showing query terms with surrounding context",
                "A list of all keywords in a document",
                "The document's metadata"
            ],
            correct: 1,
            explanation: "KWIC snippets show query terms highlighted within their surrounding context (usually a sentence or phrase), helping users quickly assess relevance without reading full documents."
        },
        {
            id: 4,
            question: "What is the Levenshtein distance used for in query specification?",
            options: [
                "Ranking documents by relevance",
                "Measuring edit distance between strings for spell checking",
                "Calculating query execution time",
                "Determining document similarity"
            ],
            correct: 1,
            explanation: "Levenshtein distance counts the minimum number of single-character edits (insertions, deletions, substitutions) needed to transform one string into another, enabling spell correction."
        },
        {
            id: 5,
            question: "In faceted search, what are facets?",
            options: [
                "Different search engines",
                "Categories or attributes for filtering results (e.g., date, author, type)",
                "Different ranking algorithms",
                "Types of query operators"
            ],
            correct: 1,
            explanation: "Facets are categorical attributes (like date, author, file type, price range) that users can select to filter and narrow down search results interactively."
        },
        {
            id: 6,
            question: "What is the main advantage of cluster-based result visualization?",
            options: [
                "Faster query processing",
                "Groups similar documents together, revealing topic structure",
                "Reduces storage requirements",
                "Improves indexing speed"
            ],
            correct: 1,
            explanation: "Cluster visualization groups similar documents by topic, helping users explore result space, discover related content, and understand the diversity of results."
        },
        {
            id: 7,
            question: "What does the Berry-Picking model describe in the search process?",
            options: [
                "A ranking algorithm",
                "An iterative, evolving search process where users gather information bit by bit",
                "A method for indexing documents",
                "A compression technique"
            ],
            correct: 1,
            explanation: "Berry-Picking models how users' information needs and queries evolve during search, gathering relevant information incrementally from multiple sources and queries."
        },
        {
            id: 8,
            question: "What is a Trie data structure commonly used for in search interfaces?",
            options: [
                "Document ranking",
                "Efficient prefix-based autocompletion",
                "Image compression",
                "Spell checking only"
            ],
            correct: 1,
            explanation: "A Trie (prefix tree) efficiently stores strings and enables fast prefix-based lookups, making it ideal for implementing query autocompletion features."
        },
        {
            id: 9,
            question: "What is the purpose of result diversification in search interfaces?",
            options: [
                "To show results from different servers",
                "To ensure results cover different aspects/interpretations of ambiguous queries",
                "To display results in different languages",
                "To randomize result order"
            ],
            correct: 1,
            explanation: "Result diversification ensures that top results cover different aspects or interpretations of a query, especially for ambiguous queries, improving overall user satisfaction."
        },
        {
            id: 10,
            question: "What is the 'information scent' principle in search interfaces?",
            options: [
                "The metadata of documents",
                "Visual cues that help users predict if a link will lead to relevant information",
                "The ranking score of documents",
                "The freshness of content"
            ],
            correct: 1,
            explanation: "Information scent refers to cues (link text, snippets, URLs, thumbnails) that help users predict whether following a link will lead to relevant information, guiding navigation decisions."
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
                    <Link href="/lab/unit-3">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 3 Labs
                    </Link>
                </Button>
                <Badge variant="outline">Unit 3 Assessment</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold">Unit 3: User Interfaces Quiz</h1>
                <p className="text-lg text-muted-foreground">
                    Test your understanding of HCI principles, query specification, and result visualization
                </p>
            </div>

            {/* Study Resources */}
            <Card className="border-l-4 border-l-purple-500">
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
                        href="https://notebooklm.google.com/notebook/37fe4407-18f8-43bb-a909-700f3fc4a0a8?artifactId=35d2ef0b-330d-44c6-a978-d67f9f043cd7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                        <ExternalLink className="h-4 w-4 text-primary" />
                        <div>
                            <p className="font-semibold text-sm">Unit 3 Study Guide</p>
                            <p className="text-xs text-muted-foreground">NotebookLM - User Interfaces & Visualization</p>
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
                                    <Link href="/lab/unit-3">Return to Unit 3 Labs</Link>
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
