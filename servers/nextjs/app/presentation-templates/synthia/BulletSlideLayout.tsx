import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'synthia-bullet-slide'
export const layoutName = 'Bullet Points'
export const layoutDescription = 'Dark slide with gold title, teal bullet points on the left and a supporting image on the right.'

const bulletSlideSchema = z.object({
    title: z.string().min(3).max(60).default('Key Points').meta({
        description: "Slide title displayed in gold at the top left",
    }),
    bullet_points: z.array(
        z.string().min(5).max(100)
    ).min(2).max(5).default([
        'First key point that matters',
        'Second key point with more detail',
        'Third key point to remember',
    ]).meta({
        description: "List of bullet points (2 to 5 items)",
    }),
    image: ImageSchema.default({
        __image_url__: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80',
        __image_prompt__: 'Futuristic AI data visualization holographic interface technology'
    }).meta({
        description: "Supporting image displayed on the right half of the slide",
    }),
})

export const Schema = bulletSlideSchema

export type BulletSlideData = z.infer<typeof bulletSlideSchema>

const BulletSlideLayout: React.FC<{ data?: Partial<BulletSlideData> }> = ({ data: slideData }) => {
    const bullets = slideData?.bullet_points ?? [
        'First key point that matters',
        'Second key point with more detail',
        'Third key point to remember',
    ]

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
                {/* Decorative circle — bottom left glow */}
                <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: '400px',
                        height: '400px',
                        bottom: '-150px',
                        left: '-100px',
                        background: 'radial-gradient(circle, rgba(0,91,154,0.12) 0%, transparent 65%)',
                    }}
                />
                {/* Decorative dots — top left */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        top: '20px',
                        left: '20px',
                        width: '100px',
                        height: '60px',
                        backgroundImage: 'radial-gradient(circle, rgba(0,180,216,0.35) 1px, transparent 1px)',
                        backgroundSize: '10px 10px',
                        opacity: 0.5,
                    }}
                />

                {/* Right image panel */}
                <div className="absolute inset-y-0 right-0 w-5/12 pointer-events-none">
                    <img
                        src={slideData?.image?.__image_url__ || ''}
                        alt={slideData?.image?.__image_prompt__ || ''}
                        className="w-full h-full object-cover"
                        style={{ opacity: 0.75 }}
                    />
                    {/* Gradient overlay — left edge fade */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(to right, #0D1B2A 0%, rgba(13,27,42,0.6) 30%, transparent 60%)',
                        }}
                    />
                    {/* Gradient overlay — right edge subtle */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(to left, rgba(13,27,42,0.4) 0%, transparent 40%)',
                        }}
                    />
                </div>

                {/* Company branding */}
                {((slideData as any)?.__companyName__ || (slideData as any)?._logo_url__) && (
                    <div className="absolute top-5 right-8 z-20">
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

                {/* Main content — left panel */}
                <div className="relative z-10 flex flex-col justify-center h-full pl-14 pr-4 w-7/12">
                    {/* Pre-label */}
                    <div
                        className="mb-3 text-xs font-semibold tracking-widest uppercase"
                        style={{ color: 'rgba(0,180,216,0.8)', letterSpacing: '0.2em' }}
                    >
                        Overview
                    </div>

                    {/* Title */}
                    <h2
                        className="font-bold leading-tight mb-2"
                        style={{
                            color: 'var(--primary-color,#F4A11B)',
                            fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
                        }}
                    >
                        {slideData?.title || 'Key Points'}
                    </h2>

                    {/* Teal accent line */}
                    <div
                        className="mb-7 rounded-full"
                        style={{
                            width: '60px',
                            height: '2px',
                            background: 'linear-gradient(to right, #00B4D8, rgba(0,180,216,0.3))',
                        }}
                    />

                    {/* Bullet list */}
                    <ul className="space-y-4">
                        {bullets.map((point, i) => (
                            <li key={i} className="flex items-start gap-4">
                                {/* Bullet dot */}
                                <div
                                    className="flex-shrink-0 rounded-full mt-1"
                                    style={{
                                        width: '10px',
                                        height: '10px',
                                        background: '#00B4D8',
                                        boxShadow: '0 0 8px rgba(0,180,216,0.5)',
                                        marginTop: '6px',
                                    }}
                                />
                                {/* Bullet text */}
                                <span
                                    className="text-base font-light leading-relaxed"
                                    style={{ color: 'var(--background-text,rgba(255,255,255,0.85))' }}
                                >
                                    {point}
                                </span>
                            </li>
                        ))}
                    </ul>
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

export default BulletSlideLayout
