import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface SearchDocument {
  slug: string;
  title: string;
  description: string;
  content: string;
  headings: string[];
}

const CONTENT_DIR = path.join(process.cwd(), "content");

function extractHeadings(content: string): string[] {
  const headingRegex = /^#{1,6}\s+(.+)$/gm;
  const headings: string[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push(match[1]);
  }
  return headings;
}

function stripMdx(content: string): string {
  // Remove MDX components
  let stripped = content.replace(/<[A-Z][^>]*>[\s\S]*?<\/[A-Z][^>]*>/g, "");
  stripped = stripped.replace(/<[A-Z][^>]*\/>/g, "");
  // Remove code blocks
  stripped = stripped.replace(/```[\s\S]*?```/g, "");
  // Remove inline code
  stripped = stripped.replace(/`[^`]+`/g, "");
  // Remove links but keep text
  stripped = stripped.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  // Remove images
  stripped = stripped.replace(/!\[([^\]]*)\]\([^)]+\)/g, "");
  // Remove bold/italic markers
  stripped = stripped.replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, "$1");
  // Remove headings markers
  stripped = stripped.replace(/^#{1,6}\s+/gm, "");
  // Normalize whitespace
  stripped = stripped.replace(/\s+/g, " ").trim();
  return stripped;
}

function getFilesRecursively(dir: string, baseDir: string = dir): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getFilesRecursively(fullPath, baseDir));
    } else if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

export function generateSearchIndex(): SearchDocument[] {
  const files = getFilesRecursively(CONTENT_DIR);
  const documents: SearchDocument[] = [];

  for (const file of files) {
    const relativePath = path.relative(CONTENT_DIR, file);
    const slug = relativePath
      .replace(/\.(mdx?|md)$/, "")
      .replace(/\/index$/, "")
      .replace(/\\/g, "/");

    const fileContent = fs.readFileSync(file, "utf-8");
    const { data: frontmatter, content } = matter(fileContent);

    documents.push({
      slug: slug === "index" ? "" : slug,
      title: (frontmatter.title as string) || slug,
      description: (frontmatter.description as string) || "",
      content: stripMdx(content).slice(0, 1000), // Limit content length
      headings: extractHeadings(content),
    });
  }

  return documents;
}
