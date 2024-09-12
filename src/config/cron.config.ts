import { schedule } from 'node-cron';
import { ValueService } from '../services/value.service';

export function setupCronJobs(valueService: ValueService) {
	schedule('0 * * * *', async () => {
		await valueService.removeExpiredValues();
	});
}
