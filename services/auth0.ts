import { Auth0UserData } from "@/interfaces/User";
import axios from "axios";

export const getToken = async () => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/oauth/token`,
    {
      grant_type: "client_credentials",
      client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET,
      audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data.access_token;
};

export const updateAuth0User = async (user_id: string, data: Auth0UserData) => {
  const token = await getToken();
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/users/auth0|${user_id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
