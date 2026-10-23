import InnerVersion from './handlers/inner_version';
import SongUrl from './handlers/song_url';
import SongUrlV1 from './handlers/song_url_v1';
import TestRaw from './handlers/test_raw';
import TestReq from './handlers/test_req';
import { error } from './services/common';
import request from './services/request';

/**路由表 */
const routes: Record<string, Handler> = {
	'/inner/version': InnerVersion,
	'/song/url/v1': SongUrlV1,
	'/song/url': SongUrl,
	'/test/raw': TestRaw,
	'/test/req': TestReq,
} as const;

/**路由处理 */
export default async function router(req: Request, url: URL, env: Env, ctx: ExecutionContext): Promise<Response> {
	// 根据方法提取请求体
	var query: Record<string, any>;
	switch (req.method) {
		case 'GET':
			query = Object.fromEntries(url.searchParams);
			break;
		case 'POST':
			try {
				query = await req.json();
			} catch (err) {
				return error(400, 'Unmarshal Body: ' + String(err));
			}
			break;
		default:
			return error(405, 'Method Not Allowed');
	}
	const handler = routes[url.pathname];
	if (!handler) {
		return error(404, 'Not Found');
	}

	try {
		return handler(query, (path, data, opt) => {
			// opt.realIP = '116.94.56.26';
			return request(path, data, query, { realIP: '39.144.53.145' });
		});
	} catch (err) {
		return error(500, 'Process Error: ' + String(err));
	}
}
