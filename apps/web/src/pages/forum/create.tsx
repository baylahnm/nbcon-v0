"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useForum } from "@/hooks/useForum";

export default function CreateThreadPage() {
  const router = useRouter();
  const { categories } = useForum();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !categoryId) return;

    setIsSubmitting(true);
    try {
      // TODO: Submit thread via API
      console.log("Creating thread:", { title, content, categoryId, tags });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Redirect to forum
      router.push("/forum");
    } catch (error) {
      console.error("Error creating thread:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <>
      <Head>
        <title>Create Thread | Forum | nbcon.ai</title>
        <meta name="description" content="Create a new discussion thread" />
      </Head>

      <main className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        {/* Navigation */}
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link href="/forum">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Forum
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="section-heading">Create New Thread</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label htmlFor="title" className="label-text">
                  Thread Title *
                </label>
                <Input
                  id="title"
                  placeholder="Enter a descriptive title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  maxLength={200}
                />
                <p className="body-small text-muted-foreground">
                  {title.length}/200 characters
                </p>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label htmlFor="category" className="label-text">
                  Category *
                </label>
                <Select value={categoryId} onValueChange={setCategoryId} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <label htmlFor="content" className="label-text">
                  Content *
                </label>
                <Textarea
                  id="content"
                  placeholder="Write your post content... (Markdown supported)"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  required
                  className="font-mono"
                />
                <p className="body-small text-muted-foreground">
                  Markdown formatting is supported. Use **bold**, *italic*, `code`, etc.
                </p>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <label htmlFor="tags" className="label-text">
                  Tags (optional)
                </label>
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    placeholder="Add a tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={handleAddTag}>
                    Add
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-destructive"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || !title.trim() || !content.trim() || !categoryId}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Thread"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  );
}

