import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Info, Plane, ShieldCheck, XCircle } from "lucide-react";
import { cn } from "@/lib/utils.ts";
import {useTranslation} from "react-i18next";

export function FlightCard({ flight }: { flight: any }) {
  const {t} = useTranslation();
  const segment = flight.segments[0];
  const basePrice = flight.price.UZS.amount;
  const extraBaggageOption = flight.extra_baggage?.[0];
  const baggagePrice = extraBaggageOption?.price?.UZS?.amount || 0;

  const [isBaggageAdded, setIsBaggageAdded] = useState(false);
  const totalPrice = isBaggageAdded ? basePrice + baggagePrice : basePrice;

  return (
      <div className="bg-card text-card-foreground rounded-3xl p-5 shadow-sm border border-border group hover:shadow-md transition-all">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-black text-primary dark:text-green-500">
              {totalPrice.toLocaleString()} UZS
            </h3>
            <p className="text-xs text-muted-foreground font-medium">
              {t("all.Ruchnaya klad")} {segment.cbaggage?.weight} {segment.cbaggage?.weight_unit}
              {flight.is_baggage && `, Bagaj ${segment.baggage?.weight || '23'} kg`}
            </p>
          </div>
          <div className="text-right">
            <div className="bg-white p-1 rounded-md inline-block">
              <img src={`https://images.kiwi.com/airlines/64/${segment.carrier.code}.png`}
                  alt={segment.carrier.title}
                  className="h-8 object-contain"
              />
            </div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
              {segment.carrier.title}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center relative py-2">
          <div className="flex flex-col">
            <span className="text-xl font-bold">{segment.dep.time}</span>
            <span className="text-xs font-bold text-muted-foreground">{segment.dep.airport.code}</span>
          </div>
          <div className="flex-1 flex flex-col items-center px-4">
          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
            {t("all.V puti")} {segment.duration.flight.hour}h {segment.duration.flight.minute}m
          </span>
            <div className="w-full h-[2px] bg-border relative my-2">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2">
                <span className="text-[10px] text-primary dark:text-green-500 font-bold italic whitespace-nowrap">{t("all.Pryamoy reys")}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-xl font-bold">{segment.arr.time}</span>
            <span className="text-xs font-bold text-muted-foreground">{segment.arr.airport.code}</span>
          </div>
        </div>

        {(
            <div className="mt-4 p-3 bg-muted/50 rounded-2xl flex justify-between items-center border border-dashed border-border">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground">{t("all.Qo'shimcha bagaj")} {segment.baggage?.weight ? segment.baggage?.weight : "0"}</span>
                <span className="text-[10px] text-green-500 font-bold">+{baggagePrice.toLocaleString()} UZS</span>
              </div>
              <Switch checked={isBaggageAdded}
                  onCheckedChange={setIsBaggageAdded}
                  className="data-[state=checked]:bg-green-500"
              />
            </div>
        )}

        <Dialog>
          <DialogTrigger asChild>
            <button className="w-full mt-4 py-3 bg-green-500 hover:bg-green-500/80 text-white rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2">
              <Info size={16} />
              {t("all.Batafsil ma'lumot")}
            </button>
          </DialogTrigger>

          <DialogContent className="max-w-md rounded-3xl bg-card border-border">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-foreground">
                <Plane className="text-primary dark:text-green-500" />
                {t("all.Parvoz tafsilotlari")}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 pt-4">
              <div className="flex justify-between items-center p-4 bg-muted rounded-2xl border border-border">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">{t("all.Reys raqami")}</p>
                  <p className="font-bold text-foreground">{segment.carrier.code} {segment.flight_number}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">{t("all.Samolyot")}</p>
                  <p className="font-bold text-foreground">{segment.aircraft.title}</p>
                </div>
              </div>

              <div className="relative space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border">
                <div className="relative flex gap-4 pl-8">
                  <div className="absolute left-0 top-1 w-6 h-6 bg-card border-2 border-primary dark:border-green-500 rounded-full z-10" />
                  <div>
                    <p className="text-sm font-black text-foreground">{segment.dep.time} — {segment.dep.city.title}</p>
                    <p className="text-xs text-muted-foreground">{segment.dep.airport.title} {segment.dep.terminal && `(Terminal ${segment.dep.terminal})`}</p>
                  </div>
                </div>
                <div className="relative flex gap-4 pl-8">
                  <div className="absolute left-0 top-1 w-6 h-6 bg-card border-2 border-muted-foreground rounded-full z-10" />
                  <div>
                    <p className="text-sm font-black text-foreground">{segment.arr.time} — {segment.arr.city.title}</p>
                    <p className="text-xs text-muted-foreground">{segment.arr.airport.title}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className={cn("p-3 rounded-2xl flex items-center gap-2 border transition-colors",
                    segment.is_refund ? "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400"
                        : "bg-destructive/10 border-destructive/20 text-destructive"
                )}>
                  {segment.is_refund ? <ShieldCheck size={18} /> : <XCircle size={18} />}
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold uppercase opacity-70">{t("all.Qaytarish")}</span>
                    <span className="text-xs font-bold">{segment.is_refund ? t("all.Mavjud") : t("all.Yo'q")}</span>
                  </div>
                </div>

                <div className={cn("p-3 rounded-2xl flex items-center gap-2 border transition-colors",
                    segment.is_change ? "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400"
                        : "bg-destructive/10 border-destructive/20 text-destructive"
                )}>
                  {segment.is_change ? <ShieldCheck size={18} /> : <XCircle size={18} />}
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold uppercase opacity-70">{t("all.O'zgartirish")}</span>
                    <span className="text-xs font-bold">{segment.is_change ? t("all.Mavjud") : t("all.Yo'q")}</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-4 bg-green-500 dark:bg-green-600 hover:opacity-90 text-primary-foreground font-bold rounded-2xl shadow-lg transition-all active:scale-95">
                {t("all.Sotib olish")} — {totalPrice.toLocaleString()} UZS
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
  );
}