import {BottomNavigation} from "@/components/bottom-navigation.tsx";
import {useState} from "react";
import {Globe, Plane, Smartphone} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import italy from "../../../../../public/assets/italy.jpeg"
import paris from "../../../../../public/assets/paris.webp"
import turkey from "../../../../../public/assets/Istanbul.jpg"
import moscow from "../../../../../public/assets/moscow.jpg"
import maldive from "../../../../../public/assets/maldive.avif"
import tojMahal from "../../../../../public/assets/taj-mahal.jpg"
import FlightSearch from "@/components/search-bar.tsx";
import Cards from "@/components/cards.tsx";
import {useTranslation} from "react-i18next";

export default function TravelPage() {
  const {t} = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("flights");

  const tabs = [
    {id: "flights", icon: Plane, label: t("all.Avia")},
    {id: "tours", icon: Globe, label: t("all.Tour")},
    {id: "esim", icon: Smartphone, label: t("all.eSim")},
  ];

  const cards = [
    {
      id: 1, discount: "12", image: turkey, name: "Turkey", price: "4 400 000 сум",
      description: t("all.All-inclusive mehmonxonalar, issiq dengiz va boy tarixiy obidalar")
    },
    {
      id: 2, discount: "18", image: maldive, name: "Maldive", price: "6 400 000 сум",
      description: t("all.Oq qumli plyajlar, kristal tiniq suv va romantik dam olish")
    },
    {
      id: 3, discount: "11", image: moscow, name: "Moscow", price: "5 200 000 сум",
      description: t("all.Zamonaviy shahar hayoti va mashhur tarixiy diqqatga sazovor joylar")
    },
    {
      id: 4, discount: "23", image: paris, name: "Paris", price: "8 500 000 сум",
      description: t("all.Muhabbat shahri, san’at, moda va unutilmas romantik muhit")
    },
    {
      id: 5, discount: "16", image: italy, name: "Italy", price: "5 500 000 сум",
      description: t("all.Mazali italyan taomlari, qadimiy shaharlar va dengiz manzaralari")
    },
    {
      id: 6, discount: "30", image: tojMahal, name: "Taj Mahal", price: "3 500 000 сум",
      description: t("all.Dunyo mo‘jizasi, boy madaniyat va tarixiy sayohat tajribasi")
    },
  ];


  return (
      <div className="min-h-screen bg-background px-2">
        <div className="container mx-auto max-w-xl md:max-w-5xl lg:max-w-6xl space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-6">{t("all.Travel")}</h1>

            <div className="flex gap-2">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;

                return (
                    <button
                        key={tab.id} onClick={() => setActiveTab(tab.id)}
                        className={cn("flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer",
                            isActive ? "bg-green-500 text-primary-foreground shadow-sm hover:bg-green-400" : "bg-gray-200 dark:bg-gray-500 text-secondary-foreground hover:bg-secondary/90"
                        )}
                    >
                      <Icon className="w-4 h-4"/>
                      <span>{tab.label}</span>
                    </button>
                );
              })}
            </div>
          </div>

          <section>
            {activeTab === "flights" && <FlightSearch/>}
            {activeTab === "tours" && (
                <div className="shadow-xl rounded-xl border border-gray-100 p-8 text-center">
                  <p className="text-muted-foreground">{t("all.Tours are coming soon")}</p>
                </div>
            )}
            {activeTab === "esim" && (
                <div className="shadow-xl rounded-xl border border-gray-100 p-8 text-center">
                  <p className="text-muted-foreground">{t("all.eSIMs are coming soon")}</p>
                </div>
            )}
          </section>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                {t("all.The cheapest tickets")}
              </h2>
              <p className="text-primary font-medium text-sm hover:underline">{t("all.Tashkent")}</p>
            </div>

            <Cards cards={cards} />
          </div>
        </div>

        <BottomNavigation/>
      </div>
  );
}