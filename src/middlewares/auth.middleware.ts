import { Elysia } from 'elysia';
import { UserRepository } from '../repositories/user.repository';

export const isAuthenticated = (app: Elysia) =>
	app.derive(async ({ cookie, jwt, set }) => {
		if (!cookie!.access_token) {
			set.status = 401;
			return {
				success: false,
				message: 'Unauthorized',
				data: null,
			};
		}
		const { userId } = await jwt.verify(cookie!.access_token);
		if (!userId) {
			set.status = 401;
			return {
				success: false,
				message: 'Unauthorized',
				data: null,
			};
		}

		const user = await UserRepository.findUnique({
			where: {
				id: userId,
			},
		});
		if (!user) {
			set.status = 401;
			return {
				success: false,
				message: 'Unauthorized',
				data: null,
			};
		}
		return {
			user,
		};
	});
