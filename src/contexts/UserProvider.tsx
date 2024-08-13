import { userAgent } from "next/server";
import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
  ReactElement,
} from "react";
import { User } from "@supabase/supabase-js";
import supabase from "../lib/supabase";

type UserState = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>> | null;
};

type Props = {
  children: ReactElement;
};

const UserContext = createContext<UserState>({ user: null, setUser: null });

export function UserProvider({ children }: Props) {
  const [userSession, setUserSession] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        supabase.auth.getUser().then(({ data: { user } }) => {
          setUserSession(user);
        });
      }
    });

    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      switch(event) {
        case 'SIGNED_IN':
          console.log('signed_in', session)
          const user = session ? session.user : null
          setUserSession(user)
          break;
        default:
          console.log('default', event)
          break;
      }
    });
  }, []);

  const exposed: UserState = {
    user: userSession,
    setUser: setUserSession,
  };

  return (
    <UserContext.Provider value={exposed}>{children}</UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
