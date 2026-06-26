import React from 'react'
import * as z from "zod";

export const layoutId = 'synthia-conclusion-slide'
export const layoutName = 'Conclusion'
export const layoutDescription = 'Dark closing slide with gold title, white message, teal contact info, and decorative teal effects.'

const conclusionSlideSchema = z.object({
    title: z.string().min(3).max(40).default('Thank You').meta({
        description: "Main closing title displayed large in gold",
    }),
    message: z.string().min(10).max(200).default('Feel free to reach out for any questions or to learn more about how Synthia can transform your operations.').meta({
        description: "Closing message displayed in white below the title",
    }),
    contact: z.string().min(5).max(100).default('synthia@thalesgroup.com').meta({
        description: "Contact information displayed in teal",
    }),
})

export const Schema = conclusionSlideSchema

export type ConclusionSlideData = z.infer<typeof conclusionSlideSchema>

const ConclusionSlideLayout: React.FC<{ data?: Partial<ConclusionSlideData> }> = ({ data: slideData }) => {
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
                {/* Large radial glow — bottom left */}
                <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: '700px',
                        height: '700px',
                        bottom: '-300px',
                        left: '-150px',
                        background: 'radial-gradient(circle, rgba(0,180,216,0.1) 0%, transparent 55%)',
                    }}
                />
                {/* Secondary glow — top right */}
                <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: '500px',
                        height: '500px',
                        top: '-200px',
                        right: '-100px',
                        background: 'radial-gradient(circle, rgba(0,91,154,0.12) 0%, transparent 55%)',
                    }}
                />
                {/* Decorative ring — center left */}
                <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: '350px',
                        height: '350px',
                        top: '50%',
                        left: '-80px',
                        transform: 'translateY(-50%)',
                        border: '1px solid rgba(0,180,216,0.12)',
                    }}
                />
                {/* Decorative ring — center right, smaller */}
                <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: '200px',
                        height: '200px',
                        top: '50%',
                        right: '-40px',
                        transform: 'translateY(-50%)',
                        border: '1px solid rgba(0,180,216,0.1)',
                    }}
                />
                {/* Dot grid — top left */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        top: '30px',
                        left: '30px',
                        width: '100px',
                        height: '60px',
                        backgroundImage: 'radial-gradient(circle, rgba(0,180,216,0.4) 1px, transparent 1px)',
                        backgroundSize: '10px 10px',
                        opacity: 0.35,
                    }}
                />
                {/* Dot grid — bottom right */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        bottom: '30px',
                        right: '40px',
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

                {/* Synthia logo mark */}
                <div className="absolute top-6 left-8 z-10 flex items-center gap-3">
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
                    <span
                        className="text-xs font-semibold tracking-widest uppercase"
                        style={{ color: 'rgba(0,180,216,0.7)', letterSpacing: '0.2em' }}
                    >
                        Synthia
                    </span>
                </div>

                {/* Main content — centered */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-20 text-center">
                    {/* Pre-label */}
                    <div
                        className="mb-4 text-xs font-semibold tracking-widest uppercase"
                        style={{ color: 'rgba(0,180,216,0.8)', letterSpacing: '0.2em' }}
                    >
                        Synthia · Thales AI Platform
                    </div>

                    {/* Title */}
                    <h1
                        className="font-black leading-tight mb-4"
                        style={{
                            color: 'var(--primary-color,#F4A11B)',
                            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                            textShadow: '0 0 40px rgba(244,161,27,0.2)',
                        }}
                    >
                        {slideData?.title || 'Thank You'}
                    </h1>

                    {/* Teal accent line */}
                    <div
                        className="mb-8 mx-auto rounded-full"
                        style={{
                            width: '80px',
                            height: '3px',
                            background: 'linear-gradient(to right, rgba(0,180,216,0.3), #00B4D8, rgba(0,180,216,0.3))',
                        }}
                    />

                    {/* Message */}
                    <p
                        className="text-base font-light leading-relaxed mb-8 max-w-2xl"
                        style={{ color: 'var(--background-text,rgba(255,255,255,0.75))' }}
                    >
                        {slideData?.message || 'Feel free to reach out for any questions or to learn more about how Synthia can transform your operations.'}
                    </p>

                    {/* Contact */}
                    <div
                        className="text-sm font-medium tracking-wide"
                        style={{
                            color: 'var(--primary-color,#00B4D8)',
                            border: '1px solid rgba(0,180,216,0.3)',
                            padding: '8px 24px',
                            borderRadius: '4px',
                            background: 'rgba(0,180,216,0.05)',
                        }}
                    >
                        {slideData?.contact || 'synthia@thalesgroup.com'}
                    </div>
                </div>

                {/* Bottom border */}
                <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                        height: '2px',
                        background: 'linear-gradient(to right, transparent, rgba(0,180,216,0.6), rgba(0,91,154,0.3), transparent)',
                    }}
                />
            </div>
        </>
    )
}

export default ConclusionSlideLayout
