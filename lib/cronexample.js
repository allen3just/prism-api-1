var CronJob = require('cron').CronJob;
var job = new CronJob({
  cronTime: '1 * * * * * *',
  onTick: function() {
  console.log(`hello world`);
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
job.start();
