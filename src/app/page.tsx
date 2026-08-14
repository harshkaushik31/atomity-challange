// src/app/page.tsx (temporary test — will be replaced in step 7)
"use client";

import { useApiData } from "@/hooks/useApiData";
import { useEffect } from "react";

export default function Home() {
  const { data, isLoading, isError, error, isFetching } = useApiData();

  useEffect(() => {
    console.log({ data, isLoading, isError, error, isFetching });
  }, [data, isLoading, isError, error, isFetching]);

  if (isLoading) return <main>Loading...</main>;
  if (isError) return <main>Error: {(error as Error).message}</main>;

  return (
    <main>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}