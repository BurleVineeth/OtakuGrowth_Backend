import { Worker } from "bullmq";
import { redisConfig } from "../../core/config/redis";
import { JobTypes, QueueNames } from "../../constants";
import { TaskHistoryModel } from "../../modules/taskHistory/model";
import { connectDB } from "../../core/config/db";
import { TaskType } from "../../modules/task/types";

connectDB().then(() => {
  console.log("🟢 Worker MongoDB connected");
});

new Worker(
  QueueNames.CRON_QUEUE,
  async (job) => {
    if (job.name === JobTypes.TASK_HISTORIES_CLEANUP) {
      console.log("Clean Up Job Triggered", new Date());

      TaskHistoryModel.deleteMany({
        type: { $in: [TaskType.DAILY, TaskType.WEEKLY] },
        createdAt: { $lt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) },
      })
        .then((res) => {
          console.log("🧹 Deleted old task histories:", res);
        })
        .catch((err) => {
          console.error("Error deleting old records:", err);
        });
    }
  },
  { connection: redisConfig }
);

console.log("Cleanup Worker Running...");
