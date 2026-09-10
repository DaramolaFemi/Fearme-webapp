export type DocumentationEntry = {
  id: string;
  title: string;
  category: string;
  status: "Published" | "In progress" | "Planned";
  description: string;
  tags: string[];
  href?: string;
};

export const documentation: DocumentationEntry[] = [
  {
    id: "01",
    title: "Cedius Developer Documentation",
    category: "REST API / Developer Documentation",
    status: "Published",
    description:
      "Developer documentation for a business-management platform covering authentication, resources, workflows, webhooks, errors, API conventions, integration behavior, and the practical patterns developers need to move through the system with clarity.",
    tags: ["REST API", "Authentication", "Webhooks", "API Reference"],
    href: "https://daramolafemi.github.io/cedius-developer-docs/",
  },
  {
    id: "02",
    title: "ERC-20 Escrow Smart Contract Documentation",
    category: "Web3 / Smart Contract Documentation",
    status: "Published",
    description:
      "Developer documentation for an ERC-20 escrow system covering contract architecture, escrow lifecycle, client and freelancer roles, token funding, platform fees, refunds, withdrawals, events, custom errors, frontend integration, and germane security considerations.",
    tags: ["Solidity", "Ethereum", "ERC-20", "Escrow", "Smart Contracts"],
    href: "https://daramolafemi.github.io/erc20-escrow-smart-contract-docs/",
  },
  {
    id: "03",
    title: "Harmattan Developer & Product Guide",
    category: "Application Documentation",
    status: "Published",
    description:
      "Developer and product documentation for Harmattan — The 9ja Skies, covering application architecture, Open-Meteo integration, weather-code interpretation, Nigerian city data, local state and persistence, product behaviour, ambient audio, accessibility, troubleshooting, the 9jaRun companion experience, and the practical design decisions that shape a distinctly local weather product.",
    tags: ["Weather API", "Open-Meteo", "Product Guide", "JavaScript", "Troubleshooting"],
    href: "https://daramolafemi.github.io/harmattan-developer-product-guide/",
  },
];
