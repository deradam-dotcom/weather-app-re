type CurrentConditionsProps = {
  cityName: string;
  temperature: string;
  condition: string;
  onCityClick?: () => void;
};

export const CurrentConditions = ({
  cityName,
  temperature,
  condition,
  onCityClick,
}: CurrentConditionsProps) => {
  return (
    <section className="flex flex-col">
      <button
        type="button"
        onClick={onCityClick}
        className="w-fit cursor-pointer text-sm text-fg-muted hover:underline"
      >
        {cityName}
      </button>
      <p className="mt-1 text-[48px] font-light text-fg-strong">
        {temperature} °C
      </p>
      <p className="mt-2 text-[16px] text-fg">{condition}</p>
    </section>
  );
};
