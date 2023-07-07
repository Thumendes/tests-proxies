export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function raise(err: string): never {
  throw new Error(err);
}
