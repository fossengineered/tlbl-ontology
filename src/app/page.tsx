"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// Define the structure for an ontology entity
interface OntologyEntity {
  name: string
  fields: { name: string; type: string }[]
}

// Define our ontology entities
const ontologyEntities: OntologyEntity[] = [
  {
    name: "Company",
    fields: [
      { name: "Name", type: "String" },
      { name: "Founded", type: "Date" },
      { name: "Industry", type: "String" },
      { name: "Revenue", type: "Number" },
    ],
  },
  {
    name: "Contact",
    fields: [
      { name: "FirstName", type: "String" },
      { name: "LastName", type: "String" },
      { name: "Email", type: "String" },
      { name: "Phone", type: "String" },
    ],
  },
]

export default function OntologyViewer() {
  const [selectedEntity, setSelectedEntity] = useState<OntologyEntity>(ontologyEntities[0])

  return (
    <div className="flex h-screen">
      {/* Left side - Entity List */}
      <div className="w-1/3 border-r">
        <ScrollArea className="h-screen">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Ontology Entities</h2>
            {ontologyEntities.map((entity) => (
              <Button
                key={entity.name}
                variant={selectedEntity.name === entity.name ? "secondary" : "ghost"}
                className="w-full justify-start mb-2"
                onClick={() => setSelectedEntity(entity)}
              >
                {entity.name}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right side - Entity Details */}
      <div className="w-2/3 p-6">
        <h2 className="text-2xl font-bold mb-4">{selectedEntity.name}</h2>
        <Separator className="my-4" />
        <h3 className="text-lg font-semibold mb-2">Fields:</h3>
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
      </div>
    </div>
  )
}