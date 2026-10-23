export const headerContentType = 'Content-Type';
export const headerJson = 'application/json; charset=utf-8';

export const json = (data: any) => Response.json({ code: 0, data: data });

export const error = (code: number, msg: string) =>
	new Response(JSON.stringify({ code: code, msg: msg }), {
		status: code,
		headers: {
			[headerContentType]: headerJson,
		},
	});

export function paramError(msg?: string): Response {
	return error(400, msg ? '参数错误: ' + msg : '参数校验异常');
}
