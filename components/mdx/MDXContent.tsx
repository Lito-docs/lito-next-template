import { MDXRemote } from "next-mdx-remote/rsc";
import { Alert } from "@/components/mdx/Alert";
import { Card, CardGroup } from "@/components/mdx/Card";
import { Tabs, Tab } from "@/components/mdx/Tabs";
import { Steps, Step } from "@/components/mdx/Steps";
import { Accordion, AccordionItem } from "@/components/mdx/Accordion";
import { Callout } from "@/components/mdx/Callout";
import { Badge } from "@/components/mdx/Badge";
import { Tooltip } from "@/components/mdx/Tooltip";
import { CodeGroup } from "@/components/mdx/CodeGroup";
import { APIEndpoint } from "@/components/mdx/APIEndpoint";
import { ParamField, ParamGroup } from "@/components/mdx/ParamField";
import { ResponseField, ResponseExample, ResponseGroup } from "@/components/mdx/ResponseField";
import { APIPlayground } from "@/components/mdx/APIPlayground";
import { RequestExample } from "@/components/mdx/RequestExample";

// Components available in MDX
const components = {
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
  // API Documentation components
  APIEndpoint,
  ParamField,
  ParamGroup,
  ResponseField,
  ResponseExample,
  ResponseGroup,
  APIPlayground,
  RequestExample,
};

interface MDXContentProps {
  source: string;
}

export function MDXContent({ source }: MDXContentProps) {
  return <MDXRemote source={source} components={components} />;
}
