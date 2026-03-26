// LocalStorage helper for persistence

export function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadFromStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}