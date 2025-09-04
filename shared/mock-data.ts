import type { User, Repository, RepositoryDetails, FileTreeNode, Issue } from './types';
export const MOCK_USER: User = {
  username: 'cto-cloudflare',
  name: 'Cloudflare CTO',
  avatarUrl: 'https://i.pravatar.cc/150?u=cto-cloudflare',
  bio: 'Building a better Internet.',
  followers: 2024,
  following: 42,
  location: 'San Francisco, CA',
  company: 'Cloudflare',
  website: 'https://www.cloudflare.com',
};
export const MOCK_REPOSITORIES: Repository[] = [
  {
    id: '1',
    name: 'workers-sdk',
    owner: 'cto-cloudflare',
    description: 'A collection of tools for building and deploying Cloudflare Workers.',
    language: 'TypeScript',
    stars: 8400,
    forks: 720,
    lastUpdated: '2 hours ago',
    isPrivate: false,
    topics: ['cloudflare-workers', 'serverless', 'typescript', 'sdk'],
  },
  {
    id: '2',
    name: 'wrangler',
    owner: 'cto-cloudflare',
    description: 'The CLI for Cloudflare Workers, Pages, and other developer products.',
    language: 'Rust',
    stars: 5600,
    forks: 410,
    lastUpdated: '5 hours ago',
    isPrivate: false,
    topics: ['cli', 'rust', 'cloudflare', 'developer-tools'],
  },
  {
    id: '3',
    name: 'design-system',
    owner: 'cto-cloudflare',
    description: 'Cloudflare\'s design system and component library.',
    language: 'TypeScript',
    stars: 3200,
    forks: 150,
    lastUpdated: '1 day ago',
    isPrivate: false,
    topics: ['design-system', 'react', 'storybook', 'css-in-js'],
  },
  {
    id: '4',
    name: 'flare-ops',
    owner: 'cto-cloudflare',
    description: 'Internal infrastructure and operations code.',
    language: 'Go',
    stars: 120,
    forks: 30,
    lastUpdated: '3 days ago',
    isPrivate: true,
  },
  {
    id: '5',
    name: 'hono-template',
    owner: 'cto-cloudflare',
    description: 'A template for building web applications with Hono and Cloudflare Workers.',
    language: 'TypeScript',
    stars: 980,
    forks: 85,
    lastUpdated: '1 week ago',
    isPrivate: false,
    isTemplate: true,
    topics: ['template', 'hono', 'cloudflare-workers', 'fullstack'],
  },
];
const MOCK_FILE_TREE: FileTreeNode[] = [
    {
        type: 'dir', name: '.github', path: '.github', lastCommit: { message: 'Update issue templates', date: '2 days ago' },
        children: [
            { type: 'file', name: 'issue_template.md', path: '.github/issue_template.md', lastCommit: { message: 'Refine issue template', date: '3 days ago' }, content: '### Describe the bug\n\nA clear and concise description of what the bug is.' },
        ]
    },
    {
        type: 'dir', name: 'src', path: 'src', lastCommit: { message: 'Refactor core logic', date: '3 hours ago' },
        children: [
            { type: 'file', name: 'index.ts', path: 'src/index.ts', lastCommit: { message: 'Add entrypoint', date: '1 week ago' }, content: 'console.log("hello world")' },
            { type: 'dir', name: 'lib', path: 'src/lib', lastCommit: { message: 'Add utils', date: '4 hours ago' },
                children: [
                    { type: 'file', name: 'utils.ts', path: 'src/lib/utils.ts', lastCommit: { message: 'Add helper functions', date: '5 hours ago' }, content: 'export const a = 1;' }
                ]
            }
        ]
    },
    { type: 'file', name: '.gitignore', path: '.gitignore', lastCommit: { message: 'Add node_modules to ignore list', date: '1 month ago' }, content: 'node_modules\n.DS_Store\n.wrangler\ndist' },
    { type: 'file', name: 'README.md', path: 'README.md', lastCommit: { message: 'Improve documentation', date: '1 day ago' }, content: '# workers-sdk\n\nA collection of tools for building and deploying Cloudflare Workers.' },
    { type: 'file', name: 'package.json', path: 'package.json', lastCommit: { message: 'Bump dependencies', date: '6 hours ago' }, content: '{\n  "name": "workers-sdk",\n  "version": "1.0.0",\n  "main": "index.js",\n  "license": "MIT"\n}' },
    { type: 'file', name: 'wrangler.toml', path: 'wrangler.toml', lastCommit: { message: 'Configure new DO binding', date: '5 hours ago' }, content: 'name = "my-worker"\nmain = "src/index.ts"\ncompatibility_date = "2023-10-30"' },
];
const MOCK_ISSUES: Issue[] = [
  { id: 1, title: 'Bug: Incorrect caching behavior on edge', author: 'user123', status: 'Open', createdAt: '2 days ago',
    body: 'We are seeing inconsistent caching behavior for static assets served through our worker. The `Cache-Control` headers seem to be ignored in some regions.\n\n**Steps to reproduce:**\n1. Deploy a worker that serves a static asset with `Cache-Control: public, max-age=3600`.\n2. Request the asset from multiple geographic locations.\n3. Observe the `CF-Cache-Status` header.\n\n**Expected behavior:**\n`CF-Cache-Status` should be `HIT` after the first request.\n\n**Actual behavior:**\nWe are seeing `MISS` and `REVALIDATED` frequently.',
    comments: [
      { author: 'dev-jane', avatarUrl: 'https://i.pravatar.cc/150?u=dev-jane', body: 'Thanks for the report! I can reproduce this. It seems to be related to a recent change in our caching tier. We are investigating now.', createdAt: '1 day ago' },
      { author: 'cto-cloudflare', avatarUrl: 'https://i.pravatar.cc/150?u=cto-cloudflare', body: 'The team has identified the root cause. A fix is being rolled out and should be live within the next hour.', createdAt: '2 hours ago' },
    ],
    labels: [{ name: 'bug', color: 'd73a4a' }, { name: 'p1-critical', color: 'b60205' }] },
  { id: 2, title: 'Feature: Add support for WebSockets', author: 'dev-jane', status: 'Open', createdAt: '5 days ago',
    body: 'It would be great to have native support for WebSockets in the SDK to simplify building real-time applications. This would involve adding a new `WebSocket` handler to the core API.',
    comments: [],
    labels: [{ name: 'enhancement', color: 'a2eeef' }] },
  { id: 3, title: 'Docs: Update wrangler.toml configuration guide', author: 'doc-writer', status: 'Closed', createdAt: '1 week ago',
    body: 'The documentation for `wrangler.toml` is missing some of the newer configuration options, such as `durable_object_bindings`. We should update the guide to include all available fields.',
    comments: [
      { author: 'user123', avatarUrl: 'https://i.pravatar.cc/150?u=user123', body: 'This would be very helpful! I was confused about this the other day.', createdAt: '6 days ago' }
    ],
    labels: [{ name: 'documentation', color: '0075ca' }] },
];
const MOCK_README_CONTENT = `
# workers-sdk
A collection of tools for building and deploying Cloudflare Workers.
## Features
- **Type-safe**: Written in TypeScript.
- **Fast**: Built on top of modern tooling.
- **Easy to use**: Simple and intuitive API.
## Getting Started
\`\`\`bash
npm install @cloudflare/workers-sdk
\`\`\`
## Usage
\`\`\`typescript
import { handleRequest } from '@cloudflare/workers-sdk';
export default {
  async fetch(request: Request): Promise<Response> {
    return handleRequest(request, () => new Response('Hello, world!'));
  }
}
\`\`\`
`;
export const MOCK_REPO_DETAILS: { [key: string]: RepositoryDetails } = {
  'workers-sdk': {
    ...MOCK_REPOSITORIES[0],
    readmeContent: MOCK_README_CONTENT,
    fileTree: MOCK_FILE_TREE,
    issues: MOCK_ISSUES,
    pullRequests: [],
    watchers: 450,
  },
  'wrangler': {
    ...MOCK_REPOSITORIES[1],
    readmeContent: '# Wrangler\n\nThe CLI for Cloudflare Workers.',
    fileTree: MOCK_FILE_TREE,
    issues: MOCK_ISSUES.slice(0, 1),
    pullRequests: [],
    watchers: 300,
  },
  'design-system': {
    ...MOCK_REPOSITORIES[2],
    readmeContent: '# Design System\n\nCloudflare\'s design system.',
    fileTree: MOCK_FILE_TREE,
    issues: [],
    pullRequests: [],
    watchers: 100,
  },
  'flare-ops': {
    ...MOCK_REPOSITORIES[3],
    readmeContent: '# Flare Ops\n\nInternal tools.',
    fileTree: [],
    issues: [],
    pullRequests: [],
    watchers: 20,
  },
  'hono-template': {
    ...MOCK_REPOSITORIES[4],
    readmeContent: '# Hono Template\n\nA template for Hono apps.',
    fileTree: MOCK_FILE_TREE,
    issues: [],
    pullRequests: [],
    watchers: 50,
  },
};
export const MOCK_DATA = {
  user: MOCK_USER,
  repositories: MOCK_REPOSITORIES,
  repoDetails: MOCK_REPO_DETAILS,
};