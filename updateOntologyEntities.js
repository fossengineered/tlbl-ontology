import chokidar from 'chokidar';
import fs from 'fs';
import path from 'path';
import { Parser } from 'n3'; // Removed DataFactory import as it is unused
// const { namedNode, literal } = DataFactory; // Removed destructuring as they are unused

const ontologyDir = path.join(__dirname, 'src/app/ontology');
const outputFilePath = path.join(ontologyDir, 'ontologyEntities.ts');

const parseTTLFile = (filePath) => {
    return new Promise((resolve, reject) => {
        const parser = new Parser();
        const ontologyEntity = {
            name: '',
            fields: [],
        };

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }

            const quads = parser.parse(data);
            quads.forEach((quad) => {
                if (quad.predicate.value.endsWith('label')) {
                    ontologyEntity.name = quad.object.value;
                } else if (quad.predicate.value.endsWith('domain')) {
                    const fieldName = quad.subject.value.split('#')[1];
                    const fieldType = quad.object.value.split('#')[1];
                    ontologyEntity.fields.push({ name: fieldName, type: fieldType });
                }
            });

            resolve(ontologyEntity);
        });
    });
};

const updateOntologyEntities = async () => {
    const files = fs.readdirSync(ontologyDir).filter((file) => file.endsWith('.ttl'));
    const ontologyEntities = [];

    for (const file of files) {
        const filePath = path.join(ontologyDir, file);
        const entity = await parseTTLFile(filePath);
        ontologyEntities.push(entity);
    }

    const outputContent = `// Auto-generated file. Do not edit manually.
// Define the structure for an ontology entity
export interface OntologyEntity {
  name: string;
  fields: { name: string; type: string }[];
}

// Define our ontology entities
export const ontologyEntities: OntologyEntity[] = ${JSON.stringify(ontologyEntities, null, 2)};
`;

    fs.writeFileSync(outputFilePath, outputContent, 'utf8');
    console.log('ontologyEntities.ts has been updated.');
};

chokidar.watch(path.join(ontologyDir, '*.ttl')).on('change', updateOntologyEntities);

// Initial run to populate the file
updateOntologyEntities();