import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Book } from 'lucide-react';
import { Repository } from 'shared/types';
interface CommandMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const fetchRepos = async (query: string): Promise<Repository[]> => {
  if (!query) return [];
  const res = await fetch(`/api/search/repos?q=${encodeURIComponent(query)}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await res.json();
  return data.data;
};
export function CommandMenu({ open, setOpen }: CommandMenuProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const { data: repos, isLoading } = useQuery<Repository[]>({
    queryKey: ['repoSearch', query],
    queryFn: () => fetchRepos(query),
    enabled: query.length > 0,
  });
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setOpen]);
  const handleSelect = (repo: Repository) => {
    navigate(`/${repo.owner}/${repo.name}`);
    setOpen(false);
  };
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput 
        placeholder="Search for a repository..." 
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        {isLoading && query && <CommandEmpty>Searching...</CommandEmpty>}
        {!isLoading && !repos?.length && query && <CommandEmpty>No results found.</CommandEmpty>}
        {!query && <CommandEmpty>Type to search for repositories.</CommandEmpty>}
        {repos && repos.length > 0 && (
          <CommandGroup heading="Repositories">
            {repos.map((repo) => (
              <CommandItem key={repo.id} onSelect={() => handleSelect(repo)} value={`${repo.owner}/${repo.name}`}>
                <Book className="mr-2 h-4 w-4" />
                <span>{repo.owner} / <strong>{repo.name}</strong></span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}