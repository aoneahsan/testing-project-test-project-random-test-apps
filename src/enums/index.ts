export enum ErrorCodeEnum {
	success = 200,
	created = 201,
	badRequest = 400,
	unAuthenticated = 401,
	unAuthorized = 403,
	notFound = 404,
	serverError = 500,
}

export enum FormFieldType {
	text = 'text',
	email = 'email',
	password = 'password',
}
export enum ReactToastifyTypeEnum {
	info = 'info',
	success = 'success',
	warning = 'warning',
	error = 'error',
	default = 'default',
}

export enum RequestTypeEnum {
	get = 'get',
	post = 'post',
	put = 'put',
	delete = 'delete',
}

export enum LinkTargetEnum {
	blank = "_blank"
}