import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {

    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>){}

    async findAllTasks(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    async findTaskById(id: number): Promise<Task> {
        return await this.taskRepository.findOne({ where: {id} });
    }

    async createTask(task: Task): Promise<Task> {
        return await this.taskRepository.save(task);
    }

    async updateTask(id: number, task: Task): Promise<Task> {
        await this.taskRepository.update(id, task);
        return await this.taskRepository.findOne({ where: {id} });
    }

    async deleteTask(id: number): Promise<Task> {
        const taskToDelete = await this.taskRepository.findOne({ where: {id} });
        await this.taskRepository.delete(id);
        return taskToDelete;
    }
}
