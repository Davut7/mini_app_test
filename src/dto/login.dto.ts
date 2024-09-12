import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
	@IsNotEmpty()
	@IsString()
	tg_id!: string;

	@IsNotEmpty()
	@IsString()
	user_name!: string;
}
