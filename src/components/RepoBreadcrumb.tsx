import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
interface RepoBreadcrumbProps {
  owner: string;
  repoName: string;
  path: string;
}
export function RepoBreadcrumb({ owner, repoName, path }: RepoBreadcrumbProps) {
  const pathSegments = path.split('/').filter(Boolean);
  const breadcrumbs = [
    { name: repoName, href: `/${owner}/${repoName}` },
    ...pathSegments.map((segment, index) => {
      const href = `/${owner}/${repoName}/${pathSegments.slice(0, index + 1).join('/')}`;
      return { name: segment, href };
    }),
  ];
  return (
    <nav className="flex items-center text-lg mb-4" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2 flex-wrap">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href}>
            <div className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-5 w-5 flex-shrink-0 text-muted-foreground mx-2" />
              )}
              <Link
                to={crumb.href}
                className={`font-medium ${
                  index === breadcrumbs.length - 1
                    ? 'text-foreground font-bold'
                    : 'text-primary hover:underline'
                }`}
              >
                {crumb.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}