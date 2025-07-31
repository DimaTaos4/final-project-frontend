import { useForm } from "react-hook-form";
import clsx from "clsx";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { selectUsers } from "../../../redux/users/users.selector";

export type FormField = "email" | "userName" | "fullName" | "password";

interface FormProps {
  fields: FormField[];
  onSubmit: (values: Record<FormField, string>) => void;
  className?: string;
  inputClassName?: string;
  errorClassName?: string;
  buttonClassName?: string;
  submitText?: string;
  button?: ReactNode;
  formId?: string;
}

const Form: React.FC<FormProps> = ({
  fields,
  onSubmit,
  className,
  inputClassName,
  errorClassName,
  buttonClassName,
  submitText,
  button,
  formId,
}) => {
  const { loading, error } = useSelector(selectUsers);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Record<FormField, string>>();

  useEffect(() => {
    if (error) {
      const lowerError = error.toLowerCase();

      if (lowerError.includes("email")) {
        setError("email", { message: error });
      } else if (lowerError.includes("password")) {
        setError("password", { message: error });
      } else if (lowerError.includes("username")) {
        setError("userName", { message: error });
      } else if (lowerError.includes("full name")) {
        setError("fullName", { message: error });
      }
    }
  }, [error, setError]);

  const handleFormSubmit = (values: Record<FormField, string>) => {
    onSubmit(values);
  };

  const renderInput = (field: FormField) => {
    let placeholder = "";
    let type: "text" | "password" = "text";

    switch (field) {
      case "email":
        placeholder = "Email";
        break;
      case "userName":
        placeholder = "Username";
        break;
      case "fullName":
        placeholder = "Full Name";
        break;
      case "password":
        placeholder = "Password";
        type = "password";
        break;
    }

    return (
      <div key={field}>
        <input
          className={clsx(inputClassName)}
          {...register(field, {
            required: `${placeholder} is required`,
            ...(field === "email" && {
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            }),
            ...(field === "password" && {
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            }),
          })}
          type={type}
          placeholder={placeholder}
        />
        {errors[field] && (
          <p className={clsx(errorClassName)}>{errors[field]?.message}</p>
        )}
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={clsx(className)}
      id={formId}
    >
      {fields.map(renderInput)}

      {button ? (
        button
      ) : submitText ? (
        <button
          type="submit"
          className={clsx(buttonClassName)}
          disabled={loading}
        >
          {submitText}
        </button>
      ) : null}
    </form>
  );
};

export default Form;
