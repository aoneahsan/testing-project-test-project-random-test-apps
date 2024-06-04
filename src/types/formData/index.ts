export interface ILoginFormData {
	email: string;
	password: string;
}

export interface IRegisterFormData extends ILoginFormData {
	name: string;
	passwordConfirmation: string;
}
