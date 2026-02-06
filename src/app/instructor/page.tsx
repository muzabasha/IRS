import { InstructorProfile } from '@/components/instructor-profile'

export default function InstructorPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold">Instructor Profile</h1>
                <p className="text-muted-foreground">
                    Learn about the expertise and achievements of our course instructor
                </p>
            </div>
            <InstructorProfile />
        </div>
    )
}
