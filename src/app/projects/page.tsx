"use client"

import { useState } from "react"
import { projects, Project } from "@/data/projects"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import {
    Search,
    Code2,
    Play,
    Github,
    BookOpen,
    CheckCircle2,
    FileText,
    FlaskConical,
    Presentation,
    Trophy,
    ArrowRight
} from "lucide-react"

export default function ProjectsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    const difficultyColor = {
        Beginner: "text-emerald-500 border-emerald-500/20 bg-emerald-500/10",
        Medium: "text-blue-500 border-blue-500/20 bg-blue-500/10",
        Hard: "text-orange-500 border-orange-500/20 bg-orange-500/10",
        Expert: "text-rose-500 border-rose-500/20 bg-rose-500/10"
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Experiential Learning Projects</h1>
                    <p className="text-muted-foreground">A curated curriculum of 20 implementation tasks to master Information Retrieval.</p>
                </div>

                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search projects or tags..."
                        className="pl-10 rounded-full bg-card/50 backdrop-blur-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                    <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 border-primary/5 bg-card/50 backdrop-blur-sm overflow-hidden flex flex-col h-full border hover:border-primary/20">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className={`p-2.5 rounded-xl ${project.bg} ${project.color} group-hover:scale-110 transition-transform duration-500`}>
                                    <project.icon className="h-5 w-5" />
                                </div>
                                <Badge variant="outline" className={`font-mono text-[10px] uppercase tracking-wider ${difficultyColor[project.difficulty]}`}>
                                    {project.difficulty}
                                </Badge>
                            </div>
                            <CardTitle className="text-lg mt-4 leading-tight group-hover:text-primary transition-colors">{project.title}</CardTitle>
                            <CardDescription className="line-clamp-2 text-sm mt-1">
                                {project.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 pb-4">
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {project.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="px-2 py-0 h-5 text-[10px] bg-muted/60">{tag}</Badge>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="grid grid-cols-2 gap-3 border-t bg-muted/30 p-3">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="w-full rounded-lg gap-2 text-xs h-9" onClick={() => setSelectedProject(project)}>
                                        <FileText className="h-3.5 w-3.5" /> View Specs
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                                    {selectedProject && (
                                        <>
                                            <DialogHeader className="border-b pb-4">
                                                <div className="flex items-center gap-4 mb-2">
                                                    <div className={`p-3 rounded-2xl ${selectedProject.bg} ${selectedProject.color}`}>
                                                        <selectedProject.icon className="h-6 w-6" />
                                                    </div>
                                                    <div>
                                                        <DialogTitle className="text-2xl font-bold">{selectedProject.title}</DialogTitle>
                                                        <div className="flex gap-2 mt-1">
                                                            <Badge variant="secondary" className="text-xs">Unit {selectedProject.unit}</Badge>
                                                            <Badge variant="outline" className={`text-xs ${difficultyColor[selectedProject.difficulty]}`}>{selectedProject.difficulty}</Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                                <DialogDescription className="text-base text-foreground/80 pt-2">
                                                    {selectedProject.description}
                                                </DialogDescription>
                                            </DialogHeader>

                                            <div className="grid gap-8 py-6">
                                                <section>
                                                    <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest text-primary mb-4">
                                                        <BookOpen className="h-4 w-4" /> User Instructions
                                                    </h4>
                                                    <ul className="space-y-3">
                                                        {selectedProject.instructions.map((step, i) => (
                                                            <li key={i} className="flex gap-3 text-sm leading-relaxed">
                                                                <span className="flex-none h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{i + 1}</span>
                                                                {step}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </section>

                                                <div className="grid md:grid-cols-2 gap-8 border-t pt-8">
                                                    <section>
                                                        <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest text-primary mb-3">
                                                            <Code2 className="h-4 w-4" /> Technical Details
                                                        </h4>
                                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                                            {selectedProject.technicalDetails}
                                                        </p>
                                                    </section>
                                                    <section>
                                                        <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest text-primary mb-3">
                                                            <FlaskConical className="h-4 w-4" /> Experimental Setup
                                                        </h4>
                                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                                            {selectedProject.experimentalSetup}
                                                        </p>
                                                    </section>
                                                </div>

                                                <section className="bg-primary/5 p-5 rounded-2xl border border-primary/10">
                                                    <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest text-primary mb-3">
                                                        <Presentation className="h-4 w-4" /> Demonstration
                                                    </h4>
                                                    <p className="text-sm font-medium leading-relaxed italic">
                                                        &ldquo;{selectedProject.demonstration}&rdquo;
                                                    </p>
                                                </section>

                                                <section>
                                                    <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest text-primary mb-4">
                                                        <Trophy className="h-4 w-4" /> Evaluation Rubric
                                                    </h4>
                                                    <div className="rounded-xl border border-border/50 overflow-hidden">
                                                        {selectedProject.rubric.map((r, i) => (
                                                            <div key={i} className="flex items-center justify-between p-3 text-sm border-b last:border-0 bg-card/50">
                                                                <span className="flex items-center gap-2">
                                                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                                                    {r.criteria}
                                                                </span>
                                                                <span className="font-mono font-bold text-primary">{r.points} pts</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </section>
                                            </div>

                                            <DialogFooter className="border-t pt-4">
                                                <Button className="w-full sm:w-auto rounded-full px-8 gap-2">
                                                    <Play className="h-4 w-4 fill-current" /> Start Project Lab
                                                </Button>
                                            </DialogFooter>
                                        </>
                                    )}
                                </DialogContent>
                            </Dialog>
                            <Button size="sm" className="w-full rounded-lg gap-2 text-xs h-9 shadow-sm">
                                <Play className="h-3 w-3 fill-current" /> Start Lab
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Submission Section */}
            <Card className="border-dashed bg-transparent mt-12 border-primary/20">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Github className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Ready to submit your work?</h3>
                    <p className="text-muted-foreground max-w-md mt-2">
                        Link your GitHub repository to the course platform to have your projects automatically graded by the AI Validator.
                    </p>
                    <div className="flex gap-4 mt-6">
                        <Button variant="outline" className="rounded-full px-8">
                            Link GitHub Account
                        </Button>
                        <Button variant="ghost" className="rounded-full gap-2">
                            Submission Guidelines <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
