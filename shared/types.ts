export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface User {
  username: string;
  name: string;
  avatarUrl: string;
  bio: string;
  followers: number;
  following: number;
  location: string;
  company: string;
  website: string;
}
export interface Repository {
  id: string;
  name: string;
  owner: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  lastUpdated: string;
  isPrivate: boolean;
  isTemplate?: boolean;
  topics?: string[];
}
export interface FileTreeNode {
  type: 'file' | 'dir';
  name: string;
  path: string;
  children?: FileTreeNode[];
  lastCommit?: {
    message: string;
    date: string;
  };
  content?: string;
}
export interface IssueComment {
  author: string;
  avatarUrl: string;
  body: string;
  createdAt: string;
}
export interface Issue {
  id: number;
  title: string;
  author: string;
  status: 'Open' | 'Closed';
  createdAt: string;
  body: string;
  comments: IssueComment[];
  labels: { name: string; color: string }[];
}
export interface RepositoryDetails extends Repository {
  readmeContent: string;
  fileTree: FileTreeNode[];
  issues: Issue[];
  pullRequests: any[]; // Define later
  watchers: number;
}
export interface NewIssue {
    title: string;
    comment: string;
}