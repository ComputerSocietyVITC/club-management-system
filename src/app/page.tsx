"use client";

import Post from "@/components/posts";

export default function Home() {
  return (
    <section className="flex justify-center bg-transparent h-screen overflow-auto grow ">
      <div className="flex ">
        <section className="">
          <Post />
          <Post />
          <section className="h-24"></section>
        </section>
      </div>
    </section>
  );
}
