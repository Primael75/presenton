import React from 'react'
import * as z from "zod";

export const layoutId = 'synthia-two-column-slide'
export const layoutName = 'Two Column'
export const layoutDescription = 'Dark slide with gold title and two equal columns separated by a teal vertical divider.'

const twoColumnSlideSchema = z.object({
    title: z.string().min(3).max(60).default('Comparing Concepts').meta({
        description: "Slide title displayed in gold at the top",
    }),
    left_title: z.string().min(2).max(40).default('Concept A').meta({
        description: "Title of the left column",
    }),
    left_content: z.string().min(10).max(200).default('Description of the first concept with supporting details and context.').meta({
        description: "Text content of the left column",
    }),
    right_title: z.string().min(2).max(40).default('Concept B').meta({
        description: "Title of the right column",
    }),
    right_content: z.string().min(10).max(200).default('Description of the second concept with supporting details and context.').meta({
        description: "Text content of the right column",
    }),
})

export const Schema = twoColumnSlideSchema

export type TwoColumnSlideData = z.infer<typeof twoColumnSlideSchema>

const TwoColumnSlideLayout: React.FC<{ data?: Partial<TwoColumnSlideData> }> = ({ data: slideData }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#0D1B2A)",
                    fontFamily: "var(--heading-font-family,Poppins)",
                }}
            >
                {/* Decorative circle — top right */}
                <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: '400px',
                        height: '400px',
                        top: '-160px',
                        right: '-100px',
                        background: 'radial-gradient(circle, rgba(0,180,216,0.08) 0%, transparent 65%)',
                        border: '1px solid rgba(0,180,216,0.08)',
                    }}
                />
                {/* Decorative circle — bottom left */}
                <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: '300px',
                        height: '300px',
                        bottom: '-120px',
                        left: '-80px',
                        background: 'radial-gradient(circle, rgba(0,91,154,0.1) 0%, transparent 65%)',
                    }}
                />

                {/* Company branding */}
                {((slideData as any)?.__companyName__ || (slideData as any)?._logo_url__) && (
                    <div className="absolute top-5 right-8 z-10">
                        <div className="flex items-center gap-2">
                            {(slideData as any)?._logo_url__ && (
                                <img src={(slideData as any)?._logo_url__} alt="logo" className="w-5 h-5" />
                            )}
                            {(slideData as any)?.__companyName__ && (
                                <span className="text-xs font-semibold" style={{ color: 'var(--background-text,#B0C4D8)' }}>
                                    {(slideData as any).__companyName__}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Main layout */}
                <div className="relative z-10 flex flex-col h-full px-14 pt-10 pb-10">
                    {/* Header */}
                    <div className="mb-8">
                        <div
                            className="mb-2 text-xs font-semibold tracking-widest uppercase"
                            style={{ color: 'rgba(0,180,216,0.8)', letterSpacing: '0.2em' }}
                        >
                            Analysis
                        </div>
                        <h2
                            className="font-bold leading-tight"
                            style={{
                                color: 'var(--primary-color,#F4A11B)',
                                fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
                            }}
                        >
                            {slideData?.title || 'Comparing Concepts'}
                        </h2>
                        <div
                            className="mt-3 rounded-full"
                            style={{
                                width: '50px',
                                height: '2px',
                                background: '#00B4D8',
                            }}
                        />
                    </div>

                    {/* Two columns */}
                    <div className="flex flex-1 gap-0 min-h-0">
                        {/* Left column */}
                        <div className="flex-1 pr-10">
                            <div
                                className="mb-2 text-xs font-semibold tracking-widest uppercase"
                                style={{ color: 'rgba(0,180,216,0.7)', letterSpacing: '0.15em' }}
                            >
                                {slideData?.left_title || 'Concept A'}
                            </div>
                            <h3
                                className="font-semibold mb-4"
                                style={{
                                    color: 'var(--background-text,#FFFFFF)',
                                    fontSize: 'clamp(1rem, 1.8vw, 1.5rem)',
                                }}
                            >
                                {slideData?.left_title || 'Concept A'}
                            </h3>
                            <p
                                className="text-sm font-light leading-relaxed"
                                style={{ color: 'var(--background-text,rgba(176,196,216,0.9))' }}
                            >
                                {slideData?.left_content || 'Description of the first concept with supporting details and context.'}
                            </p>
                        </div>

                        {/* Vertical divider */}
                        <div
                            className="flex-shrink-0 self-stretch"
                            style={{
                                width: '1px',
                                background: 'linear-gradient(to bottom, transparent 0%, #00B4D8 20%, #00B4D8 80%, transparent 100%)',
                                opacity: 0.6,
                            }}
                        />

                        {/* Right column */}
                        <div className="flex-1 pl-10">
                            <div
                                className="mb-2 text-xs font-semibold tracking-widest uppercase"
                                style={{ color: 'rgba(0,180,216,0.7)', letterSpacing: '0.15em' }}
                            >
                                {slideData?.right_title || 'Concept B'}
                            </div>
                            <h3
                                className="font-semibold mb-4"
                                style={{
                                    color: 'var(--background-text,#FFFFFF)',
                                    fontSize: 'clamp(1rem, 1.8vw, 1.5rem)',
                                }}
                            >
                                {slideData?.right_title || 'Concept B'}
                            </h3>
                            <p
                                className="text-sm font-light leading-relaxed"
                                style={{ color: 'var(--background-text,rgba(176,196,216,0.9))' }}
                            >
                                {slideData?.right_content || 'Description of the second concept with supporting details and context.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom border */}
                <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                        height: '2px',
                        background: 'linear-gradient(to right, rgba(0,180,216,0.6), rgba(0,91,154,0.3), transparent)',
                    }}
                />
            </div>
        </>
    )
}

export default TwoColumnSlideLayout
