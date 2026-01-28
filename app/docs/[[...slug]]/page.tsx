import { notFound } from "next/navigation";
import { getDocBySlug, getAllDocSlugs, contentDirExists } from "@/lib/content";
import { MDXContent } from "@/components/mdx/MDXContent";

interface DocsPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { slug } = await params;
  const slugArray = slug || [];

  // Try to get the document
  const doc = getDocBySlug(slugArray);

  if (!doc) {
    // If no content directory exists yet, show a welcome page
    if (!contentDirExists()) {
      return (
        <div>
          <h1>Welcome to Lito Docs</h1>
          <p>
            Create a <code>content/</code> directory in your project root and add MDX files to get started.
          </p>
          <h2>Quick Start</h2>
          <ol>
            <li>Create <code>content/index.mdx</code> for your docs homepage</li>
            <li>Add more pages like <code>content/getting-started.mdx</code></li>
            <li>Update <code>docs-config.json</code> to configure navigation</li>
          </ol>
          <h2>Example MDX File</h2>
          <pre>
{`---
title: Getting Started
description: Learn how to use Lito
---

# Getting Started

Welcome to the documentation!

<Alert variant="info">
  This is an info alert using MDX components.
</Alert>`}
          </pre>
        </div>
      );
    }
    notFound();
  }

  const title = doc.frontmatter.title as string | undefined;
  const description = doc.frontmatter.description as string | undefined;

  return (
    <div>
      {title && <h1>{title}</h1>}
      {description && <p className="text-lg text-muted-foreground mb-6">{description}</p>}
      <MDXContent source={doc.content} />
    </div>
  );
}

// Generate static params for known pages
export async function generateStaticParams() {
  const slugs = getAllDocSlugs();

  // Always include the root docs page
  const params: { slug?: string[] }[] = [{ slug: undefined }];

  for (const slug of slugs) {
    if (slug.length > 0) {
      params.push({ slug });
    }
  }

  return params;
}
