import { useEffect, useState, useRef } from "react";
import { Flame, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {useTranslation} from "react-i18next";

export default function Cards({ cards }: { cards: any[] }) {
  const {t} = useTranslation();
  const extendedCards = [...cards, ...cards, ...cards];
  const [currentIndex, setCurrentIndex] = useState(cards.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const CARD_WIDTH = 280;
  const GAP = 16;
  const TOTAL_WIDTH = CARD_WIDTH + GAP;

  function resetTimeout() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {handleNext()}, 4000);
    return () => resetTimeout();
  }, [currentIndex]);

  const handleTransitionEnd = () => {
    if (currentIndex >= cards.length * 2) {
      setIsTransitioning(false);
      setCurrentIndex(cards.length);
    } else if (currentIndex < cards.length) {
      setIsTransitioning(false);
      setCurrentIndex(cards.length * 2 - 1);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {setIsTransitioning(true)});
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  return (
      <div className="w-full max-w-[1240px] mx-auto px-2 py-10 overflow-hidden relative group">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-white">
          <Flame className="text-orange-500 fill-orange-500" size={28} />
          {t("all.Qaynoq takliflar")}
        </h2>

        <div className="relative">
          <div className={cn("flex", isTransitioning ? "transition-transform duration-500 ease-out" : "transition-none")}
              style={{transform: `translateX(-${currentIndex * TOTAL_WIDTH}px)`}}
              onTransitionEnd={handleTransitionEnd}
          >
            {extendedCards.map((card, idx) => (
                <div key={idx} style={{ width: `${CARD_WIDTH}px` }} className="flex-shrink-0 mr-4">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group/card cursor-pointer flex flex-col h-[420px]">
                    <div className="relative h-[240px] w-full overflow-hidden shrink-0">
                      <img src={card.image} alt={card.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                      <div className="absolute top-3 left-3">
                    <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg">
                      <Flame size={12} fill="white" /> {card.discount}%
                    </span>
                      </div>
                      <div className="absolute bottom-3 left-3 text-white">
                        <p className="text-[10px] text-slate-300 font-bold uppercase">{t("all.Price")}</p>
                        <p className="text-xl font-black leading-none">{card.price}</p>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex items-center gap-1 text-green-600 mb-1">
                          <MapPin size={12} />
                          <span className="text-[10px] font-extrabold uppercase tracking-tighter">
                        {card.country || t("all.Xalqaro")}
                      </span>
                        </div>
                        <h3 className="font-bold text-slate-800 dark:text-white group-hover/card:text-blue-600 transition-colors line-clamp-1 text-sm">
                          {card.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed dark:text-white">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
            ))}
          </div>

          <button onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg text-slate-800 hover:bg-green-600 hover:text-white transition-all z-30 -ml-4 border border-slate-100 hidden lg:block"
          ><ChevronLeft size={24} /></button>
          <button onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg text-slate-800 hover:bg-green-600 hover:text-white transition-all z-30 -mr-4 border border-slate-100 hidden lg:block"
          ><ChevronRight size={24} /></button>
        </div>

        <div className="flex justify-center gap-1.5 my-6">
          {cards.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentIndex(cards.length + idx)}
                  className={cn("h-1.5 rounded-full transition-all duration-300",
                      (currentIndex % cards.length) === idx ? "w-8 bg-green-600" : "w-2 bg-slate-300"
                  )}
              />
          ))}
        </div>
      </div>
  );
}