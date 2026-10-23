type Handler = (
	query: Record<string, any>,
	request: (path: string, data: Record<string, any>, opt: Record<string, any>) => Promise<Response>,
) => Promise<Response>;
