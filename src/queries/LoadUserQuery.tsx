import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/Store";
import { useEffect } from "react";
import { updateUserInStoreAfterAuth } from "../store/UserSlice";
import axios from "axios";

interface QueryTypes {
  url: string;
  token: string;
}
export const LoadUserQuery = ({ url, token }: QueryTypes) => {
  const dispatch = useDispatch<AppDispatch>();

  console.log("Navbar Page: ", token);
  useEffect(() => {
    (async () => {
      try {
        console.log("Auth for user: ", token);
        const res = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        dispatch(updateUserInStoreAfterAuth({ email: data.email }));
        setUserInLocalStorage({ email: data.email });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [token]);

  const setUserInLocalStorage = (user: { email: string }) => {
    localStorage.setItem(
      "UserInStorage",
      JSON.stringify({
        email: user.email,
        // uid: user.uid,
      })
    );
  };
  return ''
};
