import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'synthia-cover-slide'
export const layoutName = 'Cover Slide'
export const layoutDescription = 'Futuristic dark cover slide with hero image, title in gold, and teal decorative elements.'

const coverSlideSchema = z.object({
    title: z.string().min(3).max(60).default('Synthia Presentation').meta({
        description: "Main presentation title displayed in gold",
    }),
    subtitle: z.string().min(3).max(120).default('Powered by Thales AI').meta({
        description: "Subtitle or tagline displayed below the title in white",
    }),
    image: ImageSchema.default({
        __image_url__: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
        __image_prompt__: 'Futuristic AI technology blue particles network digital abstract background'
    }).meta({
        description: "Hero background image displayed on the right side with overlay",
    }),
})

export const Schema = coverSlideSchema

export type CoverSlideData = z.infer<typeof coverSlideSchema>

const CoverSlideLayout: React.FC<{ data?: Partial<CoverSlideData> }> = ({ data: slideData }) => {
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
                {/* Decorative circle — large bottom-right */}
                <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: '600px',
                        height: '600px',
                        bottom: '-200px',
                        right: '-100px',
                        background: 'radial-gradient(circle, rgba(0,180,216,0.12) 0%, rgba(0,180,216,0.04) 50%, transparent 70%)',
                        border: '1px solid rgba(0,180,216,0.15)',
                    }}
                />
                {/* Decorative circle — medium top-right */}
                <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: '300px',
                        height: '300px',
                        top: '-80px',
                        right: '120px',
                        background: 'radial-gradient(circle, rgba(0,180,216,0.08) 0%, transparent 70%)',
                        border: '1px solid rgba(0,180,216,0.1)',
                    }}
                />
                {/* Decorative circle — small left */}
                <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: '180px',
                        height: '180px',
                        bottom: '60px',
                        left: '60px',
                        background: 'radial-gradient(circle, rgba(0,91,154,0.15) 0%, transparent 70%)',
                        border: '1px solid rgba(0,91,154,0.2)',
                    }}
                />

                {/* Hero image — right half with overlay */}
                {slideData?.image?.__image_url__ && (
                    <div
                        className="absolute inset-y-0 right-0 w-1/2 pointer-events-none"
                        style={{ opacity: 0.28 }}
                    >
                        <img
                            src={slideData.image.__image_url__}
                            alt={slideData.image.__image_prompt__ || ''}
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient fade toward left */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'linear-gradient(to right, #0D1B2A 0%, transparent 40%)',
                            }}
                        />
                    </div>
                )}

                {/* Company branding */}
                {((slideData as any)?.__companyName__ || (slideData as any)?._logo_url__) && (
                    <div className="absolute top-0 right-0 px-8 pt-5">
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

                {/* Synthia logo mark — top left */}
                <div className="absolute top-6 left-8 flex items-center gap-3">
                    <div
                        className="flex items-center justify-center rounded-full font-bold text-lg"
                        style={{
                            width: '40px',
                            height: '40px',
                            background: 'var(--primary-color,#005B9A)',
                            color: 'var(--primary-text,#FFFFFF)',
                            border: '2px solid rgba(0,180,216,0.5)',
                            boxShadow: '0 0 12px rgba(0,180,216,0.3)',
                        }}
                    >
                        S
                    </div>
                    <span
                        className="text-sm font-semibold tracking-widest uppercase"
                        style={{ color: 'rgba(0,180,216,0.8)', letterSpacing: '0.2em' }}
                    >
                        Synthia
                    </span>
                </div>

                {/* Main content — centered left-to-center */}
                <div className="relative z-10 flex flex-col justify-center h-full px-16 max-w-[55%]">
                    {/* Pre-title line */}
                    <div
                        className="mb-6 text-xs font-semibold tracking-widest uppercase"
                        style={{ color: 'rgba(0,180,216,0.9)', letterSpacing: '0.25em' }}
                    >
                        Thales AI Platform
                    </div>

                    {/* Title */}
                    <h1
                        className="font-bold leading-tight mb-4"
                        style={{
                            color: 'var(--primary-color,#F4A11B)',
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            textShadow: '0 0 30px rgba(244,161,27,0.25)',
                        }}
                    >
                        {slideData?.title || 'Synthia Presentation'}
                    </h1>

                    {/* Teal accent line */}
                    <div
                        className="mb-6 rounded-full"
                        style={{
                            width: '96px',
                            height: '3px',
                            background: 'linear-gradient(to right, #00B4D8, rgba(0,180,216,0.2))',
                        }}
                    />

                    {/* Subtitle */}
                    <p
                        className="text-lg font-light leading-relaxed"
                        style={{ color: 'var(--background-text,rgba(255,255,255,0.85))' }}
                    >
                        {slideData?.subtitle || 'Powered by Thales AI'}
                    </p>
                </div>

                {/* Bottom teal border line */}
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

export default CoverSlideLayout
