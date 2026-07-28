import css from "./ModalEditUser.module.css";
import Image from "next/image";
import {
  ErrorMessage,
  Field,
  FieldProps,
  Form,
  Formik,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";
import { useAuthStore } from "@/lib/store/authStore";
import { UserFull } from "@/types/user";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { editUser } from "@/lib/api/clientApi";

interface ModalEditUserProps {
  user?: UserFull;
  onClose: () => void;
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
}

const editUserFormSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().matches(
    /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    "Enter a valid Email",
  ),
  avatar: Yup.string().matches(
    /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
    "Enter a valid image URL",
  ),
  phone: Yup.string().matches(/^\+38\d{10}$/, "Enter a valid phone number"),
});

export default function ModalEditUser({ user, onClose }: ModalEditUserProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar ?? "");

  const mutation = useMutation({
    mutationFn: editUser,
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      onClose();
    },
  });

  if (!user) {
    return null;
  }

  const initialValues: FormValues = {
    name: user.name ?? "",
    email: user.email ?? "",
    phone: user.phone ?? "",
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (values: FormValues) => {
    mutation.mutate({
      name: values.name,
      email: values.email,
      phone: values.phone,
      avatar: avatarPreview,
    });
  };

  return (
    <>
      <button type="button" className={css.close_btn} onClick={onClose}>
        <svg width={24} height={24} className={css.close_icon}>
          <use href="/icons.svg#icon-close"></use>
        </svg>
      </button>
      <p className={css.title}>Edit information</p>
      {avatarPreview || user?.avatar ? (
        <Image
          src={avatarPreview || user!.avatar}
          alt={user!.name}
          width={80}
          height={80}
          className={css.user_avatar}
        />
      ) : (
        <div className={css.user_avatar_default}>
          <svg width={35} height={35} fill="#f6b83d" stroke="#f6b83d">
            <use href="/icons.svg#icon-user"></use>
          </svg>
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={editUserFormSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form_container}>
          <div className={css.form_image_container}>
            <input
              type="text"
              placeholder="Image URL"
              value={avatarPreview}
              readOnly
              className={css.form_input_img}
            />
            <button
              type="button"
              className={css.upload_btn}
              onClick={() => fileInputRef.current?.click()}
            >
              Upload photo
              <svg width={18} height={18}>
                <use href="/icons.svg#icon-upload"></use>
              </svg>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/webp, image/gif, image/bmp"
              hidden
              onChange={handleFileChange}
            />
          </div>
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
          <div className={css.form_phone_container}>
            <Field name="phone">
              {({ field, meta }: FieldProps) => (
                <input
                  {...field}
                  type="text"
                  placeholder="+380"
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
            <ErrorMessage name="phone" component="span" className={css.error} />
          </div>
          <button type="submit" className={css.form_btn}>
            Go to profile
          </button>
        </Form>
      </Formik>
    </>
  );
}
