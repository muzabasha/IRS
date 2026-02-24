'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { ArrowLeft, CheckCircle, XCircle, ExternalLink, BookOpen } from 'lucide-react'

export default function Unit2QuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
    const [showResults, setShowResults] = useState(false)
    const [score, setScore] = useState(0)

    const quizQuestions = [
        {
            id: 1,
            question: "What is the primary purpose of an inverted index in Information Retrieval?",
            options: [
                "To store documents in reverse order",
                "To map terms to the documents containing them",
                "To compress document storage",
                "To rank documents by relevance"
            ],
            correct: 1,
            explanation: "An inverted index maps each term to a list of documents (posting list) containing that term, enabling fast retrieval of documents matching query terms."
        },
        {
            id: 2,
            question: "In the Rocchio Algorithm for relevance feedback, what do the α, β, and γ parameters control?",
            options: [
                "Document length, term frequency, and inverse document frequency",
                "Weights for original query, relevant documents, and non-relevant documents",
                "Precision, recall, and F1-score",
                "Tokenization, stemming, and stopword removal"
            ],
            correct: 1,
            explanation: "α controls the weight of the original query, β controls the weight of relevant documents, and γ controls the weight of non-relevant documents in query modification."
        },
        {
            id: 3,
            question: "What is the main advantage of gap encoding in inverted indexes?",
            options: [
                "Faster query processing",
                "Better ranking accuracy",
                "Reduced storage space by storing differences between document IDs",
                "Improved stemming accuracy"
            ],
            correct: 2,
            explanation: "Gap encoding stores the difference between consecutive document IDs rather than absolute IDs, resulting in smaller numbers that compress better and save storage space."
        },
        {
            id: 4,
            question: "Which text preprocessing step removes common words like 'the', 'is', 'and'?",
            options: [
                "Tokenization",
                "Stemming",
                "Stopword removal",
                "Lemmatization"
            ],
            correct: 2,
            explanation: "Stopword removal eliminates high-frequency, low-information words (like 'the', 'is', 'and') that don't contribute to document meaning, reducing index size and improving efficiency."
        },
        {
            id: 5,
            question: "What is the purpose of stemming in text preprocessing?",
            options: [
                "To remove punctuation marks",
                "To reduce words to their root form",
                "To identify named entities",
                "To detect language"
            ],
            correct: 1,
            explanation: "Stemming reduces words to their root/stem form (e.g., 'running', 'runs', 'ran' → 'run'), helping match different forms of the same word and improving recall."
        },
        {
            id: 6,
            question: "In query languages, what does a proximity query like 'machine NEAR/5 learning' mean?",
            options: [
                "Find 'machine' or 'learning' within 5 documents",
                "Find 'machine' and 'learning' within 5 words of each other",
                "Find exactly 5 occurrences of both terms",
                "Find documents with similarity score above 0.5"
            ],
            correct: 1,
            explanation: "Proximity queries find documents where specified terms appear within a certain distance (word count) of each other, capturing phrase-like relationships without requiring exact phrases."
        },
        {
            id: 7,
            question: "What is the main goal of relevance feedback in IR systems?",
            options: [
                "To compress the index",
                "To improve query results by learning from user feedback",
                "To remove duplicate documents",
                "To translate queries to different languages"
            ],
            correct: 1,
            explanation: "Relevance feedback uses information about which documents users found relevant/non-relevant to automatically refine the query, improving subsequent search results."
        },
        {
            id: 8,
            question: "What is Huffman coding used for in text preprocessing?",
            options: [
                "Stemming words",
                "Removing stopwords",
                "Compressing text by assigning shorter codes to frequent characters",
                "Tokenizing sentences"
            ],
            correct: 2,
            explanation: "Huffman coding is a compression technique that assigns shorter binary codes to more frequent characters and longer codes to rare characters, minimizing overall storage."
        },
        {
            id: 9,
            question: "What is a posting list in an inverted index?",
            options: [
                "A list of all terms in the vocabulary",
                "A list of document IDs containing a specific term",
                "A list of queries submitted by users",
                "A list of stopwords to remove"
            ],
            correct: 1,
            explanation: "A posting list is the list of document IDs (and often additional information like term positions) associated with a specific term in the inverted index."
        },
        {
            id: 10,
            question: "In structured queries, what does a wildcard query like 'comput*' match?",
            options: [
                "Only the exact word 'comput'",
                "Any word starting with 'comput' (computer, computing, computation)",
                "Any word containing 'comput' anywhere",
                "Only words with exactly 7 characters"
            ],
            correct: 1,
            explanation: "Wildcard queries use special characters (* or ?) to match patterns. 'comput*' matches any term starting with 'comput', enabling flexible term matching."
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
                    <Link href="/lab/unit-2">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 2 Labs
                    </Link>
                </Button>
                <Badge variant="outline">Unit 2 Assessment</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold">Unit 2: Query Operations Quiz</h1>
                <p className="text-lg text-muted-foreground">
                    Test your understanding of query processing, indexing, and text preprocessing
                </p>
            </div>

            {/* Study Resources */}
            <Card className="border-l-4 border-l-green-500">
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
                        href="https://notebooklm.google.com/notebook/3598797a-4144-4917-8800-3553d72533a6?artifactId=2977322e-ef25-4ff7-b876-f9440f1fa4d6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                        <ExternalLink className="h-4 w-4 text-primary" />
                        <div>
                            <p className="font-semibold text-sm">Unit 2 Study Guide</p>
                            <p className="text-xs text-muted-foreground">NotebookLM - Query Operations & Indexing</p>
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
                                    <Link href="/lab/unit-2">Return to Unit 2 Labs</Link>
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
