"use client";

import { FormEvent, useState } from "react";
import { VkPostSyncResult } from "@/types/vk-post";

export default function VkPostsSyncPanel() {
  const [secret, setSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VkPostSyncResult | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/admin/vk-posts/sync", {
        method: "POST",
        headers: secret ? { "x-vk-sync-secret": secret } : undefined,
      });
      const payload = (await response.json()) as VkPostSyncResult;

      if (!response.ok) {
        setError(payload.message || "Не удалось обновить VK-посты.");
        return;
      }

      setResult(payload);
    } catch {
      setError("Не удалось выполнить запрос на обновление VK-постов.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[#dce6ee] bg-white p-6 shadow-sm"
    >
      <div className="mb-5">
        <h1 className="text-2xl font-semibold text-[#0d191b]">
          Обновление VK-постов
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[#52616d]">
          Этот экран уже подключен к сохранению постов в Sanity. Реальную
          загрузку из VK нужно добавить в функцию{" "}
          <code className="rounded bg-[#eef3f8] px-1.5 py-0.5">
            loadVkPostsForImport
          </code>
          .
        </p>
      </div>

      <label className="mb-4 block">
        <span className="mb-1 block text-sm font-medium text-[#0d191b]">
          Секрет обновления
        </span>
        <input
          value={secret}
          onChange={(event) => setSecret(event.target.value)}
          type="password"
          className="w-full rounded-lg border border-[#dce6ee] px-3 py-2 text-sm outline-none transition focus:border-[#0077ff]"
          placeholder="VK_SYNC_SECRET"
        />
      </label>

      <button
        type="submit"
        disabled={isLoading}
        className="rounded-lg bg-[#0077ff] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0067dd] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Обновляем..." : "Обновить VK-посты"}
      </button>

      {result && (
        <div className="mt-5 rounded-lg bg-[#edf8f1] p-4 text-sm text-[#166534]">
          {result.message} Импортировано: {result.imported}. Пропущено:{" "}
          {result.skipped}.
        </div>
      )}

      {error && (
        <div className="mt-5 rounded-lg bg-[#fff1f2] p-4 text-sm text-[#be123c]">
          {error}
        </div>
      )}
    </form>
  );
}
