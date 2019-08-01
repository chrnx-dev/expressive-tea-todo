import Boot from '@zerooneit/expressive-tea/classes/Boot';
import {Plug, RegisterModule, ServerSettings} from '@zerooneit/expressive-tea/decorators/server';
import {ExpressiveTeaApplication} from "@zerooneit/expressive-tea/libs/interfaces";

import ToDoModule from "./src/modules/todo/ToDoModule";
import {BOOT_STAGES} from "@zerooneit/expressive-tea/libs/constants";
import bodyParserConfiguration from "./src/plugins/body-parser";

@ServerSettings({
    port: 8080
})

@Plug(BOOT_STAGES.INITIALIZE_MIDDLEWARES, 'Body Parser', bodyParserConfiguration, true)
class Bootstrap extends Boot {
    @RegisterModule(ToDoModule)
    async start(): Promise<ExpressiveTeaApplication> {
        return super.start();
    }
}

const bootstrap = new Bootstrap();

bootstrap.start();
