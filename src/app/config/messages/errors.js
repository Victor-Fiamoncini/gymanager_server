export const users = {
	name: {
		invalid: 'Por favor informe um nome válido',
		required: 'Por favor informe um nome',
		length: 'Nome muito curto',
	},
	email: {
		isEmail: 'Por favor, informe um e-mail válido',
		isNotEmpty: 'Por favor, informe um e-mail',
	},
	password: {
		invalid: 'Por favor informe uma senha válida',
		length: 'Senha muito curta',
	},
	birthdate: {
		isDate: 'Formato de data inválido',
	},
	photo: {
		required: 'Por favor, anexe uma foto',
	},
	notFound: 'Usuário não encontrado',
	alreadyExists: 'Esse usuário já está cadastrado',
}

export const students = {
	notFound: 'Aluno não encontrado',
	notFoundIndex: 'Alunos não encontrados',
	alreadyExists: 'Esse aluno já está cadastrado',
}

export const sessions = {
	unauthorized: 'Sem permissão',
	invalidCredentials: 'Credenciais inválidas',
	noToken: 'Token de autenticação não informado',
	malformattedToken: 'Token de autenticação desformatado',
	invalidToken: 'Token de autenticação inválido',
}
