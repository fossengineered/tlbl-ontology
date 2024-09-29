// Define the structure for an ontology entity
export interface OntologyEntity {
    name: string;
    fields: { name: string; type: string }[];
}

// Define our ontology entities
export const ontologyEntities: OntologyEntity[] = [
    {
        name: "Company",
        fields: [
            { name: "Name", type: "String" },
            { name: "Founded", type: "Date" },
            { name: "Industry", type: "String" },
            { name: "Revenue", type: "Number" },
            { name: "hasContact", type: "Contact" },  // Added hasContact property
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
];