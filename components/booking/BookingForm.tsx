"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Check } from "lucide-react";
import { m, AnimatePresence } from "motion/react";
import { vehicles } from "@/data/vehicles";
import { trackEvent } from "@/lib/analytics";
import { bookingMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { buildBookingSchema } from "@/lib/validation";
import { Button } from "@/components/ui/Button";
import { duration, ease } from "@/lib/motion";

type BookingSchema = ReturnType<typeof buildBookingSchema>;
type FormValues = z.output<BookingSchema>;

const inputClass =
  "w-full rounded-xl border border-line bg-mist/60 px-4 py-3 text-sm text-text placeholder:text-text-muted/60 transition-all focus:border-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/20 dark:border-white/10 dark:bg-white/5 dark:text-text-dark dark:focus:bg-graphite-2";
const inputClassDark =
  "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/40 transition-all focus:border-gold focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gold/25 [color-scheme:dark]";
const labelClass = "mb-1.5 block text-xs font-semibold tracking-tight text-text-muted";
const labelClassDark = "mb-1.5 block text-xs font-semibold tracking-tight text-white/70";
const errorClass = "mt-1.5 block text-xs font-medium text-rose-600 dark:text-rose-400";

const TRIP_TYPES = [
  {
    id: "sightseeing",
    label: "Sightseeing",
    pickup: "Hotel / Residence in Jodhpur",
    drop: "Jodhpur Sightseeing (Mehrangarh, Jaswant Thada, Umaid Bhawan)",
  },
  {
    id: "outstation",
    label: "Outstation",
    pickup: "Jodhpur",
    drop: "Jaisalmer / Udaipur / Jaipur",
  },
  {
    id: "transfer",
    label: "Airport",
    pickup: "Jodhpur Airport (JDH) / Junction",
    drop: "Hotel / Haveli in Jodhpur",
  },
] as const;

/** Pad a Date into a datetime-local value in browser's local time. */
function toInputValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/** Human message format: "12 Oct 2026, 09:30". */
function formatDatetime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export type BookingFormProps = {
  sourcePage: string;
  variant?: "hero" | "contact";
  defaultPickup?: string;
  defaultDrop?: string;
  defaultVehicle?: string;
  className?: string;
  dark?: boolean;
};

export function BookingForm({
  sourcePage,
  variant = "hero",
  defaultPickup = "",
  defaultDrop = "",
  defaultVehicle = "",
  className = "",
  dark = false,
}: BookingFormProps) {
  const uid = useId();
  const field = dark ? inputClassDark : inputClass;
  const label = dark ? labelClassDark : labelClass;
  const [submitted, setSubmitted] = useState(false);
  const datetimeRef = useRef<HTMLInputElement | null>(null);
  const mountedAtRef = useRef<number>(0);

  const [tripType, setTripType] = useState<"sightseeing" | "outstation" | "transfer">(
    "sightseeing",
  );
  const requireContact = variant === "contact";
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.input<BookingSchema>, unknown, FormValues>({
    resolver: zodResolver(
      buildBookingSchema({
        requireName: requireContact,
        requirePhone: requireContact,
      }),
    ),
    defaultValues: {
      pickup: defaultPickup,
      drop: defaultDrop,
      datetime: "",
      vehicle: defaultVehicle,
      name: "",
      phone: "",
      website: "",
    },
  });

  useEffect(() => {
    mountedAtRef.current = Date.now();
    if (datetimeRef.current) {
      datetimeRef.current.min = toInputValue(new Date());
    }
  }, []);

  // Popular-routes strip (and similar) can prefill pickup/drop without a full page state lift.
  useEffect(() => {
    const onPrefill = (event: Event) => {
      const detail = (event as CustomEvent<{ pickup?: string; drop?: string }>).detail;
      if (!detail) return;
      if (detail.pickup) setValue("pickup", detail.pickup);
      if (detail.drop) setValue("drop", detail.drop);
      setTripType("outstation");
    };
    window.addEventListener("marwad:prefill", onPrefill);
    return () => window.removeEventListener("marwad:prefill", onPrefill);
  }, [setValue]);

  const onReset = () => {
    reset({
      pickup: defaultPickup,
      drop: defaultDrop,
      datetime: "",
      vehicle: defaultVehicle,
      name: "",
      phone: "",
      website: "",
    });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <AnimatePresence>
        <m.div
          role="status"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: duration.base, ease: ease.out }}
          className={`overflow-hidden rounded-3xl border ${
            dark
              ? "border-line-dark bg-graphite text-text-dark"
              : "border-line text-text bg-white shadow-sm"
          } p-8 text-center ${className}`}
        >
          <div className="bg-gold/15 text-gold border-gold/30 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border">
            <Check aria-hidden="true" className="h-7 w-7" strokeWidth={2} />
          </div>
          <h3 className="text-2xl font-semibold tracking-tight">Enquiry Prepared</h3>
          <p
            className={`mx-auto mt-2 max-w-sm text-sm leading-relaxed ${
              dark ? "text-text-dark-muted" : "text-text-muted"
            }`}
          >
            WhatsApp is now opened with your trip details. Send the pre-filled message and
            we’ll reply with availability and the fare for your dates.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="secondary" size="sm" onDark={dark} onClick={onReset}>
              Send another enquiry
            </Button>
          </div>
        </m.div>
      </AnimatePresence>
    );
  }

  const datetimeField = register("datetime");

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit((values) => {
          const payload = {
            ...values,
            sourcePage,
            startedAt: mountedAtRef.current || Date.now() - 3_000,
          };

          fetch("/api/lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            keepalive: true,
            signal: AbortSignal.timeout(4_000),
          }).catch(() => {
            /* fire-and-forget — the WhatsApp redirect must never wait on this */
          });

          trackEvent("form_submit", { page: sourcePage });

          const vehicleLabel =
            vehicles.find((vehicle) => vehicle.slug === values.vehicle)?.name ??
            values.vehicle;
          const url = buildWhatsAppUrl(
            bookingMessage({
              pickup: values.pickup,
              drop: values.drop,
              datetime: formatDatetime(values.datetime),
              vehicle: vehicleLabel,
              name: values.name,
            }),
          );

          const isMobile = /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);
          if (isMobile) {
            window.location.href = url;
          } else {
            window.open(url, "_blank", "noopener");
          }
          setSubmitted(true);
        })(event);
      }}
      noValidate
      className={`relative overflow-hidden rounded-3xl border ${
        dark
          ? "border-line-dark bg-graphite/90 text-text-dark backdrop-blur-xl"
          : "border-line text-text bg-white/95 shadow-sm backdrop-blur-xl"
      } p-6 sm:p-8 ${className}`}
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Check fare and availability
        </h3>
        <p className={`mt-1.5 text-sm ${dark ? "text-white/65" : "text-text-muted"}`}>
          We reply on WhatsApp within minutes.
        </p>
      </div>

      <div
        role="group"
        aria-label="Trip type"
        className={`mb-5 grid grid-cols-3 gap-1 rounded-2xl border p-1 text-sm font-medium ${
          dark ? "border-white/15 bg-white/[0.06]" : "border-line bg-mist/60"
        }`}
      >
        {TRIP_TYPES.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={tripType === t.id}
            onClick={() => {
              setTripType(t.id);
              setValue("pickup", t.pickup);
              setValue("drop", t.drop);
            }}
            className={`cursor-pointer rounded-xl px-1 py-2 text-center transition-colors ${
              tripType === t.id
                ? dark
                  ? "bg-gold font-semibold text-black"
                  : "bg-navy font-semibold text-white"
                : dark
                  ? "text-white/70 hover:text-white"
                  : "text-text-muted hover:text-text"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-[1.25fr_1fr] [&>*]:min-w-0 [&>*:nth-child(-n+2)]:sm:col-span-2">
        {/* Pickup */}
        <div>
          <label className={label} htmlFor={`${uid}-pickup`}>
            Pickup
          </label>
          <input
            id={`${uid}-pickup`}
            type="text"
            autoComplete="off"
            placeholder="Airport, station or hotel"
            className={field}
            aria-invalid={errors.pickup ? true : undefined}
            aria-describedby={errors.pickup ? `${uid}-pickup-error` : undefined}
            {...register("pickup")}
          />
          {errors.pickup ? (
            <span id={`${uid}-pickup-error`} className={errorClass}>
              {errors.pickup.message}
            </span>
          ) : null}
        </div>

        {/* Drop */}
        <div>
          <label className={label} htmlFor={`${uid}-drop`}>
            Drop
          </label>
          <input
            id={`${uid}-drop`}
            type="text"
            autoComplete="off"
            placeholder="Jaisalmer, Udaipur, city tour"
            className={field}
            aria-invalid={errors.drop ? true : undefined}
            aria-describedby={errors.drop ? `${uid}-drop-error` : undefined}
            {...register("drop")}
          />
          {errors.drop ? (
            <span id={`${uid}-drop-error`} className={errorClass}>
              {errors.drop.message}
            </span>
          ) : null}
        </div>

        {/* Pickup Date & Time */}
        <div>
          <label className={label} htmlFor={`${uid}-datetime`}>
            Date and time
          </label>
          <input
            id={`${uid}-datetime`}
            type="datetime-local"
            className={field}
            aria-invalid={errors.datetime ? true : undefined}
            aria-describedby={errors.datetime ? `${uid}-datetime-error` : undefined}
            {...datetimeField}
            ref={(node) => {
              datetimeRef.current = node;
              datetimeField.ref(node);
            }}
          />
          {errors.datetime ? (
            <span id={`${uid}-datetime-error`} className={errorClass}>
              {errors.datetime.message}
            </span>
          ) : null}
        </div>

        {/* Vehicle */}
        <div>
          <label className={label} htmlFor={`${uid}-vehicle`}>
            Vehicle
          </label>
          <select
            id={`${uid}-vehicle`}
            className={field}
            aria-invalid={errors.vehicle ? true : undefined}
            aria-describedby={errors.vehicle ? `${uid}-vehicle-error` : undefined}
            {...register("vehicle")}
          >
            <option value="" className="text-black">
              Select
            </option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.slug} value={vehicle.slug} className="text-black">
                {vehicle.name} · {vehicle.seats} seats · ₹{vehicle.perKm}/km
              </option>
            ))}
          </select>
          {errors.vehicle ? (
            <span id={`${uid}-vehicle-error`} className={errorClass}>
              {errors.vehicle.message}
            </span>
          ) : null}
        </div>

        {requireContact ? (
          <>
            {/* Name */}
            <div>
              <label className={label} htmlFor={`${uid}-name`}>
                Your Name{requireContact ? "" : " (optional)"}
              </label>
              <input
                id={`${uid}-name`}
                type="text"
                autoComplete="name"
                placeholder="Full Name"
                className={field}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? `${uid}-name-error` : undefined}
                {...register("name")}
              />
              {errors.name ? (
                <span id={`${uid}-name-error`} className={errorClass}>
                  {errors.name.message}
                </span>
              ) : null}
            </div>

            {/* Phone */}
            <div>
              <label className={label} htmlFor={`${uid}-phone`}>
                Contact Number{requireContact ? "" : " (optional)"}
              </label>
              <input
                id={`${uid}-phone`}
                type="tel"
                autoComplete="tel"
                placeholder="+91 98765 43210"
                className={field}
                aria-invalid={errors.phone ? true : undefined}
                aria-describedby={errors.phone ? `${uid}-phone-error` : undefined}
                {...register("phone")}
              />
              {errors.phone ? (
                <span id={`${uid}-phone-error`} className={errorClass}>
                  {errors.phone.message}
                </span>
              ) : null}
            </div>
          </>
        ) : null}
      </div>

      {/* Honeypot field */}
      <div
        className="absolute left-[-9999px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor={`${uid}-website`}>Leave this empty</label>
        <input
          id={`${uid}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="mt-6">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          arrow
          disabled={isSubmitting}
        >
          Book on WhatsApp
        </Button>
      </div>
    </form>
  );
}
