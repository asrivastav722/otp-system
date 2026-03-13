const queue = [];

export function addJob(job) {
  queue.push(job);
}

export function getJob() {
  return queue.shift();
}

export function queueSize() {
  return queue.length;
}