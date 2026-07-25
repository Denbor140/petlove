"use client";

import NewsList from "@/components/NewsList/NewsList";
import Pagination from "@/components/Pagination/Pagination";
import SearchField from "@/components/SearchField/SearchField";
import Title from "@/components/Title/Title";
import { getNews, GetNewsResponse } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const LIMIT = 6;

export default function NewsPage() {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const { data } = useQuery<GetNewsResponse>({
    queryKey: ["news", page, searchText],
    queryFn: () => getNews({ keyword: searchText, page, limit: LIMIT }),
    refetchOnMount: false,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const handleSearch = (value: string) => {
    setSearchText(value);
    setPage(1);
  };

  return (
    <main>
      <div className="container">
        <Title title="News" marginBottom="20px" />
        <SearchField keyword={searchText} onSearch={handleSearch} />
        <NewsList news={data?.results ?? []} />
        <Pagination
          pageCount={data?.totalPages ?? 1}
          page={page}
          onPageChange={setPage}
        />
      </div>
    </main>
  );
}
