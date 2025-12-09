import { JobIds, JobTypes } from "../../constants";
import { cronQueue } from "../queues/cron.queue";

export const cronScheduler = async () => {
  console.log("⏳ Checking existing repeatable jobs...");

  // Fetch all existing repeatable jobs for this queue
  const repeats = await cronQueue.getRepeatableJobs();

  // Remove ONLY repeat jobs matching this job name
  for (const r of repeats) {
    if (r.name === JobTypes.TASK_HISTORIES_CLEANUP) {
      await cronQueue.removeRepeatableByKey(r.key);
    }
  }

  console.log("♻️ Old repeatable jobs cleared. Registering new one...");

  // Add NEW repeat job
  await cronQueue.add(
    JobTypes.TASK_HISTORIES_CLEANUP,
    {},
    {
      repeat: {
        pattern: "0 0 0 * * *", // Mid Night
      },
      jobId: JobIds.TASK_HISTORIES_CLEANUP_ID,
    }
  );

  console.log("⏱️ Cleanup Cron Scheduled Successfully");
};
