"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { FAQFeedback } from "./FAQFeedback";
import { RelatedContent } from "./RelatedContent";
import type { FAQ } from "@/types/faq";
import { format } from "date-fns";
import * as LucideIcons from "lucide-react";

interface FAQAccordionProps {
  faqs: FAQ[];
  searchQuery?: string;
  defaultOpen?: string[];
}

export function FAQAccordion({ faqs, searchQuery = "", defaultOpen = [] }: FAQAccordionProps) {
  // Highlight search terms in text
  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-900">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (faqs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="body-large text-muted-foreground">No FAQs found matching your criteria.</p>
      </div>
    );
  }

  return (
    <Accordion type="multiple" defaultValue={defaultOpen} className="w-full">
      {faqs.map((faq) => {
        const CategoryIcon = faq.category?.icon
          ? (LucideIcons as any)[faq.category.icon] || LucideIcons.HelpCircle
          : LucideIcons.HelpCircle;

        return (
          <AccordionItem key={faq.id} value={faq.id} className="border-b-[0.5px] border-border/50">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex-1 pr-4">
                <div className="flex items-start gap-3 mb-2">
                  <h3 className="card-title flex-1">{highlightText(faq.question, searchQuery)}</h3>
                  <div className="flex gap-2 flex-shrink-0">
                    {faq.isPopular && (
                      <Badge variant="default" className="bg-primary">
                        Popular
                      </Badge>
                    )}
                    {faq.isNew && (
                      <Badge variant="outline" className="border-green-500 text-green-700 dark:text-green-400">
                        New
                      </Badge>
                    )}
                    {faq.category && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <CategoryIcon className="h-3 w-3" />
                        {faq.category.name}
                      </Badge>
                    )}
                  </div>
                </div>
                {faq.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {faq.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="space-y-4">
                <div className="body-regular prose dark:prose-invert max-w-none">
                  {highlightText(faq.answer, searchQuery)}
                </div>

                {(faq.relatedDocs.length > 0 || faq.relatedFAQs.length > 0) && (
                  <RelatedContent
                    relatedDocs={faq.relatedDocs}
                    relatedFAQs={faq.relatedFAQs}
                  />
                )}

                <FAQFeedback faqId={faq.id} helpfulCount={faq.helpfulCount} notHelpfulCount={faq.notHelpfulCount} />
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

