"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@heroui/react";
import { toast } from "sonner";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiLoader,
  FiLogIn,
} from "react-icons/fi";
import AuthShell from "@/components/auth/Authshell";
import { Field, inputCls } from "@/components/auth/Field";
import { authClient } from "@/lib/auth-client";


const dashboardLinks = {
  donor: "/dashboard/donor",
  patient: "/dashboard/patient",
  admin: "/dashboard/admin",
};

const LoginPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    setIsSubmitting(true);

    const { data: res, error } = await authClient.signIn.email({
      email,
      password,
      rememberMe: true,
    });

    if (error) {
      toast.error(error.message || "Login failed");
      setIsSubmitting(false);
      return;
    }

    toast.success("Login successful");
    // role onujayi nijer dashboard e pathai
    router.push("/");
    router.refresh();
  };

  return (
    <AuthShell
      heading="Welcome back"
      sub="Log in to manage your donor profile or blood requests."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <Field
          id="email"
          label="Email"
          icon={FiMail}
          error={errors.email?.message}
        >
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={inputCls}
            {...register("email", { required: "Email is required" })}
          />
        </Field>

        <Field
          id="password"
          label="Password"
          icon={FiLock}
          error={errors.password?.message}
        >
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Your password"
            className={`${inputCls} pr-10`}
            {...register("password", { required: "Password is required" })}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600"
          >
            {showPassword ? (
              <FiEyeOff className="h-4 w-4" />
            ) : (
              <FiEye className="h-4 w-4" />
            )}
          </button>
        </Field>

        <Button
          type="submit"
          isDisabled={isSubmitting}
          className="w-full rounded-lg bg-red-600 py-2.5 font-semibold text-white shadow-md shadow-red-600/25 transition-colors hover:bg-red-700"
        >
          {isSubmitting ? (
            <>
              <FiLoader className="h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            <>
              <FiLogIn className="h-4 w-4" />
              Log in
            </>
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        New to BloodLink?{" "}
        <Link
          href="/register"
          className="font-semibold text-red-600 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
};

export default LoginPage;
