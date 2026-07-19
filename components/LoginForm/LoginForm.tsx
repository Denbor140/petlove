"use client";

import { useState } from "react";
import css from "./LoginForm.module.css";
import Link from "next/link";
import {
  ErrorMessage,
  Field,
  FieldProps,
  Form,
  Formik,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { getCurrentUserFull, login, LoginRequest } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { ApiError } from "@/lib/api/api";
import Title from "../Title/Title";

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: "",
  password: "",
};

const loginFormSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Enter a valid Email",
    )
    .required("Email is required"),
  password: Yup.string().min(7).required("Password is required"),
});

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const mutation = useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: async (data) => {
      localStorage.setItem("token", data.token);
      const currentUser = await getCurrentUserFull();
      setUser(currentUser);
      router.push("/");
    },
  });

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    mutation.mutate(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSettled: () => actions.setSubmitting(false),
      },
    );
  };

  return (
    <div className={css.login_container}>
      <Title title="Log in" marginBottom="12px" />
      <p className={css.subtitle}>
        Welcome! Please enter your credentials to login to the platform:
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={loginFormSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className={css.form_email_container}>
            <Field name="email">
              {({ field, meta }: FieldProps) => (
                <input
                  {...field}
                  type="email"
                  placeholder="Email"
                  className={`${css.form_input} ${
                    meta.touched && meta.error
                      ? css.input_error
                      : meta.touched && !meta.error
                        ? css.input_success
                        : ""
                  }`}
                />
              )}
            </Field>
            <ErrorMessage name="email" component="span" className={css.error} />
          </div>

          <div className={css.form_password_container}>
            <Field name="password">
              {({ field, meta }: FieldProps) => (
                <input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`${css.form_input} ${
                    meta.touched && meta.error
                      ? css.input_error
                      : meta.touched && !meta.error
                        ? css.input_success
                        : ""
                  }`}
                />
              )}
            </Field>

            <button
              type="button"
              className={css.password_toggle_btn}
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? (
                <svg width={18} height={18}>
                  <use href="/icons.svg#icon-eye"></use>
                </svg>
              ) : (
                <svg width={18} height={18}>
                  <use href="/icons.svg#icon-eye-off"></use>
                </svg>
              )}
            </button>
            <ErrorMessage
              name="password"
              component="span"
              className={css.error}
            />
          </div>
          <button type="submit" className={css.form_btn}>
            Log in
          </button>
        </Form>
      </Formik>
      <p className={css.register_title}>
        Don’t have an account?{" "}
        <Link href={"/auth/register"} className={css.register_link}>
          Register
        </Link>
      </p>
    </div>
  );
}
