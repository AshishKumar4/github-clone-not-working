import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { RepositoryDetails } from 'shared/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, GitPullRequest, CircleDot, Star, GitFork, Eye, Book, GitBranch } from 'lucide-react';
import { FileBrowser } from '@/components/FileBrowser';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IssueList } from '@/components/IssueList';
import { RepoBreadcrumb } from '@/components/RepoBreadcrumb';
const fetchRepoDetails = async (owner: string, repoName: string): Promise<RepositoryDetails> => {
  const res = await fetch(`/api/repos/${owner}/${repoName}`);
  if (!res.ok) throw new Error('Repository not found');
  return (await res.json()).data;
};
export default function RepoPage() {
  const params = useParams();
  const owner = params.owner!;
  const repoName = params.repoName!;
  const path = params['*'] || '';
  const { data: repo, isLoading, error } = useQuery<RepositoryDetails>({
    queryKey: ['repoDetails', owner, repoName],
    queryFn: () => fetchRepoDetails(owner, repoName),
    enabled: !!owner && !!repoName
  });
  if (isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>);
  }
  if (error || !repo) {
    return <div className="text-center py-16 text-destructive">Repository not found.</div>;
  }
  const isRoot = path === '';
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-xl md:text-2xl font-normal text-muted-foreground break-all">
            <Book className="h-5 w-5 inline-block mr-2 align-middle" />
            <Link to={`/${repo.owner}`} className="text-primary hover:underline">{repo.owner}</Link>
            <span className="mx-2">/</span>
            <span className="font-bold text-foreground">{repo.name}</span>
            <Badge variant="outline" className="ml-4 align-middle font-normal text-xs">{repo.isPrivate ? 'Private' : 'Public'}</Badge>
          </h1>
          <div className="flex items-center space-x-2 text-sm">
            <Button variant="outline" size="sm" className="flex items-center gap-2"><Eye className="h-4 w-4" />Watch <Badge variant="secondary" className="ml-1">{repo.watchers}</Badge></Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2"><GitFork className="h-4 w-4" />Fork <Badge variant="secondary" className="ml-1">{repo.forks}</Badge></Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2"><Star className="h-4 w-4" />Star <Badge variant="secondary" className="ml-1">{repo.stars}</Badge></Button>
          </div>
        </div>
      </div>
      <Tabs defaultValue="code" className="w-full">
        <TabsList className="overflow-x-auto whitespace-nowrap">
          <TabsTrigger value="code"><Code className="h-4 w-4 mr-2" />Code</TabsTrigger>
          <TabsTrigger value="issues"><CircleDot className="h-4 w-4 mr-2" />Issues <Badge variant="secondary" className="ml-2">{repo.issues.length}</Badge></TabsTrigger>
          <TabsTrigger value="pulls"><GitPullRequest className="h-4 w-4 mr-2" />Pull Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="code" className="mt-4">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <GitBranch className="h-4 w-4" /> main
                </Button>
                {!isRoot && <RepoBreadcrumb owner={owner} repoName={repoName} path={path} />}
            </div>
            <FileBrowser fileTree={repo.fileTree} owner={repo.owner} repoName={repo.name} currentPath={path} />
            {isRoot && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-base font-semibold">
                    <Book className="h-4 w-4 mr-2" />
                    README.md
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <article className="prose dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-primary hover:prose-a:underline prose-code:before:content-[''] prose-code:after:content-['']">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{repo.readmeContent}</ReactMarkdown>
                  </article>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        <TabsContent value="issues" className="mt-4">
          <IssueList issues={repo.issues} owner={repo.owner} repoName={repo.name} />
        </TabsContent>
        <TabsContent value="pulls" className="mt-4">
          <Card className="text-center py-12">
            <CardContent className="space-y-4">
              <div className="mx-auto bg-muted rounded-full h-12 w-12 flex items-center justify-center">
                <GitPullRequest className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold">No pull requests yet</h3>
              <p className="text-muted-foreground">Pull requests are a way to propose changes to this repository.</p>
              <Button>New pull request</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>);
}