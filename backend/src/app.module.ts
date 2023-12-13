import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';

@Module({
	imports: [UsersModule, PostsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
