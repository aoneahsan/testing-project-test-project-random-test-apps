export interface IUser {
	id: string;
	name: string;
	email: string;
	newsSources?: string;	
	newsCategories?: string;	
	newsAuthors?: string;	

	createdAt: string;
	updatedAt: string;
}
