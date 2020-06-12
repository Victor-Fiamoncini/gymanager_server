import * as models from '../../src/app/models'

export default async () => {
	return await Promise.all(
		Object.values(models).map(
			async model => await model.destroy({ truncate: true, force: true })
		)
	)
}
