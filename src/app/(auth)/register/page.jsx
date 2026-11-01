"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@heroui/react";
import { toast } from "sonner";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
  FiLoader,
  FiUserPlus,
  FiMapPin,
  FiCalendar,
} from "react-icons/fi";
import { FaDroplet } from "react-icons/fa6";

import AuthShell from "@/components/auth/Authshell";
import { Field, inputCls } from "@/components/auth/Field";


const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const dashboardLinks = {
  donor: "/dashboard/donor",
  patient: "/dashboard/patient",
};

const RegisterPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [today, setToday] = useState("")

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { role: "donor", availability: "available" } });

  const role = watch("role");
  const password = watch("password");
 
  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    console.log(values);

    const { name, email, phone, password, role } = values;
    console.log(name, email, phone, password, role);

    // role: UI te shudhu donor / patient. Admin kokhono UI theke hobe na.
    // const { error } = await authClient.signUp.email({
    //   name,
    //   email,
    //   password,
    //   phone,
    //   role,
    // });

    // if (error) {
    //   toast.error(error.message || "Registration failed");
    //   setIsSubmitting(false);
    //   return;
    // }

    // // Donor hole donor profile (pending verification) toiri korbo
    // if (role === "donor") {
    //   try {
    //     const res = await fetch("/api/donors", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         bloodGroup: values.bloodGroup,
    //         city: values.city,
    //         area: values.area,
    //         lastDonationDate: values.lastDonationDate || null,
    //         availability: values.availability,
    //       }),
    //     });
    //     if (!res.ok) throw new Error();
    //   } catch {
    //     toast.warning(
    //       "Account created, but donor profile could not be saved. Complete it from your dashboard.",
    //     );
    //   }
    // }

    toast.success("Account created successfully");
    // router.push(dashboardLinks[role] || "/");
    router.refresh();
    setIsSubmitting(false);
  };

  return (
    <AuthShell
      heading="Create your account"
      sub="Join as a donor or as someone who needs blood."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Role */}
        <div>
          <span className="mb-1.5 block text-sm font-medium text-[#1F2937]">
            I want to
          </span>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "donor", label: "Donate blood" },
              { value: "patient", label: "Request blood" },
            ].map((opt) => (
              <label
                key={opt.value}
                className={`cursor-pointer rounded-lg border px-3 py-3 text-center text-sm font-semibold transition-colors ${
                  role === opt.value
                    ? "border-red-600 bg-red-50 text-red-600"
                    : "border-gray-300 text-gray-600 hover:border-red-300"
                }`}
              >
                <input
                  type="radio"
                  value={opt.value}
                  className="sr-only"
                  {...register("role")}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        <Field
          id="name"
          label="Full name"
          icon={FiUser}
          error={errors.name?.message}
        >
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            className={inputCls}
            {...register("name", { required: "Name is required" })}
          />
        </Field>

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
          id="phone"
          label="Phone number"
          icon={FiPhone}
          error={errors.phone?.message}
        >
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="01XXXXXXXXX"
            className={inputCls}
            {...register("phone", {
              required: "Phone number is required",
            //   pattern: {
            //     value: /^(\+?88)?01[3-9]\d{8}$/,
            //     message: "Enter a valid Bangladeshi phone number",
            //   },
            })}
          />
        </Field>

        {/* Donor-only fields */}
        {role === "donor" && (
          <div className="space-y-5 rounded-xl border border-red-100 bg-red-50/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
              Donor details
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="bloodGroup"
                label="Blood group"
                icon={FaDroplet}
                error={errors.bloodGroup?.message}
              >
                <select
                  id="bloodGroup"
                  className={inputCls}
                  defaultValue=""
                  {...register("bloodGroup", {
                    required: "Select blood group",
                  })}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {BLOOD_GROUPS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                id="availability"
                label="Availability"
                error={errors.availability?.message}
              >
                <select
                  id="availability"
                  className={`${inputCls} pl-3`}
                  {...register("availability")}
                >
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="city"
                label="City"
                icon={FiMapPin}
                error={errors.city?.message}
              >
                <input
                  id="city"
                  type="text"
                  placeholder="e.g. Chattogram"
                  className={inputCls}
                  {...register("city", { required: "City is required" })}
                />
              </Field>

              <Field
                id="area"
                label="Area"
                icon={FiMapPin}
                error={errors.area?.message}
              >
                <input
                  id="area"
                  type="text"
                  placeholder="e.g. Agrabad"
                  className={inputCls}
                  {...register("area", { required: "Area is required" })}
                />
              </Field>
            </div>

            <Field
              id="lastDonationDate"
              label="Last donation date (optional)"
              icon={FiCalendar}
              error={errors.lastDonationDate?.message}
            >
              <input
                id="lastDonationDate"
                type="date"
                max={today}
                className={inputCls}
                {...register("lastDonationDate")}
              />
            </Field>
          </div>
        )}

        <Field
          id="password"
          label="Password"
          icon={FiLock}
          error={errors.password?.message}
        >
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className={`${inputCls} pr-10`}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Minimum 8 characters" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                message: "Use uppercase, lowercase and a number",
              },
            })}
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

        <Field
          id="confirmPassword"
          label="Confirm password"
          icon={FiLock}
          error={errors.confirmPassword?.message}
        >
          <input
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Repeat your password"
            className={`${inputCls} pr-10`}
            {...register("confirmPassword", {
              required: "Confirm your password",
              validate: (v) => v === password || "Passwords do not match",
            })}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((s) => !s)}
            aria-label={showConfirm ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600"
          >
            {showConfirm ? (
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
              Creating account...
            </>
          ) : (
            <>
              <FiUserPlus className="h-4 w-4" />
              Create account
            </>
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-red-600 hover:underline"
        >
          Log in
        </Link>
      </p>
    </AuthShell>
  );
};

export default RegisterPage;
