export async function time(fn) {
  const timer = process.hrtime();
  await fn();
  const delta = process.hrtime(timer);
  return format(delta, fn.name);
}

function format([sec, nanosec], name) {
  const microsec = Math.round(nanosec / 1e3);
  if (sec > 0) return `${name} took ${(sec + microsec / 1e6).toFixed(2)}s!`;
  return `${microsec}µs`;
}
