import { ILoginBody } from '../interfaces/loginBody';
import { AuthService } from '../services/auth.service';
import { inject, injectable } from 'inversify';

@injectable()
export class AuthController {
	constructor(@inject(AuthService) private authService: AuthService) {}

	login = async ({ body }: { body: ILoginBody }) => {
		try {
			const { tg_id, user_name } = body;
			const accessToken = await this.authService.login({
				tg_id,
				user_name,
			});
			return { access_token: accessToken };
		} catch (error) {
			console.error('Error in login:', error);
			return { message: 'Authorization failed' };
		}
	};
}
