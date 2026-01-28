import { DocLayout } from "@/components/layout";
import { SearchProvider } from "@/components/providers/SearchProvider";
import { generateSearchIndex } from "@/lib/search";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Generate search index at build time (Server Component)
  const searchDocuments = generateSearchIndex();

  return (
    <SearchProvider documents={searchDocuments}>
      <DocLayout>{children}</DocLayout>
    </SearchProvider>
  );
}
