import { watchPlans } from "./watcher";

setInterval(async () => {
  await watchPlans();
}, 60000); // every 1 minute
