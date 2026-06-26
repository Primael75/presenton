import React from 'react'
import * as z from "zod";

export const layoutId = 'synthia-big-number-slide'
export const layoutName = 'Big Numbers'
export const layoutDescription = 'Dark slide with gold title and 2–3 large teal statistics with white labels.'

const statSchema = z.object({
    value: z.string().min(1).max(20).default('99%').meta({
        description: "The large metric value (e.g. 99%, 10x, 300K)",
    }),
    label: z.string().min(2).max(50).default('Accuracy').meta({
        description: "Label describing what the value represents",
    }),
})

const bigNumberSlideSchema = z.object({
    title: z.string().min(3).max(60).default('Key Metrics').meta({
        description: "Slide title displayed in gold at the top",
    }),
    stats: z.array(statSchema).min(2).max(3).default([
        { value: '99%', label: 'Accuracy Rate' },
        { value: '10x', label: 'Faster Processing' },
        { value: '24/7', label: 'Availability' },
    ]).meta({
        description: "2 or 3 key statistics to display prominently",
    }),
})

export const Schema = bigNumberSlideSchema

export type BigNumberSlideData = z.infer<typeof bigNumberSlideSchema>

const BigNumberSlideLayout: React.FC<{ data?: Partial<BigNumberSlideData> }> = ({ data: slideData }) => {
    const stats = slideData?.stats ?? [
        { value: '99%', label: 'Accuracy Rate' },
        { value: '10x', label: 'Faster Processing' },
        { value: '24/7', label: 'Availability' },
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
                {/* Large background glow — centered */}
                <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: '800px',
                        height: '800px',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'radial-gradient(circle, rgba(0,180,216,0.06) 0%, transparent 55%)',
                    }}
                />
                {/* Decorative dots — bottom left */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        bottom: '30px',
                        left: '40px',
                        width: '120px',
                        height: '80px',
                        backgroundImage: 'radial-gradient(circle, rgba(0,180,216,0.4) 1px, transparent 1px)',
                        backgroundSize: '12px 12px',
                        opacity: 0.35,
                    }}
                />
                {/* Decorative dots — top right */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        top: '20px',
                        right: '50px',
                        width: '100px',
                        height: '60px',
                        backgroundImage: 'radial-gradient(circle, rgba(0,180,216,0.4) 1px, transparent 1px)',
                        backgroundSize: '10px 10px',
                        opacity: 0.35,
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
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-14 text-center">
                    {/* Pre-label */}
                    <div
                        className="mb-2 text-xs font-semibold tracking-widest uppercase"
                        style={{ color: 'rgba(0,180,216,0.8)', letterSpacing: '0.2em' }}
                    >
                        Performance
                    </div>

                    {/* Title */}
                    <h2
                        className="font-bold mb-2"
                        style={{
                            color: 'var(--primary-color,#F4A11B)',
                            fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
                        }}
                    >
                        {slideData?.title || 'Key Metrics'}
                    </h2>
                    <div
                        className="mb-12 mx-auto rounded-full"
                        style={{
                            width: '50px',
                            height: '2px',
                            background: '#00B4D8',
                        }}
                    />

                    {/* Stats row */}
                    <div className="flex items-start justify-center gap-0 w-full">
                        {stats.slice(0, 3).map((stat, i) => (
                            <React.Fragment key={i}>
                                {i > 0 && (
                                    <div
                                        className="self-stretch mx-8"
                                        style={{
                                            width: '1px',
                                            background: 'linear-gradient(to bottom, transparent, rgba(0,180,216,0.4), transparent)',
                                            minHeight: '120px',
                                        }}
                                    />
                                )}
                                <div className="flex flex-col items-center flex-1">
                                    {/* Big value */}
                                    <div
                                        className="font-black leading-none mb-4"
                                        style={{
                                            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                                            color: 'var(--primary-color,#00B4D8)',
                                            textShadow: '0 0 40px rgba(0,180,216,0.4)',
                                        }}
                                    >
                                        {stat.value}
                                    </div>
                                    {/* Label */}
                                    <div
                                        className="text-sm font-medium tracking-wide uppercase"
                                        style={{
                                            color: 'var(--background-text,rgba(255,255,255,0.7))',
                                            letterSpacing: '0.12em',
                                        }}
                                    >
                                        {stat.label}
                                    </div>
                                </div>
                            </React.Fragment>
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

export default BigNumberSlideLayout
