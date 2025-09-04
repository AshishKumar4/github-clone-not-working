import { Link } from 'react-router-dom';
import { Star, GitFork, Lock, Book, Circle } from 'lucide-react';
import { Repository } from 'shared/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
interface RepoCardProps {
  repo: Repository;
}
const languageColorMapping: { [key: string]: string } = {
  TypeScript: 'bg-blue-500',
  Rust: 'bg-orange-500',
  Go: 'bg-cyan-500',
  JavaScript: 'bg-yellow-500',
};
export function RepoCard({ repo }: RepoCardProps) {
  const langColor = languageColorMapping[repo.language] || 'bg-gray-500';
  return (
    <Card className="hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {repo.isPrivate ? <Lock className="h-4 w-4 text-muted-foreground" /> : <Book className="h-4 w-4 text-muted-foreground" />}
            <Link to={`/${repo.owner}/${repo.name}`} className="text-primary font-bold hover:underline text-lg">
              {repo.name}
            </Link>
          </div>
          <Badge variant="outline" className="font-normal">
            {repo.isPrivate ? 'Private' : 'Public'}
          </Badge>
        </div>
        {repo.isTemplate && <CardDescription className="text-xs">Template</CardDescription>}
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <p className="text-muted-foreground text-sm mb-4">{repo.description}</p>
        <div>
          {repo.topics && repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {repo.topics.map(topic => (
                <Badge key={topic} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 text-xs">
                  {topic}
                </Badge>
              ))}
            </div>
          )}
          <div className="flex items-center text-muted-foreground text-xs space-x-4">
            {repo.language && (
              <div className="flex items-center">
                <span className={`h-3 w-3 rounded-full mr-1.5 ${langColor}`}></span>
                <span>{repo.language}</span>
              </div>
            )}
            <div className="flex items-center">
              <Star className="h-3 w-3 mr-1" />
              <span>{repo.stars.toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <GitFork className="h-3 w-3 mr-1" />
              <span>{repo.forks.toLocaleString()}</span>
            </div>
            <span>Updated {repo.lastUpdated}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}