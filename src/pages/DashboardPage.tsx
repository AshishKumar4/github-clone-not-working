import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Repository } from 'shared/types';
import { RepoCard } from '@/components/RepoCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BookPlus } from 'lucide-react';
const fetchRepos = async (username: string): Promise<Repository[]> => {
  const res = await fetch(`/api/users/${username}/repos`);
  if (!res.ok) throw new Error('Network response was not ok');
  const data = await res.json();
  return data.data;
};
export default function DashboardPage() {
  const username = 'cto-cloudflare'; // Hardcoded for now
  const [searchTerm, setSearchTerm] = useState('');
  const { data: repos, isLoading, error } = useQuery<Repository[]>({
    queryKey: ['repos', username],
    queryFn: () => fetchRepos(username),
  });
  const filteredRepos = useMemo(() => {
    if (!repos) return [];
    return repos.filter(repo =>
      repo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [repos, searchTerm]);
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Repositories</h2>
          <div className="flex items-center space-x-2 mb-4">
            <Input
              placeholder="Find a repository..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button>
              <BookPlus className="h-4 w-4 mr-2" />
              New
            </Button>
          </div>
          {isLoading && Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-full mb-2" />
          ))}
          {filteredRepos?.map(repo => (
            <Link to={`/${username}/${repo.name}`} key={repo.id} className="block text-sm text-muted-foreground hover:text-primary truncate mb-2">{repo.name}</Link>
          ))}
        </aside>
        <div className="lg:col-span-3">
          <div className="border-b pb-4 mb-6">
            <h1 className="text-2xl font-bold">Top Repositories</h1>
          </div>
          {error && <p className="text-destructive">Error loading repositories.</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isLoading && Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
            {filteredRepos?.filter(r => !r.isPrivate).map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}