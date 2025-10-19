"use client"

import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(initialValue);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        setValue(JSON.parse(storedValue) as T);
      }
      setIsInitialized(true);
    } catch {
      setIsInitialized(true);
    }
  }, [key]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value, isInitialized]);

  return [value, setValue];
}