// interface Cookie {
// 	Header(): string;
// }

import { eapi } from './crypto';

export class Desktop {
	path: string;
	data: Record<string, string>;
	constructor(path: string, data: Record<string, string>) {
		this.path = path;
		this.data = data;
	}
	Apply(h: Record<string, string>) {
		h['Cookie'] =
			'os=pc; deviceId=29ED64C5C5047026067BA9FDD6916908781E6A7DCF668589853C; osver=Microsoft-Windows-10-Professional-build-19044-64bit; appver=3.0.19.203184; mode=EdgeNCM; channel=netease; EVNSM=1.0.0; __remember_me=true; ntes_kaola_ad=1; WEVNSM=1.0.0; WNMCID=zonxze.1792420317862.01.4; NMTID=00Ord8JrGrtLxm0R0ArgwHOvGLOuy0AAAGf5jGfpg; __csrf=; __MUSIC_U=';
		h['MConfig-Info'] = '{"IuRPVVmc3WWul9fT":{"version":0,"appver":"3.0.19.203184"}}';
		h['Origin'] = 'orpheus://orpheus';
		h['User-Agent'] =
			'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36 Chrome/91.0.4472.164 NeteaseMusicDesktop/3.0.19.203184';
	}
	Form(): string {
		this.data.header = JSON.stringify({
			appver: '3.0.19.203184',
			clientSign: 'D4:54:8B:ed:04:7b@@@EYDHXKP5@@@@@@a9fdd6916908781e6a7dcf668589853c29ed64c5c5047026067ba9fdd6916908',
			deviceId: '29ED64C5C5047026067BA9FDD6916908781E6A7DCF668589853C',
			os: 'pc',
			osver: 'Microsoft-Windows-10-Professional-build-19044-64bit',
			requestId: String(crypto.getRandomValues(new Uint16Array(1))[0]),
		});
		// this.data.header = '{}';
		this.data.e_r = 'false';
		return eapi('/api/' + this.path, this.data);
	}
}

export const toMobile = (ck: Record<string, string>) => {
	const o: Record<string, string> = {
		EVNSM: '1.0.0',
		osver: '8.1.0',
		NMCID: 'worker.1792302341596.01.1',
		versioncode: '8020030',
		buildver: '231213181018',
		resolution: '1217x800',
		os: 'android',
		channel: 'bubugao1',
		screenType: 'pad',
		appver: '8.20.30',
		ntes_kaola_ad: '1',
		mobilename: 'NCM-Worker',
		packageType: 'release',
	};
	if (ck.MUSIC_U) o.MUSIC_U = ck.MUSIC_U;
	else if (ck.MUSIC_A) o.MUSIC_A = ck.MUSIC_A;
	return o;
};
