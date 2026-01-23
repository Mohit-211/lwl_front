const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

export async function apiFetch(path: string, options: RequestInit = {}) {
  return fetch(`${API_BASE}${path}`, {
    credentials: "include", // 🔥 THIS WAS MISSING
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
}
import axios, { AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "https://api.lifeworthlivingfilm.com:3000/api/v1/";

interface DecodedToken {
  exp?: number;
  [key: string]: any;
}
/* ================= API CALLS ================= */

// REGISTER
export const UserRegisterAPI = async (
  name: string,
  email: string,
  mobile: string,
  password: string,
  confirm_password: string
): Promise<AxiosResponse<any>> => {
  return axios.post(
    "https://api.lifeworthlivingfilm.com:3000/api/v1/user/auth/register",
    { name, email, mobile, password, confirm_password }
  );
};

// LOGIN
export const UserLoginAPI = async (
  email: string,
  password: string
): Promise<AxiosResponse<any>> => {
  return axios.post(
    "https://api.lifeworthlivingfilm.com:3000/api/v1/user/auth/login",
    { email, password },
    {
      headers: {
       timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        role_id: "6", 
      },
    }
  );
};

// LOGOUT
// export const UserLogOutAPI = async (): Promise<AxiosResponse<any>> => {
//   return axios.post(
//     "https://api.lifeworthlivingfilm.com:3000/api/v1/auth/logout",
//     {},
//     {
//       headers: {
//         "x-access-token": storedValue ?? "",
//       },
//     }
//   );
// };

export const VerifyOtpAPI = async (value1:string, value2:string) => {
  let config = {
    email: value1,
    otp: value2,
    type: "email_varification",
  };
  return await axios.post(
    "https://api.lifeworthlivingfilm.com:3000/api/v1/user/auth/verify-otp",
    config
  );
};

export const SendOTPAPI = async (value1:string) => {
  let config = {
    email: value1,
    type: "email_varification",
  };
  return await axios.post(
    "https://api.lifeworthlivingfilm.com:3000/api/v1/user/auth/otp",
    config
  );
};
export const GetProfile = async (value:string) => {
  try {
    const response = await axios.get(
      "https://api.lifeworthlivingfilm.com:3000/api/v1/user/profile",
      {
        headers: {
          "x-access-token": value,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API response error:", error);
    throw error;
  }
};