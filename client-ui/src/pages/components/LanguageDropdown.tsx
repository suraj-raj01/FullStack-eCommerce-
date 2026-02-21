import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Language = {
  code: string
  label: string
  flag: string
}

const languages: Language[] = [
  { code: "en", label: "English", flag: "US" },
  { code: "hi", label: "हिन्दी", flag: "IN" },
  { code: "fr", label: "Français", flag: "FR" },
]

export default function LanguageDropdown() {
  const [lang, setLang] = useState("en")

  const selectedLang = languages.find(l => l.code === lang)

  return (
    <Select value={lang} onValueChange={setLang}>
      <SelectTrigger className="w-fit ml-8 shadow-none border-1">
        <SelectValue>
          <span className="flex items-center gap-2">
            <span>{selectedLang?.flag}</span>
            <span className="hidden sm:inline">
              {selectedLang?.label}
            </span>
          </span>
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center w-fit gap-1">
              <span>{language.flag}</span>
              <span>{language.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

