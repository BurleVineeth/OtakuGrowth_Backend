export enum QueueNames {
  CRON_QUEUE = "cron_queue",
  EMAIL_QUEUE = "email_queue",
}

export const JobTypes = {
  TASK_HISTORIES_CLEANUP: "task_histories_cleanup",
  WELCOME: "welcome",
};

export const JobNames = {
  WELCOME_EMAIL: "welcome_email",
};

export const JobIds = {
  TASK_HISTORIES_CLEANUP_ID: "daily_task_histories_cleanup_job",
};
