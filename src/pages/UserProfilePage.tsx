import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { User, Repository } from 'shared/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { RepoCard } from '@/components/RepoCard';
import { Users, Building, Link as LinkIcon, MapPin } from 'lucide-react';
const fetchUser = async (username: string): Promise<User> => {
  const res = await fetch(`/api/users/${username}`);
  if (!res.ok) throw new Error('User not found');
  return (await res.json()).data;
};
const fetchRepos = async (username: string): Promise<Repository[]> => {
  const res = await fetch(`/api/users/${username}/repos`);
  if (!res.ok) throw new Error('Repos not found');
  return (await res.json()).data;
};
export default function UserProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [isFollowing, setIsFollowing] = useState(false);
  const { data: user, isLoading: userLoading, error: userError } = useQuery<User>({
    queryKey: ['user', username],
    queryFn: () => fetchUser(username!),
    enabled: !!username,
  });
  const { data: repos, isLoading: reposLoading, error: reposError } = useQuery<Repository[]>({
    queryKey: ['repos', username],
    queryFn: () => fetchRepos(username!),
    enabled: !!username,
  });
  if (userError || reposError) {
    return <div className="text-center py-16 text-destructive">User or repositories not found.</div>;
  }
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          {userLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-48 w-48 rounded-full" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : user && (
            <div>
              <Avatar className="h-48 w-48 mb-4 border-4 border-border">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-xl text-muted-foreground">{user.username}</p>
              <p className="my-4">{user.bio}</p>
              <Button
                className="w-full mb-4"
                variant={isFollowing ? 'outline' : 'default'}
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span><span className="font-semibold text-foreground">{user.followers}</span> followers</span>
                <span>·</span>
                <span><span className="font-semibold text-foreground">{user.following}</span> following</span>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                {user.company && <p className="flex items-center"><Building className="h-4 w-4 mr-2" />{user.company}</p>}
                {user.location && <p className="flex items-center"><MapPin className="h-4 w-4 mr-2" />{user.location}</p>}
                {user.website && <a href={user.website} className="flex items-center hover:text-primary"><LinkIcon className="h-4 w-4 mr-2" />{user.website}</a>}
              </div>
            </div>
          )}
        </aside>
        <div className="md:col-span-3">
          <h2 className="text-xl font-semibold border-b pb-2 mb-4">Repositories</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {reposLoading && Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-40 w-full" />)}
            {repos?.filter(r => !r.isPrivate).map(repo => <RepoCard key={repo.id} repo={repo} />)}
          </div>
        </div>
      </div>
    </div>
  );
}