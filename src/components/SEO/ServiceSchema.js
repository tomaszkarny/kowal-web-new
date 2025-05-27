import React from 'react';

export function ServiceSchema({ language }) {
  const services = [
    {
      "@type": "Service",
      "name": language === 'pl' ? "Wykonanie bram kutych" : "Wrought Iron Gates",
      "description": language === 'pl' 
        ? "Projektowanie i wykonanie bram kutych na zamówienie"
        : "Custom design and manufacturing of wrought iron gates",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Pracownia Kowalstwa Artystycznego - Tadeusz Karny"
      }
    },
    {
      "@type": "Service",
      "name": language === 'pl' ? "Balustrady kute" : "Wrought Iron Railings",
      "description": language === 'pl'
        ? "Produkcja balustrad wewnętrznych i zewnętrznych"
        : "Production of interior and exterior wrought iron railings",
      "provider": {
        "@type": "LocalBusiness", 
        "name": "Pracownia Kowalstwa Artystycznego - Tadeusz Karny"
      }
    },
    {
      "@type": "Service",
      "name": language === 'pl' ? "Ogrodzenia kute" : "Wrought Iron Fences",
      "description": language === 'pl'
        ? "Kompleksowe wykonanie ogrodzeń kutych"
        : "Complete wrought iron fence installation",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Pracownia Kowalstwa Artystycznego - Tadeusz Karny"
      }
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": services
  };

  return (
    <script
      type="application/ld+json"
    >
      {JSON.stringify(schema)}
    </script>
  );
};

export default ServiceSchema;