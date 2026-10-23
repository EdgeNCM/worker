import { createCipheriv, createHash } from 'node:crypto';

const eapiKey = Buffer.from('e82ckenh8dichen8', 'utf8');
const eapiSep = '-36cd479b6b5-';

/**
 * eapi 编码
 * @param url 相对路径，不包含 /api/
 * @param obj 请求体
 * @returns 编码后的请求
 */
export function eapi(url: string, obj: Record<string, any>): string {
	const text = JSON.stringify(obj);
	const digest = createHash('md5').update('nobody').update(url).update('use').update(text).update('md5forencrypt').digest('hex');

	// 注：涉及中文字符串的地方需要用 Buffer.byteLength 计算字节长度
	const len = url.length + eapiSep.length + Buffer.byteLength(text, 'utf8') + eapiSep.length + digest.length;
	const pad = 16 - (len % 16);

	const buf = Buffer.allocUnsafe(len + pad);
	let off = buf.write(url);
	off += buf.write(eapiSep, off);
	off += buf.write(text, off);
	off += buf.write(eapiSep, off);
	off += buf.write(digest, off);
	buf.fill(pad, off);

	const cipher = createCipheriv('aes-128-ecb', eapiKey, Buffer.alloc(0));
	cipher.setAutoPadding(false);
	return (
		'params=' +
		Buffer.concat([cipher.update(buf), cipher.final()])
			.toString('hex')
			.toUpperCase()
	);
}
