import React from "react";
import { BarLoader } from "react-spinners";
import { useTheme } from "@/providers/theme/theme-provider.tsx";

const SuspenseLoading: React.FC = () => {
  const { theme } = useTheme();
  return (
    <div className={"h-full w-full flex justify-center items-center"}>
      <BarLoader
        speedMultiplier={1.2}
        color={theme === "dark" ? "#fff" : "#000"}
        height={7} loading={true}
        cssOverride={{borderRadius: 10}} width="350px"
        aria-label="Loading Spinner" data-testid="loader"
      />
    </div>
  );
};

export default SuspenseLoading;
