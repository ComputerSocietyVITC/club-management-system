"use client";

import type { User } from "@/types/user";

export const isUserInLocalStorage = (): boolean => {
  return localStorage.getItem("user") !== null;
};

export const getUserFromLocalStorage = (): User => {
  return JSON.parse(localStorage.getItem("user") || "");
};

export const setUserInLocalStorage = (user: User): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromLocalStorage = (): void => {
  localStorage.removeItem("user");
};
