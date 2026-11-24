import type { Photo } from "@/lib/photos";

export const siteConfig = {
  name: "Hotzonex",
  description:
    "Hotzonex provides WiFi hotspots, home and office internet, Starlink installation and activation, MikroTik configuration and hotspot setup, network support, and website/software development in Juba, South Sudan.",
  url: "https://www.hotzonex.dev",
  // Hotzonex Cloud, the company's own hotspot-management software (a separate site and app).
  cloudUrl: "https://www.hotzonex.net",
  contact: {
    phone: "+211 924 904 216",
    email: "info@hotzonex.net",
    whatsapp: "+211 924 904 216",
    address: "Juba, South Sudan",
    hours: "Daily, during office hours",
  },
  // The three offices, their hours, Wi-Fi networks and starting prices, as
  // published in the Hotzonex Wi-Fi Customer Service Guide (doc/Hotzonex_policy.pdf).
  // mapUrl opens Google Maps directions to each office's exact pin.
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
      mapUrl: "https://www.google.com/maps/dir/?api=1&destination=4.727359974105239%2C31.593812834356974",
    },
    {
      slug: "head-office",
      name: "Jebel-Iraq Head Office",
      area: "Koli, Juba",
      status: "Open",
      hours: "8:00 AM – 11:00 PM",
      networks: ["HOTZONEX-WIFI", "HOTZONEX-WIFI-2 (and 5G)", "HOTZONEX-GOLD (and 5G)"],
      vouchersFrom: "1,500 SSP",
      services: ["WiFi hotspot vouchers", "Home & office internet", "IT support", "Starlink and MikroTik quotes"],
      address: "Jebel-Iraq Head Office, Koli, Juba, South Sudan",
      mapUrl: "https://www.google.com/maps/dir/?api=1&destination=4.53042878534354%2C31.320665765976663",
    },
    {
      slug: "sub-office",
      name: "Jebel-Iraq Sub Office",
      area: "Koli, Juba",
      status: "Open",
      hours: "8:00 AM – 11:00 PM",
      networks: ["HOTZONEX-WIFI", "HOTZONEX-WIFI3 (and 5G)"],
      vouchersFrom: "2,000 SSP",
      services: ["WiFi hotspot vouchers (LITE, Popular, Power and Max)", "Home & office internet", "IT support"],
      address: "Jebel-Iraq Sub Office, Koli, Juba, South Sudan",
      mapUrl: "https://www.google.com/maps/dir/?api=1&destination=4.53042878534354%2C31.320665765976663",
    },
  ],
  services: [
    {
      slug: "wifi-hotspot-vouchers",
      seoTitle: "WiFi Hotspot & Internet Vouchers in Juba, South Sudan",
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
      image: "cafe" as Photo,
    },
    {
      slug: "home-office-internet",
      seoTitle: "Home & Office Internet in Juba, South Sudan",
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
      image: "router" as Photo,
    },
    {
      slug: "network-setup-it-support",
      seoTitle: "Network Setup & IT Support in Juba, South Sudan",
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
      image: "cabling" as Photo,
    },
    {
      slug: "starlink-installation-activation",
      seoTitle: "Starlink Installation & Activation in Juba, South Sudan",
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
      image: "dish" as Photo,
    },
    {
      slug: "mikrotik-configuration-hotspot",
      seoTitle: "MikroTik Configuration & Hotspot Setup in Juba, South Sudan",
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
      image: "accessPoint" as Photo,
    },
    {
      slug: "website-software-development",
      seoTitle: "Website & Software Development in Juba, South Sudan",
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
      image: "developer" as Photo,
    },
    {
      slug: "hotzonex-cloud-hotspot-software",
      seoTitle: "Hotzonex Cloud: WiFi Hotspot Billing & Voucher Software for MikroTik",
      title: "Hotzonex Cloud: hotspot management software",
      summary:
        "Our own app for WiFi hotspot owners: make and sell MikroTik voucher cards, give every cashier and agent a login, and follow every SSP and every router from your phone.",
      audience: "Hotspot owners and internet providers who sell WiFi vouchers with MikroTik routers, in Juba and across East Africa.",
      included: [
        "Sell a voucher card in one tap and print cards and receipts with your logo",
        "Cashiers and agents with their own login, commission and credit limit",
        "Sales reports by day, site, plan and seller, and who is online on each router",
        "Customers can buy a card from their own phone and pay by mobile money",
      ],
      steps: [
        "Open Hotzonex Cloud and start a free trial.",
        "Connect your MikroTik router (RouterOS 7) through the secure tunnel.",
        "Create your plans and start selling cards from any phone.",
      ],
      cta: "Open Hotzonex Cloud",
      // Opens the Cloud site instead of the contact page.
      externalUrl: "https://www.hotzonex.net",
      highlight: "Built by Hotzonex and used in our own offices.",
      image: "counter" as Photo,
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
