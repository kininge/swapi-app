import type { DETAIL_RESPONSE, LIST_RESPONSE } from '../types';

export async function fetchListFromAPI<T>(url: string): Promise<T[]> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API error: ${res.statusText}`);

    const json: LIST_RESPONSE<T> = await res.json();
    console.log('LIST Url: ', url, json);
    return json.results || json.result || [];
  } catch (error) {
    console.log('Fetch error for:', url, error);
    return [];
  }
}

export async function fetchDetailFromAPI<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API error: ${res.statusText}`);

    const json: DETAIL_RESPONSE<T> = await res.json();
    console.log('DETAIL Url: ', url, json);
    return json.result;
  } catch (error) {
    console.log('Fetch error for:', url, error);
    throw error;
  }
}
