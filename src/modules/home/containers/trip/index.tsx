import {useGetQuery} from "@/hooks/api";
import {addDays, format, parse} from "date-fns";
import {useLocation, useNavigate} from "react-router-dom";
import {cn} from "@/lib/utils.ts";
import {get} from "lodash";
import {FlightCard} from "@/components/flight-card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {FlightCardSkeleton} from "@/components/card-skeleton.tsx";
import {ArrowLeftRight, CalendarDays, RefreshCcw, SearchX} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useTranslation} from "react-i18next";
import TripPageSearch from "@/components/trip-page-drawer.tsx";

const Index = () => {
  const {t} = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const initialParams = location.state?.params;

  const currentSelectedDateStr = initialParams?.["segments[0][date]"];
  const currentSelectedDate = currentSelectedDateStr
      ? parse(currentSelectedDateStr, "dd.MM.yyyy", new Date())
      : new Date();

  const {data, isLoading} = useGetQuery({
    url: "/api/my-agent/search-for-recommendations",
    params: initialParams,
    queryProps: {
      queryKey: ["flights", initialParams],
      enabled: !!initialParams,
    },
  });

  const flights = get(data, "data.data.flights", []) || [];

  const handleDateChange = (newDate: Date) => {
    const formattedDate = format(newDate, "dd.MM.yyyy");
    if (formattedDate === currentSelectedDateStr) return;
    const updatedParams = {...initialParams, "segments[0][date]": formattedDate};
    navigate(location.pathname, {state: {params: updatedParams}, replace: true});
  };

  return (
      <div className="bg-background min-h-screen pb-10 transition-colors duration-300">
        <div className="bg-card border-b sticky top-14 z-20 p-2 md:py-3 shadow-sm">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="bg-muted rounded-xl">
              <ArrowLeftRight className="w-4 h-4 rotate-180" />
            </Button>

            <div className="flex-1 bg-muted/50 rounded-xl px-4 py-2 flex flex-col items-center justify-center overflow-hidden">
              <div className="flex items-center gap-2 text-sm font-bold truncate">
                <span>{initialParams?.["segments[0][from]"]}</span>
                <ArrowLeftRight className="w-3 h-3 text-muted-foreground" />
                <span>{initialParams?.["segments[0][to]"]}</span>
              </div>
              <p className="text-[10px] text-muted-foreground truncate">
                {currentSelectedDateStr}, {initialParams?.adt} {t("all.turist")}
              </p>
            </div>

            <TripPageSearch
                onSearch={(newParams: any) => {
                  navigate(location.pathname, { state: { params: newParams }, replace: true });
                }}
            />
          </div>
        </div>

        <div className="bg-card border-b sticky top-30 md:top-32 z-10 p-2 shadow-sm rounded-b-2xl">
          <div className="max-w-4xl mx-auto flex justify-center gap-2 overflow-x-auto no-scrollbar">
            {isLoading ? (
                Array.from({length: 3}).map((_, i) => (
                    <Skeleton key={i} className="h-[72px] min-w-[120px] rounded-xl"/>
                ))
            ) : (
                [-1, 0, 1].map((offset) => {
                  const date = addDays(currentSelectedDate, offset);
                  const dateStr = format(date, "dd.MM.yyyy");
                  const isActive = offset === 0;

                  return (
                      <button key={dateStr} disabled={isActive}
                              onClick={() => handleDateChange(date)}
                              className={cn("flex-1 min-w-[110px] p-3 rounded-xl border-2 transition-all text-center",
                                  isActive ? "border-green-500 bg-green-500/10 text-primary cursor-default"
                                      : "border-muted bg-card hover:border-accent hover:bg-accent text-muted-foreground"
                              )}
                      >
                        <p className={cn("text-xs font-bold capitalize", isActive && "text-primary")}>
                          {format(date, "d MMMM")}
                        </p>
                        <p className="text-[10px] opacity-70">
                          {isActive ? t("all.Tanlangan") : t("all.O'tish")}
                        </p>
                      </button>
                  );
                })
            )}
          </div>
        </div>

        <div className="max-w-2xl mx-auto mt-6 px-2 space-y-4">
          {isLoading ? (
              Array.from({length: 4}).map((_, i) => (
                  <FlightCardSkeleton key={i}/>
              ))
          ) : flights.length > 0 ? (
              flights.map((flight: any) => (
                  <FlightCard key={flight.id} flight={flight}/>
              ))
          ) : (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-in fade-in zoom-in duration-500">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-green-500/10 dark:bg-green-500/5 blur-3xl rounded-full"/>
                  <div className="relative bg-card border border-border p-6 rounded-full shadow-sm">
                    <SearchX className="h-12 w-12 text-muted-foreground opacity-50"/>
                  </div>
                  <div
                      className="absolute -top-1 -right-1 bg-background border border-border p-2 rounded-full shadow-xs">
                    <CalendarDays className="h-4 w-4 text-green-500"/>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("all.Parvozlar topilmadi")}
                </h3>
                <p className="text-muted-foreground max-w-[300px] text-sm leading-relaxed mb-8">
                  {t("all.Tanlangan sana uchun hech qanday reys topilmadi Iltimos, boshqa sanani tanlab ko'ring yoki qidiruv parametrlarini o'zgartiring")}
                </p>

                <Button variant="outline" onClick={() => navigate("/")}
                    className="rounded-2xl gap-2 font-bold hover:bg-green-500/10 hover:text-green-600 dark:hover:text-green-400 transition-all"
                >
                  <RefreshCcw className="h-4 w-4"/>
                  {t("all.Boshqa sana tanlash")}
                </Button>
              </div>
          )}
        </div>
      </div>
  );
};

export default Index;