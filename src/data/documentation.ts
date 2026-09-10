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
      "Developer documentation for a business-management platform covering authentication, resources, workflows, webhooks, errors, and API integration.",
    tags: ["REST API", "Authentication", "Webhooks", "API Reference"],
    href: "https://daramolafemi.github.io/cedius-developer-docs/",
  },
  {
    id: "02",
    title: "ERC-20 Escrow Smart Contract Documentation",
    category: "Web3 / Smart Contract Documentation",
    status: "Planned",
    description:
      "Developer documentation for an ERC-20 escrow system covering contract architecture, escrow lifecycle, client and freelancer roles, token funding, platform fees, refunds, withdrawals, events, custom errors, and integration behavior.",
    tags: ["Solidity", "Ethereum", "ERC-20", "Escrow", "Smart Contracts"],
  },
  {
    id: "03",
    title: "Harmattan Developer & Product Guide",
    category: "Application Documentation",
    status: "Planned",
    description:
      "Developer and product documentation for Harmattan, covering API integration, architecture, weather data, permissions, product behavior, and troubleshooting.",
    tags: ["Weather API", "Integration", "Product Guide", "Troubleshooting"],
  },
];
