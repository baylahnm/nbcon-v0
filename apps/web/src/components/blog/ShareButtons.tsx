"use client";

import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Facebook, Link2, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || "");

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%20${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "The article link has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async (platform: keyof typeof shareLinks) => {
    if (platform === "email") {
      window.location.href = shareLinks.email;
      return;
    }

    if (navigator.share && platform !== "email") {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (err) {
        // User cancelled or error occurred, fall back to opening link
        window.open(shareLinks[platform], "_blank", "noopener,noreferrer");
      }
    } else {
      window.open(shareLinks[platform], "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare("twitter")}
        aria-label="Share on Twitter"
      >
        <Twitter className="h-4 w-4 mr-2" />
        Twitter
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare("linkedin")}
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4 mr-2" />
        LinkedIn
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare("facebook")}
        aria-label="Share on Facebook"
      >
        <Facebook className="h-4 w-4 mr-2" />
        Facebook
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare("email")}
        aria-label="Share via Email"
      >
        <Mail className="h-4 w-4 mr-2" />
        Email
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
        aria-label="Copy link"
      >
        <Link2 className="h-4 w-4 mr-2" />
        Copy Link
      </Button>
    </div>
  );
}

