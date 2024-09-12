import { inject, injectable } from 'inversify';
import { Request } from '../interfaces/request.interface';
import { Response } from '../interfaces/response.interface';
import { UserService } from '../services/user.service';
import { JwtPayloadDto } from '../dto/jwtPayload.dto';

@injectable()
export class UserController {
	constructor(@inject(UserService) private userService: UserService) {}

	async getMe(user: JwtPayloadDto, res: Response) {
		try {
			const currentUser = await this.userService.getUserById(user.id);
			return res.send({
				user_name: currentUser.user_name,
				tg_id: currentUser.tg_id,
			});
		} catch (error) {
			return res.status(404).send({ message: 'User not found' });
		}
	}
}
