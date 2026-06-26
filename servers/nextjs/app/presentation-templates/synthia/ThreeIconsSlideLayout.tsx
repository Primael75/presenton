import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';

export const layoutId = 'synthia-three-icons-slide'
export const layoutName = 'Three Icons'
export const layoutDescription = 'Dark slide with gold title and three icon columns — each with teal icon circle, title, and description.'

const itemSchema = z.object({
    icon: IconSchema.default({
        __icon_url__: '/static/icons/placeholder.svg',
        __icon_query__: 'technology icon',
    }),
    title: z.string().min(2).max(40).default('Area Title').meta({
        description: "Title of this feature or area",
    }),
    description: z.string().min(10).max(150).default('A short description of this area or feature.').meta({
        description: "Short description of this feature or area",
    }),
})

const threeIconsSlideSchema = z.object({
    title: z.string().min(3).max(60).default('Three Key Areas').meta({
        description: "Slide title displayed in gold at the top",
    }),
    items: z.array(itemSchema).min(3).max(3).default([
        {
            icon: { __icon_url__: '/static/icons/placeholder.svg', __icon_query__: 'artificial intelligence brain neural network icon' },
            title: 'AI',
            description: 'Artificial intelligence powering real-time decision making and automation.',
        },
        {
            icon: { __icon_url__: '/static/icons/placeholder.svg', __icon_query__: 'data analytics chart graph icon' },
            title: 'Data',
            description: 'Advanced analytics and data processing for actionable insights.',
        },
        {
            icon: { __icon_url__: '/static/icons/placeholder.svg', __icon_query__: 'security shield protection icon' },
            title: 'Security',
            description: 'Enterprise-grade cybersecurity and compliance at every layer.',
        },
    ]).meta({
        description: "Exactly 3 items, each with an icon, title, and description",
    }),
})

export const Schema = threeIconsSlideSchema

export type ThreeIconsSlideData = z.infer<typeof threeIconsSlideSchema>

const ThreeIconsSlideLayout: React.FC<{ data?: Partial<ThreeIconsSlideData> }> = ({ data: slideData }) => {
    const items = slideData?.items ?? [
        { icon: { __icon_url__: '/static/icons/placeholder.svg', __icon_query__: 'AI icon' }, title: 'AI', description: 'Artificial Intelligence' },
        { icon: { __icon_url__: '/static/icons/placeholder.svg', __icon_query__: 'data icon' }, title: 'Data', description: 'Data Analytics' },
        { icon: { __icon_url__: '/static/icons/placeholder.svg', __icon_query__: 'security icon' }, title: 'Security', description: 'Cybersecurity' },
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
                {/* Decorative circle — center glow */}
                <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: '600px',
                        height: '600px',
                        bottom: '-250px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'radial-gradient(circle, rgba(0,91,154,0.1) 0%, transparent 60%)',
                    }}
                />
                {/* Decorative dots — top right */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        top: '16px',
                        right: '40px',
                        width: '120px',
                        height: '60px',
                        backgroundImage: 'radial-gradient(circle, rgba(0,180,216,0.35) 1px, transparent 1px)',
                        backgroundSize: '10px 10px',
                        opacity: 0.4,
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
                    <div className="mb-10 text-center">
                        <div
                            className="mb-2 text-xs font-semibold tracking-widest uppercase"
                            style={{ color: 'rgba(0,180,216,0.8)', letterSpacing: '0.2em' }}
                        >
                            Capabilities
                        </div>
                        <h2
                            className="font-bold"
                            style={{
                                color: 'var(--primary-color,#F4A11B)',
                                fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
                            }}
                        >
                            {slideData?.title || 'Three Key Areas'}
                        </h2>
                        <div
                            className="mt-3 mx-auto rounded-full"
                            style={{
                                width: '50px',
                                height: '2px',
                                background: '#00B4D8',
                            }}
                        />
                    </div>

                    {/* Three columns */}
                    <div className="flex flex-1 items-center justify-center gap-8">
                        {items.slice(0, 3).map((item, i) => (
                            <div
                                key={i}
                                className="flex-1 flex flex-col items-center text-center px-4"
                            >
                                {/* Icon circle */}
                                <div
                                    className="flex items-center justify-center rounded-full mb-5 flex-shrink-0"
                                    style={{
                                        width: '72px',
                                        height: '72px',
                                        background: 'rgba(0,180,216,0.12)',
                                        border: '2px solid rgba(0,180,216,0.4)',
                                        boxShadow: '0 0 20px rgba(0,180,216,0.15)',
                                    }}
                                >
                                    {item.icon?.__icon_url__ ? (
                                        <img
                                            src={item.icon.__icon_url__}
                                            alt={item.icon.__icon_query__ || item.title}
                                            className="w-8 h-8 object-contain"
                                            style={{ filter: 'invert(1) sepia(1) saturate(2) hue-rotate(170deg)' }}
                                        />
                                    ) : (
                                        <div
                                            className="w-8 h-8 rounded-sm"
                                            style={{ background: 'rgba(0,180,216,0.4)' }}
                                        />
                                    )}
                                </div>

                                {/* Item number */}
                                <div
                                    className="mb-1 text-xs font-bold"
                                    style={{ color: 'rgba(0,180,216,0.6)' }}
                                >
                                    0{i + 1}
                                </div>

                                {/* Item title */}
                                <h3
                                    className="font-semibold mb-3"
                                    style={{
                                        color: 'var(--background-text,#FFFFFF)',
                                        fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)',
                                    }}
                                >
                                    {item.title}
                                </h3>

                                {/* Teal accent */}
                                <div
                                    className="mx-auto mb-3 rounded-full"
                                    style={{
                                        width: '30px',
                                        height: '2px',
                                        background: '#00B4D8',
                                    }}
                                />

                                {/* Description */}
                                <p
                                    className="text-sm font-light leading-relaxed"
                                    style={{ color: 'var(--background-text,rgba(176,196,216,0.85))' }}
                                >
                                    {item.description}
                                </p>
                            </div>
                        ))}
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

export default ThreeIconsSlideLayout
