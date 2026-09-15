"use client";

import {
  ChevronRightIcon,
  MessageCircleIcon,
  PlayIcon,
  RotateCcwIcon,
  SearchIcon,
  SendIcon,
} from "lucide-react";
import { type FormEvent, useMemo, useState } from "react";

const categories = ["Getting Started", "Search", "Market Insights", "CRM", "CMA"];

const videos = [
  {
    category: "Getting Started",
    color: "bg-sky-100",
    image: "/support/vid1.jpg",
    title: "Navigating the iRealty Dashboard",
  },
  {
    category: "Search",
    color: "bg-orange-100",
    image: "/support/vid2.jpg",
    title: "How to Search for Properties with AI",
  },
  {
    category: "Market Insights",
    color: "bg-purple-100",
    image: "/support/vid3.jpg",
    title: "Understanding Market Insights",
  },
  {
    category: "CRM",
    color: "bg-emerald-100",
    image: "/support/vid4.jpg",
    title: "How to Upload Your First Property",
  },
  {
    category: "CMA",
    color: "bg-rose-100",
    image: "/support/vid5.jpg",
    title: "How to Create a CMA Report",
  },
];

const suggestions = [
  "I need help with…",
  "I found an issue with…",
  "I’d like to request a new feature for…",
  "Question about my account or billing…",
];

type ChatMessage = { sender: "user" | "support"; text: string };

export function SupportPanel() {
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const visibleVideos = useMemo(
    () =>
      videos.filter(
        (video) =>
          (selectedCategories.length === 0 || selectedCategories.includes(video.category)) &&
          video.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [query, selectedCategories],
  );

  const toggleCategory = (category: string) => {
    setSelectedCategories((selected) =>
      selected.includes(category)
        ? selected.filter((item) => item !== category)
        : [...selected, category],
    );
  };

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();
    const text = message.trim();
    if (!text) return;
    setMessages((current) => [...current, { sender: "user", text }]);
    setMessage("");
  };

  return (
    <main className="h-full overflow-y-auto bg-muted/30 px-4 py-20 text-foreground sm:px-6">
      <div className="mx-auto flex min-h-full w-full max-w-4xl flex-col overflow-hidden rounded-xl border bg-background shadow-sm">
        <header className="flex h-16 shrink-0 items-center border-b px-6">
          <div>
            <h1 className="font-semibold text-lg">Support</h1>
            <p className="text-muted-foreground text-xs">Find help or send us a message.</p>
          </div>
        </header>

        <section className="shrink-0 border-b">
          <div className="flex items-center gap-2 border-b px-5 py-4 font-semibold text-sm">
            <PlayIcon className="size-5 fill-current" />
            Quick help videos
          </div>
          <div className="space-y-3 p-4">
                <div className="relative">
                  <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    className="h-10 w-full rounded-lg border bg-muted/50 pr-10 pl-9 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search videos…"
                    value={query}
                  />
                  {(query || selectedCategories.length > 0) ? (
                    <button
                      aria-label="Clear video search"
                      className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:bg-accent"
                      onClick={() => {
                        setQuery("");
                        setSelectedCategories([]);
                      }}
                      type="button"
                    >
                      <RotateCcwIcon className="size-4" />
                    </button>
                  ) : null}
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
                  {categories.map((category) => {
                    const selected = selectedCategories.includes(category);
                    return (
                      <button
                        className={`shrink-0 rounded-full border px-3 py-1.5 text-xs transition-colors ${selected ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:bg-accent"}`}
                        key={category}
                        onClick={() => toggleCategory(category)}
                        type="button"
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none]">
                  {visibleVideos.length ? visibleVideos.map((video) => (
                    <button className="w-44 shrink-0 text-left" key={video.title} type="button">
                      <img alt="" className="h-24 w-44 rounded-lg object-cover" src={video.image} />
                      <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${video.color}`}>{video.category}</span>
                      <span className="mt-1 block line-clamp-2 text-xs font-medium leading-4">{video.title}</span>
                    </button>
                  )) : <p className="py-8 text-sm text-muted-foreground">No videos match your search.</p>}
                </div>
          </div>
        </section>

        <section className="flex min-h-0 flex-1 flex-col bg-muted/40">
          <div className="flex items-center gap-2 border-b bg-background px-5 py-4 font-semibold text-sm">
            <MessageCircleIcon className="size-5" />
            Contact
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
                <div className="mb-5 flex flex-col items-center text-center">
                  <img alt="Support team" className="mb-2 size-12 rounded-full object-cover" src="/support/lordMarshy.png" />
                  <p className="font-semibold text-sm">Message support 👋</p>
                  <p className="mt-1 text-xs text-muted-foreground">We reply within one business day.</p>
                </div>
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center gap-2">
                    {suggestions.map((suggestion) => (
                      <button
                        className="max-w-full rounded-full border bg-background px-3 py-2 text-left text-xs transition-colors hover:bg-accent"
                        key={suggestion}
                        onClick={() => setMessage(suggestion)}
                        type="button"
                      >
                        {suggestion}
                        <ChevronRightIcon className="ml-1 inline size-3" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((chatMessage, index) => (
                      <div className="flex" key={`${chatMessage.text}-${index}`}>
                        <p className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${chatMessage.sender === "user" ? "ml-auto rounded-br-none bg-primary text-primary-foreground" : "rounded-bl-none bg-background"}`}>{chatMessage.text}</p>
                      </div>
                    ))}
                  </div>
                )}
          </div>
          <form className="flex gap-2 border-t bg-background p-3" onSubmit={sendMessage}>
                <input
                  className="h-10 min-w-0 flex-1 rounded-lg border bg-muted/50 px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Type a message…"
                  value={message}
                />
                <button aria-label="Send message" className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90" type="submit">
                  <SendIcon className="size-4" />
                </button>
          </form>
        </section>
      </div>
    </main>
  );
}
