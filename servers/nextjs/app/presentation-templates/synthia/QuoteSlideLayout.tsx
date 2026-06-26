import React from 'react'
import * as z from "zod";

export const layoutId = 'synthia-quote-slide'
export const layoutName = 'Quote'
export const layoutDescription = 'Dark slide with a large decorative teal quotation mark, white italic quote, and gold author attribution.'

const quoteSlideSchema = z.object({
    quote: z.string().min(20).max(300).default('This is a powerful quote that inspires the audience and makes the reader think differently about the subject.').meta({
        description: "The main quote text displayed in white italic at the center",
    }),
    author: z.string().min(2).max(80).default('— Someone Important').meta({
        description: "Author attribution displayed in gold below the quote",
    }),
})

export const Schema = quoteSlideSchema

export type QuoteSlideData = z.infer<typeof quoteSlideSchema>

const QuoteSlideLayout: React.FC<{ data?: Partial<QuoteSlideData> }> = ({ data: slideData }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#0D1B2A)",
                    fontFamily: "var(--heading-font-family,Poppins)",
                }}
            >
                {/* Large radial glow — center */}
                <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: '900px',
                        height: '900px',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'radial-gradient(circle, rgba(0,91,154,0.1) 0%, transparent 55%)',
                    }}
                />
                {/* Decorative circle — top left */}
                <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: '280px',
                        height: '280px',
                        top: '-100px',
                        left: '-80px',
                        background: 'radial-gradient(circle, rgba(0,180,216,0.07) 0%, transparent 65%)',
                        border: '1px solid rgba(0,180,216,0.08)',
                    }}
                />
                {/* Decorative circle — bottom right */}
                <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: '250px',
                        height: '250px',
                        bottom: '-80px',
                        right: '-60px',
                        background: 'radial-gradient(circle, rgba(0,180,216,0.07) 0%, transparent 65%)',
                        border: '1px solid rgba(0,180,216,0.08)',
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

                {/* Main content — centered */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-20 text-center">
                    {/* Decorative opening quotation mark */}
                    <div
                        className="leading-none select-none mb-2"
                        style={{
                            fontSize: 'clamp(5rem, 12vw, 9rem)',
                            color: '#00B4D8',
                            opacity: 0.18,
                            fontFamily: 'Georgia, serif',
                            lineHeight: '0.8',
                            marginBottom: '-16px',
                        }}
                    >
                        &ldquo;
                    </div>

                    {/* Quote text */}
                    <p
                        className="font-light leading-relaxed mb-8 max-w-3xl"
                        style={{
                            color: 'var(--background-text,rgba(255,255,255,0.9))',
                            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                            fontStyle: 'italic',
                        }}
                    >
                        {slideData?.quote || 'This is a powerful quote that inspires the audience and makes the reader think differently about the subject.'}
                    </p>

                    {/* Teal separator */}
                    <div
                        className="mb-6 rounded-full"
                        style={{
                            width: '40px',
                            height: '2px',
                            background: '#00B4D8',
                        }}
                    />

                    {/* Author */}
                    <p
                        className="font-semibold tracking-wide"
                        style={{
                            color: 'var(--primary-color,#F4A11B)',
                            fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)',
                        }}
                    >
                        {slideData?.author || '— Someone Important'}
                    </p>
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

export default QuoteSlideLayout
