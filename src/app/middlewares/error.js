import Youch from 'youch'

// eslint-disable-next-line no-unused-vars
export default async (err, req, res, next) => {
	if (process.env.NODE_ENV === 'development') {
		const errors = await new Youch(err, req).toJSON()

		res.status(500).json(errors)
	}

	res.status(500).json({ error: 'Internal server error' })
}
