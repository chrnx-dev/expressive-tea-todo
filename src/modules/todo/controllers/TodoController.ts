import { Delete, Get, Middleware, Param, Patch, Post, Route } from "@zerooneit/expressive-tea/decorators/router";
import {NextFunction, Request, Response} from "express";
import {ITodo, todos} from '../data/todos';

import { find, remove, max, map } from 'lodash';
import {BadRequestException} from "@zerooneit/expressive-tea/exceptions/RequestExceptions";
import {logMe} from "../../../middlewares/middlewares";

interface IRequest extends Request {
    selectedTodoItem: any;
}

@Route('/')
@Middleware(logMe)
export default class TodoController {
    @Param('todoId')
    getTodoItem(req: IRequest, res: Response, next: NextFunction, todoId: string) {
        req.selectedTodoItem = find(todos, {id: parseInt(todoId, 10)});
        if (!req.selectedTodoItem) return next(new BadRequestException('Maybe you should look in another castle'));
        next();
    }

    @Get('/:todoId')
    async getTodo(req: IRequest, res: Response, next: NextFunction): Promise<Response | void> {
        res.json(req.selectedTodoItem);
    }

    @Get('/')
    async index(req: Request, res: Response): Promise<void> {
        res.json(todos);
    }

    @Post('/')
    createTodo(req: IRequest, res: Response): void {
        const todo: ITodo = {
            id: max(map(todos, t => t.id)) + 1,
            title: req.body.title,
            isFinished: false
        };

        todos.push(todo);
        res.json(todo);
    }

    @Patch('/:todoId')
    editTodo(req: IRequest, res: Response): void {
        const { title } = req.body;
        req.selectedTodoItem.title = title;
        res.json(req.selectedTodoItem);
    }

    @Delete('/:todoId')
    deleteTodo(req: IRequest, res: Response): void {
        const deletedTodos = remove(todos, {id: req.selectedTodoItem.id});
        res.json(deletedTodos);
    }
 }
