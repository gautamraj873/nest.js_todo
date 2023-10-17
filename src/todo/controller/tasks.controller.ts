import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { TaskService } from '../service/task.service';
import { Task } from '../task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    async findAll(): Promise<Task[]> {
        return await this.taskService.findAllTasks();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Task> {
        const task = await this.taskService.findTaskById(id);
        if(!task) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return task;
    }

    @Post()
    async create (@Body() task: Task): Promise<Task> {
        return await this.taskService.createTask(task);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() task: Task): Promise<Task> {
        return await this.taskService.updateTask(id, task);
    }

    @Delete(':id')
    async remove(@Param('id') id:number): Promise<Task> {
        return await this.taskService.deleteTask(id);
    }
}
