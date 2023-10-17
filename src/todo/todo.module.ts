import { Module } from '@nestjs/common';
import { TasksController } from './controller/tasks.controller';
import { TaskService } from './service/task.service';
import { Task } from './task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TaskService]
})
export class TodoModule {}
