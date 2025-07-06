export const StarRating = ({
  value,
  max = 5,
}: {
  value: number;
  max?: number;
}) => {
  const stars = Array.from({ length: max }, (_, i) => (
    <span
      key={i}
      className={i < value ? "text-neo-orange" : "text-neo-gray-400"}
    >
      ★
    </span>
  ));

  return (
    <div className="flex items-center gap-neo-sm">
      <span className="text-base text-neo-black">
        {value}/{max}
      </span>
      <div className="flex">{stars}</div>
    </div>
  );
};
