export async function time(fn) {
  const timer = process.hrtime();
  await fn();
  const delta = process.hrtime(timer);
  return format(delta);
}

function format(arr) {
  let num = Math.round(arr[1] / 1e6);
  if (arr[0] > 0) return (arr[0] + num / 1e3).toFixed(2) + "s";
  return `${num}ms`;
}
