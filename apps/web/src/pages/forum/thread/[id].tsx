"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Pin,
  Lock,
  CheckCircle2,
  Eye,
  MessageSquare,
  ThumbsUp,
  Reply,
  Share2,
  Copy,
} from "lucide-react";
import { PostCard } from "@/components/forum/PostCard";
import { VoteButton } from "@/components/forum/VoteButton";
import type { ForumThread, ForumPost } from "@/types/forum";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";

// Mock data - will be replaced with Supabase queries
const mockThread: ForumThread = {
  id: "1",
  title: "Welcome to nbcon.ai Community!",
  content: `# Welcome to nbcon.ai Community!

This is the official community forum for nbcon.ai users. Here you can:

- Ask questions and get help
- Share your projects and experiences
- Request new features
- Report bugs
- Connect with other developers

## Getting Started

1. **Introduce yourself** in the General Discussion category
2. **Read the guidelines** before posting
3. **Search** before asking questions
4. **Be respectful** and helpful

Happy coding! 🚀`,
  authorId: "1",
  author: {
    id: "1",
    name: "Admin",
    reputation: 1000,
  },
  categoryId: "1",
  category: {
    id: "1",
    slug: "general",
    name: "General Discussion",
    sortOrder: 1,
    threadCount: 12,
    postCount: 45,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  tags: [
    { id: "1", name: "welcome", color: "#6366f1", usageCount: 5, createdAt: new Date().toISOString() },
    { id: "2", name: "announcement", color: "#10b981", usageCount: 3, createdAt: new Date().toISOString() },
  ],
  views: 120,
  votes: 15,
  replyCount: 5,
  isPinned: true,
  isLocked: false,
  isSolved: false,
  lastActivityAt: new Date().toISOString(),
  createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockPosts: ForumPost[] = [
  {
    id: "1",
    threadId: "1",
    content: "Thanks for the welcome! Excited to be here.",
    authorId: "2",
    author: { id: "2", name: "User123", reputation: 50 },
    votes: 3,
    isBestAnswer: false,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    threadId: "1",
    content: "Great community! Looking forward to contributing.",
    authorId: "3",
    author: { id: "3", name: "Developer456", reputation: 25 },
    votes: 1,
    isBestAnswer: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
];

export default function ThreadPage() {
  const router = useRouter();
  const { id } = router.query;
  const [thread, setThread] = useState<ForumThread | null>(null);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [replyContent, setReplyContent] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id) {
      // TODO: Fetch thread and posts from Supabase
      setThread(mockThread);
      setPosts(mockPosts);
    }
  }, [id]);

  const handleVote = async (postId: string, voteType: "up" | "down") => {
    // TODO: Implement voting via API
    console.log("Vote:", postId, voteType);
  };

  const handleReply = async () => {
    if (!replyContent.trim()) return;
    // TODO: Submit reply via API
    console.log("Reply:", replyContent);
    setReplyContent("");
    setIsReplying(false);
  };

  const handleMarkBestAnswer = async (postId: string) => {
    // TODO: Mark as best answer via API
    console.log("Mark best answer:", postId);
  };

  const copyLink = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!thread) {
    return (
      <>
        <Head>
          <title>Thread Not Found | Forum | nbcon.ai</title>
        </Head>
        <main className="container mx-auto px-4 py-12">
          <Card>
            <CardContent className="py-12 text-center">
              <h1 className="section-heading mb-4">Thread Not Found</h1>
              <p className="body-large mb-6">
                The thread you're looking for doesn't exist.
              </p>
              <Button asChild variant="outline">
                <Link href="/forum">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Forum
                </Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </>
    );
  }

  const pageTitle = `${thread.title} | Forum | nbcon.ai`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={thread.content.slice(0, 160)} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={thread.content.slice(0, 160)} />
      </Head>

      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* Navigation */}
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link href="/forum">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Forum
            </Link>
          </Button>
        </div>

        {/* Thread Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {thread.isPinned && (
                    <Pin className="h-4 w-4 text-primary" />
                  )}
                  {thread.isLocked && (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  )}
                  {thread.isSolved && (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  )}
                  <h1 className="section-heading">{thread.title}</h1>
                </div>

                <div className="flex items-center gap-4 flex-wrap mb-4">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span className="body-small">{thread.views} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="body-small">{thread.replyCount} replies</span>
                  </div>
                  {thread.category && (
                    <Badge variant="outline" style={{ borderColor: thread.category.color }}>
                      {thread.category.name}
                    </Badge>
                  )}
                </div>

                {thread.tags && thread.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {thread.tags.map((tag) => (
                      <Badge
                        key={tag.id}
                        variant="secondary"
                        className="text-xs"
                        style={{
                          backgroundColor: tag.color ? `${tag.color}20` : undefined,
                          color: tag.color || undefined,
                        }}
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyLink}>
                  {copied ? (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Thread Content */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <ReactMarkdown>{thread.content}</ReactMarkdown>
            </div>
            <div className="mt-6 pt-6 border-t flex items-center justify-between">
              <div className="flex items-center gap-4">
                <VoteButton
                  votes={thread.votes}
                  onVote={(voteType) => handleVote(thread.id, voteType)}
                />
              </div>
              <div className="body-small text-muted-foreground">
                Posted {formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Replies */}
        <div className="space-y-4 mb-6">
          <h2 className="subsection-heading">
            {posts.length} {posts.length === 1 ? "Reply" : "Replies"}
          </h2>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onVote={handleVote}
              onReply={() => setIsReplying(true)}
              onMarkBestAnswer={handleMarkBestAnswer}
              showActions={!thread.isLocked}
            />
          ))}
        </div>

        {/* Reply Form */}
        {!thread.isLocked && (
          <Card>
            <CardHeader>
              <CardTitle className="subsection-heading">
                {isReplying ? "Reply to Thread" : "Add Reply"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Write your reply... (Markdown supported)"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={8}
                className="font-mono"
              />
              <div className="flex justify-end gap-2">
                {isReplying && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsReplying(false);
                      setReplyContent("");
                    }}
                  >
                    Cancel
                  </Button>
                )}
                <Button onClick={handleReply} disabled={!replyContent.trim()}>
                  <Reply className="h-4 w-4 mr-2" />
                  Post Reply
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {thread.isLocked && (
          <Card>
            <CardContent className="py-12 text-center">
              <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="body-large">This thread is locked.</p>
              <p className="body-small text-muted-foreground mt-2">
                New replies cannot be posted.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}

