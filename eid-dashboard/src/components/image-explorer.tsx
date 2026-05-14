import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface ImageExplorerProps {
    selectedImageUrl?: string;
}

export default function ImageExplorer({ selectedImageUrl }: ImageExplorerProps) {
    const [scale, setScale] = useState(1);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleZoomChange = useCallback((ref: any) => {
        setScale(ref.state.scale);
    }, []);

    const toggleFullscreen = useCallback(async () => {
        try {
            if (!containerRef.current) return;

            if (!document.fullscreenElement) {
                await containerRef.current.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        } catch (err) {
            // ignore errors for browsers that don't support fullscreen or if user blocks it
            // could surface a toast here if desired
            // console.error(err);
        }
    }, []);

    useEffect(() => {
        const onChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener("fullscreenchange", onChange);
        return () => document.removeEventListener("fullscreenchange", onChange);
    }, []);

    return (
        <div className="flex flex-col h-full">
            <div className="flex-none px-4 py-2 border-b flex items-center justify-between">
                <h1 className="font-semibold">Image Explorer</h1>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{Math.round(scale * 100)}%</span>
                </div>
            </div>
            <div className="flex-1 relative min-h-0 bg-gray-50 flex items-center justify-center">
                <TransformWrapper
                    initialScale={1}
                    minScale={0.5}
                    maxScale={4}
                    onZoomStop={handleZoomChange}
                    centerOnInit={true}
                >
                    {({ zoomIn, zoomOut, resetTransform }: { zoomIn: () => void, zoomOut: () => void, resetTransform: () => void }) => (
                        <>
                            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                                <button
                                    onClick={() => zoomIn()}
                                    className="p-2 bg-white rounded-full shadow hover:bg-gray-200 transition-all duration-200 ease-in-out active:bg-gray-300"
                                    title="Zoom In"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform hover:scale-110 transition-transform">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </button>
                                <button
                                    onClick={() => zoomOut()}
                                    className="p-2 bg-white rounded-full shadow hover:bg-gray-200 transition-all duration-200 ease-in-out active:bg-gray-300"
                                    title="Zoom Out"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform hover:scale-110 transition-transform">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </button>
                                <button
                                    onClick={() => {
                                        resetTransform();
                                        setScale(1);
                                    }}
                                    className="p-2 bg-white rounded-full shadow hover:bg-gray-200 transition-all duration-200 ease-in-out active:bg-gray-300"
                                    title="Reset Zoom"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform hover:scale-110 transition-transform">
                                        <path d="M21 12a9 9 0 11-3.37-6.63" strokeLinecap="round" strokeLinejoin="round" />
                                        <polyline points="21 3 21 9 15 9" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => toggleFullscreen()}
                                    className="p-2 bg-white rounded-full shadow hover:bg-gray-200 transition-all duration-200 ease-in-out active:bg-gray-300"
                                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                                >
                                    {/* simple fullscreen icon (toggle) */}
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform hover:scale-110 transition-transform">
                                        {
                                            <>
                                                <path d="M3 7v-4h4" />
                                                <path d="M17 3h4v4" />
                                                <path d="M21 17v4h-4" />
                                                <path d="M7 21H3v-4" />
                                            </>
                                        }
                                    </svg>
                                </button>
                            </div>
                            <TransformComponent
                                wrapperClass="!w-full !h-full"
                                contentClass="!w-full !h-full flex items-center justify-center p-0"
                            >
                                <div
                                    ref={containerRef}
                                    className="relative w-full h-full"
                                    style={{ width: isFullscreen ? '100vw' : '100%', height: isFullscreen ? '100vh' : '100%' }}
                                >
                                    <Image
                                        fill
                                        alt="selected image"
                                        src={selectedImageUrl || '/default-profile.png'}
                                        className="object-contain w-full h-full"
                                        style={{
                                            backgroundColor: "#f5f5f5",
                                            borderRadius: "8px",
                                        }}
                                    />
                                </div>
                            </TransformComponent>
                        </>
                    )}
                </TransformWrapper>
            </div>
        </div>
    )
}