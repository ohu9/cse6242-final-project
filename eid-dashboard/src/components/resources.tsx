import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, FileText } from 'lucide-react';
import Image from 'next/image';

type ViewType = 'home' | 'infrastructure' | 'livability' | 'workflow';

interface Resource {
  id: ViewType;
  title: string;
  description: string;
  color: string;
}

interface ContentPage {
  title: string;
  content: any;
}

const Resources: React.FC = () => {
    const [currentView, setCurrentView] = useState<ViewType>('home');

    const resources: Resource[] = [
        {
        id: 'infrastructure',
        title: 'Infrastructure Guideline',
        description: 'Criteria for defining infrastructure, based on the VOC2011 Annotation Guidelines',
        color: 'bg-white hover:bg-neutral-100'
        },
        {
        id: 'livability',
        title: 'Livability and Sustainability Guideline',
        description: 'Guidelines for assessing infrastructure livability and stability',
        color: 'bg-white hover:bg-neutral-100'
        },
        {
        id: 'workflow',
        title: 'Damage evaluation workflow',
        description: 'Complete damage evaluation workflow for Plan 4.0',
        color: 'bg-white hover:bg-neutral-100'
        }
    ];

    const InfrastructureContent: React.FC = () => (
        <div >
        {/* Header */}
        <div className="bg-slate-500 text-white p-3 grid grid-cols-[1fr_3fr] gap-4 font-semibold">
            <div className="">Description</div>
            <div className="">Potential Infrastructure</div>
        </div>
        
        {/* InfrastructureSystem Section */}
        <div className="pl-0">
            <div className="p-2 font-bold text-center text-gray-800 bg-gray-200">
                    InfrastructureSystem
                </div>
            <div className="grid grid-cols-[1fr_3fr] gap-4 bg-gray-50">
                <div className="p-4 font-semibold text-gray-800 text-sm">
                    Building
                </div>
                <div className="p-4 text-sm text-gray-700">
                    Includes identifiable elements such as walls, floors, stairs, ceilings, windows, roofs, doors, columns, etc.
                </div>
            </div>
            
            <div className="grid grid-cols-[1fr_3fr] gap-4 bg-white">
                <div className="p-4 font-semibold text-gray-800 text-sm ">
                    Transportation System
                </div>
                <div className="p-4 text-sm text-gray-700 ">
                    Includes roadways such as highways, railways, light rail, roads, etc. Includes unpaved roads like dirt roads. Excludes vehicles such as buses, cars, airplanes, motorbikes, and other forms of transportation.
                </div>
            </div>
            
            <div className="grid grid-cols-[1fr_3fr] gap-4 bg-gray-50">
                <div className="p-4 font-semibold text-gray-800 text-sm ">
                    Utility System
                </div>
                <div className="p-4 text-sm text-gray-700 ">
                    Includes <span className="italic">electric power system</span> such as telephone poles; <span className="italic">potable water system</span> such as storage tanks; <span className="italic">wastewater system</span> such as wastewater treatment plants; <span className="italic">oil system</span> such as refineries; <span className="italic">natural gas system</span> such as buried pipes; <span className="italic">communication system</span> such as central office.
                </div>
                </div>
                
                <div className="grid grid-cols-[1fr_3fr] gap-4 bg-white">
                <div className="p-4 font-semibold text-gray-800 text-sm ">
                    Airport System
                </div>
                <div className="p-4 text-sm text-gray-700 ">
                    Includes runways, control towers, parking structures, etc.
                </div>
            </div>
        </div>
        
        {/* InfrastructureElements Section */}
        <div className="pl-0">
            <div className="p-2 font-bold text-center text-gray-800 bg-gray-200">
                InfrastructureElements
            </div>
            <div className="grid grid-cols-[1fr_3fr] gap-4 bg-gray-50">
            <div className="p-4 font-semibold text-gray-800 text-sm ">
                Wall
            </div>
            <div className="p-4 text-sm text-gray-700 ">
                Different from canvas, boards. Excludes anything hanging on the wall.
            </div>
            </div>
            
            <div className="grid grid-cols-[1fr_3fr] gap-4 bg-white">
            <div className="p-4 font-semibold text-gray-800 text-sm ">
                Column
            </div>
            <div className="p-4 text-sm text-gray-700 ">
                Excludes anything hanging on the column.
            </div>
            </div>
            
            <div className="grid grid-cols-[1fr_3fr] gap-4 bg-gray-50">
            <div className="p-4 font-semibold text-gray-800 text-sm ">
                Floor
            </div>
            <div className="p-4 text-sm text-gray-700 ">
                Excludes carpets.
            </div>
            </div>
            
            <div className="grid grid-cols-[1fr_3fr] gap-4 bg-white">
            <div className="p-4 font-semibold text-gray-800 text-sm ">
                Window
            </div>
            <div className="p-4 text-sm text-gray-700 ">
                Excludes curtains.
            </div>
            </div>
        </div>
        
        {/* Others Section */}
        <div className="pl-0">
            <div className="p-2 font-bold text-center text-gray-800 bg-gray-200">
                Others
            </div>
            <div className="grid grid-cols-[1fr_3fr] gap-4 bg-gray-50">
            <div className="p-4 font-semibold text-gray-800 text-sm ">
                Tent
            </div>
            <div className="p-4 text-sm text-gray-700 ">
                Considered as temporary infrastructure.
            </div>
            </div>
            
            <div className="grid grid-cols-[1fr_3fr] gap-4 bg-white">
            <div className="p-4 font-semibold text-gray-800 text-sm ">
                Airplane
            </div>
            <div className="p-4 text-sm text-gray-700 ">
                Not considered as infrastructure.
            </div>
            </div>
            
            <div className="grid grid-cols-[1fr_3fr] gap-4 bg-gray-50">
            <div className="p-4 font-semibold text-gray-800 text-sm ">
                Landscape
            </div>
            <div className="p-4 text-sm text-gray-700 ">
                Not considered as infrastructure.
            </div>
            </div>
            
            <div className="grid grid-cols-[1fr_3fr] gap-4 bg-white">
            <div className="p-4 font-semibold text-gray-800 text-sm ">
                Advertisement
            </div>
            <div className="p-4 text-sm text-gray-700 ">
                If the infrastructure is visible in the advertisement, it is considered as infrastructure.
            </div>
            </div>
        </div>
        </div>
    );

    const LivabilityContent: React.FC = () => (
        <div className="space-y-3">
            <div className="grid grid-cols-[1fr_3fr] gap-2 mb-3">
                <div className="text-center font-bold text-gray-800 bg-green-100 p-2 rounded-sm">
                Life safe and stable
                </div>
                <div className="text-center font-bold text-gray-800 bg-orange-100 p-2 rounded-sm">
                Not life safe and stable
                </div>
            </div>

            {/* COMBINED SCALE */}
            <div className="border-2 border-neutral-200 rounded-sm p-3">
                <div className="font-bold text-sm mb-2">Combined Scale (Ours)</div>
                <div className="mb-4">
                    <div className="bg-neutral-100 py-1 my-1 font-bold text-sm text-center">Buildings</div>
                    <div className="grid grid-cols-4 gap-2">
                    <div className="bg-green-50 p-3">
                        <p className="text-xs text-gray-700">
                        This level of damage <span className="font-semibold">does not significantly affect the structural integrity</span> of the building and is <span className="font-semibold">generally easy to repair</span>. Slight non-structural damage, such as hairline cracks in walls, minor deformations in steel connections, or small separations of components.
                        </p>
                    </div>
                    <div className="bg-green-50 p-3">
                        <p className="text-xs text-gray-700">
                        While the building <span className="font-semibold">remains stable</span>, the <span className="font-semibold">signs indicate a need for thorough inspection and repair</span> to prevent further deterioration. Observable stress on the structure, including larger cracks in walls, yielding of steel members, minor slippage at connections, and potential need for more substantial repairs to restore structural integrity.
                        </p>
                    </div>
                    <div className="bg-orange-50 p-3">
                        <p className="text-xs text-gray-700">
                        The building is significant compromise to the structure&apos;s integrity, with large and through-the-wall cracks, permanent lateral movement, potential partial collapse of certain structural elements, and substantial deformation. <span className="font-semibold">Impact safety.</span> Repairing this level of damage is complex and requires extensive restoration work, possibly including reconstruction of parts of the structure.
                        </p>
                    </div>
                    <div className="bg-orange-50 p-3">
                        <p className="text-xs text-gray-700">
                        The building is either on the verge of collapse, has partially collapsed, or is in a state that <span className="font-semibold">poses imminent danger to occupants</span>. This level of damage is characterized by a failure of major structural components, such as shear walls, braces, or frames, leading to significant lateral displacement or collapse. Recovery from this state often necessitates complete rebuild or significant structural overhaul.
                        </p>
                    </div>
                    </div>
                </div>

                <div>
                    <div className="bg-neutral-100 py-1 my-1 font-bold text-sm text-center">Roadway</div>
                    <div className="grid grid-cols-4 gap-2">
                    <div className="bg-green-50 p-3">
                        <p className="text-xs text-gray-700">
                        Minimal impact requiring primarily cosmetic repairs; does not significantly impede the functionality of transportation systems.
                        </p>
                    </div>
                    <div className="bg-green-50 p-3">
                        <p className="text-xs text-gray-700">
                        Visible damage that may affect structural performance but <span className="font-semibold">leaves the system stable</span>; requires structural assessment and targeted repairs. For example, moderate settlement or offset of several inches.
                        </p>
                    </div>
                    <div className="bg-orange-50 p-3">
                        <p className="text-xs text-gray-700">
                        Significant structural compromise requiring major repairs or partial reconstruction; <span className="font-semibold">Impacts safety and operational capacity.</span> For example, major settlement of the ground reaching a few feet, Extensive cracking of the liner.
                        </p>
                    </div>
                    <div className="bg-orange-50 p-3">
                        <p className="text-xs text-gray-700">
                        Catastrophic failure or structures being <span className="font-semibold">unsafe for use</span>; typically requires complete reconstruction.
                        </p>
                    </div>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {/* HAZUS SCALE */}
                <div className="border-2 border-neutral-200 rounded-sm p-3">
                    <div className="font-bold text-sm mb-2">HAZUS Scale</div>
                    <div className="grid grid-cols-4 gap-2">
                        <div className="bg-green-50 p-3 rounded-sm">
                            <div className="font-semibold text-xs mb-2">Slight Structure Damage</div>
                            <p className="text-xs text-gray-600 mb-3">
                                Minor aesthetic or superficial damage, such as hairline cracks in walls.
                            </p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-sm">
                            <div className="font-semibold text-xs mb-2">Moderate Structure Damage</div>
                            <p className="text-xs text-gray-600 mb-3">
                                Observable stress on the structure, such as larger cracks (wider than 1/8 inch) in walls, yielding of steel members.
                            </p>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-sm">
                            <div className="font-semibold text-xs mb-2">Extensive Structure Damage</div>
                            <p className="text-xs text-gray-600 mb-3">
                                Significant compromise to the structure&apos;s integrity, such as a large and through-the-wall cracks, potential partial collapse of certain structural elements.
                            </p>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-sm">
                            <div className="font-semibold text-xs mb-2">Complete Structure Damage</div>
                            <p className="text-xs text-gray-600 mb-3">
                                The building is either on the verge of collapse, has partially collapsed, or is in a state that poses imminent danger to occupants.
                            </p>
                        </div>
                    </div>
                </div>

                {/* EMS-98 SCALE */}
                <div className="border-2 border-neutral-200 rounded-sm p-3">
                    <div className="font-bold text-sm mb-2">EMS-98 Scale</div>
                    <Image
                        src="/ems-98_scale.png"
                        width="700"
                        height="300"
                        alt="Livability and Sustainability Guidelines"
                    />
                </div>
            </div>
        </div>
    );

    const WorkflowContent: React.FC = () => (
        <div className="max-w-4xl mx-auto">
            <Image
                src="/plan_4.0_workflow.jpg"
                width="600"
                height="600"
                alt="Plan 4.0 Workflow Diagram"
            />
        </div>
    );

    const contentPages: Record<Exclude<ViewType, 'home'>, ContentPage> = {
        infrastructure: {
        title: 'Infrastructure Guideline',
        content: <InfrastructureContent />
        },
        livability: {
        title: 'Livability and Sustainability Guideline',
        content: <LivabilityContent />
        },
        workflow: {
        title: 'Damage evaluation workflow',
        content: <WorkflowContent />
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden h-[calc(100vh-50px)] flex flex-col">
        {currentView === 'home' ? (
            <div className="p-8 overflow-y-auto flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Resources</h2>
            <div className="space-y-3">
                {resources.map((resource) => (
                <button
                    key={resource.id}
                    onClick={() => setCurrentView(resource.id)}
                    className={`w-full ${resource.color} border  rounded-lg p-4 transition-all duration-200 flex items-center justify-between group`}
                >
                    <div className="text-left">
                    <h3 className="font-semibold text-gray-800 mb-1">
                        {resource.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                        {resource.description}
                    </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
                </button>
                ))}
            </div>
            </div>
        ) : (
            <div className="flex flex-col h-full">
            <div className="p-8 pb-4 flex-shrink-0">
                <button
                onClick={() => setCurrentView('home')}
                className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
                >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="text-sm">Resources</span>
                </button>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {contentPages[currentView].title}
                </h2>
            </div>
            
            <div className="px-8 pb-8 overflow-y-auto flex-1">
                <div className="prose max-w-none">
                {contentPages[currentView].content}
                </div>
            </div>
            </div>
        )}
        </div>
    );
};

export default Resources;