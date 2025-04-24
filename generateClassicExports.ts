import fs from 'fs';
import path from 'path';

const inputFile = path.join(__dirname, './global.d.ts');
const outputFile = path.join(__dirname, './index.generated.ts');

// Read the input file
const content = fs.readFileSync(inputFile, 'utf-8');

// Replace 'type' with 'export type' at the start of lines
const processedContent = content.replace(/^type/gm, 'export type');

// Write the processed content to the output file
fs.writeFileSync(outputFile, processedContent);

console.log(`Successfully generated ${outputFile}`); 