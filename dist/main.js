"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
const environment_config_1 = require("./config/environment.config");
const all_exception_filter_1 = require("./filters/all-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const { httpAdapter } = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new all_exception_filter_1.AllExceptionsFilter(httpAdapter));
    await app.listen(environment_config_1.env.app.port);
}
bootstrap();
//# sourceMappingURL=main.js.map