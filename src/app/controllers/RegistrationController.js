class RegistrationController {
	async index(req, res) {
		return res.status(200).json({ hello: 'world' })
	}

	async store(req, res) {
		return res.status(201).json({ hello: 'world' })
	}

	async update(req, res) {
		return res.status(200).json({ hello: 'world' })
	}

	async destroy(req, res) {
		return res.status(200).json({ hello: 'world' })
	}
}

export default new RegistrationController()
