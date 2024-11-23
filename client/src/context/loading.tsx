import { createContext, useContext, useState } from "react";

const LoadingContext = createContext<{ loading: boolean; setLoading: React.Dispatch<React.SetStateAction<boolean>> }>({
  loading: false,
  setLoading: () => {},
});

export const useLoading =() => useContext(LoadingContext);

export default function LoadingProvider({ children }: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}