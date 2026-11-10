"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FiPhone, FiMail, FiMapPin, FiSend, FiLoader } from "react-icons/fi";
import PublicHero from "@/components/ui/PublicHero";
import FormField from "@/components/ui/FormField";
import { btnPrimary, inputCls } from "@/components/ui/styles";
import { api } from "@/lib/api";

const info = [
    { Icon: FiPhone, label: "Phone", value: "(+880) 1XXX-XXXXXX" },
    { Icon: FiMail, label: "Email", value: "support@bloodlink.com" },
    { Icon: FiMapPin, label: "Address", value: "Chattogram, Bangladesh" },
];

const ContactPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (values) => {
        try {
            await api(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/contact`, {
              method: "POST",
              body: values,
            });
            toast.success("Message sent. We will get back to you soon.");
            reset();
        } catch (e) {
            toast.error(e.message);
        }
    };

    return (
        <>
            <PublicHero
                eyebrow="Contact us"
                title="We are here to help"
                subtitle="Questions about donating, requesting blood or your account? Send us a message."
            />

            <section className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[1fr_1.4fr]">
                <div className="space-y-5">
                    {info.map(({ Icon, label, value }) => (
                        <div key={label} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-50 text-red-600">
                                <Icon className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>
                                <p className="text-sm font-medium text-[#1F2937]">{value}</p>
                            </div>
                        </div>
                    ))}
                    <p className="text-sm leading-relaxed text-gray-500">
                        In a medical emergency, please contact the hospital or emergency services first. This form is
                        for general questions and support.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                    <div className="grid gap-5 sm:grid-cols-2">
                        <FormField id="name" label="Name" error={errors.name?.message}>
                            <input
                                id="name"
                                className={inputCls}
                                placeholder="Your name"
                                {...register("name", { required: "Name is required" })}
                            />
                        </FormField>
                        <FormField id="email" label="Email" error={errors.email?.message}>
                            <input
                                id="email"
                                type="email"
                                className={inputCls}
                                placeholder="you@example.com"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                                })}
                            />
                        </FormField>
                    </div>

                    <FormField id="subject" label="Subject" error={errors.subject?.message}>
                        <input
                            id="subject"
                            className={inputCls}
                            placeholder="How can we help?"
                            {...register("subject", { required: "Subject is required" })}
                        />
                    </FormField>

                    <FormField id="message" label="Message" error={errors.message?.message}>
                        <textarea
                            id="message"
                            rows={5}
                            className={inputCls}
                            placeholder="Write your message"
                            {...register("message", {
                                required: "Message is required",
                                minLength: { value: 10, message: "Please write at least 10 characters" },
                            })}
                        />
                    </FormField>

                    <button type="submit" disabled={isSubmitting} className={btnPrimary}>
                        {isSubmitting ? (
                            <>
                                <FiLoader className="h-4 w-4 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <FiSend className="h-4 w-4" />
                                Send message
                            </>
                        )}
                    </button>
                </form>
            </section>
        </>
    );
};

export default ContactPage;
