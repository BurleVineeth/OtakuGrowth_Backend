import { RedisOptions } from "ioredis";
import { config } from "./env";

export const redisConfig: RedisOptions = {
  host: config.REDIS_HOST,
  port: Number(config.REDIS_PORT),
};
