import type { MDXComponents } from "mdx/types";

// Import all MDX components
import { Alert } from "@/components/mdx/Alert";
import { Card, CardGroup } from "@/components/mdx/Card";
import { Tabs, Tab } from "@/components/mdx/Tabs";
import { Steps, Step } from "@/components/mdx/Steps";
import { Accordion, AccordionItem } from "@/components/mdx/Accordion";
import { Callout } from "@/components/mdx/Callout";
import { Badge } from "@/components/mdx/Badge";
import { Tooltip } from "@/components/mdx/Tooltip";
import { CodeGroup } from "@/components/mdx/CodeGroup";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom components for MDX - auto-imported
    Alert,
    Card,
    CardGroup,
    Tabs,
    Tab,
    Steps,
    Step,
    Accordion,
    AccordionItem,
    Callout,
    Badge,
    Tooltip,
    CodeGroup,

    // Override default HTML elements with custom styling
    h1: ({ children, ...props }) => (
      <h1
        className="text-4xl font-bold tracking-tight text-foreground mb-4 mt-8 first:mt-0"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="text-2xl font-semibold tracking-tight text-foreground mb-3 mt-8 pb-2 border-b border-border"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="text-xl font-semibold text-foreground mb-2 mt-6"
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className="text-lg font-medium text-foreground mb-2 mt-4" {...props}>
        {children}
      </h4>
    ),
    p: ({ children, ...props }) => (
      <p className="text-muted-foreground leading-7 mb-4" {...props}>
        {children}
      </p>
    ),
    a: ({ href, children, ...props }) => (
      <a
        href={href}
        className="text-primary-600 hover:text-primary-700 font-medium underline-offset-4 hover:underline transition-colors"
        {...props}
      >
        {children}
      </a>
    ),
    ul: ({ children, ...props }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-7" {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-4 border-primary-300 pl-4 italic text-muted-foreground my-4"
        {...props}
      >
        {children}
      </blockquote>
    ),
    code: ({ children, ...props }) => (
      <code
        className="bg-muted px-1.5 py-0.5 rounded-md text-sm font-mono text-foreground border border-border"
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre
        className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 border border-border"
        {...props}
      >
        {children}
      </pre>
    ),
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full divide-y divide-border" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th
        className="px-4 py-3 text-left text-sm font-semibold text-foreground bg-muted"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td
        className="px-4 py-3 text-sm text-muted-foreground border-b border-border"
        {...props}
      >
        {children}
      </td>
    ),
    hr: (props) => <hr className="my-8 border-border" {...props} />,
    img: (props) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="rounded-lg border border-border shadow-sm my-4 max-w-full"
        alt=""
        {...props}
      />
    ),

    // Spread any additional components passed in
    ...components,
  };
}
