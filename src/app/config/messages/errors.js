export default {
	users: {
		email: {
			isEmail: 'Por favor, informe um e-mail válido',
			isNotEmpty: 'Por favor, informe um e-mail',
		},
		password: {
			length: 'Senha muito curta',
		},
		birthdate: {
			isDate: 'Formato de data inválido',
		},
		notFound: 'Usuário não encontrado',
		alreadyExists: 'Esse usuário já está cadastrado',
	},
	sessions: {
		unauthorized: 'Sem permissão',
		invalidCredentials: 'Credenciais inválidas',
		noToken: 'Token de autenticação não informado',
		malformattedToken: 'Token de autenticação desformatado',
		invalidToken: 'Token de autenticação inválido',
	},
}
