"use client";

import css from "./AddPetForm.module.css";
import {
  ErrorMessage,
  Field,
  FieldProps,
  Form,
  Formik,
  FormikHelpers,
} from "formik";
import { useRef, useState } from "react";
import * as Yup from "yup";
import Title from "../Title/Title";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CustomSelect from "../CustomSelect/CustomSelect";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addPet, getNoticesSpecies } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

interface FormValues {
  title: string;
  name: string;
  imgURL: string;
  species: string;
  birthday: string;
  sex: string;
}

const initialValues: FormValues = {
  title: "",
  name: "",
  imgURL: "",
  species: "",
  birthday: "",
  sex: "",
};

export type GenderValue = "female" | "male" | "multiple";

interface GenderOption {
  value: GenderValue;
  label: string;
}

const GENDER_OPTIONS: GenderOption[] = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "multiple", label: "Multiple" },
];

const GENDER_ICONS: Record<GenderValue, string> = {
  male: "icon-male",
  female: "icon-female",
  multiple: "icon-multiple",
};

const AddPetFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Title must be at least 2 characters")
    .required("Title is required"),
  name: Yup.string()
    .min(2, "Pet's Name must be at least 2 characters")
    .max(30, "Pet's Name is too long")
    .required("Pet's Name is required"),
  imgURL: Yup.string().required("Img URL is required"),
  species: Yup.string().required("Species is required"),
  birthday: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid birthday (YYYY-MM-DD)")
    .required("Birthday is required"),
  sex: Yup.string().required("Gender is required"),
});

export default function AddPetForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [petAvatarPreview, setPetAvatarPreview] = useState("");

  const mutation = useMutation({
    mutationFn: addPet,
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      router.push("/profile");
    },
  });

  const { data: speciesOptions } = useQuery({
    queryKey: ["species"],
    queryFn: () => getNoticesSpecies(),
    refetchOnWindowFocus: false,
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: string) => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPetAvatarPreview(previewUrl);
    setFieldValue("imgURL", previewUrl);
  };

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("name", values.name);
    formData.append("species", values.species);
    formData.append("birthday", values.birthday);
    formData.append("sex", values.sex);
    if (avatarFile) {
      formData.append("imgURL", avatarFile);
    }

    // mutation.mutate(, {
    //   onSettled: () => actions.setSubmitting(false),
    // });
  };

  return (
    <div className={css.add_pet_form_container}>
      <div className={css.pet_form_title}>
        <Title title="Add my pet /" />
        <span>Personal details</span>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={AddPetFormSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className={css.form_container}>
            <div className={css.form_gender_container}>
              {GENDER_OPTIONS.map((gender) => {
                const isActive = values.sex === gender.value;

                return (
                  <div
                    key={gender.value}
                    className={`${css.gender_btn} ${
                      isActive
                        ? css[`${gender.value}_active`]
                        : css[gender.value]
                    }`}
                  >
                    <input
                      type="radio"
                      name="sex"
                      id={gender.value}
                      value={gender.value}
                      checked={isActive}
                      onChange={() => setFieldValue("sex", gender.value)}
                      hidden
                    />
                    <label htmlFor={gender.value}>
                      <svg
                        width={20}
                        height={20}
                        className={`${css[`${gender.value}_icon`]} ${
                          isActive ? css.icon_active : ""
                        }`}
                      >
                        <use
                          href={`/icons.svg#${GENDER_ICONS[gender.value]}`}
                        ></use>
                      </svg>
                    </label>
                  </div>
                );
              })}
            </div>
            <ErrorMessage name="sex" component="span" className={css.error} />

            {petAvatarPreview ? (
              <Image
                src={petAvatarPreview}
                alt="Preview avatar"
                width={68}
                height={68}
                className={css.pet_avatar}
              />
            ) : (
              <div className={css.pet_avatar_default}>
                <svg width={34} height={34}>
                  <use href="/icons.svg#icon-footprint"></use>
                </svg>
              </div>
            )}

            <div className={css.form_image_container}>
              <input
                type="text"
                placeholder="Enter URL"
                value={petAvatarPreview}
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
                onChange={(e) => handleFileChange(e, setFieldValue)}
              />
            </div>
            <ErrorMessage
              name="imgURL"
              component="span"
              className={css.error}
            />

            <div className={css.form_title_container}>
              <Field name="title">
                {({ field, meta }: FieldProps) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Title"
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
              <ErrorMessage
                name="title"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.form_name_container}>
              <Field name="name">
                {({ field, meta }: FieldProps) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Pet's Name"
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
              <ErrorMessage
                name="name"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.form_bs_container}>
              <div className={css.form_birthday_container}>
                <Field name="birthday">
                  {({ field, meta }: FieldProps) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="00.00.0000"
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
                <ErrorMessage
                  name="birthday"
                  component="span"
                  className={css.error}
                />
              </div>

              <div className={css.form_species_container}>
                <Field name="species">
                  {({ field, form, meta }: FieldProps) => (
                    <div
                      className={`${css.species_select} ${
                        meta.touched && meta.error
                          ? css.input_error
                          : meta.touched && !meta.error
                            ? css.input_success
                            : ""
                      }`}
                    >
                      <CustomSelect
                        options={
                          speciesOptions?.map((s) => ({
                            label: s.charAt(0).toLocaleUpperCase() + s.slice(1),
                            value: s,
                          })) ?? []
                        }
                        value={field.value}
                        onChange={(value) =>
                          form.setFieldValue("species", value)
                        }
                        placeholder="Type of pet"
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="species"
                  component="span"
                  className={css.error}
                />
              </div>
            </div>

            <div className={css.form_btn_container}>
              <button
                type="button"
                className={css.form_back_btn}
                onClick={() => router.back()}
              >
                Back
              </button>
              <button
                type="submit"
                className={css.form_submit_btn}
                disabled={isSubmitting || mutation.isPending}
              >
                {mutation.isPending ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
