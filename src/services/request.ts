import { headerContentType } from './common';
import * as cookie from './cookie';

const request = async (
	path: string,
	data: Record<string, any>,
	query: Record<string, any>,
	opt: Record<string, any>,
): Promise<Response> => {
	// 目前仅支持 eapi

	// eapi
	const c = new cookie.Desktop(path, data);

	// request
	const header: Record<string, string> = {
		[headerContentType]: 'application/x-www-form-urlencoded',
		// 'User-Agent': 'NeteaseMusic/9.3.85.250925174744(9003085);Dalvik/2.1.0 (Linux; U; Android 8.1.0; EdgeNCM Build/0.0.1)',
		Accept: '*/*',
		// Cookie: Object.entries(toMobile({}))
		// 	.map((v) => v[0] + '=' + v[1])
		// 	.join(';'),
	};
	c.Apply(header);

	if (opt.realIP) {
		// header['X-Real-IP'] = header['X-Forwarded-For'] = opt.realIP;
		header['X-Real-IP'] = opt.realIP;
		header['X-Forwarded-For'] = opt.realIP;
	}

	const uri = query.httpbin ? 'https://httpbin.org/anything/' : 'https://interface3.music.163.com/eapi/';
	const req = new Request(uri + path, { method: 'POST', headers: header, body: c.Form() });
	const res = await fetch(req);

	// 合并 cookie
	// const ck = res.headers.getSetCookie();
	// if (ck.length) {
	// 	for (let i = 0; i < ck.length; i++) {
	// 		const c = ck[i];
	// 		const j = c.indexOf('=');
	// 	}
	// 	return new Response(res.body, res);
	// }

	return res;
};

export default request;
