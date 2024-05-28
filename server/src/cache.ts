import { createClient } from 'redis';

const client = createClient();

await client.connect();

/**
 * @param expire Set the specified expire time, in seconds (a positive integer).
 */
const set = async (key: string, value: string, expire: number | undefined = undefined) => {
  await client.set(key, value, { EX: expire });
};

const get = async (key: string) => {
  return await client.get(key);
};

const exists = async (key: string) => {
  return await client.exists(key);
};

/**
 * @param expire Set the specified expire time, in seconds (a positive integer).
 */
const remember = async <T>(key: string, expire: number | undefined = undefined, callback: () => Promise<T>) => {
  if (await exists(key)) {
    // @ts-ignore
    return JSON.parse(await get(key));
  }

  const result = await callback();

  await set(key, JSON.stringify(result), expire);

  return result;
};

export { get, set, exists, remember };
