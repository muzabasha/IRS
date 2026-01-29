import { notFound } from "next/navigation"
import { QuizModule } from "@/components/quiz-module"
import unit1Data from "@/data/assessment/unit-1.json"

export default async function AssessmentPage({ params }: { params: Promise<{ unitId: string }> }) {
    const { unitId } = await params

    let data;
    try {
        data = (await import(`@/data/assessment/${unitId}.json`)).default;
    } catch (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in duration-500">
                <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
                    <span className="text-4xl text-muted-foreground">⏳</span>
                </div>
                <h1 className="text-2xl font-bold mb-2">Assessment Coming Soon</h1>
                <p className="text-muted-foreground max-w-sm">
                    The evaluation for <strong>{unitId.toUpperCase()}</strong> is currently being finalized by Dr. Muzamil. Please check back shortly!
                </p>
            </div>
        )
    }

    return <QuizModule data={data} />
}
