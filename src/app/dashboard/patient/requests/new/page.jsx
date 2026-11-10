"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FiLoader, FiSend } from "react-icons/fi";
import { api } from "@/lib/api";
import { BLOOD_GROUPS, PHONE_PATTERN, URGENCY_LEVELS } from "@/lib/constants";
import { todayInput } from "@/lib/format";
import FormField from "@/components/ui/FormField";
import PageHeader from "@/components/ui/PageHeader";
import { btnOutline, btnPrimary, card, inputCls } from "@/components/ui/styles";
import { authClient } from "@/lib/auth-client";

const urgencyTone = {
    normal: "border-gray-500 bg-gray-50 text-gray-700",
    urgent: "border-orange-500 bg-orange-50 text-orange-700",
    critical: "border-red-600 bg-red-50 text-red-700",
};

const CreateRequestPage = () => {
  const { data: u, isPending } = authClient.useSession();
    const user = u?.user;
    

  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { urgency: "urgent", bagsRequired: 1 } });

  const urgency = watch("urgency");

  const onSubmit = async (v) => {
    console.log(user?.id);
    try {
      const res = await api(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/requests`,
        {
          method: "POST",
          body: {
            patientName: v.patientName.trim(),
            bloodGroup: v.bloodGroup,
            bagsRequired: Number(v.bagsRequired),
            hospitalName: v.hospitalName.trim(),
            hospitalAddress: v.hospitalAddress.trim(),
            city: v.city.trim(),
            contactPerson: v.contactPerson.trim(),
            contactNumber: v.contactNumber.trim(),
            requiredDate: v.requiredDate,
            urgency: v.urgency,
            additionalInformation: v.additionalInformation?.trim() || "",
            patientId : user?.id || user._id,
          },
        },
      );

      toast.success("Request created. Matching donors are being notified.");
      const id = res?._id ?? res?.request?._id;
      router.push(
        id
          ? `/dashboard/patient/requests/${id}`
          : "/dashboard/patient/requests",
      );
      router.refresh();
    } catch (e) {
      // duplicate request hole server 409 + message pathabe
      toast.error(e.message);
    }
  };

  return (
    <>
      <PageHeader
        title="Create Blood Request"
        subtitle="Fill in the details. Eligible donors in the same city will be emailed right away."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={`${card} space-y-6`}
      >
        {/* Urgency */}
        <div>
          <span className="mb-1.5 block text-sm font-medium text-[#1F2937]">
            Urgency level
          </span>
          <div className="grid grid-cols-3 gap-3">
            {URGENCY_LEVELS.map((u) => (
              <label
                key={u.value}
                className={`cursor-pointer rounded-lg border-2 px-3 py-3 text-center text-sm font-semibold transition-colors ${
                  urgency === u.value
                    ? urgencyTone[u.value]
                    : "border-gray-200 text-gray-600 hover:border-red-300"
                }`}
              >
                <input
                  type="radio"
                  value={u.value}
                  className="sr-only"
                  {...register("urgency")}
                />
                {u.label}
              </label>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="patientName"
            label="Patient name"
            error={errors.patientName?.message}
          >
            <input
              id="patientName"
              className={inputCls}
              {...register("patientName", {
                required: "Patient name is required",
              })}
            />
          </FormField>

          <FormField
            id="bloodGroup"
            label="Required blood group"
            error={errors.bloodGroup?.message}
          >
            <select
              id="bloodGroup"
              className={inputCls}
              defaultValue=""
              {...register("bloodGroup", { required: "Select a blood group" })}
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
          </FormField>

          <FormField
            id="bagsRequired"
            label="Number of blood bags"
            error={errors.bagsRequired?.message}
          >
            <input
              id="bagsRequired"
              type="number"
              min={1}
              max={20}
              className={inputCls}
              {...register("bagsRequired", {
                required: "Enter number of bags",
                min: { value: 1, message: "At least 1 bag" },
                max: { value: 20, message: "Maximum 20 bags" },
              })}
            />
          </FormField>

          <FormField
            id="requiredDate"
            label="Required date"
            error={errors.requiredDate?.message}
          >
            <input
              id="requiredDate"
              type="date"
              min={todayInput()}
              className={inputCls}
              {...register("requiredDate", {
                required: "Required date is needed",
              })}
            />
          </FormField>

          <FormField
            id="hospitalName"
            label="Hospital name"
            error={errors.hospitalName?.message}
          >
            <input
              id="hospitalName"
              className={inputCls}
              {...register("hospitalName", {
                required: "Hospital name is required",
              })}
            />
          </FormField>

          <FormField id="city" label="City" error={errors.city?.message}>
            <input
              id="city"
              className={inputCls}
              placeholder="e.g. Chattogram"
              {...register("city", { required: "City is required" })}
            />
          </FormField>

          <FormField
            id="hospitalAddress"
            label="Hospital address / location"
            className="sm:col-span-2"
            error={errors.hospitalAddress?.message}
          >
            <input
              id="hospitalAddress"
              className={inputCls}
              {...register("hospitalAddress", {
                required: "Hospital address is required",
              })}
            />
          </FormField>

          <FormField
            id="contactPerson"
            label="Contact person"
            error={errors.contactPerson?.message}
          >
            <input
              id="contactPerson"
              className={inputCls}
              {...register("contactPerson", {
                required: "Contact person is required",
              })}
            />
          </FormField>

          <FormField
            id="contactNumber"
            label="Contact number"
            error={errors.contactNumber?.message}
          >
            <input
              id="contactNumber"
              type="tel"
              className={inputCls}
              placeholder="01XXXXXXXXX"
              {...register("contactNumber", {
                required: "Contact number is required",
              })}
            />
          </FormField>

          <FormField
            id="additionalInformation"
            label="Additional information (optional)"
            className="sm:col-span-2"
          >
            <textarea
              id="additionalInformation"
              rows={3}
              className={inputCls}
              placeholder="Ward, bed number, condition, anything donors should know"
              {...register("additionalInformation")}
            />
          </FormField>
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={isSubmitting} className={btnPrimary}>
            {isSubmitting ? (
              <>
                <FiLoader className="h-4 w-4 animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <FiSend className="h-4 w-4" />
                Post request
              </>
            )}
          </button>
          <Link href="/dashboard/patient/requests" className={btnOutline}>
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
};

export default CreateRequestPage;
