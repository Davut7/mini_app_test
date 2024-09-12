import { JwtPayload } from 'jsonwebtoken';

export interface Request {
	headers: {
		authorization?: string;
	};
	user?: JwtPayload | string;
	[key: string]: any;
}
