import { Hono } from "hono";
import { Env } from './core-utils';
import type { User, Repository, RepositoryDetails, ApiResponse, NewIssue, Issue } from '../shared/types';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    app.get('/api/users/:username', async (c) => {
        const { username } = c.req.param();
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const data = await stub.getUser(username);
        if (!data) {
            return c.json({ success: false, error: 'User not found' }, 404);
        }
        return c.json({ success: true, data } satisfies ApiResponse<User>);
    });
    app.get('/api/users/:username/repos', async (c) => {
        const { username } = c.req.param();
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const data = await stub.getRepositoriesByUser(username);
        return c.json({ success: true, data } satisfies ApiResponse<Repository[]>);
    });
    app.get('/api/repos/:owner/:repoName', async (c) => {
        const { owner, repoName } = c.req.param();
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const data = await stub.getRepositoryDetails(owner, repoName);
        if (!data) {
            return c.json({ success: false, error: 'Repository not found' }, 404);
        }
        return c.json({ success: true, data });
    });
    app.post('/api/repos/:owner/:repoName/issues', async (c) => {
        const { owner, repoName } = c.req.param();
        const body = await c.req.json<NewIssue>();
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const data = await stub.addIssue(owner, repoName, body);
        if (!data) {
            return c.json({ success: false, error: 'Failed to create issue' }, 500);
        }
        return c.json({ success: true, data } satisfies ApiResponse<Issue[]>);
    });
    app.get('/api/repos/:owner/:repoName/contents/:path+', async (c) => {
        const { owner, repoName } = c.req.param();
        const path = c.req.param('path');
        if (!path) {
            return c.json({ success: false, error: 'Path parameter is missing' }, 400);
        }
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const data = await stub.getFileContent(owner, repoName, path);
        if (data === null) {
            return c.json({ success: false, error: 'File not found' }, 404);
        }
        return c.json({ success: true, data } satisfies ApiResponse<string>);
    });
    app.get('/api/search/repos', async (c) => {
        const query = c.req.query('q') || '';
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const data = await stub.searchRepositories(query);
        return c.json({ success: true, data } satisfies ApiResponse<Repository[]>);
    });
}