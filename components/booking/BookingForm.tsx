"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Check } from "lucide-react";
import { vehicles } from "@/data/vehicles";
import { trackEvent } from "@/lib/analytics";
import { bookingMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { buildBookingSchema } from "@/lib/validation";
import { Button } from "@/components/ui/Button";

type BookingSchema = ReturnType<typeof buildBookingSchema>;
type FormValues = z.output<BookingSchema>;

const inputClass =
  "w-full rounded-sm border border-ink/25 bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-stone-light focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink/40";
const labelClass =
  "mb-1.5 block text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-stone";
const errorClass = "mt-1 block text-xs text-[#9c3b2e]";

/** Pad a Date into a datetime-local value in the browser's local time. */
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

type BookingFormProps = {
  sourcePage: string;
  variant?: "hero" | "contact";
  defaultPickup?: string;
  defaultDrop?: string;
  /** Vehicle slug to preselect in the form. */
  defaultVehicle?: string;
  className?: string;
};

export function BookingForm({
  sourcePage,
  variant = "hero",
  defaultPickup = "",
  defaultDrop = "",
  defaultVehicle = "",
  className = "",
}: BookingFormProps) {
  const uid = useId();
  const [submitted, setSubmitted] = useState(false);
  const datetimeRef = useRef<HTMLInputElement | null>(null);

  const requireContact = variant === "contact";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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
    if (datetimeRef.current) {
      datetimeRef.current.min = toInputValue(new Date());
    }
  }, []);

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
      <div
        role="status"
        className={`border-ink/20 bg-paper rounded-md border p-6 text-center ${className}`}
      >
        <span className="bg-brass/20 text-ink mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full">
          <Check aria-hidden className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <p className="font-[family-name:var(--font-instrument-serif)] text-xl">
          Enquiry opened
        </p>
        <p className="text-stone mx-auto mt-2 max-w-sm text-sm leading-relaxed">
          WhatsApp should now be open with your trip details. Send the message and we will
          confirm your car on the same chat.
        </p>
        <Button variant="secondary" size="sm" className="mt-4" onClick={onReset}>
          Send another enquiry
        </Button>
      </div>
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
            // Assert the submit is at least the minimum time-to-submit after the
            // form appeared; the server rejects anything younger (or missing).
            startedAt: Date.now() - 3_000,
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
      className={`border-ink/20 bg-paper relative rounded-md border p-5 md:p-6 ${className}`}
    >
      <p className="eyebrow mb-4">Book your taxi</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor={`${uid}-pickup`}>
            Pickup location
          </label>
          <input
            id={`${uid}-pickup`}
            type="text"
            autoComplete="off"
            placeholder="Hotel, airport or landmark"
            className={inputClass}
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

        <div>
          <label className={labelClass} htmlFor={`${uid}-drop`}>
            Drop location
          </label>
          <input
            id={`${uid}-drop`}
            type="text"
            autoComplete="off"
            placeholder="Where are you going?"
            className={inputClass}
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

        <div>
          <label className={labelClass} htmlFor={`${uid}-datetime`}>
            Pickup date &amp; time
          </label>
          <input
            id={`${uid}-datetime`}
            type="datetime-local"
            className={inputClass}
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

        <div>
          <label className={labelClass} htmlFor={`${uid}-vehicle`}>
            Vehicle
          </label>
          <select
            id={`${uid}-vehicle`}
            className={inputClass}
            aria-invalid={errors.vehicle ? true : undefined}
            aria-describedby={errors.vehicle ? `${uid}-vehicle-error` : undefined}
            {...register("vehicle")}
          >
            <option value="">Select a vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.slug} value={vehicle.slug}>
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

        <div>
          <label className={labelClass} htmlFor={`${uid}-name`}>
            Name{requireContact ? "" : " (optional)"}
          </label>
          <input
            id={`${uid}-name`}
            type="text"
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
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

        <div>
          <label className={labelClass} htmlFor={`${uid}-phone`}>
            Phone{requireContact ? "" : " (optional)"}
          </label>
          <input
            id={`${uid}-phone`}
            type="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            className={inputClass}
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
      </div>

      {/* Honeypot — hidden from people and screen readers, tempting to bots. */}
      <div
        className="absolute left-[-9999px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor={`${uid}-website`}>Leave this field empty</label>
        <input
          id={`${uid}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <Button type="submit" className="mt-5 w-full" arrow>
        Book on WhatsApp
      </Button>
      <p className="text-stone mt-3 text-center text-xs leading-relaxed">
        Opens WhatsApp with your trip details. No payment online — confirm on chat or
        call.
      </p>
    </form>
  );
}
