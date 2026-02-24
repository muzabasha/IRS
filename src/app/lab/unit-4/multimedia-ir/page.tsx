'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

export default function MultimediaIRLab() {
    const [queryImage, setQueryImage] = useState([0.8, 0.2, 0.1])
    const [distances, setDistances] = useState<number[]>([])

    const imageDatabase = [
        { id: 1, name: 'Sunset', features: [0.9, 0.3, 0.1], desc: 'Red/orange dominant' },
        { id: 2, name: 'Ocean', features: [0.1, 0.2, 0.9], desc: 'Blue dominant' },
        { id: 3, name: 'Forest', features: [0.2, 0.8, 0.2], desc: 'Green dominant' },
        { id: 4, name: 'Desert', features: [0.7, 0.5, 0.1], desc: 'Red/yellow mix' },
    ]

    const euclideanDistance = (a: number[], b: number[]): number => {
        return Math.sqrt(a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0))
    }

    const searchSimilar = () => {
        const dists = imageDatabase.map(img => ({
            ...img,
            distance: euclideanDistance(queryImage, img.features)
        }))
        dists.sort((a, b) => a.distance - b.distance)
        setDistances(dists.map(d => d.distance))
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab/unit-4">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 4 Labs
                    </Link>
                </Button>
                <Badge>Lab 1 of 4</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold">Multimedia IR Lab</h1>
                <p className="text-lg text-muted-foreground">
                    Content-Based Image Retrieval with color features
                </p>
            </div>

            {/* Motivation */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💡</span> Motivation: Searching Beyond Text
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        How do you search for an image when you can't describe it in words? Multimedia IR extracts
                        mathematical features (colors, textures, shapes) and finds similar content.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Real-world Applications:</p>
                        <ul className="space-y-1 text-sm">
                            <li>• Google Lens - search by taking a photo</li>
                            <li>• Shazam - identify songs by audio fingerprint</li>
                            <li>• Pinterest - find similar products visually</li>
                            <li>• Medical imaging - find similar X-rays/MRIs</li>
                        </ul>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">The Semantic Gap:</p>
                        <p className="text-sm">
                            The difference between low-level features (pixels, colors) and high-level concepts (happy dog, sunset).
                            Deep learning helps bridge this gap.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Euclidean Distance */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">📐</span> Euclidean Distance Formula
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-secondary/30 p-6 rounded-lg font-mono text-center">
                        <div className="text-lg">d(x, y) = √(Σ(x_i - y_i)²)</div>
                    </div>
                    <div className="space-y-3">
                        <div className="grid gap-3">
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">d(x, y)</span>
                                <span className="text-muted-foreground">Distance between feature vectors x and y</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">x_i, y_i</span>
                                <span className="text-muted-foreground">i-th feature value (e.g., red channel intensity)</span>
                            </div>
                            <div className="flex gap-3 p-3 bg-secondary/20 rounded">
                                <span className="font-mono font-bold">Lower distance</span>
                                <span className="text-muted-foreground">= More similar images</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive CBIR */}
            <Card className="border-2 border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">💻</span> Interactive Image Search (Color-Based)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Adjust RGB values to create a "query image" and find similar images in the database
                        </p>

                        <div className="space-y-3">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Red: {queryImage[0].toFixed(2)}</label>
                                <Slider
                                    value={[queryImage[0]]}
                                    onValueChange={(v) => setQueryImage([v[0], queryImage[1], queryImage[2]])}
                                    min={0}
                                    max={1}
                                    step={0.05}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Green: {queryImage[1].toFixed(2)}</label>
                                <Slider
                                    value={[queryImage[1]]}
                                    onValueChange={(v) => setQueryImage([queryImage[0], v[0], queryImage[2]])}
                                    min={0}
                                    max={1}
                                    step={0.05}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Blue: {queryImage[2].toFixed(2)}</label>
                                <Slider
                                    value={[queryImage[2]]}
                                    onValueChange={(v) => setQueryImage([queryImage[0], queryImage[1], v[0]])}
                                    min={0}
                                    max={1}
                                    step={0.05}
                                />
                            </div>
                        </div>

                        <div className="bg-secondary/30 p-4 rounded">
                            <p className="text-sm font-semibold mb-2">Query Image Color:</p>
                            <div
                                className="h-20 rounded border-2 border-border"
                                style={{
                                    backgroundColor: `rgb(${queryImage[0] * 255}, ${queryImage[1] * 255}, ${queryImage[2] * 255})`
                                }}
                            />
                            <p className="text-xs text-muted-foreground mt-2">
                                RGB: [{queryImage[0].toFixed(2)}, {queryImage[1].toFixed(2)}, {queryImage[2].toFixed(2)}]
                            </p>
                        </div>

                        <Button onClick={searchSimilar} className="w-full">
                            <Play className="h-4 w-4 mr-2" /> Search Similar Images
                        </Button>

                        {distances.length > 0 && (
                            <div className="space-y-3">
                                <p className="font-semibold">Results (sorted by similarity):</p>
                                {imageDatabase.map((img, i) => {
                                    const dist = distances[i]
                                    return (
                                        <div key={img.id} className="border rounded-lg p-4">
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className="w-16 h-16 rounded border-2 border-border flex-shrink-0"
                                                    style={{
                                                        backgroundColor: `rgb(${img.features[0] * 255}, ${img.features[1] * 255}, ${img.features[2] * 255})`
                                                    }}
                                                />
                                                <div className="flex-1">
                                                    <p className="font-semibold">{img.name}</p>
                                                    <p className="text-sm text-muted-foreground">{img.desc}</p>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        Features: [{img.features.map(f => f.toFixed(2)).join(', ')}]
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-bold">Distance: {dist.toFixed(3)}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Similarity: {((1 - dist) * 100).toFixed(0)}%
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Feature Extraction Methods */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🎨</span> Feature Extraction Methods
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid md:grid-cols-2 gap-3">
                        <div className="border-l-4 border-blue-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold mb-2">1. Color Histogram</p>
                            <p className="text-sm text-muted-foreground">
                                Distribution of colors in RGB/HSV space
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Fast, rotation-invariant, ignores spatial layout
                            </p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold mb-2">2. Texture Features</p>
                            <p className="text-sm text-muted-foreground">
                                Patterns using Gabor filters, LBP
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Captures roughness, smoothness, regularity
                            </p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold mb-2">3. Shape Descriptors</p>
                            <p className="text-sm text-muted-foreground">
                                Edge detection, contours, SIFT/SURF
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Scale and rotation invariant
                            </p>
                        </div>
                        <div className="border-l-4 border-orange-500 pl-4 bg-secondary/20 p-3 rounded">
                            <p className="font-semibold mb-2">4. Deep Features (CNN)</p>
                            <p className="text-sm text-muted-foreground">
                                ResNet, VGG embeddings (1000+ dims)
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Bridges semantic gap, state-of-the-art
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Python Implementation */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🐍</span> Python: CBIR System
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <pre className="bg-secondary/30 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{`import numpy as np
from PIL import Image

class CBIRSystem:
    def __init__(self):
        self.database = []
    
    def extract_color_histogram(self, image_path, bins=8):
        """Extract RGB color histogram"""
        img = Image.open(image_path)
        img = img.resize((256, 256))  # Normalize size
        
        # Convert to numpy array
        pixels = np.array(img)
        
        # Compute histogram for each channel
        hist_r = np.histogram(pixels[:,:,0], bins=bins, range=(0,256))[0]
        hist_g = np.histogram(pixels[:,:,1], bins=bins, range=(0,256))[0]
        hist_b = np.histogram(pixels[:,:,2], bins=bins, range=(0,256))[0]
        
        # Concatenate and normalize
        features = np.concatenate([hist_r, hist_g, hist_b])
        features = features / features.sum()  # Normalize
        
        return features
    
    def euclidean_distance(self, feat1, feat2):
        """Calculate similarity between feature vectors"""
        return np.sqrt(np.sum((feat1 - feat2) ** 2))
    
    def add_image(self, image_path, metadata=None):
        """Add image to database"""
        features = self.extract_color_histogram(image_path)
        self.database.append({
            'path': image_path,
            'features': features,
            'metadata': metadata
        })
    
    def search(self, query_path, top_k=5):
        """Find similar images"""
        query_features = self.extract_color_histogram(query_path)
        
        # Calculate distances
        results = []
        for item in self.database:
            dist = self.euclidean_distance(query_features, item['features'])
            results.append({
                'path': item['path'],
                'distance': dist,
                'similarity': 1 / (1 + dist)
            })
        
        # Sort by distance
        results.sort(key=lambda x: x['distance'])
        return results[:top_k]

# Example usage
cbir = CBIRSystem()
cbir.add_image('sunset.jpg', {'category': 'nature'})
cbir.add_image('ocean.jpg', {'category': 'nature'})
cbir.add_image('forest.jpg', {'category': 'nature'})

results = cbir.search('query.jpg', top_k=3)
for r in results:
    print(f"{r['path']}: similarity={r['similarity']:.3f}")`}</code>
                    </pre>
                </CardContent>
            </Card>

            {/* Assessment */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🎓</span> Quick Assessment
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q1: What is the semantic gap?</p>
                            <p className="text-sm text-green-600">A: The difference between low-level features (pixels, colors) that computers see and high-level concepts (objects, emotions) that humans understand.</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q2: Why use Euclidean distance for image similarity?</p>
                            <p className="text-sm text-green-600">A: It measures how close two feature vectors are in multi-dimensional space - smaller distance means more similar images.</p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded">
                            <p className="font-semibold mb-2">Q3: What is Query-by-Example (QBE)?</p>
                            <p className="text-sm text-green-600">A: Providing a sample image as the query instead of keywords - the system finds similar images based on visual features.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" asChild>
                    <Link href="/lab/unit-4">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit 4 Labs
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/lab/unit-4/web-crawling">
                        Next: Web Crawling <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
