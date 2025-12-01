import { Worker } from "bullmq";
import { redisConfig } from "../../core/config/redis";
import { sendWelcomeEmail } from "../../services/nodeMailerEmails/sendEmail.service";
import { JobTypes, QueueNames } from "../../constants";

new Worker(
  QueueNames.EMAIL_QUEUE,
  async (job) => {
    const { type, to, name } = job.data;

    if (type === JobTypes.WELCOME) {
      await sendWelcomeEmail(to, name);
    }
  },
  { connection: redisConfig }
);

console.log("Email Worker Running...");
