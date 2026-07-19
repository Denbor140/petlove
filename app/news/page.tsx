"use client";

import NewsList from "@/components/NewsList/NewsList";
import Pagination from "@/components/Pagination/Pagination";
import Title from "@/components/Title/Title";
import { getNews, GetNewsResponse } from "@/lib/api/clientApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const PER_PAGE = 6;

export default function NewsPage() {
  const [page, setPage] = useState(1);

  const { data } = useQuery<GetNewsResponse>({
    queryKey: ["news", page],
    queryFn: () => getNews({ page, perPage: PER_PAGE }),
    refetchOnMount: false,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return (
    <main>
      <div className="container">
        <Title title="News" marginBottom="20px" />
        <NewsList news={data?.results ?? []} />
        <Pagination
          pageCount={data ? Math.ceil(data.totalPages / PER_PAGE) : 1}
          page={page}
          onPageChange={setPage}
        />
      </div>
    </main>
  );
}
