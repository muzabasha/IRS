'use client'

import Image from 'next/image'
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface SocialLink {
    label: string
    url: string
    icon?: string
}

export function InstructorProfile() {
    const socialLinks: SocialLink[] = [
        {
            label: 'Publons',
            url: 'https://publons.com/researcher/3362117/syed-muzamil',
        },
        {
            label: 'Google Scholar',
            url: 'https://scholar.google.co.in/citations?user=weNQmW0AAAAJ&hl=en',
        },
        {
            label: 'ORCID',
            url: 'http://orcid.org/0000-0002-1169-3151',
        },
        {
            label: 'Scopus',
            url: 'https://www.scopus.com/authid/detail.uri?authorId=57195586589',
        },
        {
            label: 'ResearchGate',
            url: 'https://www.researchgate.net/profile/Muzamil_Basha',
        },
        {
            label: 'LinkedIn',
            url: 'https://www.linkedin.com/in/muzamil-basha-syed-19612a25/',
        },
    ]

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            {/* Main Profile Card */}
            <Card className="border-none shadow-lg bg-card/80 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-0">
                    <div className="grid md:grid-cols-3 gap-8 p-8">
                        {/* Left: Profile Image */}
                        <div className="flex justify-center md:col-span-1">
                            <div className="relative w-64 h-80 rounded-xl overflow-hidden shadow-xl border-4 border-primary/10">
                                <Image
                                    src="/DP_profile.png"
                                    alt="Dr. Syed Muzamil Basha"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Right: Profile Content */}
                        <div className="md:col-span-2 space-y-6">
                            {/* Header */}
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold bg-linear-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                                    Dr. Syed Muzamil Basha
                                </h1>
                                <p className="text-lg text-primary font-semibold">
                                    Professor, School of Computer Science & Engineering
                                </p>
                                <p className="text-muted-foreground">REVA University, Bangalore</p>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-3 bg-secondary/30 p-4 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                                    <div className="text-sm">
                                        <p className="font-medium">REVA University</p>
                                        <p className="text-muted-foreground">
                                            Rukmini Knowledge Park, Kattigenahalli, Yelahanka, Bengaluru, Karnataka 560064
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-primary shrink-0" />
                                    <a href="mailto:muzamilbasha.s@reva.edu.in" className="text-sm hover:text-primary transition-colors">
                                        muzamilbasha.s@reva.edu.in
                                    </a>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-primary shrink-0" />
                                    <div className="text-sm space-y-1">
                                        <p>+91 8331977568</p>
                                        <p>+91 7259421438</p>
                                    </div>
                                </div>
                            </div>

                            {/* Key Highlights */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                                    <p className="text-2xl font-bold text-blue-600">65+</p>
                                    <p className="text-sm text-muted-foreground">Scopus Publications</p>
                                </div>
                                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                                    <p className="text-2xl font-bold text-green-600">25+</p>
                                    <p className="text-sm text-muted-foreground">Textbooks Published</p>
                                </div>
                                <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                                    <p className="text-2xl font-bold text-purple-600">15+</p>
                                    <p className="text-sm text-muted-foreground">Years Experience</p>
                                </div>
                                <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                                    <p className="text-2xl font-bold text-amber-600">3rd</p>
                                    <p className="text-sm text-muted-foreground">Best Scientist (2024)</p>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="space-y-3">
                                <p className="text-sm font-semibold text-muted-foreground">Research Profiles</p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {socialLinks.map((link) => (
                                        <a
                                            key={link.label}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-colors"
                                        >
                                            {link.label}
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* About Section */}
            <Card className="border-none shadow-md bg-card/80 backdrop-blur-sm">
                <CardContent className="p-8 space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">About</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Dr. Syed Muzamil Basha is a Professor in the School of Computer Science and Engineering at REVA University, Bangalore, Karnataka, India. He earned his Full time Ph.D. from VIT University, Vellore (Deemed to be University (IoE)) (2016–2019), and has 15 years of teaching and research experience, including 2 years of postdoctoral experience at University of Hail, Kingdom of Saudi Arabia (2020–2022).
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-3">Recognition & Achievements</h3>
                        <p className="text-muted-foreground mb-3">
                            Dr. Basha is recognized as the <span className="font-semibold text-foreground">3rd Best Scientist at REVA University</span> (AD Scientific Index 2024) with a VIDWAN Score of 9.5/10.
                        </p>
                    </div>

                    {/* Research Portfolio */}
                    <div>
                        <h3 className="text-xl font-bold mb-3">Research Portfolio</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">•</span>
                                <span><span className="font-semibold text-foreground">65 Scopus-indexed publications</span> (40 journals: 7 Q1, 9 Q2, 10 Q3, 6 Q4; 15 conference proceedings)</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">•</span>
                                <span>High-impact publications in prestigious journals including <span className="font-semibold text-foreground">IEEE Transactions on Consumer Electronics, IEEE Internet of Things Journal, PLOS ONE, and BMC Medical Imaging</span></span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">•</span>
                                <span><span className="font-semibold text-foreground">25+ textbooks</span> published with international publishers including Springer and IGI Global, plus 2 edited textbooks</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">•</span>
                                <span>Multiple patents including design registrations and international patents (German Utility Patent, IP Australia Patent)</span>
                            </li>
                        </ul>
                    </div>

                    {/* Leadership Roles */}
                    <div>
                        <h3 className="text-xl font-bold mb-3">Leadership & Administrative Roles</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">•</span>
                                <span>Research and Innovation Vertical Head at REVA University (June 2021 to Feb 2026)</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">•</span>
                                <span>NBA-NAAC Coordinator</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">•</span>
                                <span>IEEE Computer Society Chair</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">•</span>
                                <span><span className="font-semibold text-foreground">3 PhD scholars</span> awarded degrees, 2 scholars submitted thesis, 3 currently under guidance</span>
                            </li>
                        </ul>
                    </div>

                    {/* Editorial & Review Roles */}
                    <div>
                        <h3 className="text-xl font-bold mb-3">Editorial & Review Roles</h3>
                        <p className="text-muted-foreground mb-3">
                            Dr. Syed Muzamil Basha has served as a reviewer and editorial board member for numerous international journals. He is an editorial member for journals such as the <span className="font-semibold text-foreground">American Journal of Health Research</span> and the <span className="font-semibold text-foreground">Journal of Ubiquitous Computing and Communication Technologies</span>. He also acts as an editorial member for <span className="font-semibold text-foreground">Discover Analytics, the Journal of Innovative Technology Convergence, and Milestone Transactions on Medical Technometrics</span>.
                        </p>
                        <p className="text-muted-foreground">
                            Additionally, he is a senior reviewer for prestigious journals like <span className="font-semibold text-foreground">IEEE Transactions on Consumer Electronics, IEEE Internet of Things Journal, and PLOS ONE</span>. He actively participates as an adhoc reviewer for several other journals and serves as session chair and technical program chair for international conferences.
                        </p>
                    </div>

                    {/* Awards & Honors */}
                    <div>
                        <h3 className="text-xl font-bold mb-3">Awards & Honors</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">•</span>
                                <span><span className="font-semibold text-foreground">International Outstanding Teacher Award 2024-25</span> (Green ThinkerZ Society and NGO Darpan, NITI Aayog, January 2025)</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">•</span>
                                <span><span className="font-semibold text-foreground">Best Professor for Computer Science Bengaluru North</span> (Karnataka Educational Awards, September 2024)</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">•</span>
                                <span><span className="font-semibold text-foreground">Best Researcher Award</span> (Knowledge Research Academy, Coimbatore, August 2024)</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">•</span>
                                <span><span className="font-semibold text-foreground">IEEE R10 Ethics Champion</span> recognition (2023–24)</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">•</span>
                                <span><span className="font-semibold text-foreground">RAMFOO Outstanding Faculty Award</span> (March 2023)</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">•</span>
                                <span><span className="font-semibold text-foreground">CHSN-2022 Young Researcher Award</span> (3rd International Conference on Computer Vision, December 2022)</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">•</span>
                                <span><span className="font-semibold text-foreground">Best Paper Award</span> (IACIT, REVA University, 2021–22)</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">•</span>
                                <span><span className="font-semibold text-foreground">Raman Research Award</span> (VIT, SCI indexed journal, impact factor 2.101, 2019–20)</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">•</span>
                                <span><span className="font-semibold text-foreground">Research Award</span> (VIT, high-quality publications, 2018–19)</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">•</span>
                                <span><span className="font-semibold text-foreground">Best Researcher Award for PhD thesis supervision</span> (Dr. Sailaja Thota, 8th International Conference on ALLAM in Cognitive Science, December 2024)</span>
                            </li>
                        </ul>
                    </div>

                    {/* Expertise */}
                    <div>
                        <h3 className="text-xl font-bold mb-3">Areas of Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                            {[
                                'Agentic AI',
                                'Natural Language Processing',
                                'Big Data Analytics',
                                'Blockchain Management',
                                'Internet of Things (IoT)',
                                'Machine Learning',
                                'Deep Learning',
                                'Federated Learning',
                                'Healthcare Informatics',
                                'Cybersecurity',
                            ].map((expertise) => (
                                <span
                                    key={expertise}
                                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                                >
                                    {expertise}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Memberships */}
                    <div>
                        <h3 className="text-xl font-bold mb-3">Professional Memberships</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">•</span>
                                <span>ACM Professional Member</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">•</span>
                                <span>ISTE Lifetime Member</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">•</span>
                                <span>Editorial board member for multiple international journals</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary font-bold">•</span>
                                <span>Academic Council and Board of Studies member for institutions across Karnataka, Andhra Pradesh, and Tamil Nadu</span>
                            </li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
