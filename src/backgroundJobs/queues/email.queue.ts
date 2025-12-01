import { Queue } from "bullmq";
import { redisConfig } from "../../core/config/redis";
import { QueueNames } from "../../constants";

export const emailQueue = new Queue(QueueNames.EMAIL_QUEUE, {
  connection: redisConfig,
});
