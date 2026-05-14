'use client';

import {
ResizableHandle,
ResizablePanel,
ResizablePanelGroup,
} from "@/components/ui/resizable"
import LabelEditor from "@/components/label-editor";
import { TabPanel } from "@/components/tab-panel";
import ImageExplorer from "@/components/image-explorer";
import ImageGallery from "@/components/image-gallery";
import Resources from "@/components/resources";

import { useState } from 'react';

export default function DashboardPage() {
	const [selectedImageUrl, setSelectedImageUrl] = useState<string | undefined>();
	const [selectedImageOrdinal, setSelectedImageOrdinal] = useState<number | null>(null);
	const [labelResetTrigger, setLabelResetTrigger] = useState(0);
	return (
		<main className="">
		<ResizablePanelGroup direction="horizontal" className="min-h-[93vh] min-w-[100vw]" >

			{/* LEFT PANEL */}
			<ResizablePanel defaultSize={25}>
				<ResizablePanelGroup direction="vertical" className="min-h-[93vh] min-w-1/2" >
					<ResizablePanel defaultSize={50} className="h-full">
						<TabPanel ordinal={selectedImageOrdinal || 0} />
					</ResizablePanel>
					<ResizableHandle />
						<ResizablePanel defaultSize={50}>
							<LabelEditor selectedImageOrdinal={selectedImageOrdinal} resetTrigger={labelResetTrigger} />
						</ResizablePanel>
				</ResizablePanelGroup>
			</ResizablePanel>
			<ResizableHandle/>

			{/* CENTER PANEL */}
			<ResizablePanel defaultSize={50}>
				<ResizablePanelGroup direction="vertical" className="min-h-[93vh] min-w-1/2" >

					{/* IMAGE FINDER */}
					<ResizablePanel defaultSize={60}>
						<ImageExplorer selectedImageUrl={selectedImageUrl} />
					</ResizablePanel>
					<ResizableHandle withHandle />

					{/* IMAGE GALLERY */}
                        <ResizablePanel defaultSize={40}>
                        	<ImageGallery onImageSelect={(url, ordinal) => {
                        		setSelectedImageUrl(url);
                        		setSelectedImageOrdinal(ordinal + 1);
                        	}} onTabChange={() => setLabelResetTrigger((t) => t + 1)} />
                    </ResizablePanel>
				</ResizablePanelGroup>
			</ResizablePanel>
			<ResizableHandle/>

			{/* RIGHT PANEL */}
			<ResizablePanel 
				defaultSize={25}
				>
				<Resources />
			</ResizablePanel>
		</ResizablePanelGroup>
		</main>
	);
}