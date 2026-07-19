"use client";
import { useState } from "react";
import css from "./RegistrationForm.module.css";
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
import { useMutation } from "@tanstack/react-query";
import {
  getCurrentUserFull,
  register,
  RegisterRequest,
} from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import Title from "../Title/Title";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegistrationFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name is too long")
    .required("Name is required"),
  email: Yup.string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Enter a valid Email",
    )
    .required("Email is required"),
  password: Yup.string().min(7).required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function RegistrationForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const mutation = useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
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
        name: values.name,
        email: values.email,
        password: values.password,
      },
      {
        onSettled: () => actions.setSubmitting(false),
      },
    );
  };

  return (
    <div className={css.registration_container}>
      <Title title="Registration" marginBottom="12px" />
      <p className={css.subtitle}>
        Thank you for your interest in our platform.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={RegistrationFormSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className={css.form_name_container}>
            <Field name="name">
              {({ field, meta }: FieldProps) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Name"
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

            <ErrorMessage name="name" component="span" className={css.error} />
          </div>
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
          <div className={css.form_confirm_container}>
            <Field name="confirmPassword">
              {({ field, meta }: FieldProps) => (
                <input
                  {...field}
                  type={confirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
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
              onClick={() => setConfirmPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {confirmPassword ? (
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
              name="confirmPassword"
              component="span"
              className={css.error}
            />
          </div>
          <button type="submit" className={css.form_btn}>
            {mutation.isPending ? "Registering..." : "Registration"}
          </button>
        </Form>
      </Formik>
      <p className={css.login_title}>
        Already have an account?{" "}
        <Link href={"/auth/login"} className={css.login_link}>
          Login
        </Link>
      </p>
    </div>
  );
}
