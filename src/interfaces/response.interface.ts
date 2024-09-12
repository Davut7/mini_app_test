export interface Response {
	status: (code: number) => Response;
	send: (body: any) => void;
	[key: string]: any;
}
