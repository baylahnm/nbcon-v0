interface TemplateCardProps {
  title: string;
  views: string;
  hearts: string;
  imageUrl?: string;
  authorIcon?: string;
}

export default function TemplateCard({
  title,
  views,
  hearts,
  imageUrl,
  authorIcon,
}: TemplateCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <span className="text-gray-600 text-sm">Preview</span>
          </div>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-white truncate">{title}</h3>
          <div className="flex items-center mt-1 space-x-3 text-xs text-gray-400">
            <span>{views} views</span>
            <span className="flex items-center">
              <svg
                className="h-3 w-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              {hearts}
            </span>
          </div>
        </div>
        {authorIcon && (
          <div className="ml-2 flex-shrink-0">
            <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs">
              {authorIcon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

