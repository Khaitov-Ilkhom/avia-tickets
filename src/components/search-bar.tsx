import {useState} from "react";
import {format} from "date-fns";
import {useForm, Controller} from "react-hook-form";
import {
  Calendar as CalendarIcon,
  Users, Minus, Plus,
  PlaneTakeoff, PlaneLanding,
  ArrowLeftRight, Search, X
} from "lucide-react";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {GLOBAL_AIRPORTS} from "@/db-aerports/aerports.ts";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export default function AviaSearchBar() {
  const {t} = useTranslation();
  const navigate = useNavigate();

  const {control, handleSubmit, setValue, watch} = useForm({
    defaultValues: {
      origin: null as any,
      destination: null as any,
      departureDate: new Date(),
      returnDate: undefined as Date | undefined,
      passengers: {adult: 1, child: 0}
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

    navigate("/fly-results", { state: { params: searchParams } });
  };

  const handleSwitch = () => {
    const temp = formValues.origin;
    setValue("origin", formValues.destination);
    setValue("destination", temp);
  };

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-7xl mx-auto p-2">
        <div className="bg-white/30  lg:bg-green-500 p-2 rounded-2xl shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-2 relative">

            <div className="lg:col-span-3 relative">
              <Controller
                  name="origin"
                  control={control}
                  render={({field}) => (
                      <AirportSelector
                          placeholder={t("all.Qayerdan")}
                          icon={<PlaneTakeoff className="w-5 h-5"/>}
                          side="left"
                          value={field.value}
                          onChange={field.onChange}
                      />
                  )}
              />

              <Button type="button" onClick={handleSwitch} size="icon" variant="ghost"
                  className="absolute right-4 lg:-right-4 top-[110%] md:top-1/2 md:-right-5 md:rotate-90 lg:rotate-0 lg:top-1/2 -translate-y-1/2 lg:bg-white lg:shadow-md rounded-full z-20 h-8 w-8 text-green-500 bg-white shadow-lg border border-slate-100"
              >
                <ArrowLeftRight className="w-4 h-4 rotate-90 lg:rotate-0"/>
              </Button>
            </div>

            <div className="lg:col-span-3 mt-1 lg:mt-0">
              <Controller
                  name="destination"
                  control={control}
                  render={({field}) => (
                      <AirportSelector
                          placeholder={t("all.Qayerga")}
                          icon={<PlaneLanding className="w-5 h-5"/>}
                          side="right"
                          value={field.value}
                          onChange={field.onChange}
                      />
                  )}
              />
            </div>

            <div className="md:col-span-2 lg:col-span-3 grid grid-cols-2 gap-1">
              <Controller
                  name="departureDate"
                  control={control}
                  render={({field}) => (
                      <DateSelector
                          label={t("all.Jo'nash")}
                          date={field.value}
                          setDate={field.onChange}
                          minDate={new Date()}
                      />
                  )}
              />
              <Controller
                  name="returnDate"
                  control={control}
                  render={({field}) => (
                      <DateSelector
                          label={t("all.Qaytish")}
                          date={field.value}
                          setDate={field.onChange}
                          minDate={formValues.departureDate || new Date()}
                          isClearable
                      />
                  )}
              />
            </div>

            <div className="lg:col-span-2">
              <Controller
                  name="passengers"
                  control={control}
                  render={({field}) => (
                      <PassengerSelector value={field.value} onChange={field.onChange}/>
                  )}
              />
            </div>

            <div className="lg:col-span-1">
              <Button type="submit"
                      className="h-16 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl lg:rounded-r-xl lg:rounded-l-none font-bold text-lg shadow-lg transition-all active:scale-95">
                <Search className="lg:hidden mr-2 w-5 h-5"/> {t("all.Search")}
              </Button>
            </div>

          </div>
        </div>
      </form>
  );
}

export function AirportSelector({placeholder, icon, side, value, onChange}: any) {
  const {t} = useTranslation();
  const [open, setOpen] = useState(false);

  return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline"
              className={cn("h-16 w-full justify-between items-center rounded-xl lg:rounded-none border-none bg-slate-100 lg:bg-white dark:!bg-white/80 text-left px-4",
                  side === 'left' && "lg:rounded-l-xl", !value && "text-muted-foreground"
              )}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <span className="text-green-500 shrink-0">{icon}</span>
              <div className="flex flex-col items-start overflow-hidden">
                <span className="text-[10px] uppercase font-bold text-muted-foreground">{placeholder}</span>
                <span className="font-bold text-sm text-black truncate w-full">
                {value ? `${value.city}` : t("all.Shahar tanlang")}
              </span>
              </div>
            </div>
            {value && <span className="font-mono text-xs font-bold text-slate-400 ml-2 mr-4">{value.code}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[320px] p-0" align="start">
          <Command>
            <CommandInput placeholder={t("all.Shahar yoki davlat")}/>
            <CommandList className="max-h-[220px]">
              <CommandEmpty>{t("all.Topilmadi")}</CommandEmpty>
              <CommandGroup heading={t("all.Davlatlar va shaharlar")}>
                {GLOBAL_AIRPORTS.map((air) => (
                    <CommandItem key={air.code}
                        onSelect={() => {onChange(air); setOpen(false)}}
                        className="flex items-center justify-between py-3 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-100 p-2 rounded-full"><PlaneTakeoff className="w-4 h-4 text-slate-500"/></div>
                        <div className="flex flex-col">
                          <span className="font-bold">{air.city} <span className="text-slate-400 font-normal">{air.code}</span></span>
                          <span className="text-xs text-slate-400">{air.country}</span>
                        </div>
                      </div>
                    </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
  );
}

export function DateSelector({label, date, setDate, minDate, isClearable}: any) {
  const {t} = useTranslation();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
      <div className="relative group">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-16 px-1 flex-col items-start justify-center rounded-xl lg:rounded-none border-none bg-slate-100 lg:bg-white dark:!bg-white/80 w-full">
              <span className="text-[10px] uppercase text-muted-foreground font-bold">{label}</span>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-green-500 dark:text-gray-600"/>
                <span className="font-semibold text-sm dark:text-gray-600">
                {date instanceof Date ? format(date, "dd MMM, yyyy") : t("all.Sana tanlang")}
              </span>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d) => d < today || (minDate && d < minDate)}
                initialFocus
            />
          </PopoverContent>
        </Popover>
        {isClearable && date && (
            <button
                type="button"
                onClick={() => setDate(null)}
                className="absolute right-2 top-1/4 -translate-y-1/2 p-1 bg-slate-200 rounded-full hover:bg-slate-300 transition-colors"
            >
              <X className="w-3 h-3 text-slate-600"/>
            </button>
        )}
      </div>
  );
}

export function PassengerSelector({value, onChange}: any) {
  const {t} = useTranslation();
  const update = (type: string, val: number) => {
    onChange({...value, [type]: Math.max(type === 'adult' ? 1 : 0, value[type] + val)});
  };

  return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-16 w-full flex-col items-start justify-center rounded-xl lg:rounded-none border-none bg-slate-100 lg:bg-white dark:!bg-white/80">
            <span className="text-[10px] uppercase text-muted-foreground font-bold">{t("all.Yo'lovchilar")}</span>
            <div className="flex items-center gap-2 overflow-hidden">
              <Users className="w-4 h-4 text-green-500 dark:text-gray-600"/>
              <span className="font-semibold text-sm truncate dark:text-gray-600">
              {value.adult + value.child} {t("all.yo'lovchi")}
            </span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-4">
          <div className="space-y-4">
            <PassengerRow title={t("all.Kattalar")} sub="12 yoshdan yuqori" val={value.adult} onAdd={() => update('adult', 1)}
                          onSub={() => update('adult', -1)}/>
            <PassengerRow title={t("all.Bolalar")} sub="2-11 yosh" val={value.child} onAdd={() => update('child', 1)}
                          onSub={() => update('child', -1)}/>
          </div>
        </PopoverContent>
      </Popover>
  );
}

export function PassengerRow({title, sub, val, onAdd, onSub}: any) {
  const {t} = useTranslation();
  return (
      <div className="flex items-center justify-between">
        <div className="flex flex-col text-left">
          <span className="font-bold text-sm">{title}</span>
          <span className="text-[10px] text-muted-foreground">{sub}</span>
        </div>
        <div className="flex items-center gap-3">
          <Button type="button" size="icon" variant="outline" className="h-8 w-8 rounded-full text-green-500"
                  onClick={onSub} disabled={val <= (title === t("all.Kattalar") ? 1 : 0)}><Minus className="w-4 h-4"/></Button>
          <span className="font-bold w-4 text-center">{val}</span>
          <Button type="button" size="icon" variant="outline" className="h-8 w-8 rounded-full text-green-500"
                  onClick={onAdd}><Plus className="w-4 h-4"/></Button>
        </div>
      </div>
  );
}