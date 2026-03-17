"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type CartItemKind = "product" | "art";

export type CartItem = {
  id: string;
  kind: CartItemKind;
  title: string;
  price: number;
  image?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartContextValue = {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  addedModalOpen: boolean;
  addedModalSecondsLeft: number;
  notifyAdded: () => void;
  closeAddedModal: () => void;
  lastAddedItem: CartItem | null;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "ceramic_cart_v1";

function safeParseCart(raw: string | null): CartState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as CartState;
    if (!parsed || !Array.isArray(parsed.items)) return null;
    return {
      items: parsed.items
        .filter((i) => i && typeof i.id === "string")
        .map((i) => ({
          id: String(i.id),
          kind: (i.kind === "art" ? "art" : "product") as CartItemKind,
          title: String(i.title ?? ""),
          price: Number(i.price ?? 0),
          image: typeof i.image === "string" ? i.image : undefined,
          quantity: Math.max(1, Number(i.quantity ?? 1)),
        })),
    };
  } catch {
    return null;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>({ items: [] });
  const [hydrated, setHydrated] = useState(false);
  const [addedModalOpen, setAddedModalOpen] = useState(false);
  const [addedModalSecondsLeft, setAddedModalSecondsLeft] = useState(2);
  const addedIntervalRef = useRef<number | null>(null);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);

  useEffect(() => {
    const fromStorage = safeParseCart(window.localStorage.getItem(STORAGE_KEY));
    if (fromStorage) setState(fromStorage);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const closeAddedModal = useCallback(() => {
    setAddedModalOpen(false);
    setAddedModalSecondsLeft(2);
    if (addedIntervalRef.current != null) {
      window.clearInterval(addedIntervalRef.current);
      addedIntervalRef.current = null;
    }
  }, []);

  const notifyAdded = useCallback(() => {
    if (addedIntervalRef.current != null) {
      window.clearInterval(addedIntervalRef.current);
      addedIntervalRef.current = null;
    }

    setAddedModalOpen(true);
    setAddedModalSecondsLeft(2);

    addedIntervalRef.current = window.setInterval(() => {
      setAddedModalSecondsLeft((s) => {
        if (s <= 1) {
          window.setTimeout(() => {
            setAddedModalOpen(false);
            setAddedModalSecondsLeft(2);
          }, 0);
          if (addedIntervalRef.current != null) {
            window.clearInterval(addedIntervalRef.current);
            addedIntervalRef.current = null;
          }
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      if (addedIntervalRef.current != null) {
        window.clearInterval(addedIntervalRef.current);
        addedIntervalRef.current = null;
      }
    };
  }, []);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
      const qty = Math.max(1, quantity);
      setState((prev) => {
        const existingIndex = prev.items.findIndex((i) => i.id === item.id);
        if (existingIndex === -1) {
          setLastAddedItem({ ...item, quantity: qty });
          return {
            items: [...prev.items, { ...item, quantity: qty }],
          };
        }
        const next = [...prev.items];
        const updated: CartItem = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + qty,
        };
        next[existingIndex] = updated;
        setLastAddedItem(updated);
        return { items: next };
      });
    },
    [],
  );

  const removeItem = useCallback((id: string) => {
    setState((prev) => ({ items: prev.items.filter((i) => i.id !== id) }));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    const qty = Math.max(1, quantity);
    setState((prev) => ({
      items: prev.items.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
    }));
  }, []);

  const clear = useCallback(() => {
    setState({ items: [] });
  }, []);

  const totalQuantity = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items],
  );

  const totalPrice = useMemo(
    () => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [state.items],
  );

  const value: CartContextValue = useMemo(
    () => ({
      items: state.items,
      totalQuantity,
      totalPrice,
      addItem,
      removeItem,
      setQuantity,
      clear,
      addedModalOpen,
      addedModalSecondsLeft,
      notifyAdded,
      closeAddedModal,
      lastAddedItem,
    }),
    [
      state.items,
      totalQuantity,
      totalPrice,
      addItem,
      removeItem,
      setQuantity,
      clear,
      addedModalOpen,
      addedModalSecondsLeft,
      notifyAdded,
      closeAddedModal,
      lastAddedItem,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
