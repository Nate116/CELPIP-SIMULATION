/**
 * Client-Side Persistent IndexedDB Audio Cache
 * Provides instantaneous on-demand retrieval for synthesized speech tracks
 * with full offline persistence across sessions.
 */

const DB_NAME = 'celpip_audio_cache_db';
const DB_VERSION = 1;
const STORE_NAME = 'audio_tracks';

export interface CachedAudioTrack {
  id: string; // unique key, e.g., partId or turn hash
  audioDataUrl: string;
  speaker?: string;
  createdAt: number;
}

class AudioCacheService {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private getDB(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        return reject(new Error('IndexedDB not supported'));
      }

      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });

    return this.dbPromise;
  }

  /**
   * Retrieve cached audio by unique ID
   */
  public async getAudio(id: string): Promise<string | null> {
    try {
      const db = await this.getDB();
      return new Promise((resolve) => {
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const req = store.get(id);

        req.onsuccess = () => {
          const item = req.result as CachedAudioTrack | undefined;
          resolve(item ? item.audioDataUrl : null);
        };

        req.onerror = () => {
          resolve(null);
        };
      });
    } catch {
      return null;
    }
  }

  /**
   * Save synthesized audio data URL into IndexedDB
   */
  public async setAudio(id: string, audioDataUrl: string, speaker?: string): Promise<void> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const record: CachedAudioTrack = {
          id,
          audioDataUrl,
          speaker,
          createdAt: Date.now()
        };
        const req = store.put(record);

        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.warn('Failed to cache audio in IndexedDB:', err);
    }
  }

  /**
   * Retrieve all turns for a specific dialogue part if previously cached
   */
  public async getDialogueTurns(partId: string, turnCount: number): Promise<string[] | null> {
    const urls: string[] = [];
    for (let i = 0; i < turnCount; i++) {
      const audio = await this.getAudio(`${partId}_turn_${i}`);
      if (!audio) return null;
      urls.push(audio);
    }
    return urls;
  }
}

export const audioCache = new AudioCacheService();
