/**
 * Utility script to update page.tsx with section-specific themes
 * Run this to automatically replace theme references for each section
 */

const fs = require('fs');
const path = require('path');

const pageFilePath = path.join(__dirname, '..', 'app', 'page.tsx');
let content = fs.readFileSync(pageFilePath, 'utf-8');

// Section theme mappings
const sections = [
    { id: 'state', name: 'State & Flow' },
    { id: 'offline', name: 'Offline-First' },
    { id: 'hardware', name: 'Hardware' },
    { id: 'multiapp', name: 'Scale/Multiapp' },
    { id: 'security', name: 'Security' },
    { id: 'crossplatform', name: 'Cross-Platform' },
    { id: 'production', name: 'Production' },
    { id: 'refinement', name: 'Refinement' },
    { id: 'future', name: 'Future' }
];

// Process each section
for (const section of sections) {
    // Find the section block start
    const sectionStart = `<Section id="${section.id}"`;
    const sectionEnd = `</Section>`;
    
    // Find the indices
    let startIdx = content.indexOf(sectionStart);
    if (startIdx === -1) continue;
    
    // Find the corresponding closing tag
    let depth = 0;
    let endIdx = -1;
    for (let i = startIdx; i < content.length; i++) {
        if (content.substring(i, i + 8) === '<Section') depth++;
        if (content.substring(i, i + 10) === '</Section>') {
            depth--;
            if (depth === 0) {
                endIdx = i + 10;
                break;
            }
        }
    }
    
    if (endIdx === -1) continue;
    
    // Extract section content
    let sectionContent = content.substring(startIdx, endIdx);
    
    // Replace theme. with sectionThemes.{sectionId}.
    sectionContent = sectionContent.replace(/theme\./g, `sectionThemes.${section.id}.`);
    
    // Replace the section in the main content
    content = content.substring(0, startIdx) + sectionContent + content.substring(endIdx);
    
    console.log(`✓ Updated ${section.name} (${section.id})`);
}

// Write back to file
fs.writeFileSync(pageFilePath, content, 'utf-8');
console.log('\n✓ All sections updated successfully!');
