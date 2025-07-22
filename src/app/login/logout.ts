"use server";

import { cookies } from "next/headers";
// import { jwtDecode } from "jwt-decode";

// export const getCurrentUser = async () => {
//   const accessToken = (await cookies()).get("accessToken")?.value;
//   console.log(accessToken);
//   console.log("accessToken", accessToken);

//   let decodedToken = null;
//   if (accessToken) {
//     decodedToken = jwtDecode<any>(accessToken);
//     return {
//       _id: decodedToken._id,
//       name: decodedToken.name,
//       email: decodedToken.email,
//       role: decodedToken.role,
//       status: decodedToken.status,
//     };
//   }
//   console.log(decodedToken);
//   return decodedToken;
// };

export const logOut = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
};
