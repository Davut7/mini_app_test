import { inject, injectable } from "inversify";
import { ValueService } from "../services/value.service";
import { Request } from "../interfaces/request.interface";
import { Response } from "../interfaces/response.interface";

@injectable()
export class ValueController {
	constructor(@inject(ValueService) private valueService: ValueService) {}

	async saveValue(req: Request, res: Response) {
		const { value, expires_at } = req.body;
		await this.valueService.saveValue(req.user, value, expires_at);
		return res.send({ message: 'Value saved' });
	}

	async getValue(req: Request, res: Response) {
		const value = await this.valueService.getValue(req.user);
		return res.send(value ? { value } : { value: null });
	}
}
