import { Module} from "@zerooneit/expressive-tea/decorators/module";
import TodoController from "./controllers/TodoController";

@Module({
    controllers: [ TodoController ],
    providers: [],
    mountpoint: '/todo'
})
export default class ToDoModule{}
