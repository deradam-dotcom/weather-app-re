import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_ROWS = ["1", "2", "3", "4", "5", "6", "7"];

export const CurrentConditionsSkeleton = () => (
  <section className="flex flex-col gap-3">
    <Skeleton className="h-4 w-24 bg-white/20" />
    <Skeleton className="h-12 w-36 bg-white/20" />
    <Skeleton className="h-5 w-28 bg-white/20" />
  </section>
);

export const ForecastListSkeleton = () => (
  <section>
    <Skeleton className="h-4 w-32 bg-white/20" />
    <ul className="mt-4 flex flex-col gap-3">
      {SKELETON_ROWS.map((id) => (
        <li key={id} className="flex items-center justify-between gap-2 py-1">
          <Skeleton className="h-4 w-16 bg-white/20" />
          <Skeleton className="h-4 w-14 bg-white/20" />
          <Skeleton className="h-4 w-24 bg-white/20" />
        </li>
      ))}
    </ul>
  </section>
);

export const ChartSkeleton = () => (
  <Skeleton className="h-44 w-full rounded-[var(--radius-card)] bg-white/15 md:h-64" />
);

type WeatherErrorProps = {
  onRetry: () => void;
};

export const WeatherError = ({ onRetry }: WeatherErrorProps) => (
  <div className="flex flex-col items-start gap-4 text-fg">
    <p>Nem sikerült betölteni az időjárást.</p>
    <button
      type="button"
      onClick={onRetry}
      className="rounded-md border border-white/60 px-4 py-2 text-sm text-fg transition-colors hover:bg-white/10"
    >
      Újra
    </button>
  </div>
);

type WeatherEmptyProps = {
  onChoose: () => void;
};

export const WeatherEmpty = ({ onChoose }: WeatherEmptyProps) => (
  <div className="flex flex-col items-start gap-4 text-fg">
    <p>Nincs kiválasztott város.</p>
    <button
      type="button"
      onClick={onChoose}
      className="rounded-md border border-white/60 px-4 py-2 text-sm text-fg transition-colors hover:bg-white/10"
    >
      Város választása
    </button>
  </div>
);
