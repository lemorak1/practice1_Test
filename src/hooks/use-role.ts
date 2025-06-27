"use client";
import { useState, useEffect } from "react";

export type Role = "user" | "admin";

export function useRole(): [Role, (role: Role) => void] {
  const [role, setRoleState] = useState<Role>("user");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("role");
      if (stored === "admin" || stored === "user") {
        setRoleState(stored);
      }
    }
  }, []);

  const setRole = (newRole: Role) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("role", newRole);
    }
    setRoleState(newRole);
  };

  return [role, setRole];
}
