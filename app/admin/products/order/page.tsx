"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type ProductRow = {
  id: string;
  title: string;
  slug: string;
  sortOrder: number;
  thumbnail?: string | null;
  mainImage?: string | null;
  updatedAt: string;
};

function getImageSrc(p: ProductRow): string | null {
  const src = p.thumbnail || p.mainImage;
  if (!src) return null;
  return src;
}

function SortableItem({
  product,
  index,
}: {
  product: ProductRow;
  index: number;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: product.id });

  const imgSrc = getImageSrc(product);

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={
        "flex items-center justify-between gap-3 rounded-md border border-stone-200 bg-white px-3 py-2 " +
        (isDragging ? "shadow-md" : "")
      }
    >
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          className="cursor-grab select-none rounded border border-stone-200 bg-stone-50 px-2 py-1 text-sm text-stone-600 active:cursor-grabbing"
          {...attributes}
          {...listeners}
          aria-label="Drag handle"
          title="Перетащить"
        >
          ::
        </button>

        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md border border-stone-200 bg-stone-50">
          {imgSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imgSrc}
              alt={product.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : null}
        </div>

        <div className="min-w-0">
          <div className="truncate font-medium text-stone-800">
            {index + 1}. {product.title}
          </div>
          <div className="truncate text-xs text-stone-500">{product.slug}</div>
        </div>
      </div>

      <div className="text-xs text-stone-500 shrink-0">{product.sortOrder}</div>
    </div>
  );
}

export default function ProductOrderAdminPage() {
  const router = useRouter();
  const [items, setItems] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError(null);
      setSuccess(null);
      try {
        const res = await fetch("/api/admin/products/order", {
          method: "GET",
          headers: { "content-type": "application/json" },
        });
        if (!res.ok) throw new Error(`Failed to load (${res.status})`);
        const json = (await res.json()) as { products: ProductRow[] };
        if (!alive) return;
        setItems(json.products ?? []);
      } catch (e) {
        if (!alive) return;
        setError(e instanceof Error ? e.message : "Failed to load");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const ids = useMemo(() => items.map((x) => x.id), [items]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setItems((prev) => {
      const oldIndex = prev.findIndex((x) => x.id === active.id);
      const newIndex = prev.findIndex((x) => x.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  async function save() {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = {
        order: items.map((x, idx) => ({ id: x.id, sortOrder: idx })),
      };

      const res = await fetch("/api/admin/products/order", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`Save failed (${res.status}): ${txt}`);
      }

      setItems((prev) => prev.map((x, idx) => ({ ...x, sortOrder: idx })));
      setSuccess("Сохранено");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-background-light px-6 py-10">
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="mb-3 inline-flex items-center gap-2 rounded-md border border-stone-200 bg-white px-3 py-1.5 text-sm text-stone-700 hover:bg-stone-50"
              aria-label="Назад в админку"
              title="Назад"
            >
              ←<span>Админка</span>
            </button>
            <h1 className="text-2xl font-serif text-stone-800">
              Порядок товаров
            </h1>
            <p className="mt-2 text-sm text-stone-500">
              Перетаскивай товары мышью. Затем нажми «Сохранить».
            </p>
          </div>

          <button
            type="button"
            onClick={save}
            disabled={loading || saving}
            className={
              "rounded-md px-4 py-2 text-sm font-medium text-white " +
              (loading || saving
                ? "bg-stone-400"
                : "bg-primary hover:bg-primary/90")
            }
          >
            {saving ? "Сохраняю…" : "Сохранить"}
          </button>
        </div>

        {error ? (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="mt-4 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
            {success}
          </div>
        ) : null}

        {loading ? (
          <div className="mt-6 text-sm text-stone-500">Загрузка…</div>
        ) : (
          <div className="mt-6">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={ids}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col gap-2">
                  {items.map((p, idx) => (
                    <SortableItem key={p.id} product={p} index={idx} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        )}

        <div className="mt-8 text-xs text-stone-500">
          URL: <code>/admin/products/order</code>
        </div>
      </div>
    </main>
  );
}
