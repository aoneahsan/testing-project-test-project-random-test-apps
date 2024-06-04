export const reportError = (
	error: unknown,
	message?: string,
	showInConsole = true
) => {
	const _errorData = {
		error,
		message: `[ERROR OCCURRED] - ${message ?? 'Something Went Wrong!'}`,
	};
	// log the error in sentry or some other logging system

	if (showInConsole) {
		console.error(_errorData);
	}
};
