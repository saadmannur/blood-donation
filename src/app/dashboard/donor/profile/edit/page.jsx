"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FiLoader, FiSave } from "react-icons/fi";
import { api } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import { BLOOD_GROUPS, PHONE_PATTERN } from "@/lib/constants";
import { toInputDate, todayInput } from "@/lib/format";
import AsyncView from "@/components/ui/AsyncView";
import FormField from "@/components/ui/FormField";
import PageHeader from "@/components/ui/PageHeader";
import { btnOutline, btnPrimary, card, inputCls } from "@/components/ui/styles";

// Profile na thakle (404) create mode, thakle edit mode
const EditDonorProfilePage = () => {
    const router = useRouter();
    const { data, loading, error, status, reload } = useApi("/api/donors/me");
    const isCreate = status === 404;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({ defaultValues: { availability: "available" } });

    useEffect(() => {
        if (!data) return;
        reset({
            name: data.name ?? "",
            phone: data.phone ?? "",
            bloodGroup: data.bloodGroup ?? "",
            city: data.city ?? "",
            area: data.area ?? "",
            lastDonationDate: toInputDate(data.lastDonationDate),
            availability: data.availability ?? "available",
        });
    }, [data, reset]);

    const onSubmit = async (v) => {
        try {
            const body = {
                bloodGroup: v.bloodGroup,
                city: v.city.trim(),
                area: v.area.trim(),
                lastDonationDate: v.lastDonationDate || null,
                availability: v.availability,
            };

            if (isCreate) {
                await api("/api/donors", { method: "POST", body });
                toast.success("Donor profile created. It will be visible after admin verification.");
            } else {
                await api("/api/donors/me", {
                    method: "PATCH",
                    body: { ...body, name: v.name.trim(), phone: v.phone.trim() },
                });
                toast.success("Profile updated");
            }

            router.push("/dashboard/donor/profile");
            router.refresh();
        } catch (e) {
            toast.error(e.message);
        }
    };

    return (
        <>
            <PageHeader
                title={isCreate ? "Create Donor Profile" : "Edit Profile"}
                subtitle="Keep your details accurate so the right requests reach you."
            />

            <AsyncView loading={loading} error={isCreate ? null : error} onRetry={reload}>
                {(data || isCreate) && (
                    <form onSubmit={handleSubmit(onSubmit)} noValidate className={`${card} space-y-5`}>
                        {!isCreate && (
                            <div className="grid gap-5 sm:grid-cols-2">
                                <FormField id="name" label="Full name" error={errors.name?.message}>
                                    <input
                                        id="name"
                                        className={inputCls}
                                        {...register("name", { required: "Name is required" })}
                                    />
                                </FormField>
                                <FormField id="phone" label="Phone number" error={errors.phone?.message}>
                                    <input
                                        id="phone"
                                        type="tel"
                                        className={inputCls}
                                        {...register("phone", {
                                            required: "Phone number is required",
                                            pattern: { value: PHONE_PATTERN, message: "Enter a valid Bangladeshi phone number" },
                                        })}
                                    />
                                </FormField>
                            </div>
                        )}

                        <div className="grid gap-5 sm:grid-cols-2">
                            <FormField id="bloodGroup" label="Blood group" error={errors.bloodGroup?.message}>
                                <select
                                    id="bloodGroup"
                                    className={inputCls}
                                    {...register("bloodGroup", { required: "Select your blood group" })}
                                >
                                    <option value="">Select</option>
                                    {BLOOD_GROUPS.map((g) => (
                                        <option key={g} value={g}>
                                            {g}
                                        </option>
                                    ))}
                                </select>
                            </FormField>
                            <FormField id="availability" label="Availability">
                                <select id="availability" className={inputCls} {...register("availability")}>
                                    <option value="available">Available</option>
                                    <option value="unavailable">Unavailable</option>
                                </select>
                            </FormField>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <FormField id="city" label="City" error={errors.city?.message}>
                                <input
                                    id="city"
                                    className={inputCls}
                                    placeholder="e.g. Chattogram"
                                    {...register("city", { required: "City is required" })}
                                />
                            </FormField>
                            <FormField id="area" label="Area" error={errors.area?.message}>
                                <input
                                    id="area"
                                    className={inputCls}
                                    placeholder="e.g. Agrabad"
                                    {...register("area", { required: "Area is required" })}
                                />
                            </FormField>
                        </div>

                        <FormField
                            id="lastDonationDate"
                            label="Last donation date (optional)"
                            hint="Used to check that enough time has passed since your last donation."
                        >
                            <input
                                id="lastDonationDate"
                                type="date"
                                max={todayInput()}
                                className={inputCls}
                                {...register("lastDonationDate")}
                            />
                        </FormField>

                        <div className="flex flex-wrap gap-3 pt-2">
                            <button type="submit" disabled={isSubmitting} className={btnPrimary}>
                                {isSubmitting ? (
                                    <>
                                        <FiLoader className="h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <FiSave className="h-4 w-4" />
                                        {isCreate ? "Create profile" : "Save changes"}
                                    </>
                                )}
                            </button>
                            <Link href="/dashboard/donor/profile" className={btnOutline}>
                                Cancel
                            </Link>
                        </div>
                    </form>
                )}
            </AsyncView>
        </>
    );
};

export default EditDonorProfilePage;
