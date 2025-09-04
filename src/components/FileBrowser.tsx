import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FileTreeNode } from 'shared/types';
import { File, Folder, MessageSquare, CornerLeftUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileContentDialog } from './FileContentDialog';
interface FileBrowserProps {
  fileTree: FileTreeNode[];
  owner: string;
  repoName: string;
  currentPath: string;
}
const findNode = (path: string, tree: FileTreeNode[]): FileTreeNode | undefined => {
  if (!path) return undefined;
  for (const node of tree) {
    if (node.path === path) return node;
    if (path.startsWith(node.path) && node.type === 'dir' && node.children) {
      const found = findNode(path, node.children);
      if (found) return found;
    }
  }
  return undefined;
};
export function FileBrowser({ fileTree, owner, repoName, currentPath }: FileBrowserProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const handleFileClick = (file: FileTreeNode) => {
    if (file.type === 'file') {
      setSelectedFile(file.path);
      setDialogOpen(true);
    }
  };
  const currentNode = findNode(currentPath, fileTree);
  const filesToShow = currentNode && currentNode.type === 'dir' ? currentNode.children ?? [] : fileTree;
  const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-base font-semibold">
            <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
            Latest commit message
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="sr-only">
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Last commit</TableHead>
                <TableHead>Last updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPath && (
                <TableRow className="hover:bg-muted/50">
                  <TableCell className="w-10">
                    <CornerLeftUp className="h-4 w-4 text-muted-foreground" />
                  </TableCell>
                  <TableCell colSpan={3}>
                    <Link to={`/${owner}/${repoName}/${parentPath}`} className="hover:underline hover:text-primary">
                      ..
                    </Link>
                  </TableCell>
                </TableRow>
              )}
              {filesToShow.map((file) => (
                <TableRow key={file.path} className="hover:bg-muted/50">
                  <TableCell className="w-10">
                    {file.type === 'dir' ? (
                      <Folder className="h-4 w-4 text-blue-500" />
                    ) : (
                      <File className="h-4 w-4 text-muted-foreground" />
                    )}
                  </TableCell>
                  <TableCell>
                    {file.type === 'dir' ? (
                      <Link to={`/${owner}/${repoName}/${file.path}`} className="hover:underline hover:text-primary">
                        {file.name}
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleFileClick(file)}
                        className="hover:underline hover:text-primary text-left"
                      >
                        {file.name}
                      </button>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm hidden md:table-cell">
                    {file.lastCommit?.message}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground text-sm hidden sm:table-cell">
                    {file.lastCommit?.date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <FileContentDialog
        isOpen={isDialogOpen}
        setIsOpen={setDialogOpen}
        owner={owner}
        repoName={repoName}
        filePath={selectedFile}
      />
    </>
  );
}