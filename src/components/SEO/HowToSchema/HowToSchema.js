import React from 'react'
import { WEBSITE_URL, PHONE_NUMBER, BUSINESS_NAME_ML } from 'consts/contactDetails'

export function HowToSchema({ language, schemaType = 'ordering' }) {
  // Using schemaType instead of articleType to maintain interface compatibility
  const schemas = {
    ordering: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": language === 'pl' 
        ? "Jak zamówić bramę kutą lub balustradę - przewodnik krok po kroku"
        : "How to Order a Wrought Iron Gate or Railing - Step by Step Guide",
      "description": language === 'pl'
        ? "Kompletny przewodnik zamówienia wyrobu kowalskiego - od kontaktu po montaż. Poznaj proces realizacji bramy kutej, balustrady lub ogrodzenia w Pracowni Kowalstwa Artystycznego."
        : "Complete guide to ordering blacksmith products - from contact to installation. Learn the process of creating wrought iron gates, railings or fences at our Artistic Blacksmithing Workshop.",
      "image": `${WEBSITE_URL}/images/anvil_2.webp`,
      "totalTime": "PT4W", // 4 weeks total process
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "PLN",
        "value": language === 'pl' ? "Wycena indywidualna" : "Individual quote"
      },
      "supply": [
        {
          "@type": "HowToSupply",
          "name": language === 'pl' ? "Pomiary miejsca montażu" : "Installation site measurements"
        },
        {
          "@type": "HowToSupply", 
          "name": language === 'pl' ? "Projekt koncepcyjny" : "Conceptual design"
        },
        {
          "@type": "HowToSupply",
          "name": language === 'pl' ? "Materiały stalowe S235/S355" : "Steel materials S235/S355"
        }
      ],
      "tool": [
        {
          "@type": "HowToTool",
          "name": language === 'pl' ? "Profesjonalny sprzęt kowalski" : "Professional blacksmithing equipment"
        },
        {
          "@type": "HowToTool",
          "name": language === 'pl' ? "Urządzenia do montażu" : "Installation equipment"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": language === 'pl' ? "Kontakt i konsultacja" : "Contact and consultation",
          "text": language === 'pl'
            ? `Skontaktuj się z nami telefonicznie pod numerem ${PHONE_NUMBER} lub poprzez formularz kontaktowy. Omówimy Twoje potrzeby, styl architektoniczny budynku i preferencje wzornicze.`
            : `Contact us by phone at ${PHONE_NUMBER} or through our contact form. We'll discuss your needs, building's architectural style and design preferences.`,
          "url": `${WEBSITE_URL}/contact/`,
          "image": `${WEBSITE_URL}/images/workbench.png`
        },
        {
          "@type": "HowToStep", 
          "position": 2,
          "name": language === 'pl' ? "Pomiary i wizja lokalna" : "Measurements and site visit",
          "text": language === 'pl'
            ? "Umówimy się na wizytę w celu wykonania precyzyjnych pomiarów. Podczas spotkania omówimy szczegóły techniczne, materiały i opcje wykończenia."
            : "We'll schedule a visit for precise measurements. During the meeting we'll discuss technical details, materials and finishing options.",
          "url": `${WEBSITE_URL}/contact/`,
          "image": `${WEBSITE_URL}/images/anvil_2.webp`
        },
        {
          "@type": "HowToStep",
          "position": 3, 
          "name": language === 'pl' ? "Projekt i wycena" : "Design and quote",
          "text": language === 'pl'
            ? "Przygotujemy indywidualny projekt 3D oraz szczegółową wycenę. Uwzględnimy wszystkie Twoje wymagania oraz specyfikę miejsca montażu."
            : "We'll prepare an individual 3D design and detailed quote. We'll consider all your requirements and installation site specifics.",
          "image": `${WEBSITE_URL}/images/anvil_2.webp`
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": language === 'pl' ? "Zatwierdzenie i zaliczka" : "Approval and deposit", 
          "text": language === 'pl'
            ? "Po zatwierdzeniu projektu i wyceny, wpłacasz zaliczkę (zwykle 50% wartości zamówienia). Od tego momentu rozpoczynamy realizację."
            : "After approving the design and quote, you pay a deposit (usually 50% of order value). We begin production from this moment.",
          "image": `${WEBSITE_URL}/images/anvil_2.webp`
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": language === 'pl' ? "Wykonanie w kuźni" : "Blacksmith production",
          "text": language === 'pl' 
            ? "Rozpoczynamy proces kucia w naszej pracowni. Czas realizacji wynosi 2-4 tygodnie w zależności od złożoności projektu. Informujemy o postępach prac."
            : "We begin the forging process in our workshop. Production time is 2-4 weeks depending on project complexity. We keep you informed of progress.",
          "image": `${WEBSITE_URL}/images/anvil_2.webp`
        },
        {
          "@type": "HowToStep",
          "position": 6,
          "name": language === 'pl' ? "Powierzchnia i zabezpieczenia" : "Surface treatment and protection",
          "text": language === 'pl'
            ? "Gotowy wyrób cynkujemy ogniowo i malujemy proszkowo lub lakierujemy. Zapewnia to długotrwałą ochronę przed korozją i piękny wygląd na lata."
            : "The finished product is hot-dip galvanized and powder coated or painted. This ensures long-lasting corrosion protection and beautiful appearance for years.",
          "image": `${WEBSITE_URL}/images/anvil_2.webp`
        },
        {
          "@type": "HowToStep",
          "position": 7,
          "name": language === 'pl' ? "Montaż i odbiór" : "Installation and handover",
          "text": language === 'pl'
            ? "Nasz zespół montażowy przyjeżdża w umówionym terminie i przeprowadza profesjonalną instalację. Po montażu przekazujemy dokumenty gwarancyjne i instrukcję konserwacji."
            : "Our installation team arrives at the agreed time and performs professional installation. After installation we provide warranty documents and maintenance instructions.",
          "url": `${WEBSITE_URL}/contact/`,
          "image": `${WEBSITE_URL}/images/anvil_2.webp`
        }
      ],
      "yield": language === 'pl'
        ? "Profesjonalnie wykonana brama kuta, balustrada lub ogrodzenie z 5-letnią gwarancją"
        : "Professionally crafted wrought iron gate, railing or fence with 5-year warranty",
      // Enhanced with business context
      "provider": {
        "@type": "LocalBusiness",
        "name": BUSINESS_NAME_ML[language],
        "telephone": PHONE_NUMBER,
        "url": WEBSITE_URL
      },
      "potentialAction": {
        "@type": "ContactAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${WEBSITE_URL}/contact/`,
          "inLanguage": language
        },
        "name": language === 'pl' ? "Zamów bramę kutą" : "Order wrought iron gate"
      }
    },

    maintenance: {
      "@context": "https://schema.org", 
      "@type": "HowTo",
      "name": language === 'pl'
        ? "Jak konserwować wyroby kute - przewodnik pielęgnacji"
        : "How to Maintain Wrought Iron Products - Care Guide",
      "description": language === 'pl'
        ? "Praktyczny przewodnik konserwacji bram kutych, balustrad i ogrodzeń. Poznaj sposoby zachowania pięknego wyglądu i długowieczności wyrobów kowalskich."
        : "Practical maintenance guide for wrought iron gates, railings and fences. Learn how to preserve beautiful appearance and longevity of blacksmith products.",
      "image": `${WEBSITE_URL}/images/anvil_2.webp`,
      "totalTime": "PT2H", // 2 hours annually
      "supply": [
        {
          "@type": "HowToSupply",
          "name": language === 'pl' ? "Miękka ściereczka" : "Soft cloth"
        },
        {
          "@type": "HowToSupply",
          "name": language === 'pl' ? "Woda z mydłem" : "Soapy water"
        },
        {
          "@type": "HowToSupply",
          "name": language === 'pl' ? "Farba antykorozyjna (w razie potrzeby)" : "Anti-corrosion paint (if needed)"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": language === 'pl' ? "Regularne czyszczenie" : "Regular cleaning",
          "text": language === 'pl'
            ? "Wyroby kute czyść regularnie miękką ściereczką i wodą z mydłem. Unikaj środków ściernych i wybielających, które mogą uszkodzić powłokę ochronną."
            : "Clean wrought iron products regularly with a soft cloth and soapy water. Avoid abrasive and bleaching agents that may damage the protective coating."
        },
        {
          "@type": "HowToStep",
          "position": 2, 
          "name": language === 'pl' ? "Inspekcja powierzchni" : "Surface inspection",
          "text": language === 'pl'
            ? "Raz w roku dokładnie obejrzyj powierzchnię w poszukiwaniu zarysowań lub uszkodzeń powłoki. Szczególną uwagę zwróć na miejsca narażone na działanie warunków atmosferycznych."
            : "Once a year thoroughly inspect the surface for scratches or coating damage. Pay special attention to areas exposed to weather conditions."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": language === 'pl' ? "Konserwacja powłoki" : "Coating maintenance", 
          "text": language === 'pl'
            ? "W przypadku drobnych uszkodzeń powłoki, natychmiast zabezpiecz miejsce farbą antykorozyjną. Większe naprawy powierz profesjonalistom."
            : "In case of minor coating damage, immediately protect the area with anti-corrosion paint. Entrust major repairs to professionals."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": language === 'pl' ? "Konserwacja zawiasów" : "Hinge maintenance",
          "text": language === 'pl'
            ? "Zawiasy bram należy smarować co najmniej raz w roku. Użyj smaru grafitowego lub specjalnego środka do mechanizmów zewnętrznych."
            : "Gate hinges should be lubricated at least once a year. Use graphite grease or special outdoor mechanism lubricant."
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": language === 'pl' ? "Przegląd profesjonalny" : "Professional inspection",
          "text": language === 'pl'
            ? "Co 5-7 lat warto zlecić profesjonalny przegląd i ewentualne odnowienie powłoki lakierniczej, aby zachować optymalną ochronę przed korozją."
            : "Every 5-7 years it's worth ordering a professional inspection and potential renewal of the paint coating to maintain optimal corrosion protection."
        }
      ],
      "yield": language === 'pl'
        ? "Długotrwała ochrona i piękny wygląd wyrobów kutych przez wiele lat"
        : "Long-lasting protection and beautiful appearance of wrought iron products for many years"
    }
  }

  const schema = schemas[schemaType]
  if (!schema) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default HowToSchema