import clsx from "clsx";

export const Spinner = ({ className }: { className?: string }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={clsx(
          "border-white-500 h-5 w-5 animate-spin rounded-full border border-solid border-t-transparent",
          className
        )}
      ></div>
    </div>
  );
};
