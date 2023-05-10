import "dotenv/config";
import "module-alias/register";

import App from "./app";
import { AuthController } from "./resources/auth/auth.controller";
const app = new App([
    new AuthController(),
], Number(process.env.PORT || 8000));

app.listen();