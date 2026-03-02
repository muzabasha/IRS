'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function DocumentClusteringLab() {
    const documents = [
        { id: 1, text: 'machine learning algorithms', cluster: 'A' },
        { id: 2, text: 'neural networks deep learning', cluster: 'A' },
        { id: 3, text: 'database management systems', cluster: 'B' },
        { id: 4, text: 'SQL database queries', cluster: 'B' }
    ]

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-2">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 2 Labs
                    </Link>
                </Button>
                <Badge>Lab 8 of 12</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold">Document Clustering Lab</h1>
                <p className="text-2xl text-muted-foreground">
                    Group similar documents automatically
                </p>
            </div>

            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💡</span> Motivation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-xl text-muted-foreground">
                        Birds of a feather flock together - so do documents about the same topic. Clustering helps organize results, speed up search, and discover document relationships.
                    </p>
                </CardContent>
            </Card>

            <Card className="border-4 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-3xl">
                        <span className="text-4xl">💻</span> K-Means Clustering Demo
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-xl font-semibold">Documents:</label>
                        <div className="space-y-3">
                            {documents.map((doc) => (
                                <div key={doc.id} className={`p-6 rounded-lg border-2 ${doc.cluster === 'A' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' : 'border-green-500 bg-green-50 dark:bg-green-950'}`}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-lg">Doc {doc.id}: {doc.text}</p>
                                        </div>
                                        <Badge className="text-lg">Cluster {doc.cluster}</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-secondary/30 p-6 rounded">
                        <p className="font-semibold text-xl mb-3">Clustering Result:</p>
                        <ul className="space-y-2 text-lg">
                            <li>• Cluster A: Machine Learning documents (Docs 1, 2)</li>
                            <li>• Cluster B: Database documents (Docs 3, 4)</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-between">
                <Button variant="outline" asChild size="lg">
                    <Link href="/lab/unit-2/text-preprocessing">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Previous: Text Preprocessing
                    </Link>
                </Button>
                <Button asChild size="lg">
                    <Link href="/lab/unit-2/text-compression">
                        Next: Text Compression <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
