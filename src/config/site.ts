export const siteConfig = {
  name: "Hotzonex",
  description:
    "Hotzonex provides WiFi hotspots, home and office internet, Starlink installation and activation, MikroTik configuration and hotspot setup, network support, and website/software development in Juba, South Sudan.",
  url: "https://hotzonex-site.vercel.app",
  contact: {
    phone: "+211 924 904 216",
    email: "omotmam2024@gmail.com",
    whatsapp: "+211 924 904 216",
    address: "Juba, South Sudan",
    hours: "Daily, during office hours",
  },
  locations: [
    {
      slug: "gorom",
      name: "Gorom",
      area: "Gorom Home Office",
      status: "Open",
      hours: "8:00 AM – 10:00 PM (Wi-Fi runs 24/7)",
      services: ["WiFi hotspot vouchers", "Support"],
      address: "Gorom Home Office, Juba, South Sudan",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Gorom+Home+Office+Juba+South+Sudan",
      directionsLabel: "Get directions",
    },
    {
      slug: "jebel-iraq",
      name: "Jebel Iraq",
      area: "Jebel-Iraq Head Office",
      status: "Open",
      hours: "8:00 AM – 11:00 PM",
      services: ["WiFi hotspot vouchers", "Support"],
      address: "Jebel-Iraq Head Office, Juba, South Sudan",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Jebel-Iraq+Head+Office+Juba+South+Sudan",
      directionsLabel: "Get directions",
    },
    {
      slug: "head-office",
      name: "Head Office",
      area: "Jebel-Iraq Head Office",
      status: "Open",
      hours: "8:00 AM – 11:00 PM",
      services: ["Home & office internet", "IT support"],
      address: "Jebel-Iraq Head Office, Juba, South Sudan",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Jebel-Iraq+Head+Office+Juba+South+Sudan",
      directionsLabel: "Get directions",
    },
    {
      slug: "sub-office",
      name: "Sub-Office",
      area: "Jebel-Iraq Sub Office",
      status: "Open",
      hours: "8:00 AM – 11:00 PM",
      services: ["Home & office internet", "IT support"],
      address: "Jebel-Iraq Sub Office, Juba, South Sudan",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Jebel-Iraq+Sub+Office+Juba+South+Sudan",
      directionsLabel: "Get directions",
    },
  ],
  services: [
    {
      slug: "wifi-hotspot-vouchers",
      title: "WiFi hotspot & vouchers",
      summary:
        "Prepaid internet access for public hotspot visitors who need affordable connectivity without a long-term contract.",
      audience: "Walk-up customers, students, commuters, and temporary users who need access on demand.",
      included: [
        "Time- or data-based vouchers",
        "Fast hotspot onboarding support",
        "On-site help for connection issues",
      ],
      steps: [
        "Choose a voucher package that matches your needs.",
        "Connect to the hotspot at your preferred location.",
        "Receive support if you need help getting online.",
      ],
      cta: "Request a voucher",
      highlight: "Popular with walk-up users who want simple, prepaid access.",
    },
    {
      slug: "home-office-internet",
      title: "Home & office internet",
      summary:
        "Dedicated connections for apartments, shops, and businesses that need stability, continuity, and straightforward support.",
      audience: "Households, offices, shops, and small businesses in Juba looking for dependable internet.",
      included: [
        "Installation planning and setup",
        "Router and cabling guidance",
        "Ongoing troubleshooting and support",
      ],
      steps: [
        "Share your internet needs and location.",
        "Review the recommended installation path.",
        "Receive setup and ongoing service support.",
      ],
      cta: "Request a dedicated connection",
      highlight: "Built for people who need a reliable connection every day.",
    },
    {
      slug: "network-setup-it-support",
      title: "Network setup & IT support",
      summary:
        "Practical network configuration, troubleshooting, and technical support for customers who need help with their existing setup.",
      audience: "Businesses and households that already have a network but need technical help, repairs, or improvements.",
      included: [
        "Router configuration",
        "Basic cabling support",
        "Issue diagnosis and troubleshooting",
      ],
      steps: [
        "Describe the problem or setup requirement.",
        "Receive a practical support plan.",
        "Get the connection or configuration back to working order.",
      ],
      cta: "Request IT support",
      highlight: "Designed for customers who need help with real-world network issues.",
    },
    {
      slug: "starlink-installation-activation",
      title: "Professional Starlink installation & activation",
      summary:
        "End-to-end Starlink setup for households, offices, and remote locations that need reliable satellite internet with professional activation. Please contact the Head Office for the current quote and configuration details.",
      audience: "Customers in areas where terrestrial internet is limited or where satellite connectivity is the best practical option.",
      included: [
        "Site readiness and placement guidance",
        "Professional installation and activation support",
        "Connection testing and handover",
      ],
      steps: [
        "Share your location and connectivity goals.",
        "Review the recommended Starlink setup plan.",
        "Receive installation, activation, and testing support.",
      ],
      cta: "Request Starlink setup",
      highlight: "Ideal for customers who need a dependable satellite internet option.",
    },
    {
      slug: "mikrotik-configuration-hotspot",
      title: "MikroTik configuration & hotspot",
      summary:
        "Router and hotspot configuration services for customers who need secure, well-managed public or private network access. Please contact the Head Office for the current configuration and pricing details.",
      audience: "Businesses, public venues, and network operators that need dependable MikroTik setups and hotspot control.",
      included: [
        "MikroTik router setup and configuration",
        "Hotspot creation and access control",
        "Performance tuning and ongoing troubleshooting",
      ],
      steps: [
        "Describe the network requirement or hotspot use case.",
        "Receive a configuration plan tailored to your environment.",
        "Get the system deployed and supported for daily use.",
      ],
      cta: "Request MikroTik support",
      highlight: "Built for customers who want secure, organised, and scalable network management.",
    },
    {
      slug: "website-software-development",
      title: "Website & software development",
      summary:
        "Custom websites and software solutions that help local businesses present themselves professionally and operate more efficiently.",
      audience: "Businesses that need a stronger online presence, internal tools, or custom digital products.",
      included: [
        "Discovery and planning",
        "Custom website or app build",
        "Launch support and iteration",
      ],
      steps: [
        "Outline your project goals and requirements.",
        "Review the proposed approach and scope.",
        "Launch the site or software with ongoing refinement support.",
      ],
      cta: "Request a development quote",
      highlight: "Hotzonex also builds digital products for other businesses.",
    },
  ],
  pricing: {
    currency: "SSP",
    currencyLabel: "SSP",
    packages: [
      {
        name: "1 Hour Voucher",
        price: "1,000",
        description: "Starting rate at Gorom Home Office. Prices vary by location.",
        features: ["Fast hotspot access", "Ideal for short visits"],
        recommended: true,
      },
      {
        name: "1 Day Voucher",
        price: "6,000",
        description: "A practical option for a full day of connectivity at Gorom Home Office.",
        features: ["Longer daily access", "Good for work or study"],
        recommended: false,
      },
      {
        name: "Weekly Bundle",
        price: "15,000",
        description: "The best value option for repeated use at Gorom Home Office.",
        features: ["Extended duration", "Better value for frequent use"],
        recommended: false,
      },
    ],
    quoteTypes: [
      {
        title: "Installation",
        summary: "Dedicated home or office internet setup and connection planning.",
      },
      {
        title: "Support",
        summary: "Ongoing troubleshooting, router guidance, and technical assistance.",
      },
      {
        title: "Development",
        summary: "Custom web and software projects priced according to scope and requirements.",
      },
      {
        title: "Starlink installation & activation",
        summary: "Professional Starlink setup and activation for homes, offices, and remote locations that need reliable satellite internet. Please contact the Head Office for the current quote and configuration details.",
      },
      {
        title: "MikroTik configuration & hotspot",
        summary: "Router setup, hotspot configuration, and access control for customers needing a secure and well-managed network. Please contact the Head Office for the current configuration and pricing details.",
      },
    ],
  },
  faqs: [
    {
      category: "General",
      question: "How can I buy a hotspot voucher?",
      answer:
        "Customers can visit an active hotspot location and ask for assistance, or contact Hotzonex directly to confirm the next steps.",
    },
    {
      category: "Locations",
      question: "Which hotspot locations are currently active?",
      answer:
        "Hotzonex currently operates three Wi-Fi locations in Juba: Gorom Home Office, Jebel-Iraq Head Office, and Jebel-Iraq Sub Office. Gorom runs 24/7 Wi-Fi with office hours from 8:00 AM to 10:00 PM, while the Jebel-Iraq offices are open from 8:00 AM to 11:00 PM.",
    },
    {
      category: "Services",
      question: "Do you provide installation for homes and offices?",
      answer:
        "Yes. Hotzonex offers dedicated home and office internet installation services, along with ongoing support and troubleshooting.",
    },
    {
      category: "Development",
      question: "Can Hotzonex build websites or software for my business?",
      answer:
        "Yes. Hotzonex also develops websites and software for organisations that need custom digital solutions.",
    },
  ],
  social: {
    facebook: "https://www.facebook.com/",
    x: "https://x.com/",
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
  },
  needsRealContent: [
    "Customer testimonials to add for stronger social proof",
    "Pricing source for hotspot packages to confirm and publish",
    "Destination email for contact form delivery to configure in production",
  ],
} as const;
