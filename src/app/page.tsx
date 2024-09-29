"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ontologyEntities } from "@/app/ontology/ontologyEntities" // Import the ontologyEntities

export default function OntologyViewer() {
  const [selectedEntity, setSelectedEntity] = useState(ontologyEntities[0]) // Use the imported ontologyEntities
  const [activeTab, setActiveTab] = useState("description") // State to manage active tab

  // Sample data for demonstration
  const sampleData = {
    Company: {
      Name: "Example Corp",
      Founded: "2000-01-01",
      Industry: "Technology",
    },
    Contact: {
      FirstName: "Jane",
      LastName: "Smith",
      Email: "jane.smith@example.com",
      Phone: "098-765-4321",
      worksFor: [
        "http://example.org/ontology/Company#ExampleCorp", // URI for Example Corp
        "http://example.org/ontology/Company#AnotherCompany" // URI for Another Company
      ], // Example of a contact working for multiple companies using URIs
    },
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Entity List */}
      <div className="border-r" style={{ maxWidth: '270px', width: '100%' }}>
        <ScrollArea className="h-screen">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Ontology Entities</h2>
            {ontologyEntities.map((entity) => (
              <Button
                key={entity.name}
                variant={selectedEntity.name === entity.name ? "secondary" : "ghost"}
                className="w-full justify-start mb-1" // Reduced margin
                onClick={() => setSelectedEntity(entity)}
              >
                {entity.name}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right side - Entity Details */}
      <div className="w-full p-4"> {/* Changed to w-full to take remaining space */}
        <h2 className="text-2xl font-bold mb-2">{selectedEntity.name}</h2>
        {/* Link to the corresponding .ttl file */}
        <div className="mb-2">
          <a
            href={`/ontology/${selectedEntity.name}.ttl`}
            className="text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            View {selectedEntity.name} TTL File
          </a>
        </div>
        <Separator className="my-2" />

        {/* Tabs for Sample Data and Entity Description */}
        <div className="flex mb-2">
          <Button
            variant={activeTab === "description" ? "secondary" : "ghost"}
            onClick={() => setActiveTab("description")}
            className="mr-2"
          >
            Entity Description
          </Button>
          <Button
            variant={activeTab === "sampleData" ? "secondary" : "ghost"}
            onClick={() => setActiveTab("sampleData")}
          >
            Sample Data
          </Button>
        </div>

        <Separator className="my-2" />

        {/* Content based on active tab */}
        {activeTab === "description" ? (
          <>
            <h3 className="text-lg font-semibold mb-1">Fields:</h3>
            <ScrollArea className="h-[calc(100vh-200px)]">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left pb-2">Name</th>
                    <th className="text-left pb-2">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedEntity.fields.map((field) => (
                    <tr key={field.name}>
                      <td className="py-2">{field.name}</td>
                      <td className="py-2">{field.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold mb-1">Sample Data:</h3>
            <pre className="bg-gray-100 p-2 rounded">
              {JSON.stringify(sampleData[selectedEntity.name as keyof typeof sampleData], null, 2)}
            </pre>
          </>
        )}
      </div>
    </div>
  )
}