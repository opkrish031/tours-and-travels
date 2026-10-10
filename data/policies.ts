// Fare and cancellation policies — client-confirmed before launch
export const fareIncludes = [
  "Car, driver, and fuel for the planned kilometres",
  "Driver allowance for the booked day or trip",
  "Parking at monument and hotel stops on the planned route",
] as const;

export const fareExcludes = [
  "Tolls and state entry tax, charged as per actual receipts",
  "Parking outside the planned stops, if any",
  "Entry tickets, meals, and personal expenses",
  "Any route change or extra kilometres beyond the estimate",
] as const;

export const cancellationPolicy =
  "Cancel free of charge up to six hours before the scheduled pickup. Inside that window a partial fare may apply because the driver and car are already held for you. Message us as soon as plans change and we will tell you what applies before anything is charged. We would rather move the date than lose the trip.";

export const policies = { fareIncludes, fareExcludes, cancellationPolicy };
