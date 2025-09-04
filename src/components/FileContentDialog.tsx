import { useQuery } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { CodeBlock } from './CodeBlock';
import { File } from 'lucide-react';
interface FileContentDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  owner: string;
  repoName: string;
  filePath: string | null;
}
const fetchFileContent = async (owner: string, repoName: string, path: string): Promise<string> => {
  const res = await fetch(`/api/repos/${owner}/${repoName}/contents/${path}`);
  if (!res.ok) {
    throw new Error('File not found');
  }
  const result = await res.json();
  return result.data;
};
export function FileContentDialog({ isOpen, setIsOpen, owner, repoName, filePath }: FileContentDialogProps) {
  const { data: content, isLoading, error } = useQuery({
    queryKey: ['fileContent', owner, repoName, filePath],
    queryFn: () => fetchFileContent(owner, repoName, filePath!),
    enabled: !!filePath && isOpen,
  });
  const getLanguage = (path: string | null) => {
    if (!path) return 'plaintext';
    const extension = path.split('.').pop();
    switch (extension) {
      case 'ts':
      case 'tsx':
        return 'typescript';
      case 'js':
      case 'jsx':
        return 'javascript';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      case 'toml':
        return 'toml';
      default:
        return 'plaintext';
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <File className="h-5 w-5 mr-2" />
            {filePath}
          </DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-auto rounded-md">
          {isLoading && <Skeleton className="w-full h-full" />}
          {error && <p className="text-destructive">Error loading file content.</p>}
          {content && <CodeBlock language={getLanguage(filePath)} code={content} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}