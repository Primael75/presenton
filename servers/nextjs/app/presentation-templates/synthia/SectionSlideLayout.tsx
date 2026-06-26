import React from 'react'
import * as z from "zod";

export const layoutId = 'synthia-section-slide'
export const layoutName = 'Section Slide'
export const layoutDescription = 'Dark transition slide with large teal section number, gold title, and white description.'

const sectionSlideSchema = z.object({
    sectionNumber: z.string().min(1).max(3).default('01').meta({
        description: "Section number displayed large on the left (e.g. 01, 02, 03)",
    }),
    title: z.string().min(3).max(50).default('Section Title').meta({
        description: "Section title displayed in gold next to the number",
    }),
    description: z.string().min(10).max(150).default('A brief description of what this section covers.').meta({
        description: "Short description displayed below the title in white",
    }),
})

export const Schema = sectionSlideSchema

export type SectionSlideData = z.infer<typeof sectionSlideSchema>

const SectionSlideLayout: React.FC<{ data?: Partial<SectionSlideData> }> = ({ data: slideData }) => {
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
                {/* Decorative circle — large center-right glow */}
                <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: '700px',
                        height: '700px',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'radial-gradient(circle, rgba(0,91,154,0.1) 0%, transparent 65%)',
                    }}
                />
                {/* Decorative circle — top left */}
                <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: '250px',
                        height: '250px',
                        top: '-80px',
                        left: '-60px',
                        background: 'radial-gradient(circle, rgba(0,180,216,0.08) 0%, transparent 70%)',
                        border: '1px solid rgba(0,180,216,0.1)',
                    }}
                />
                {/* Decorative dots — bottom right */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        bottom: '30px',
                        right: '40px',
                        width: '120px',
                        height: '80px',
                        backgroundImage: 'radial-gradient(circle, rgba(0,180,216,0.4) 1px, transparent 1px)',
                        backgroundSize: '12px 12px',
                        opacity: 0.4,
                    }}
                />

                {/* Company branding */}
                {((slideData as any)?.__companyName__ || (slideData as any)?._logo_url__) && (
                    <div className="absolute top-5 right-8">
                        <div className="flex items-center gap-2">
                            {(slideData as any)?._logo_url__ && (
                                <img src={(slideData as any)?._logo_url__} alt="logo" className="w-6 h-6" />
                            )}
                            {(slideData as any)?.__companyName__ && (
                                <span className="text-sm font-semibold" style={{ color: 'var(--background-text,#B0C4D8)' }}>
                                    {(slideData as any).__companyName__}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Synthia mark — top left */}
                <div className="absolute top-6 left-8 flex items-center gap-3">
                    <div
                        className="flex items-center justify-center rounded-full font-bold text-sm"
                        style={{
                            width: '32px',
                            height: '32px',
                            background: 'var(--primary-color,#005B9A)',
                            color: 'var(--primary-text,#FFFFFF)',
                            border: '1px solid rgba(0,180,216,0.4)',
                        }}
                    >
                        S
                    </div>
                </div>

                {/* Main content — horizontally centered */}
                <div className="relative z-10 flex items-center justify-center h-full px-20">
                    {/* Large section number */}
                    <div
                        className="font-black select-none leading-none"
                        style={{
                            fontSize: 'clamp(5rem, 12vw, 9rem)',
                            color: 'var(--primary-color,#00B4D8)',
                            opacity: 0.9,
                            textShadow: '0 0 40px rgba(0,180,216,0.3)',
                            minWidth: '180px',
                            textAlign: 'right',
                        }}
                    >
                        {slideData?.sectionNumber || '01'}
                    </div>

                    {/* Vertical divider */}
                    <div
                        className="mx-10 self-stretch"
                        style={{
                            width: '2px',
                            background: 'linear-gradient(to bottom, transparent, #00B4D8, transparent)',
                            minHeight: '160px',
                            maxHeight: '220px',
                            margin: 'auto 40px',
                        }}
                    />

                    {/* Text content */}
                    <div className="flex flex-col justify-center max-w-lg">
                        {/* Label */}
                        <div
                            className="mb-3 text-xs font-semibold tracking-widest uppercase"
                            style={{ color: 'rgba(0,180,216,0.7)', letterSpacing: '0.25em' }}
                        >
                            Section
                        </div>

                        {/* Title */}
                        <h2
                            className="font-bold leading-tight mb-4"
                            style={{
                                color: 'var(--primary-color,#F4A11B)',
                                fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                            }}
                        >
                            {slideData?.title || 'Section Title'}
                        </h2>

                        {/* Teal accent line */}
                        <div
                            className="mb-5 rounded-full"
                            style={{
                                width: '60px',
                                height: '2px',
                                background: '#00B4D8',
                            }}
                        />

                        {/* Description */}
                        <p
                            className="text-base font-light leading-relaxed"
                            style={{ color: 'var(--background-text,rgba(255,255,255,0.75))' }}
                        >
                            {slideData?.description || 'A brief description of what this section covers.'}
                        </p>
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

export default SectionSlideLayout
