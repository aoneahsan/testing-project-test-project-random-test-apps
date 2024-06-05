export enum ResponseCodeEnum {
	notFound = 'notFound',
	badRequest = 'badRequest',
	serverError = 'serverError',
	success = 'success',
	itemExists = 'itemExists',
}

export enum ResponseStatusEnum {
	success = 200,
	created = 201,
	failed = 500,
	notFound = 404,
	unAuthenticated = 401,
	invalidData = 422,
	badRequest = 400,
}
