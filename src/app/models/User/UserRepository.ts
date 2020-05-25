import { EntityRepository, Repository } from 'typeorm'
import User from './User'

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
	public async findByEmail(email: string) {
		return this.findOne({ email })
	}
}
