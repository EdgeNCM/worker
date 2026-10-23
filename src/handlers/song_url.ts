import { paramError } from '../services/common';

const SongUrl: Handler = async (query, request) => {
	if (!query.id) return paramError();

	const ids = String(query.id).split(',');
	const data = {
		ids: JSON.stringify(ids),
		br: Number(query.br) || 999000,
	};

	const res = await request('song/enhance/player/url', data, {});

	if (ids.length > 1) {
		// 根据 ID 排序
		const body = await res.json();
		const result = (body as any).data;
		if (Array.isArray(result)) {
			result.sort((a, b) => {
				return ids.indexOf(String(a.id)) - ids.indexOf(String(b.id));
			});
		}
		return new Response(JSON.stringify(body), res);
	}

	return res;
};

export default SongUrl;
