import { useEffect, useState } from "react";

export const usePromoCard = (isOpen: boolean) => {
  const [showPromoCard, setShowPromoCard] = useState(false);
  const [promoCardClosed, setPromoCardClosed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowPromoCard(true);
        setPromoCardClosed(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (promoCardClosed && !isOpen) {
      const timer = setTimeout(() => {
        setShowPromoCard(true);
        setPromoCardClosed(false);
      }, 20000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [promoCardClosed, isOpen]);

  return {
    showPromoCard,
    setShowPromoCard,
    promoCardClosed,
    setPromoCardClosed,
  };
};
