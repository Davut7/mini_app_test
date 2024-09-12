import jwt from 'jsonwebtoken';
import { injectable, inject } from 'inversify';
import { UserService } from './user.service';
import { JwtPayloadDto } from '../dto/jwtPayload.dto';
import { validateOrReject } from 'class-validator';
import { LoginDto } from '../dto/login.dto';

@injectable()
export class AuthService {
	constructor(@inject(UserService) private userService: UserService) {}

	async login(tg_init_data: any): Promise<string> {
		const telegramData = new LoginDto();
		telegramData.tg_id = tg_init_data.tg_id;
		telegramData.user_name = tg_init_data.user_name;

		await validateOrReject(telegramData);

		let user = await this.userService.getUserByTelegramId(
			tg_init_data.tg_id
		);

		if (!user) {
			user = await this.userService.createUser(
				telegramData.tg_id,
				telegramData.user_name
			);
		}

		const token = jwt.sign(
			{
				id: user.id,
				user_name: user.user_name,
				tg_id: user.tg_id,
			} as JwtPayloadDto,
			process.env.JWT_SECRET!,
			{
				expiresIn: '1h',
			}
		);

		return token;
	}
}
