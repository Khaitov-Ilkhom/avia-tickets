import React from "react";
import ThemeProvider from "./theme/theme-provider.tsx";
import QueryProvider from "./query/query-provider.tsx";
import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}

const Index: React.FC<Props> = ({ children }) => {

  return (
      <ThemeProvider defaultTheme="light" themeStorageKey="vite-ui-theme">
        <QueryProvider>
          {children}
          <Toaster richColors position="top-right"
              mobileOffset={10} duration={2000} closeButton
          />
        </QueryProvider>
      </ThemeProvider>
  );
};

export default Index;
