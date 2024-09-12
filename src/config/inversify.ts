import { Container, injectable } from 'inversify';
import 'reflect-metadata';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ValueService } from '../services/value.service';
import { AuthController } from '../controllers/auth.controller';
import { UserController } from '../controllers/user.controller';
import { ValueController } from '../controllers/value.controller';
import { UserRepository } from '../repositories/user.repository';
import { ValueRepository } from '../repositories/value.repository';
import { RedisService } from '../services/redis.service';

@injectable()
class ExampleService {
	public getMessage(): string {
		return 'Hello from Inversify';
	}
}

const container = new Container();

container.bind(AuthService).to(AuthService);
container.bind(UserService).to(UserService);
container.bind(ValueService).to(ValueService);
container.bind(RedisService).to(RedisService);

container.bind(UserRepository).to(UserRepository);
container.bind(ValueRepository).to(ValueRepository);

container.bind(AuthController).to(AuthController);
container.bind(UserController).to(UserController);
container.bind(ValueController).to(ValueController);

container.bind(ExampleService).toSelf();

const exampleService = container.get(ExampleService);
console.log(exampleService.getMessage());

export { container };
