import { createContext, useState, useContext, useEffect } from "react";
import supabase from "../lib/supabase";

const Context = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  
  async function initSession() {
      const { data, error } = await supabase.auth.getSession();
      if (data && data.user) setUser(data.user);
  }

  useEffect(() => {
    initSession()

    setUser(supabase.auth.getSession());
    supabase.auth.onAuthStateChange(async (event) => {
      console.log("event", event);
      switch (event) {
        case "SIGNED_IN":
          initSession()
          break;
        case "SIGNED_OUT":
          setUser(null)
          break;
      }
    });
  }, []);

  async function signIn(email) {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
      });
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  const exposed = {
    signIn,
    signOut,
    user,
    setUser,
    loading,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
}

export const useUser = () => useContext(Context);
