let queue: (() => Promise<any>)[] = []
let running: boolean = false
const MAX_QUEUE = 10
const delay = (ms: number) => new Promise(res=> setTimeout(res, ms))
async function runningQueue() {
  if (running) return
  running = true
  if (queue.length >= MAX_QUEUE) {
    return Promise.reject("queue limit rechead")
  }

  while (queue.length > 0) {
    const task = queue.shift()
    if (task) {
      const start = performance.now()
      await task()
      const end = performance.now()
      let time = 1000 - (end - start)
      await delay(time)
    }
  }
  running = false
}
export function queueRequest<T>(fn: () => Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    queue.push(async () => {
      try {
        const result = await fn()
        resolve(result)
      } catch (error) {
        reject(error)
      }
    })
    runningQueue()
  })
}
