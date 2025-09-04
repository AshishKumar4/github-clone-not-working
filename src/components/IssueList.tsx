import { useState, useMemo } from 'react';
import { Issue } from 'shared/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CircleDot, MessageSquare, CheckCircle2 } from 'lucide-react';
import { NewIssueDialog } from './NewIssueDialog';
import { IssueDetailDialog } from './IssueDetailDialog';
interface IssueListProps {
  issues: Issue[];
  owner: string;
  repoName: string;
}
export function IssueList({ issues: initialIssues, owner, repoName }: IssueListProps) {
  const [isNewIssueDialogOpen, setNewIssueDialogOpen] = useState(false);
  const [isDetailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [issues, setIssues] = useState(initialIssues);
  const [filterText, setFilterText] = useState('');
  const filteredIssues = useMemo(() => {
    return issues.filter(issue =>
      issue.title.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [issues, filterText]);
  const openIssuesCount = filteredIssues.filter(i => i.status === 'Open').length;
  const closedIssuesCount = filteredIssues.length - openIssuesCount;
  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue);
    setDetailDialogOpen(true);
  };
  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="font-semibold">
                <CircleDot className="mr-2 h-4 w-4" />
                {openIssuesCount} Open
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                {closedIssuesCount} Closed
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Filter issues"
                className="w-full sm:w-64"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
              <Button onClick={() => setNewIssueDialogOpen(true)}>New issue</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="sr-only">
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Comments</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssues.map((issue) => (
                <TableRow key={issue.id} className="hover:bg-muted/50">
                  <TableCell className="w-16 text-center">
                    {issue.status === 'Open' ? (
                      <CircleDot className="h-5 w-5 text-green-500 inline-block" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5 text-purple-500 inline-block" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <button onClick={() => handleIssueClick(issue)} className="font-semibold hover:text-primary text-left">
                        {issue.title}
                      </button>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        {issue.labels.map(label => (
                          <Badge key={label.name} variant="outline" style={{ borderColor: `#${label.color}`, color: `#${label.color}` }}>
                            {label.name}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        #{issue.id} opened on {issue.createdAt} by {issue.author}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="w-24 text-right">
                    {issue.comments.length > 0 && (
                      <div className="flex items-center justify-end text-muted-foreground">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{issue.comments.length}</span>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <NewIssueDialog
        isOpen={isNewIssueDialogOpen}
        setIsOpen={setNewIssueDialogOpen}
        owner={owner}
        repoName={repoName}
        onSuccess={(newIssues) => setIssues(newIssues)}
      />
      <IssueDetailDialog
        isOpen={isDetailDialogOpen}
        setIsOpen={setDetailDialogOpen}
        issue={selectedIssue}
      />
    </>
  );
}