import app from "./app";
import { config } from "./core/config/env";
import { connectDB } from "./core/config/db";
import { cronScheduler } from "./backgroundJobs/schedulers/cron.scheduler";

const PORT = config.PORT;

const startServer = async () => {
  await connectDB();

  await cronScheduler();

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
};

startServer();
