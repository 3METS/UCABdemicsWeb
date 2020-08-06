const { config } = require('../config/index');
const Bull = require('bull');
const sendEmail = require('../utils/jobs/sendEmail');
const createFile = require('../utils/jobs/createPlan');

class BullService {
  constructor(typeJob) {
    this.typeJob = typeJob;
    this.queue = new Bull(typeJob, config.redisUrl, {
      limiter: { max: 5, duration: 5000, bounceBack: true },
    });
    this.addProcessor();
  }

  addJobs({ data }) {
    return this.queue.add(
      this.typeJob,
      { info: data },
      { removeOnComplete: true }
    );
  }

  addProcessor() {
    if (this.typeJob === 'email') {
      this.queue.process(this.typeJob, 25, sendEmail);
    } else if (this.typeJob === 'createFile') {
      this.queue.process(this.typeJob, 25, createFile);
    }

    /* this.queue.on('completed', (job, result) => {
      job.data.info.res.status(200).json({
        result,
      });
    }); */
  }
}

module.exports = BullService;
