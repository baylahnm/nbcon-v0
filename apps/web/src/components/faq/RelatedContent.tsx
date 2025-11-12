"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, FileText } from "lucide-react";

interface RelatedContentProps {
  relatedDocs?: string[];
  relatedFAQs?: string[];
}

export function RelatedContent({ relatedDocs = [], relatedFAQs = [] }: RelatedContentProps) {
  if (relatedDocs.length === 0 && relatedFAQs.length === 0) {
    return null;
  }

  return (
    <Card className="bg-muted/30">
      <CardContent className="pt-6">
        <h4 className="card-title mb-4">Related Content</h4>
        <div className="space-y-2">
          {relatedDocs.length > 0 && (
            <div>
              <h5 className="body-small font-semibold mb-2">Documentation</h5>
              <ul className="space-y-1">
                {relatedDocs.map((doc, index) => (
                  <li key={index}>
                    <Link
                      href={doc.startsWith("http") ? doc : `/docs${doc}`}
                      className="flex items-center gap-2 body-small text-primary hover:underline"
                      target={doc.startsWith("http") ? "_blank" : undefined}
                    >
                      <FileText className="h-4 w-4" />
                      {doc}
                      {doc.startsWith("http") && <ExternalLink className="h-3 w-3" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {relatedFAQs.length > 0 && (
            <div>
              <h5 className="body-small font-semibold mb-2">Related FAQs</h5>
              <ul className="space-y-1">
                {relatedFAQs.map((faqId) => (
                  <li key={faqId}>
                    <Link
                      href={`/faq#${faqId}`}
                      className="body-small text-primary hover:underline"
                    >
                      View related FAQ
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

