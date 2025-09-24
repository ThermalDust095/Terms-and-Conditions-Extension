import React, { useState } from "react";
import DomainList from "./components/DomainList";
import AdvancedChatInterface from "./components/AdvancedChatInterface";

interface Domain {
  id: string;
  name: string;
  type:
    | "saas"
    | "ecommerce"
    | "healthcare"
    | "fintech"
    | "social"
    | "default";
  url: string;
  lastUpdated: Date;
  messageCount: number;
  isActive: boolean;
}

// Mock data for demonstration
const mockDomains: Domain[] = [
  {
    id: "1",
    name: "TechCorp SaaS Platform",
    type: "saas",
    url: "app.techcorp.com",
    lastUpdated: new Date("2024-01-15"),
    messageCount: 1247,
    isActive: true,
  },
  {
    id: "2",
    name: "ShopEasy E-commerce",
    type: "ecommerce",
    url: "shop.easystore.com",
    lastUpdated: new Date("2024-01-12"),
    messageCount: 892,
    isActive: true,
  },
  {
    id: "3",
    name: "HealthCarePlus",
    type: "healthcare",
    url: "portal.healthcareplus.com",
    lastUpdated: new Date("2024-01-10"),
    messageCount: 543,
    isActive: false,
  },
  {
    id: "4",
    name: "FinanceSecure Bank",
    type: "fintech",
    url: "secure.financebank.com",
    lastUpdated: new Date("2024-01-08"),
    messageCount: 2103,
    isActive: true,
  },
  {
    id: "5",
    name: "ConnectSocial Network",
    type: "social",
    url: "connect.socialnet.com",
    lastUpdated: new Date("2024-01-05"),
    messageCount: 3456,
    isActive: true,
  },
  {
    id: "6",
    name: "GeneralCorp Website",
    type: "default",
    url: "www.generalcorp.com",
    lastUpdated: new Date("2024-01-03"),
    messageCount: 234,
    isActive: false,
  },
];

export default function App() {
  const [selectedDomain, setSelectedDomain] =
    useState<Domain | null>(null);
  const [domains] = useState<Domain[]>(mockDomains);

  const handleSelectDomain = (domain: Domain) => {
    setSelectedDomain(domain);
  };

  const handleBackToDomains = () => {
    setSelectedDomain(null);
  };

  const handleAddDomain = () => {
    // In a real app, this would open a modal or form to add a new domain
    console.log("Add new domain clicked");
  };

  return (
    <div className="h-screen w-full bg-background">
      {selectedDomain ? (
        <AdvancedChatInterface
          selectedDomain={selectedDomain}
          onBackToDomains={handleBackToDomains}
        />
      ) : (
        <DomainList
          domains={domains}
          onSelectDomain={handleSelectDomain}
          onAddDomain={handleAddDomain}
        />
      )}
    </div>
  );
}