import React from 'react';
import { Plus, Globe, MessageSquare, Scale, Shield, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface Domain {
  id: string;
  name: string;
  type: 'saas' | 'ecommerce' | 'healthcare' | 'fintech' | 'social' | 'default';
  url: string;
  lastUpdated: Date;
  messageCount: number;
  isActive: boolean;
}

interface DomainListProps {
  domains: Domain[];
  onSelectDomain: (domain: Domain) => void;
  onAddDomain: () => void;
}

const DomainList: React.FC<DomainListProps> = ({ domains, onSelectDomain, onAddDomain }) => {
  const getDomainIcon = (type: Domain['type']) => {
    if (type === 'saas') return <Scale className="h-4 w-4" />;
    if (type === 'ecommerce') return <Globe className="h-4 w-4" />;
    if (type === 'healthcare') return <Shield className="h-4 w-4" />;
    if (type === 'fintech') return <Shield className="h-4 w-4" />;
    if (type === 'social') return <Users className="h-4 w-4" />;
    return <MessageSquare className="h-4 w-4" />;
  };

  const getDomainTypeLabel = (type: Domain['type']) => {
    if (type === 'saas') return 'SaaS Platform';
    if (type === 'ecommerce') return 'E-commerce';
    if (type === 'healthcare') return 'Healthcare';
    if (type === 'fintech') return 'FinTech';
    if (type === 'social') return 'Social Media';
    return 'General';
  };

  const getDomainTypeColor = (type: Domain['type']) => {
    if (type === 'saas') return 'text-blue-600';
    if (type === 'ecommerce') return 'text-green-600';
    if (type === 'healthcare') return 'text-red-600';
    if (type === 'fintech') return 'text-purple-600';
    if (type === 'social') return 'text-pink-600';
    return 'text-gray-600';
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2">Terms & Conditions AI Assistant</h1>
            <p className="text-muted-foreground">
              Manage AI chat bots for your domains to help users understand terms and conditions
            </p>
          </div>
          <Button onClick={onAddDomain} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Domain
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain) => (
            <Card 
              key={domain.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-2 hover:border-primary/20"
              onClick={() => onSelectDomain(domain)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className={`${getDomainTypeColor(domain.type)}`}>
                    {getDomainIcon(domain.type)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={domain.isActive ? 'default' : 'secondary'} className="text-xs">
                      {domain.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg">{domain.name}</CardTitle>
                <CardDescription className="text-sm">
                  {domain.url}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Domain Type</span>
                    <Badge variant="outline" className="text-xs">
                      {getDomainTypeLabel(domain.type)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Messages</span>
                    <span className="text-sm">{domain.messageCount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last Updated</span>
                    <span className="text-sm">{domain.lastUpdated.toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDomain(domain);
                    }}
                  >
                    <MessageSquare className="h-3 w-3 mr-2" />
                    Open Chat Interface
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {domains.length === 0 && (
          <div className="text-center py-12">
            <Scale className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="mb-2">No domains configured</h3>
            <p className="text-muted-foreground mb-6">
              Add your first domain to start providing terms and conditions assistance to your users
            </p>
            <Button onClick={onAddDomain} className="flex items-center gap-2 mx-auto">
              <Plus className="h-4 w-4" />
              Add Your First Domain
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DomainList;