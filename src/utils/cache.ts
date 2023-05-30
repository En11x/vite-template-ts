interface ProxyStorage {
  getItem(key: string): any;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

class Cache implements ProxyStorage {
  private storage: ProxyStorage;

  constructor(storage: ProxyStorage) {
    this.storage = storage;
  }

  public setItem(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string) {
    return JSON.parse(this.storage.getItem(key));
  }

  public removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  public clear(): void {
    this.storage.clear();
  }
}

export const SessionCache = new Cache(sessionStorage);
export const LocalCache = new Cache(localStorage);
