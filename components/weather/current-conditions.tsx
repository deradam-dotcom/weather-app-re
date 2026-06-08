type CurrentConditionsProps = {
  cityName: string;
  temperature: string;
  condition: string;
  onCityClick?: () => void;
};

export function CurrentConditions({
  cityName,
  temperature,
  condition,
  onCityClick,
}: CurrentConditionsProps) {
  return (
    <section className="flex flex-col">
      <button
        type="button"
        onClick={onCityClick}
        className="w-fit cursor-pointer text-sm text-fg-muted transition-opacity hover:opacity-80"
      >
        {cityName}
      </button>
      <p className="mt-1 text-5xl font-light text-fg-strong md:text-6xl">
        {temperature} °C
      </p>
      <p className="mt-2 text-lg text-fg">{condition}</p>
    </section>
  );
}
