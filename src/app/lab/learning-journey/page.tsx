'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    ArrowLeft,
    CheckCircle,
    Circle,
    BookOpen,
    Code,
    FlaskConical,
    Trophy,
    Target,
    Brain,
    Zap,
    Lock,
    Star
} from 'lucide-react'

interface LearningNode {
    id: string
    title: string
    unit: number
    type: 'model' | 'technique' | 'concept'
    description: string
    prerequisites: string[]
    labUrl?: string
    quizUrl?: string
    comparisonUrl?: string
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    estimatedTime: string
}

export default function LearningJourneyPage() {
    const [completedNodes, setCompletedNodes] = useState<Set<string>>(new Set())
    const [selectedNode, setSelectedNode] = useState<LearningNode | null>(null)
    const [viewMode, setViewMode] = useState<'mindmap' | 'list'>('mindmap')

    // Load progress from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('ir-learning-progress')
        if (saved) {
            setCompletedNodes(new Set(JSON.parse(saved)))
        }
    }, [])

    // Save progress to localStorage
    const toggleNodeCompletion = (nodeId: string) => {
        const newCompleted = new Set(completedNodes)
        if (newCompleted.has(nodeId)) {
            newCompleted.delete(nodeId)
        } else {
            newCompleted.add(nodeId)
        }
        setCompletedNodes(newCompleted)
        localStorage.setItem('ir-learning-progress', JSON.stringify(Array.from(newCompleted)))
    }

    const learningNodes: LearningNode[] = [
        // Unit 1: IR Models
        {
            id: 'boolean-model',
            title: 'Boolean Model',
            unit: 1,
            type: 'model',
            description: 'Exact matching with set theory and Boolean algebra',
            prerequisites: [],
            labUrl: '/lab/boolean-model',
            difficulty: 'beginner',
            estimatedTime: '45 mins'
        },
        {
            id: 'vector-space-model',
            title: 'Vector Space Model',
            unit: 1,
            type: 'model',
            description: 'Similarity-based ranking with TF-IDF',
            prerequisites: ['boolean-model'],
            labUrl: '/lab/vector-space-model',
            difficulty: 'intermediate',
            estimatedTime: '60 mins'
        },
        {
            id: 'probabilistic-model',
            title: 'Probabilistic Model (BM25)',
            unit: 1,
            type: 'model',
            description: 'Probability-based relevance ranking',
            prerequisites: ['vector-space-model'],
            labUrl: '/lab/probabilistic-model',
            difficulty: 'intermediate',
            estimatedTime: '60 mins'
        },
        {
            id: 'structured-text',
            title: 'Structured Text Retrieval',
            unit: 1,
            type: 'model',
            description: 'Content-in-context with hierarchical structures',
            prerequisites: ['probabilistic-model'],
            labUrl: '/lab/structured-text-retrieval',
            difficulty: 'advanced',
            estimatedTime: '75 mins'
        },
        {
            id: 'browsing-models',
            title: 'Browsing Models',
            unit: 1,
            type: 'model',
            description: 'Exploratory navigation and Berry-Picking',
            prerequisites: ['structured-text'],
            labUrl: '/lab/browsing-models',
            difficulty: 'advanced',
            estimatedTime: '75 mins'
        },
        {
            id: 'unit1-comparison',
            title: 'Unit 1 Model Comparison',
            unit: 1,
            type: 'concept',
            description: 'Compare all IR models side-by-side',
            prerequisites: ['boolean-model', 'vector-space-model', 'probabilistic-model'],
            comparisonUrl: '/lab/model-comparison',
            difficulty: 'intermediate',
            estimatedTime: '30 mins'
        },
        {
            id: 'unit1-quiz',
            title: 'Unit 1 Assessment',
            unit: 1,
            type: 'concept',
            description: 'Test your understanding of IR models',
            prerequisites: ['browsing-models'],
            quizUrl: '/lab/unit-1-quiz',
            difficulty: 'intermediate',
            estimatedTime: '20 mins'
        },

        // Unit 2: Query Operations
        {
            id: 'query-languages',
            title: 'Query Languages',
            unit: 2,
            type: 'technique',
            description: 'Keyword, pattern, and structural queries',
            prerequisites: ['boolean-model'],
            labUrl: '/lab/unit-2/query-languages',
            difficulty: 'beginner',
            estimatedTime: '45 mins'
        },
        {
            id: 'relevance-feedback',
            title: 'Relevance Feedback',
            unit: 2,
            type: 'technique',
            description: 'Interactive query refinement with Rocchio',
            prerequisites: ['vector-space-model', 'query-languages'],
            labUrl: '/lab/unit-2/relevance-feedback',
            difficulty: 'intermediate',
            estimatedTime: '60 mins'
        },
        {
            id: 'text-preprocessing',
            title: 'Text Preprocessing',
            unit: 2,
            type: 'technique',
            description: 'Tokenization, stemming, and compression',
            prerequisites: ['query-languages'],
            labUrl: '/lab/unit-2/text-preprocessing',
            difficulty: 'intermediate',
            estimatedTime: '50 mins'
        },
        {
            id: 'inverted-index',
            title: 'Inverted Index',
            unit: 2,
            type: 'technique',
            description: 'Building and searching with inverted files',
            prerequisites: ['text-preprocessing'],
            labUrl: '/lab/unit-2/inverted-index',
            difficulty: 'advanced',
            estimatedTime: '75 mins'
        },
        {
            id: 'unit2-comparison',
            title: 'Unit 2 Technique Comparison',
            unit: 2,
            type: 'concept',
            description: 'Compare query operations side-by-side',
            prerequisites: ['query-languages', 'text-preprocessing', 'inverted-index'],
            comparisonUrl: '/lab/unit-2-comparison',
            difficulty: 'intermediate',
            estimatedTime: '30 mins'
        },
        {
            id: 'unit2-quiz',
            title: 'Unit 2 Assessment',
            unit: 2,
            type: 'concept',
            description: 'Test your understanding of query operations',
            prerequisites: ['inverted-index'],
            quizUrl: '/lab/unit-2-quiz',
            difficulty: 'intermediate',
            estimatedTime: '20 mins'
        },

        // Unit 3: User Interfaces
        {
            id: 'hci-principles',
            title: 'HCI Principles',
            unit: 3,
            type: 'concept',
            description: 'User-centered design and Fitts\'s Law',
            prerequisites: ['browsing-models'],
            labUrl: '/lab/unit-3/hci-principles',
            difficulty: 'beginner',
            estimatedTime: '45 mins'
        },
        {
            id: 'search-process',
            title: 'Information Access Process',
            unit: 3,
            type: 'concept',
            description: 'Berry-Picking model and iterative search',
            prerequisites: ['hci-principles'],
            labUrl: '/lab/unit-3/search-process',
            difficulty: 'intermediate',
            estimatedTime: '50 mins'
        },
        {
            id: 'query-specification',
            title: 'Query Specification UI',
            unit: 3,
            type: 'technique',
            description: 'Autocomplete, spell-check, and input methods',
            prerequisites: ['search-process', 'query-languages'],
            labUrl: '/lab/unit-3/query-specification',
            difficulty: 'intermediate',
            estimatedTime: '60 mins'
        },
        {
            id: 'result-visualization',
            title: 'Result Visualization',
            unit: 3,
            type: 'technique',
            description: 'Snippets, clustering, and faceted search',
            prerequisites: ['query-specification'],
            labUrl: '/lab/unit-3/result-visualization',
            difficulty: 'advanced',
            estimatedTime: '75 mins'
        },
        {
            id: 'unit3-comparison',
            title: 'Unit 3 UI Comparison',
            unit: 3,
            type: 'concept',
            description: 'Compare UI techniques side-by-side',
            prerequisites: ['hci-principles', 'query-specification', 'result-visualization'],
            comparisonUrl: '/lab/unit-3-comparison',
            difficulty: 'intermediate',
            estimatedTime: '30 mins'
        },
        {
            id: 'unit3-quiz',
            title: 'Unit 3 Assessment',
            unit: 3,
            type: 'concept',
            description: 'Test your understanding of user interfaces',
            prerequisites: ['result-visualization'],
            quizUrl: '/lab/unit-3-quiz',
            difficulty: 'intermediate',
            estimatedTime: '20 mins'
        },

        // Unit 4: Multimedia & Web
        {
            id: 'multimedia-ir',
            title: 'Multimedia IR',
            unit: 4,
            type: 'technique',
            description: 'Image retrieval with color histograms',
            prerequisites: ['vector-space-model'],
            labUrl: '/lab/unit-4/multimedia-ir',
            difficulty: 'intermediate',
            estimatedTime: '60 mins'
        },
        {
            id: 'web-crawling',
            title: 'Web Crawling',
            unit: 4,
            type: 'technique',
            description: 'Building a web crawler and handling scale',
            prerequisites: ['inverted-index'],
            labUrl: '/lab/unit-4/web-crawling',
            difficulty: 'intermediate',
            estimatedTime: '50 mins'
        },
        {
            id: 'pagerank',
            title: 'PageRank Algorithm',
            unit: 4,
            type: 'model',
            description: 'Link analysis and authority scoring',
            prerequisites: ['web-crawling'],
            labUrl: '/lab/unit-4/pagerank',
            difficulty: 'advanced',
            estimatedTime: '75 mins'
        },
        {
            id: 'meta-search',
            title: 'Meta-search Engines',
            unit: 4,
            type: 'technique',
            description: 'Aggregating results from multiple engines',
            prerequisites: ['pagerank'],
            labUrl: '/lab/unit-4/meta-search',
            difficulty: 'advanced',
            estimatedTime: '60 mins'
        },
        {
            id: 'unit4-comparison',
            title: 'Unit 4 Web Search Comparison',
            unit: 4,
            type: 'concept',
            description: 'Compare multimedia and web techniques',
            prerequisites: ['multimedia-ir', 'web-crawling', 'pagerank', 'meta-search'],
            comparisonUrl: '/lab/unit-4-comparison',
            difficulty: 'advanced',
            estimatedTime: '30 mins'
        },
        {
            id: 'unit4-quiz',
            title: 'Unit 4 Assessment',
            unit: 4,
            type: 'concept',
            description: 'Test your understanding of multimedia & web search',
            prerequisites: ['meta-search'],
            quizUrl: '/lab/unit-4-quiz',
            difficulty: 'intermediate',
            estimatedTime: '20 mins'
        }
    ]

    const isNodeUnlocked = (node: LearningNode) => {
        if (node.prerequisites.length === 0) return true
        return node.prerequisites.every(prereq => completedNodes.has(prereq))
    }

    const getNodesByUnit = (unit: number) => {
        return learningNodes.filter(node => node.unit === unit)
    }

    const calculateProgress = () => {
        const total = learningNodes.length
        const completed = completedNodes.size
        return Math.round((completed / total) * 100)
    }

    const calculateUnitProgress = (unit: number) => {
        const unitNodes = getNodesByUnit(unit)
        const completed = unitNodes.filter(node => completedNodes.has(node.id)).length
        return Math.round((completed / unitNodes.length) * 100)
    }

    const getNodeIcon = (node: LearningNode) => {
        if (completedNodes.has(node.id)) return <CheckCircle className="h-5 w-5 text-green-600" />
        if (!isNodeUnlocked(node)) return <Lock className="h-5 w-5 text-gray-400" />
        return <Circle className="h-5 w-5 text-blue-600" />
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'model': return <Brain className="h-4 w-4" />
            case 'technique': return <Code className="h-4 w-4" />
            case 'concept': return <Target className="h-4 w-4" />
            default: return <BookOpen className="h-4 w-4" />
        }
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner': return 'bg-green-500'
            case 'intermediate': return 'bg-yellow-500'
            case 'advanced': return 'bg-red-500'
            default: return 'bg-gray-500'
        }
    }

    const overallProgress = calculateProgress()

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Labs
                    </Link>
                </Button>
                <Badge variant="outline" className="text-lg px-4 py-2">
                    <Trophy className="h-4 w-4 mr-2" />
                    {completedNodes.size} / {learningNodes.length} Completed
                </Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold">Your Learning Journey</h1>
                <p className="text-lg text-muted-foreground">
                    Interactive mind map to explore and track your progress across all IR concepts
                </p>
            </div>

            {/* Overall Progress */}
            <Card className="border-2 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Star className="h-6 w-6 text-yellow-500" />
                        Overall Progress
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="font-semibold">Course Completion</span>
                            <span className="text-muted-foreground">{overallProgress}%</span>
                        </div>
                        <Progress value={overallProgress} className="h-3" />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(unit => {
                            const progress = calculateUnitProgress(unit)
                            return (
                                <div key={unit} className="text-center">
                                    <p className="text-sm font-semibold mb-1">Unit {unit}</p>
                                    <Progress value={progress} className="h-2 mb-1" />
                                    <p className="text-xs text-muted-foreground">{progress}%</p>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
                <Button
                    variant={viewMode === 'mindmap' ? 'default' : 'outline'}
                    onClick={() => setViewMode('mindmap')}
                >
                    <Brain className="h-4 w-4 mr-2" />
                    Mind Map View
                </Button>
                <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    onClick={() => setViewMode('list')}
                >
                    <BookOpen className="h-4 w-4 mr-2" />
                    List View
                </Button>
            </div>

            {viewMode === 'mindmap' ? (
                <Tabs defaultValue="unit1" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="unit1">Unit 1: Models</TabsTrigger>
                        <TabsTrigger value="unit2">Unit 2: Operations</TabsTrigger>
                        <TabsTrigger value="unit3">Unit 3: UI</TabsTrigger>
                        <TabsTrigger value="unit4">Unit 4: Web</TabsTrigger>
                    </TabsList>

                    {[1, 2, 3, 4].map(unit => (
                        <TabsContent key={unit} value={`unit${unit}`} className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Unit {unit} Learning Path</CardTitle>
                                    <Progress value={calculateUnitProgress(unit)} className="h-2" />
                                </CardHeader>
                                <CardContent>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {getNodesByUnit(unit).map(node => {
                                            const isUnlocked = isNodeUnlocked(node)
                                            const isCompleted = completedNodes.has(node.id)

                                            return (
                                                <Card
                                                    key={node.id}
                                                    className={`cursor-pointer transition-all ${isCompleted ? 'border-green-500 bg-green-50 dark:bg-green-950' :
                                                            !isUnlocked ? 'opacity-50 cursor-not-allowed' :
                                                                'hover:shadow-lg hover:border-primary'
                                                        }`}
                                                    onClick={() => isUnlocked && setSelectedNode(node)}
                                                >
                                                    <CardContent className="p-4">
                                                        <div className="flex items-start justify-between mb-2">
                                                            {getNodeIcon(node)}
                                                            <div className="flex gap-1">
                                                                {getTypeIcon(node.type)}
                                                                <div className={`h-2 w-2 rounded-full ${getDifficultyColor(node.difficulty)}`} />
                                                            </div>
                                                        </div>
                                                        <h4 className="font-bold mb-1">{node.title}</h4>
                                                        <p className="text-xs text-muted-foreground mb-2">
                                                            {node.description}
                                                        </p>
                                                        <div className="flex items-center justify-between text-xs">
                                                            <Badge variant="outline">{node.estimatedTime}</Badge>
                                                            {!isUnlocked && (
                                                                <span className="text-red-500">Locked</span>
                                                            )}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            )
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    ))}
                </Tabs>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>All Learning Nodes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {learningNodes.map(node => {
                                const isUnlocked = isNodeUnlocked(node)
                                const isCompleted = completedNodes.has(node.id)

                                return (
                                    <div
                                        key={node.id}
                                        className={`flex items-center gap-4 p-4 rounded-lg border ${isCompleted ? 'bg-green-50 dark:bg-green-950 border-green-500' :
                                                !isUnlocked ? 'opacity-50' :
                                                    'hover:bg-secondary/50'
                                            } cursor-pointer transition-all`}
                                        onClick={() => isUnlocked && setSelectedNode(node)}
                                    >
                                        {getNodeIcon(node)}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-bold">{node.title}</h4>
                                                <Badge variant="outline">Unit {node.unit}</Badge>
                                                <Badge variant="outline" className="capitalize">{node.type}</Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{node.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-muted-foreground mb-1">{node.estimatedTime}</p>
                                            <div className={`h-2 w-16 rounded-full ${getDifficultyColor(node.difficulty)}`} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Selected Node Detail */}
            {selectedNode && (
                <Card className="border-2 border-primary">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                {getTypeIcon(selectedNode.type)}
                                {selectedNode.title}
                            </CardTitle>
                            <Button
                                variant={completedNodes.has(selectedNode.id) ? 'default' : 'outline'}
                                onClick={() => toggleNodeCompletion(selectedNode.id)}
                            >
                                {completedNodes.has(selectedNode.id) ? (
                                    <>
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Completed
                                    </>
                                ) : (
                                    <>
                                        <Circle className="h-4 w-4 mr-2" />
                                        Mark Complete
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-secondary/30 p-3 rounded">
                                <p className="text-xs text-muted-foreground mb-1">Unit</p>
                                <p className="font-semibold">Unit {selectedNode.unit}</p>
                            </div>
                            <div className="bg-secondary/30 p-3 rounded">
                                <p className="text-xs text-muted-foreground mb-1">Difficulty</p>
                                <Badge className={getDifficultyColor(selectedNode.difficulty)}>
                                    {selectedNode.difficulty}
                                </Badge>
                            </div>
                            <div className="bg-secondary/30 p-3 rounded">
                                <p className="text-xs text-muted-foreground mb-1">Estimated Time</p>
                                <p className="font-semibold">{selectedNode.estimatedTime}</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-semibold mb-2">Description:</p>
                            <p className="text-sm text-muted-foreground">{selectedNode.description}</p>
                        </div>

                        {selectedNode.prerequisites.length > 0 && (
                            <div>
                                <p className="text-sm font-semibold mb-2">Prerequisites:</p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedNode.prerequisites.map(prereqId => {
                                        const prereq = learningNodes.find(n => n.id === prereqId)
                                        return prereq ? (
                                            <Badge
                                                key={prereqId}
                                                variant={completedNodes.has(prereqId) ? 'default' : 'outline'}
                                            >
                                                {completedNodes.has(prereqId) && <CheckCircle className="h-3 w-3 mr-1" />}
                                                {prereq.title}
                                            </Badge>
                                        ) : null
                                    })}
                                </div>
                            </div>
                        )}

                        <div className="flex gap-2">
                            {selectedNode.labUrl && (
                                <Button asChild className="flex-1">
                                    <Link href={selectedNode.labUrl}>
                                        <FlaskConical className="h-4 w-4 mr-2" />
                                        Start Lab
                                    </Link>
                                </Button>
                            )}
                            {selectedNode.quizUrl && (
                                <Button asChild variant="outline" className="flex-1">
                                    <Link href={selectedNode.quizUrl}>
                                        <Zap className="h-4 w-4 mr-2" />
                                        Take Quiz
                                    </Link>
                                </Button>
                            )}
                            {selectedNode.comparisonUrl && (
                                <Button asChild variant="outline" className="flex-1">
                                    <Link href={selectedNode.comparisonUrl}>
                                        <Target className="h-4 w-4 mr-2" />
                                        View Comparison
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Legend */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Legend</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="space-y-2">
                            <p className="font-semibold">Status:</p>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span>Completed</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Circle className="h-4 w-4 text-blue-600" />
                                <span>Available</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Lock className="h-4 w-4 text-gray-400" />
                                <span>Locked</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="font-semibold">Type:</p>
                            <div className="flex items-center gap-2">
                                <Brain className="h-4 w-4" />
                                <span>Model</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Code className="h-4 w-4" />
                                <span>Technique</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Target className="h-4 w-4" />
                                <span>Concept</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="font-semibold">Difficulty:</p>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-green-500" />
                                <span>Beginner</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                                <span>Intermediate</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-500" />
                                <span>Advanced</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
