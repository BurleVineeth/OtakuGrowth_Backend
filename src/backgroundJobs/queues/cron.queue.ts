import { Queue } from "bullmq";
import { redisConfig } from "../../core/config/redis";
import { QueueNames } from "../../constants";

export const cronQueue = new Queue(QueueNames.CRON_QUEUE, {
  connection: redisConfig,
});
