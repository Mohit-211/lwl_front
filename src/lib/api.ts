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
const BASE_URL = "https://api.lifeworthlivingfilm.com/api/v1/";
const token =
  typeof window !== "undefined" ? localStorage.getItem("UserLoginToken") : "";
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
    "https://api.lifeworthlivingfilm.com/api/v1/user/auth/register",
    { name, email, mobile, password, confirm_password }
  );
};
// LOGIN
export const UserLoginAPI = async (
  email: string,
  password: string
): Promise<AxiosResponse<any>> => {
  return axios.post(
    "https://api.lifeworthlivingfilm.com/api/v1/user/auth/login",
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
//     "https://api.lifeworthlivingfilm.com/api/v1/auth/logout",
//     {},
//     {
//       headers: {
//         "x-access-token": storedValue ?? "",
//       },
//     }
//   );
// };
export const VerifyOtpAPI = async (value1: string, value2: string) => {
  let config = {
    email: value1,
    otp: value2,
    type: "email_varification",
  };
  return await axios.post(
    "https://api.lifeworthlivingfilm.com/api/v1/user/auth/verify-otp",
    config
  );
};
export const SendOTPAPI = async (value1: string) => {
  let config = {
    email: value1,
    type: "email_varification",
  };
  return await axios.post(
    "https://api.lifeworthlivingfilm.com/api/v1/user/auth/otp",
    config
  );
};
export const GetProfile = async () => {
  try {
    const response = await axios.get(
      "https://api.lifeworthlivingfilm.com/api/v1/user/profile",
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API response error:", error);
    throw error;
  }
};
// create order 
export const CreateOrder = async (
  package_id: string
): Promise<AxiosResponse<any>> => {
  return axios.post(
    "https://api.lifeworthlivingfilm.com/api/v1/payment/createOrder",
    { package_id },
    {
      headers: {
        "x-access-token": token,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        role_id: "6",
      },
    }
  );
};
// capture payment 
export const captureOrderApi = async (
  orderId: string
): Promise<AxiosResponse<any>> => {
  return axios.post(
    "https://api.lifeworthlivingfilm.com/api/v1/payment/captureOrder",
    { orderId },
    {
      headers: {
        "x-access-token": token,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        role_id: "6",
      },
    }
  );
};
export const getPaypalPaymentStatus = async (
  token_ID: string,
): Promise<AxiosResponse<any>> => {
  return axios.get(
    `https://api.lifeworthlivingfilm.com/api/v1/payment/status/${token_ID}`,
    {
      headers: {
        "x-access-token": token,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        role_id: "6",
      },
    }
  );
};
export const PricingCard = async () => {
  try {
    const response = await axios.get(
      "https://api.lifeworthlivingfilm.com/api/v1/package/get",
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API response error:", error);
    throw error;
  }
};
// contact us
export const ContactUsAPI = async (
  name: string,
  email: string,
  query: string
): Promise<AxiosResponse<any>> => {
  return axios.post(
    "https://api.lifeworthlivingfilm.com/api/v1/contactUs",
    { name, email, query },
  );
};

export const GetALlVideos = async () => {
  try {
    const response = await axios.get(
      "https://api.lifeworthlivingfilm.com/api/v1/video/get",
      // {
      //   headers: {
      //     "x-access-token": token,
      //   },
      // }
    );
    return response.data;
  } catch (error) {
    console.error("API response error:", error);
    throw error;
  }
};
export const DownloadVimeoVideos = async (
   vimeo_ID: string,
) => {
  try {
    const response = await axios.get(
      `https://api.lifeworthlivingfilm.com/api/v1/download/${vimeo_ID}`,
      // {
      //   headers: {
      //     "x-access-token": token,
      //   },
      // }
    );
    return response.data;
  } catch (error) {
    console.error("API response error:", error);
    throw error;
  }
};