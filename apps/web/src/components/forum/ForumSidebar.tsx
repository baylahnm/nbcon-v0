"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, Clock, HelpCircle } from "lucide-react";
import Link from "next/link";
import { CategoryList } from "./CategoryList";
import type { ForumCategory } from "@/types/forum";

interface ForumSidebarProps {
  categories: ForumCategory[];
  selectedCategoryId?: string;
  onCategorySelect?: (categoryId: string | undefined) => void;
}

export function ForumSidebar({
  categories,
  selectedCategoryId,
  onCategorySelect,
}: ForumSidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Create Thread Button */}
      <Button className="w-full" asChild>
        <Link href="/forum/create">
          <Plus className="h-4 w-4 mr-2" />
          New Thread
        </Link>
      </Button>

      {/* Categories */}
      <CategoryList
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={onCategorySelect}
      />

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle className="subsection-heading">Quick Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/forum?sort=trending">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending Topics
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/forum?sort=recent">
              <Clock className="h-4 w-4 mr-2" />
              Recent Activity
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/forum?sort=unanswered">
              <HelpCircle className="h-4 w-4 mr-2" />
              Unanswered
            </Link>
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
}

