'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ReactNode } from 'react'

interface LabSection {
    title: string
    icon: string
    content: ReactNode
    borderColor?: string
}

interface LabTemplateProps {
    labNumber: number
    totalLabs: number
    title: string
    subtitle: string
    sections: LabSection[]
    prevLab?: { href: string; title: string }
    nextLab?: { href: string; title: string }
}

export function LabTemplate({
    labNumber,
    totalLabs,
    title,
    subtitle,
    sections,
    prevLab,
    nextLab
}: LabTemplateProps) {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/lab">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Labs
                    </Link>
                </Button>
                <Badge>Lab {labNumber} of {totalLabs}</Badge>
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold">{title}</h1>
                <p className="text-lg text-muted-foreground">{subtitle}</p>
            </div>

            {sections.map((section, index) => (
                <Card key={index} className={section.borderColor ? `border-l-4 ${section.borderColor}` : ''}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="text-2xl">{section.icon}</span> {section.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {section.content}
                    </CardContent>
                </Card>
            ))}

            {/* Navigation */}
            <div className="flex justify-between">
                {prevLab ? (
                    <Button variant="outline" asChild>
                        <Link href={prevLab.href}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Previous: {prevLab.title}
                        </Link>
                    </Button>
                ) : <div />}
                {nextLab && (
                    <Button asChild>
                        <Link href={nextLab.href}>
                            Next: {nextLab.title} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                )}
            </div>
        </div>
    )
}
