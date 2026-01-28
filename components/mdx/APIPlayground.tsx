"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import clsx from "clsx";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface APIPlaygroundProps {
  method: HttpMethod;
  path: string;
  baseUrl?: string;
  defaultHeaders?: Record<string, string>;
  defaultBody?: string;
}

const methodColors: Record<HttpMethod, string> = {
  GET: "bg-success text-white",
  POST: "bg-primary-500 text-white",
  PUT: "bg-warning text-white",
  PATCH: "bg-info text-white",
  DELETE: "bg-danger text-white",
};

export function APIPlayground({
  method,
  path,
  baseUrl = "",
  defaultHeaders = {},
  defaultBody = "",
}: APIPlaygroundProps) {
  const [url, setUrl] = useState(`${baseUrl}${path}`);
  const [headers, setHeaders] = useState(JSON.stringify(defaultHeaders, null, 2) || "{}");
  const [body, setBody] = useState(defaultBody);
  const [response, setResponse] = useState<string | null>(null);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"headers" | "body">("body");

  const sendRequest = async () => {
    setLoading(true);
    setResponse(null);
    setResponseStatus(null);

    try {
      const parsedHeaders = JSON.parse(headers);
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...parsedHeaders,
        },
      };

      if (method !== "GET" && body) {
        options.body = body;
      }

      const res = await fetch(url, options);
      setResponseStatus(res.status);

      const contentType = res.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        const json = await res.json();
        setResponse(JSON.stringify(json, null, 2));
      } else {
        const text = await res.text();
        setResponse(text);
      }
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
      setResponseStatus(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="not-prose my-6 rounded-xl border border-border overflow-hidden bg-card">
      {/* Header */}
      <div className="flex items-center gap-2 p-3 border-b border-border bg-muted/30">
        <Icon icon="lucide:play-circle" className="w-5 h-5 text-primary-500" />
        <span className="font-medium text-sm text-foreground">API Playground</span>
      </div>

      {/* URL Bar */}
      <div className="flex items-center gap-2 p-3 border-b border-border">
        <span className={clsx(
          "px-2.5 py-1 text-xs font-bold uppercase rounded-md",
          methodColors[method]
        )}>
          {method}
        </span>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 px-3 py-1.5 text-sm font-mono bg-muted rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          placeholder="Enter URL"
        />
        <button
          type="button"
          onClick={sendRequest}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <Icon icon="lucide:loader-2" className="w-4 h-4 animate-spin" />
          ) : (
            <Icon icon="lucide:send" className="w-4 h-4" />
          )}
          Send
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          type="button"
          onClick={() => setActiveTab("headers")}
          className={clsx(
            "px-4 py-2 text-sm font-medium transition-colors",
            activeTab === "headers"
              ? "text-primary-600 border-b-2 border-primary-500"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Headers
        </button>
        {method !== "GET" && (
          <button
            type="button"
            onClick={() => setActiveTab("body")}
            className={clsx(
              "px-4 py-2 text-sm font-medium transition-colors",
              activeTab === "body"
                ? "text-primary-600 border-b-2 border-primary-500"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Body
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className="p-3">
        {activeTab === "headers" && (
          <textarea
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            className="w-full h-24 p-3 text-sm font-mono bg-muted rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
            placeholder='{"Authorization": "Bearer token"}'
          />
        )}
        {activeTab === "body" && method !== "GET" && (
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full h-32 p-3 text-sm font-mono bg-muted rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
            placeholder='{"key": "value"}'
          />
        )}
      </div>

      {/* Response */}
      {response !== null && (
        <div className="border-t border-border">
          <div className="flex items-center gap-2 px-3 py-2 bg-muted/30">
            <span className="text-sm font-medium text-foreground">Response</span>
            {responseStatus !== null && (
              <span className={clsx(
                "px-2 py-0.5 text-xs font-mono rounded",
                responseStatus >= 200 && responseStatus < 300
                  ? "bg-success/10 text-success"
                  : responseStatus >= 400
                    ? "bg-danger/10 text-danger"
                    : "bg-warning/10 text-warning"
              )}>
                {responseStatus}
              </span>
            )}
          </div>
          <pre className="p-3 text-sm font-mono overflow-x-auto max-h-64 bg-gray-900 text-gray-100">
            <code>{response}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
