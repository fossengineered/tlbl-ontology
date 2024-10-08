// Define the structure for an ontology entity
export interface OntologyField {
    name: string;
    type: string;
}

export interface OntologyEntity {
    name: string;
    fields: OntologyField[];
}

// Define our ontology entities
export const ontologyEntities: OntologyEntity[] = [
    {
        name: "Company",
        fields: [
            { name: "Name", type: "String" },
            { name: "Founded", type: "Date" },
            { name: "Industry", type: "String" },
        ],
    },
    {
        name: "Contact",
        fields: [
            { name: "FirstName", type: "String" },
            { name: "LastName", type: "String" },
            { name: "Email", type: "String" },
            { name: "Phone", type: "String" },
            { name: "worksFor", type: "Company" },  // Link to Company entity
        ],
    },
];