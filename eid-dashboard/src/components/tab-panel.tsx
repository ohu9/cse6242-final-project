import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import LabelWizard from "@/components/label-wizard";
import AILens from "@/components/ai-lens";

interface TabPanelProps {
  ordinal?: number;
}

export function TabPanel({ ordinal }: TabPanelProps) {
  return (
    <div className="flex w-full max-w-sm min-h-full flex-col gap-6 px-3 py-2">
      <Tabs defaultValue="label-wizard">
            <TabsList>
                <TabsTrigger value="label-wizard">Label Wizard</TabsTrigger>
                <TabsTrigger value="ai-lens">AI Lens</TabsTrigger>
            </TabsList>
            <TabsContent value="label-wizard">
                <LabelWizard />
            </TabsContent>
            <TabsContent value="ai-lens">
                <AILens ordinal={ordinal} />
            </TabsContent>
      </Tabs>
    </div>
  )
}
