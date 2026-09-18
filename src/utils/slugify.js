export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    // Remove ( and ) specifically for cases like (G)I-DLE
    .replace(/[()]/g, '') 
    // Replace spaces and special characters with hyphens
    .replace(/[\s\W-]+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '');
}

// Helper to parse "Name (Group)" format from our database
export function parseIdolName(rawName) {
  const match = rawName.match(/^(.*?)\s*\((.*?)\)$/);
  if (match) {
    return {
      member: match[1].trim(),
      group: match[2].trim(),
      slug: slugify(rawName)
    };
  }
  return {
    member: rawName.trim(),
    group: 'Solo/Unknown',
    slug: slugify(rawName)
  };
}
