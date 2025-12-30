import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { format } from "date-fns";
import { ArrowLeftRight, PlaneLanding, PlaneTakeoff, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AirportSelector, DateSelector, PassengerSelector } from "@/components/search-bar";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile.ts";

export default function TripPageSearch({ onSearch }: any) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      origin: null,
      destination: null,
      departureDate: new Date(),
      passengers: { adult: 1, child: 0 }
    }
  });

  const formValues = watch();

  const onSubmit = (formData: any) => {
    const searchParams = {
      "segments[0][from]": formData.origin?.code,
      "segments[0][to]": formData.destination?.code,
      "segments[0][date]": formData.departureDate ? format(formData.departureDate, "dd.MM.yyyy") : null,
      "adt": formData.passengers.adult,
      "chd": formData.passengers.child,
      "class": "e",
      "lang": "ru"
    };
    onSearch(searchParams);
    setOpen(false);
  };

  const handleSwitch = () => {
    const temp = formValues.origin;
    setValue("origin", formValues.destination);
    setValue("destination", temp);
  };

  const FormContent = (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 md:p-0">
        <div className="grid grid-cols-1 gap-3">
          <div className="relative flex flex-col gap-2">
            <Controller
                name="origin"
                control={control}
                render={({ field }) => (
                    <AirportSelector
                        placeholder={t("all.Qayerdan")}
                        icon={<PlaneTakeoff className="w-5 h-5" />}
                        value={field.value}
                        onChange={field.onChange}
                        side="left"
                    />
                )}
            />
            {/* Switch button position improved */}
            <div className="absolute right-4 top-[50%] -translate-y-[50%] z-[30] md:static md:translate-y-0 md:flex md:justify-center md:-my-4">
              <Button
                  type="button"
                  onClick={handleSwitch}
                  size="icon"
                  className="h-8 w-8 rounded-full bg-orange-500 text-white shadow-lg border-none hover:bg-orange-600 active:scale-90 transition-transform"
              >
                <ArrowLeftRight className="w-4 h-4 rotate-90" />
              </Button>
            </div>
            <Controller
                name="destination"
                control={control}
                render={({ field }) => (
                    <AirportSelector
                        placeholder={t("all.Qayerga")}
                        icon={<PlaneLanding className="w-5 h-5" />}
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Controller
                name="departureDate"
                control={control}
                render={({ field }) => (
                    <DateSelector
                        label={t("all.Jo'nash")}
                        date={field.value}
                        setDate={field.onChange}
                        minDate={new Date()}
                    />
                )}
            />
            <Controller
                name="passengers"
                control={control}
                render={({ field }) => (
                    <PassengerSelector value={field.value} onChange={field.onChange} />
                )}
            />
          </div>

          <Button type="submit" className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg mt-2">
            {t("all.Saqlash")}
          </Button>
        </div>
      </form>
  );

  if (!isMobile) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="bg-muted hover:bg-muted/80 rounded-xl h-10 w-10 shrink-0">
              <Pencil className="w-4 h-4 text-slate-600" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px] p-6 rounded-3xl overflow-visible">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">{t("all.Qidiruvni tahrirlash")}</DialogTitle>
            </DialogHeader>
            {FormContent}
          </DialogContent>
        </Dialog>
    );
  }

  return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="bg-muted hover:bg-muted/80 rounded-xl h-10 w-10 shrink-0">
            <Pencil className="w-4 h-4 text-slate-600" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="px-4 pb-10 rounded-t-[32px] max-h-[96vh]">
          <div className="overflow-y-auto px-1" style={{ WebkitOverflowScrolling: 'touch' }}>
            <h2 className="text-xl font-bold my-4 px-4">{t("all.Qidiruvni tahrirlash")}</h2>
            {FormContent}
          </div>
        </DrawerContent>
      </Drawer>
  );
}