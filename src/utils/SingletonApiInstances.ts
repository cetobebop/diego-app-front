import { api } from "src/boot/axios";
import { ApiService } from "src/services/Api";

export const ApiV1 = new ApiService(api)