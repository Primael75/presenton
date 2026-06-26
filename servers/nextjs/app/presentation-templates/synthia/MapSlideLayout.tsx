import React from 'react'
import * as z from "zod";

export const layoutId = 'synthia-map-slide'
export const layoutName = 'World Map'
export const layoutDescription = 'Dark slide with an inline SVG world map in teal and positioned markers from slide data.'

const markerSchema = z.object({
    label: z.string().min(2).max(30).default('City').meta({
        description: "City or location name shown next to the marker",
    }),
    x: z.number().min(0).max(100).default(50).meta({
        description: "Horizontal position as percentage from left (0–100)",
    }),
    y: z.number().min(0).max(100).default(50).meta({
        description: "Vertical position as percentage from top (0–100)",
    }),
})

const mapSlideSchema = z.object({
    title: z.string().min(3).max(60).default('Global Presence').meta({
        description: "Slide title displayed in gold at the top",
    }),
    description: z.string().min(10).max(150).default('Our worldwide footprint across key strategic regions.').meta({
        description: "Short description below the title",
    }),
    markers: z.array(markerSchema).min(1).max(6).default([
        { label: 'Paris', x: 48, y: 32 },
        { label: 'Singapore', x: 72, y: 57 },
        { label: 'Washington', x: 22, y: 36 },
    ]).meta({
        description: "1–6 location markers positioned by percentage on the map",
    }),
})

export const Schema = mapSlideSchema

export type MapSlideData = z.infer<typeof mapSlideSchema>

const MapSlideLayout: React.FC<{ data?: Partial<MapSlideData> }> = ({ data: slideData }) => {
    const markers = slideData?.markers ?? [
        { label: 'Paris', x: 48, y: 32 },
        { label: 'Singapore', x: 72, y: 57 },
        { label: 'Washington', x: 22, y: 36 },
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
                {/* Background glow */}
                <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: '700px',
                        height: '700px',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'radial-gradient(circle, rgba(0,91,154,0.08) 0%, transparent 55%)',
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

                {/* Header */}
                <div className="relative z-10 px-14 pt-8 pb-2">
                    <div
                        className="mb-1 text-xs font-semibold tracking-widest uppercase"
                        style={{ color: 'rgba(0,180,216,0.8)', letterSpacing: '0.2em' }}
                    >
                        Worldwide
                    </div>
                    <h2
                        className="font-bold"
                        style={{
                            color: 'var(--primary-color,#F4A11B)',
                            fontSize: 'clamp(1.4rem, 2.6vw, 2rem)',
                        }}
                    >
                        {slideData?.title || 'Global Presence'}
                    </h2>
                    <div
                        className="mt-2 mb-1 rounded-full"
                        style={{ width: '44px', height: '2px', background: '#00B4D8' }}
                    />
                    <p
                        className="text-xs font-light"
                        style={{ color: 'var(--background-text,rgba(176,196,216,0.75))' }}
                    >
                        {slideData?.description || 'Our worldwide footprint across key strategic regions.'}
                    </p>
                </div>

                {/* Map container */}
                <div className="relative z-10 mx-10 mt-1" style={{ height: '68%' }}>
                    {/* SVG World map — simplified continent outlines */}
                    <svg
                        viewBox="0 0 1000 500"
                        className="w-full h-full"
                        style={{ opacity: 0.55 }}
                        fill="none"
                        stroke="#00B4D8"
                        strokeWidth="1"
                    >
                        {/* North America */}
                        <path d="M80,60 L170,55 L200,70 L210,90 L195,120 L175,150 L165,180 L150,210 L130,240 L115,230 L100,200 L90,170 L75,140 L65,110 L70,80 Z" fill="rgba(0,180,216,0.08)" />
                        {/* Greenland */}
                        <path d="M195,20 L240,18 L255,35 L245,55 L215,60 L195,45 Z" fill="rgba(0,180,216,0.06)" />
                        {/* Central America / Caribbean */}
                        <path d="M150,210 L165,220 L160,235 L145,230 Z" fill="rgba(0,180,216,0.08)" />
                        {/* South America */}
                        <path d="M145,240 L185,235 L205,255 L210,290 L205,330 L190,370 L170,390 L150,385 L135,360 L125,320 L120,280 L125,255 Z" fill="rgba(0,180,216,0.08)" />
                        {/* Europe */}
                        <path d="M430,60 L480,55 L505,70 L510,90 L495,110 L480,115 L460,120 L440,115 L425,100 L420,80 Z" fill="rgba(0,180,216,0.08)" />
                        {/* Scandinavia */}
                        <path d="M445,30 L470,25 L480,40 L470,55 L450,58 L440,45 Z" fill="rgba(0,180,216,0.06)" />
                        {/* Africa */}
                        <path d="M430,130 L490,125 L520,145 L535,180 L530,230 L510,280 L490,320 L465,340 L440,330 L415,300 L400,260 L395,215 L400,175 L415,145 Z" fill="rgba(0,180,216,0.08)" />
                        {/* Middle East */}
                        <path d="M510,110 L560,105 L580,125 L575,150 L545,160 L515,155 L505,135 Z" fill="rgba(0,180,216,0.08)" />
                        {/* Russia / Central Asia */}
                        <path d="M510,30 L700,25 L730,45 L720,70 L680,85 L620,90 L560,85 L515,70 Z" fill="rgba(0,180,216,0.06)" />
                        {/* South Asia */}
                        <path d="M580,130 L640,125 L665,150 L660,185 L635,210 L600,215 L575,195 L570,165 Z" fill="rgba(0,180,216,0.08)" />
                        {/* Southeast Asia */}
                        <path d="M660,145 L720,140 L745,160 L740,190 L715,205 L680,200 L658,180 Z" fill="rgba(0,180,216,0.08)" />
                        {/* China / East Asia */}
                        <path d="M660,70 L770,65 L795,90 L790,125 L760,145 L720,148 L680,140 L660,115 Z" fill="rgba(0,180,216,0.08)" />
                        {/* Japan */}
                        <path d="M800,80 L820,75 L830,90 L820,105 L805,100 Z" fill="rgba(0,180,216,0.07)" />
                        {/* Australia */}
                        <path d="M720,280 L810,275 L845,300 L850,345 L825,375 L780,385 L740,375 L710,345 L705,310 Z" fill="rgba(0,180,216,0.08)" />
                        {/* New Zealand */}
                        <path d="M870,340 L885,335 L890,355 L878,365 Z" fill="rgba(0,180,216,0.06)" />
                        {/* UK / Ireland */}
                        <path d="M418,62 L428,58 L432,70 L424,75 Z" fill="rgba(0,180,216,0.07)" />
                    </svg>

                    {/* Markers — positioned absolutely over the map */}
                    {markers.map((marker, i) => (
                        <div
                            key={i}
                            className="absolute flex flex-col items-center pointer-events-none"
                            style={{
                                left: `${marker.x}%`,
                                top: `${marker.y}%`,
                                transform: 'translate(-50%, -50%)',
                                zIndex: 5,
                            }}
                        >
                            {/* Pulse ring */}
                            <div
                                className="absolute rounded-full"
                                style={{
                                    width: '18px',
                                    height: '18px',
                                    border: '1px solid rgba(0,180,216,0.4)',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                }}
                            />
                            {/* Dot */}
                            <div
                                className="rounded-full"
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    background: '#F4A11B',
                                    boxShadow: '0 0 8px rgba(244,161,27,0.7)',
                                    flexShrink: 0,
                                }}
                            />
                            {/* Label */}
                            <div
                                className="mt-2 text-center whitespace-nowrap font-semibold"
                                style={{
                                    fontSize: '0.6rem',
                                    color: '#F4A11B',
                                    textShadow: '0 1px 4px rgba(13,27,42,0.9)',
                                    letterSpacing: '0.05em',
                                }}
                            >
                                {marker.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Legend */}
                <div className="absolute bottom-5 left-14 flex items-center gap-6 z-10">
                    <div className="flex items-center gap-2">
                        <div
                            className="rounded-full"
                            style={{
                                width: '8px',
                                height: '8px',
                                background: '#F4A11B',
                                boxShadow: '0 0 6px rgba(244,161,27,0.6)',
                            }}
                        />
                        <span
                            className="text-xs"
                            style={{ color: 'rgba(176,196,216,0.7)' }}
                        >
                            Key Location
                        </span>
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

export default MapSlideLayout
