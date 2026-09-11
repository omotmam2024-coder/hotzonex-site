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
  // The three offices, their hours, Wi-Fi networks and starting prices, as
  // published in the Hotzonex Wi-Fi Customer Service Guide (doc/Hotzonex_policy.pdf).
  locations: [
    {
      slug: "gorom",
      name: "Gorom Home Office",
      area: "Gorom, Juba",
      status: "Open",
      hours: "8:00 AM – 10:00 PM (Wi-Fi runs 24/7)",
      networks: ["HOTZONEX-WIFI", "HOTZONEX-WIFI-2 (and 5G)", "HOTZONEX-WIFI3"],
      vouchersFrom: "1,000 SSP",
      services: ["WiFi hotspot vouchers", "Customer support"],
      address: "Gorom Home Office, Juba, South Sudan",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Gorom+Home+Office+Juba+South+Sudan",
    },
    {
      slug: "head-office",
      name: "Jebel-Iraq Head Office",
      area: "Jebel-Iraq, Juba",
      status: "Open",
      hours: "8:00 AM – 11:00 PM",
      networks: ["HOTZONEX-WIFI", "HOTZONEX-WIFI-2 (and 5G)", "HOTZONEX-GOLD (and 5G)"],
      vouchersFrom: "1,500 SSP",
      services: ["WiFi hotspot vouchers", "Home & office internet", "IT support", "Starlink and MikroTik quotes"],
      address: "Jebel-Iraq Head Office, Juba, South Sudan",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Jebel-Iraq+Head+Office+Juba+South+Sudan",
    },
    {
      slug: "sub-office",
      name: "Jebel-Iraq Sub Office",
      area: "Jebel-Iraq, Juba",
      status: "Open",
      hours: "8:00 AM – 11:00 PM",
      networks: ["HOTZONEX-WIFI", "HOTZONEX-WIFI3 (and 5G)"],
      vouchersFrom: "2,000 SSP",
      services: ["WiFi hotspot vouchers (LITE, Popular, Power and Max)", "Home & office internet", "IT support"],
      address: "Jebel-Iraq Sub Office, Juba, South Sudan",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Jebel-Iraq+Sub+Office+Juba+South+Sudan",
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
        "Time-based vouchers, unlimited for their period",
        "Fast hotspot onboarding support",
        "On-site help for connection issues",
      ],
      steps: [
        "Buy a voucher at the Hotzonex office you are visiting.",
        "Connect to that office's HOTZONEX network and enter your code.",
        "Ask our staff or call support if you need help getting online.",
      ],
      cta: "Request a voucher",
      highlight: "Popular with walk-up users who want simple, prepaid access.",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Hotspot voucher access and customer support experience.",
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
      image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Home and office internet installation support.",
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
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "IT support and network troubleshooting services.",
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
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Professional Starlink installation and satellite internet support.",
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
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "MikroTik configuration and hotspot networking setup.",
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
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Website and software development services.",
    },
  ],
  // Voucher prices are not listed here: the pricing page reads them from the
  // Customer Service Guide so they cannot drift from what the offices charge.
  pricing: {
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
  // Questions about the services the Customer Service Guide does not cover. Wi-Fi,
  // voucher and policy questions come from the guide itself (see src/lib/guide.ts).
  faqs: [
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
};
