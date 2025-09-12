"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { isLoggedIn } from "@/lib/actions/user-actions";

export type User = {
  name: string;
  credits: number;
};

type AppContext = {
  user: User | null;
  setUser: (user: User | null) => void;
  showLogin: boolean;
  setShowLogin: (state: boolean) => void;
};

const AppContext = createContext<AppContext | null>(null);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const cachedUser = sessionStorage.getItem("app-user");

    if (cachedUser) {
      try {
        const parsedUser = JSON.parse(cachedUser);
        setUser(parsedUser);
      } catch {
        sessionStorage.removeItem("app-user");
        setUser(null);
      }
    } else {
      const fetchUser = async () => {
        const { user } = await isLoggedIn();
        setUser(user);
      };

      fetchUser();
    }
  }, []);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("app-user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("app-user");
    }
  }, [user]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext) as AppContext;
};
