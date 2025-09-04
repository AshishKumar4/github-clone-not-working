import { DurableObject } from "cloudflare:workers";
import type { User, Repository, RepositoryDetails, Issue, NewIssue, FileTreeNode } from '../shared/types';
import { MOCK_DATA } from '../shared/mock-data';
// **DO NOT MODIFY THE CLASS NAME**
export class GlobalDurableObject extends DurableObject {
    async seedData(): Promise<void> {
        const userExists = await this.ctx.storage.get("user:cto-cloudflare");
        if (!userExists) {
            await this.ctx.storage.put("user:cto-cloudflare", MOCK_DATA.user);
            for (const repo of MOCK_DATA.repositories) {
                await this.ctx.storage.put(`repo:${repo.owner}:${repo.name}`, MOCK_DATA.repoDetails[repo.name]);
            }
        }
    }
    async getUser(username: string): Promise<User | null> {
        await this.seedData();
        const user = await this.ctx.storage.get(`user:${username}`);
        return user as User | null;
    }
    async getRepositoriesByUser(username: string): Promise<Repository[]> {
        await this.seedData();
        const repos: Repository[] = [];
        for (const repo of MOCK_DATA.repositories) {
            if (repo.owner === username) {
                repos.push(repo);
            }
        }
        return repos;
    }
    async getRepositoryDetails(owner: string, repoName: string): Promise<RepositoryDetails | null> {
        await this.seedData();
        const repo = await this.ctx.storage.get(`repo:${owner}:${repoName}`);
        return repo as RepositoryDetails | null;
    }
    async addIssue(owner: string, repoName: string, newIssue: NewIssue): Promise<Issue[] | null> {
        const repoKey = `repo:${owner}:${repoName}`;
        const repoDetails = await this.ctx.storage.get<RepositoryDetails>(repoKey);
        if (!repoDetails) {
            return null;
        }
        const issue: Issue = {
            id: (repoDetails.issues.length) + 10,
            title: newIssue.title,
            author: 'cto-cloudflare',
            status: 'Open',
            createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            body: newIssue.comment,
            comments: [],
            labels: [{ name: 'enhancement', color: 'a2eeef' }],
        };
        repoDetails.issues.unshift(issue);
        await this.ctx.storage.put(repoKey, repoDetails);
        return repoDetails.issues;
    }
    private findFile(nodes: FileTreeNode[], path: string): FileTreeNode | null {
        for (const node of nodes) {
            if (node.path === path) {
                return node;
            }
            if (node.type === 'dir' && node.children) {
                const found = this.findFile(node.children, path);
                if (found) return found;
            }
        }
        return null;
    }
    async getFileContent(owner: string, repoName: string, path: string): Promise<string | null> {
        const repoDetails = await this.getRepositoryDetails(owner, repoName);
        if (!repoDetails) {
            return null;
        }
        const file = this.findFile(repoDetails.fileTree, path);
        return file?.content ?? null;
    }
    async searchRepositories(query: string): Promise<Repository[]> {
        await this.seedData();
        if (!query) {
            return [];
        }
        const lowerCaseQuery = query.toLowerCase();
        return MOCK_DATA.repositories.filter(repo => 
            repo.name.toLowerCase().includes(lowerCaseQuery) ||
            repo.description.toLowerCase().includes(lowerCaseQuery)
        );
    }
}