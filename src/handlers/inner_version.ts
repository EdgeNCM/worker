import { json } from '../services/common';
import * as pkg from '../../package.json';

const InnerVersion: Handler = async () => json({ version: pkg.version });

export default InnerVersion;
