"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

type LoginFormData =
  {
    username: string;
    password: string;
  };
export const submitSignInForm =
  async (
    formData: LoginFormData
  ) => {
    const res =
      await fetch(
        `${process.env.NEXT_PUBLIC_FAKESTORE_API}/auth/login`,
        {
          method:
            "POST",
          headers:
            {
              "Content-Type":
                "application/json"
            },
          body: JSON.stringify(
            {
              username:
                formData?.username,
              password:
                formData?.password
            }
          )
        }
      );

    if (
      !res.ok
    ) {
      const errorData =
        await res.json();
      return {
        error:
          errorData
      };
    }
    const data =
      await res.json();

    cookies().set(
      {
        name: "tokens",
        path: "/",
        value:
          JSON.stringify(
            data
          )
      }
    );
  };

export const submitLogout =
  async () => {
    cookies().delete(
      "tokens"
    );

    return redirect(
      "/"
    );
  };
