"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { fetchWithAuth } from "@/lib/fetcher";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

interface ImageGalleryProps {
    onImageSelect: (url: string, ordinal: number) => void;
    onTabChange?: (tab: string) => void;
}

export default function ImageGallery({ onImageSelect, onTabChange }: ImageGalleryProps) {
    const [images, setImages] = useState<string[]>([]);
    const [ordinals, setOrdinals] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const gridRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState("all-images");
    const [pages, setPages] = useState<Record<string, number>>({
        "all-images": 0,
        "labeled": 0,
        "unlabeled": 0
    });

    // helpers to get/set current page for active tab
    const getCurrentPage = () => pages[selectedTab] ?? 0;
    const setCurrentPageForTab = (page: number) => {
        setPages(prev => ({ ...prev, [selectedTab]: page }));
    };

    // local buffered input so typing isn't immediately flushed into pages state
    const [pageInput, setPageInput] = useState<string>(() => (getCurrentPage() + 1).toString());
    useEffect(() => {
        setPageInput((getCurrentPage() + 1).toString());
    }, [selectedTab, pages]);

    const commitPageInput = () => {
        const pageNum = parseInt(pageInput) - 1;
        if (!isNaN(pageNum) && pageNum >= 0) {
            setCurrentPageForTab(pageNum);
        } else {
            // restore visible value
            setPageInput((getCurrentPage() + 1).toString());
        }
    };

    useEffect(() => {
        setSelectedImage(null); 

        const controller = new AbortController(); 

        fetchImage(getCurrentPage(), controller.signal);

        return () => {
            controller.abort(); // as soon as selectedTab changes this is triggered to stop fetching images and start afresh
        };
    }, [selectedTab, pages]);

    function imageSelected(key: number) {
        setSelectedImage(key);
        const url = images[key];
        if (url) {
            const page = getCurrentPage();
            const ordinal = page * 20 + key;
            onImageSelect(url, parseInt(ordinals[key], 10)-1);
        }
    }

    const fetchImage = async (index: number, signal: AbortSignal) => {
        setIsLoading(true);
        setImages([]); // Clear current images while loading
        const start = index * 21 + 1;
        const end = start + 20;
        try {
            let url = `/images/range?start=${start}&end=${end}`;
            if(selectedTab=="labeled"){
                url = `/images/labeled?start=${start}&end=${end}`;
            }else if (selectedTab=="unlabeled"){
                url = `/images/unlabeled?start=${start}&end=${end}`; 
            }
            const response = await fetchWithAuth(url, {signal});

            console.log(response);
            if (response && Array.isArray(response)) {
                const imageUrls = response.map(item => item.url);
                
                setOrdinals(response.map(item => item.ordinal));
                setImages(imageUrls);
            }
            setIsLoading(false); // only if not interrupted by abort signal
        } catch (error) {
            if ((error as any)?.name === 'AbortError') {
                console.log('Fetch aborted, tab switch detected');
                return; // exit early
            }
            console.error('Error fetching images:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const ImageArea = (
        <div
            style={{
                flex: 1,
                minHeight: 0,
                position: "relative"
            }}
        >
            {!isLoading && images.length > 0 ? (
            <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "1rem",
                padding: "1rem",
                overflowY: "auto",
                flex: 1,
                // minHeight: 0
                height: "100%",
                width: "100%",
                position: "absolute"
            }}
            ref={gridRef}>
            {images.map((url, i) => (
                <div
                key={i}
                onClick={() => imageSelected(i)}
                style={{
                    cursor: 'pointer',
                }}
                >
                    <Image
                    src={url}
                    alt={`Image ${i}`}
                    width={200}
                    height={150}
                    style={{
                        borderRadius: "8px",
                        objectFit: "contain",
                        width: "100%",
                        height: "200px",
                        backgroundColor: "#f5f5f5",
                        border: selectedImage === i ? '3px solid #4CAF50' : '3px solid transparent',
                        transition: 'border-color 0.2s ease'
                    }}
                    />
                </div>
            ))}
            </div>
        ) : (
            <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "1rem",
                flex: 1,
                minHeight: 0
            }}
            >
                <p className="text-lg text-gray-500">Loading images...</p>
            </div>
        )}
        </div>
    )
    // scroll the grid back to top when the images array changes (i.e. after fetching a new page)
    useEffect(() => {
        if (gridRef.current) {
            try {
                gridRef.current.scrollTo({ top: 0, behavior: 'auto' });
            } catch (e) {
                // fallback
                gridRef.current.scrollTop = 0;
            }
        }
    }, [images]);
    const PaginationFooter = (
        <div className="w-full flex-none px-4 py-4 flex justify-center items-center border-t">
            <div className="flex items-center" style={{ width: '240px' }}>
                <button
                    onClick={() => setCurrentPageForTab(Math.max(0, getCurrentPage() - 1))}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-none"
                    disabled={getCurrentPage() === 0}
                >
                    <svg
                        width="24"
                        height="16"
                        viewBox="0 0 24 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m15 12-6-4 6-4"/>
                    </svg>
                </button>
                <div className="flex-1 text-center flex items-center justify-center gap-2">
                    <span className="text-sm font-medium">Page</span>
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={pageInput}
                        onChange={(e) => setPageInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                commitPageInput();
                                // remove focus after pressing Enter so behavior matches blur
                                (e.target as HTMLInputElement).blur();
                            }
                        }}
                        onBlur={() => commitPageInput()}
                        className="w-16 text-center text-sm font-medium border rounded-md py-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </div>
                <button
                    onClick={() => setCurrentPageForTab(getCurrentPage() + 1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-none"
                >
                    <svg
                        width="24"
                        height="16"
                        viewBox="0 0 24 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m9 12 6-4-6-4"/>
                    </svg>
                </button>
            </div>
        </div>
    )

    return (
        <main style={{ 
            height: "100%",
            minHeight: 0,
            display: "flex",
            flexDirection: "column"
        }}>
        <div className="w-full px-4 py-2 flex flex-1 flex-col min-h-0">
             <Tabs value={selectedTab} onValueChange={(v)=>{ setSelectedTab(v); onTabChange?.(v); }} className="w-full flex flex-1 flex-col min-h-0">
                    <TabsList className="w-full justify-start flex-none">
                        <TabsTrigger value="all-images">All Images</TabsTrigger>
                        <TabsTrigger value="labeled">Labeled</TabsTrigger>
                        <TabsTrigger value="unlabeled">Unlabeled</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all-images" className= "flex flex-1 flex-col min-h-0">
                        {ImageArea}
                        {PaginationFooter}
                    </TabsContent>
                    <TabsContent value="labeled" className="flex flex-1 flex-col min-h-0">
                        {ImageArea}
                        {PaginationFooter}
                    </TabsContent>
                    <TabsContent value="unlabeled" className= "flex flex-1 flex-col min-h-0">
                        {ImageArea}
                        {PaginationFooter}
                    </TabsContent>
            </Tabs>
        </div>
        
        </main>
    );
}