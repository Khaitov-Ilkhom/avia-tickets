import {useState} from "react";
import {Check} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {
  DrawerTrigger, Drawer, DrawerContent,
  DrawerHeader, DrawerTitle, DrawerDescription,
} from "@/components/ui/drawer.tsx";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select.tsx";
import {useIsMobile} from "@/hooks/use-mobile.ts";
import {useTranslation} from "react-i18next";
import {toast} from "sonner";
import {useLanguageStore} from "@/store/languageStore.ts";
import {find, get} from "lodash";

const languagesToDisplay = [
  {value: "uz", label: "Uzbek", flag: "🇺🇿"},
  {value: "ru", label: "Russian", flag: "🇷🇺"},
  {value: "en", label: "English", flag: "🇺🇸"},
];

const LanguagePicker = () => {
  const {t} = useTranslation();
  const {lang, setLanguage} = useLanguageStore();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const handleChangeLanguage = (langCode: string) => {
    if (langCode === lang) return;

    setLanguage(langCode);
    toast.success(t("language.Successfully"), {description: t("language.Language changed successfully")});

    if (isMobile) setOpen(false);
  };

  const getFlagForLocale = (locale: string) => {
    const languageData = find(languagesToDisplay, {value: locale});
    return get(languageData, "flag", "");
  };

  return (
      <>
        {isMobile ? (
            <Drawer open={open} onOpenChange={setOpen} direction="bottom">
              <DrawerTrigger asChild>
                <Button variant="ghost" className="p-1 size-8">
                  <span className="text-xl">{getFlagForLocale(lang)}</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="px-5 !rounded-t-3xl pb-5">
                <DrawerHeader>
                  <DrawerTitle>{t("language.Select language")}</DrawerTitle>
                  <DrawerDescription>{t("language.You can change language")}</DrawerDescription>
                </DrawerHeader>

                <ul className="space-y-1">
                  {languagesToDisplay.map((item) => (
                      <li key={item.value}>
                        <Button
                            variant={lang === item.value ? "secondary" : "ghost"}
                            className={cn("w-full justify-start gap-3 h-10")}
                            onClick={() => handleChangeLanguage(item.value)}
                        >
                          <span>{item.flag}</span>
                          <span>{item.label}</span>
                          <Check
                              className={cn(
                                  "ml-auto h-4 w-4",
                                  lang === item.value ? "opacity-100" : "opacity-0"
                              )}
                          />
                        </Button>
                      </li>
                  ))}
                </ul>
              </DrawerContent>
            </Drawer>
        ) : (
            <Select value={lang} onValueChange={handleChangeLanguage}>
              <SelectTrigger className="w-9 p-0 flex justify-center  bg-transparent" iconClassName="hidden">
                <SelectValue><span className="text-xl">{getFlagForLocale(lang)}</span></SelectValue>
              </SelectTrigger>
              <SelectContent className="min-w-40">
                {languagesToDisplay.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                <span className="flex items-center gap-2">
                  <span>{item.flag}</span>
                  <span>{item.label}</span>
                </span>
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
        )}
      </>
  );
};

export default LanguagePicker;