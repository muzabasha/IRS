import { notFound } from "next/navigation"
import { TopicViewer } from "@/components/topic-viewer"
import u1t1Data from "@/data/content/u1-t1.json"
import syllabus from "@/data/syllabus.json"

export default async function TopicPage({ params }: { params: Promise<{ unitId: string, topicId: string }> }) {
    const { unitId, topicId } = await params

    // Verify valid IDs
    const unit = syllabus.units.find(u => u.id === unitId)
    if (!unit) return notFound()

    const topic = unit.topics.find(t => t.id === topicId)
    if (!topic) return notFound()

    // For MVP: If we have specific content file, use it. Else default to a placeholder using the same structure.
    // In production, this would be `import(`@/data/content/${topicId}.json`)` logic.

    let data;
    try {
        // Dynamically import the content file based on topicId
        data = (await import(`@/data/content/${topicId}.json`)).default;
    } catch (error) {
        console.warn(`Content missing for ${topicId}, using fallback.`);
        // Fallback: Use structure of u1-t1 but with generic text
        data = {
            ...u1t1Data,
            id: topicId,
            title: topic.title,
            unitId: unitId,
            slides: u1t1Data.slides.map(s => {
                if (s.slideNumber === 1) return { ...s, title: topic.title, subtitle: `${unit.title} / ${topic.title}`, content: { text: "Content Coming Soon...", hook: "This topic is currently under development." } }
                return { ...s, title: s.title, content: { text: "This section is under active development. Please check back later." } }
            })
        }
    }

    return <TopicViewer data={data} />
}
