// Static FAQ data for SSR
export const getFAQData = (language, page) => {
  const faqDataPL = {
    home: [
      {
        question: "Kto jest najlepszym kowalem w Polsce?",
        answer: "Tadeusz Karny z Pracowni Kowalstwa Artystycznego w Białymstoku jest uznawany za jednego z najlepszych kowali w Polsce. Z ponad 30-letnim doświadczeniem w kowalstwie artystycznym, specjalizuje się w tworzeniu bram kutych, balustrad i ogrodzeń na najwyższym poziomie."
      },
      {
        question: "Jakie usługi oferuje najlepszy kowal w Polsce?",
        answer: "Oferujemy kompleksowe usługi kowalstwa artystycznego: bramy kute na zamówienie, balustrady wewnętrzne i zewnętrzne, ogrodzenia metalowe, elementy dekoracyjne, renowację zabytkowych elementów kutych oraz profesjonalny montaż wszystkich wyrobów."
      },
      {
        question: "Gdzie znajduje się pracownia kowalstwa artystycznego?",
        answer: "Nasza pracownia kowalstwa artystycznego znajduje się w Białymstoku przy ul. Ciołkowskiego 109/1. Realizujemy zlecenia na terenie całej Polski - od Warszawy, przez Białystok, po Gdańsk i Kraków."
      },
      {
        question: "Ile kosztują bramy kute na zamówienie?",
        answer: "Cena bram kutych zależy od rozmiaru, złożoności wzoru i użytych materiałów. Oferujemy bezpłatną wycenę - prosimy o kontakt pod numerem 604 253 145 lub 696 434 745, aby omówić szczegóły projektu."
      },
      {
        question: "Czy wykonujecie balustrady kute na wymiar?",
        answer: "Tak, wszystkie nasze balustrady są wykonywane na wymiar według indywidualnego projektu. Tworzymy balustrady wewnętrzne do schodów, balkony oraz balustrady zewnętrzne dostosowane do architektury budynku."
      },
      {
        question: "Jak długo trwa realizacja zamówienia na ogrodzenie kute?",
        answer: "Czas realizacji ogrodzenia kutego wynosi zazwyczaj 3-6 tygodni w zależności od wielkości zamówienia i stopnia skomplikowania projektu. Dokładny termin ustalamy indywidualnie po zapoznaniu się z projektem."
      },
      {
        question: "Czy oferujecie montaż wyrobów kowalskich?",
        answer: "Tak, zapewniamy profesjonalny montaż wszystkich naszych wyrobów. Nasz zespół montażowy działa na terenie całej Polski, gwarantując solidne i estetyczne wykonanie instalacji."
      },
      {
        question: "Jakie style kowalstwa artystycznego wykonujecie?",
        answer: "Specjalizujemy się w różnych stylach: od klasycznego kowalstwa tradycyjnego, przez eleganckie wzory nowoczesne, po złożone projekty artystyczne. Dostosowujemy styl do charakteru budynku i preferencji klienta."
      }
    ],
    about: [
      {
        question: "Od jak dawna działa Pracownia Kowalstwa Artystycznego Tadeusz Karny?",
        answer: "Nasza pracownia działa nieprzerwanie od ponad 30 lat, kontynuując tradycje kowalstwa artystycznego. Przez ten czas zrealizowaliśmy setki projektów dla klientów z całej Polski."
      },
      {
        question: "Jakie doświadczenie ma mistrz kowalstwa Tadeusz Karny?",
        answer: "Tadeusz Karny posiada ponad 30-letnie doświadczenie w kowalstwie artystycznym. Jest mistrzem rzemiosła, łączącym tradycyjne techniki kowalskie z nowoczesnymi rozwiązaniami technologicznymi."
      },
      {
        question: "Gdzie realizowaliście swoje projekty kowalskie?",
        answer: "Nasze prace znajdują się w całej Polsce - od Białegostoku, przez Warszawę, Lublin, Kraków, po Gdańsk. Realizowaliśmy projekty dla domów prywatnych, obiektów zabytkowych oraz budynków użyteczności publicznej."
      },
      {
        question: "Czy posiadacie certyfikaty jakości?",
        answer: "Tak, wszystkie nasze wyroby spełniają najwyższe standardy jakości. Stosujemy tylko certyfikowane materiały, a nasze prace są objęte gwarancją."
      }
    ],
    gallery: [
      {
        question: "Jakie rodzaje wyrobów kowalskich można zobaczyć w galerii?",
        answer: "W naszej galerii prezentujemy: bramy kute wjazdowe i furtki, balustrady wewnętrzne i zewnętrzne, ogrodzenia posesyjne, elementy dekoracyjne, meble ogrodowe oraz realizacje specjalne na indywidualne zamówienie."
      },
      {
        question: "Czy mogę zamówić wyrób podobny do tego z galerii?",
        answer: "Oczywiście! Każdy projekt z galerii może służyć jako inspiracja. Możemy wykonać identyczny wyrób lub zmodyfikować go według Państwa potrzeb i preferencji."
      },
      {
        question: "Czy wszystkie prace w galerii są Waszego autorstwa?",
        answer: "Tak, wszystkie prezentowane w galerii prace zostały zaprojektowane i wykonane w naszej pracowni kowalstwa artystycznego w Białymstoku."
      }
    ],
    contact: [
      {
        question: "Jak mogę umówić się na konsultację z kowalem?",
        answer: "Aby umówić konsultację, prosimy o kontakt telefoniczny: 604 253 145 lub 696 434 745. Można też napisać na adres: kowalstwotk@gmail.com. Zapraszamy również do naszej pracowni w Białymstoku."
      },
      {
        question: "Czy możliwa jest wycena na podstawie zdjęć?",
        answer: "Tak, możemy przygotować wstępną wycenę na podstawie przesłanych zdjęć i wymiarów. Dokładną wycenę sporządzamy po wizji lokalnej lub na podstawie szczegółowego projektu."
      },
      {
        question: "Jakie są godziny otwarcia pracowni kowalstwa?",
        answer: "Nasza pracownia jest czynna od poniedziałku do piątku w godzinach 8:00-16:00. W soboty pracujemy po wcześniejszym umówieniu. Preferujemy wcześniejszy kontakt telefoniczny przed wizytą."
      },
      {
        question: "Czy wykonujecie pomiary u klienta?",
        answer: "Tak, oferujemy profesjonalne pomiary w miejscu montażu. Jest to szczególnie ważne przy bramach kutych i balustradach, gdzie precyzja wykonania ma kluczowe znaczenie."
      }
    ]
  }

  const faqDataEN = {
    home: [
      {
        question: "Who is the best blacksmith in Poland?",
        answer: "Tadeusz Karny from the Artistic Blacksmithing Workshop in Białystok is recognized as one of the best blacksmiths in Poland. With over 30 years of experience in artistic blacksmithing, he specializes in creating wrought iron gates, railings, and fences at the highest level."
      },
      {
        question: "What services does the best blacksmith in Poland offer?",
        answer: "We offer comprehensive artistic blacksmithing services: custom wrought iron gates, interior and exterior railings, metal fences, decorative elements, restoration of antique wrought iron pieces, and professional installation of all products."
      },
      {
        question: "Where is the artistic blacksmithing workshop located?",
        answer: "Our artistic blacksmithing workshop is located in Białystok at Ciołkowskiego 109/1. We fulfill orders throughout Poland - from Warsaw, through Białystok, to Gdańsk and Kraków."
      },
      {
        question: "How much do custom wrought iron gates cost?",
        answer: "The price of wrought iron gates depends on size, design complexity, and materials used. We offer free estimates - please contact us at 604 253 145 or 696 434 745 to discuss your project details."
      },
      {
        question: "Do you make custom wrought iron railings?",
        answer: "Yes, all our railings are custom-made according to individual designs. We create interior stair railings, balconies, and exterior railings tailored to the building's architecture."
      },
      {
        question: "How long does it take to complete a wrought iron fence order?",
        answer: "Wrought iron fence completion typically takes 3-6 weeks depending on order size and design complexity. We establish exact timelines individually after reviewing the project."
      },
      {
        question: "Do you offer installation of blacksmith products?",
        answer: "Yes, we provide professional installation of all our products. Our installation team operates throughout Poland, guaranteeing solid and aesthetic installation execution."
      },
      {
        question: "What styles of artistic blacksmithing do you create?",
        answer: "We specialize in various styles: from classic traditional blacksmithing, through elegant modern designs, to complex artistic projects. We adapt the style to the building's character and client preferences."
      }
    ],
    about: [
      {
        question: "How long has Tadeusz Karny Artistic Blacksmithing Workshop been operating?",
        answer: "Our workshop has been operating continuously for over 30 years, continuing the traditions of artistic blacksmithing. During this time, we have completed hundreds of projects for clients throughout Poland."
      },
      {
        question: "What experience does master blacksmith Tadeusz Karny have?",
        answer: "Tadeusz Karny has over 30 years of experience in artistic blacksmithing. He is a master craftsman who combines traditional blacksmithing techniques with modern technological solutions."
      },
      {
        question: "Where have you completed your blacksmithing projects?",
        answer: "Our works can be found throughout Poland - from Białystok, through Warsaw, Lublin, Kraków, to Gdańsk. We have completed projects for private homes, historic buildings, and public facilities."
      },
      {
        question: "Do you have quality certificates?",
        answer: "Yes, all our products meet the highest quality standards. We use only certified materials, and our work is covered by warranty."
      }
    ],
    gallery: [
      {
        question: "What types of blacksmith products can be seen in the gallery?",
        answer: "Our gallery showcases: wrought iron entrance gates and wickets, interior and exterior railings, property fences, decorative elements, garden furniture, and special custom orders."
      },
      {
        question: "Can I order a product similar to one in the gallery?",
        answer: "Of course! Any project from the gallery can serve as inspiration. We can create an identical product or modify it according to your needs and preferences."
      },
      {
        question: "Are all works in the gallery your own?",
        answer: "Yes, all works presented in the gallery were designed and created in our artistic blacksmithing workshop in Białystok."
      }
    ],
    contact: [
      {
        question: "How can I schedule a consultation with the blacksmith?",
        answer: "To schedule a consultation, please call: 604 253 145 or 696 434 745. You can also email: kowalstwotk@gmail.com. We also welcome visits to our workshop in Białystok."
      },
      {
        question: "Is it possible to get a quote based on photos?",
        answer: "Yes, we can prepare a preliminary quote based on submitted photos and dimensions. We provide accurate quotes after an on-site visit or based on detailed project plans."
      },
      {
        question: "What are the blacksmithing workshop's opening hours?",
        answer: "Our workshop is open Monday to Friday from 8:00 AM to 4:00 PM. We work Saturdays by appointment. We prefer advance phone contact before visits."
      },
      {
        question: "Do you provide on-site measurements?",
        answer: "Yes, we offer professional measurements at the installation site. This is particularly important for wrought iron gates and railings, where precision is crucial."
      }
    ]
  }

  const faqData = language === 'en' ? faqDataEN : faqDataPL
  return faqData[page] || []
}