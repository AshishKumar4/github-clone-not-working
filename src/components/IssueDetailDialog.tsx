import { Issue } from 'shared/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CircleDot, MessageSquare } from 'lucide-react';
interface IssueDetailDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  issue: Issue | null;
}
export function IssueDetailDialog({ isOpen, setIsOpen, issue }: IssueDetailDialogProps) {
  if (!issue) return null;
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold break-all">
            {issue.title} <span className="text-muted-foreground font-normal">#{issue.id}</span>
          </DialogTitle>
          <div className="flex items-center space-x-2 text-sm pt-2">
            <Badge variant={issue.status === 'Open' ? 'default' : 'destructive'} className="capitalize">
              <CircleDot className="h-4 w-4 mr-1" />
              {issue.status}
            </Badge>
            <span className="font-semibold">{issue.author}</span>
            <span className="text-muted-foreground">opened this issue {issue.createdAt}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{issue.comments.length} comments</span>
          </div>
        </DialogHeader>
        <div className="flex-grow overflow-auto pr-4 -mr-4 space-y-6">
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage src={`https://i.pravatar.cc/150?u=${issue.author}`} alt={`@${issue.author}`} />
              <AvatarFallback>{issue.author.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 border rounded-md">
              <div className="bg-muted/50 px-4 py-2 border-b text-sm text-muted-foreground">
                <strong>{issue.author}</strong> commented {issue.createdAt}
              </div>
              <div className="p-4">
                <article className="prose dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-primary hover:prose-a:underline prose-code:before:content-[''] prose-code:after:content-['']">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{issue.body}</ReactMarkdown>
                </article>
              </div>
            </div>
          </div>
          {issue.comments.map((comment, index) => (
            <div key={index} className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={comment.avatarUrl} alt={`@${comment.author}`} />
                <AvatarFallback>{comment.author.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 border rounded-md">
                <div className="bg-muted/50 px-4 py-2 border-b text-sm text-muted-foreground">
                  <strong>{comment.author}</strong> commented {comment.createdAt}
                </div>
                <div className="p-4">
                  <article className="prose dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-primary hover:prose-a:underline prose-code:before:content-[''] prose-code:after:content-['']">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{comment.body}</ReactMarkdown>
                  </article>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}