export type DocumentationEntry = {
  id: string;
  title: string;
  category: string;
  status: "In progress" | "Planned";
  description: string;
  tags: string[];
};

export const documentation: DocumentationEntry[] = [
  {
    id: "01",
    title: "Cedius Developer Documentation",
    category: "REST API / Developer Documentation",
    status: "In progress",
    description:
      "Developer documentation for a business-management platform covering authentication, resources, workflows, webhooks, errors, and API integration.",
    tags: ["REST API", "Authentication", "Webhooks", "API Reference"],
  },
  {
    id: "02",
    title: "VaultX Smart Contract Documentation",
    category: "Web3 / Smart Contract Documentation",
    status: "Planned",
    description:
      "Technical documentation for a Web3 product covering contract architecture, staking, governance, wallet interaction, methods, events, and frontend integration.",
    tags: ["Solidity", "Ethereum", "Smart Contracts", "Web3"],
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
