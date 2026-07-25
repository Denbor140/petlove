import { WorkDay } from "@/types/friends";

export default function getWorkDay(
  workDays: WorkDay[] | null | undefined,
): string {
  if (!workDays || workDays.length === 0) {
    return "Day and night";
  }

  const openDay = workDays.find((day) => day.isOpen && day.from && day.to);

  return openDay ? `${openDay.from} - ${openDay.to}` : "Day and night";
}
