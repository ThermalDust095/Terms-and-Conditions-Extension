import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { 
  ChevronDown, ChevronRight, AlertTriangle, CheckCircle, XCircle, 
  Info, FileText, Shield, Gavel, DollarSign, Clock, Users
} from 'lucide-react';

interface FlowchartNode {
  id: string;
  title: string;
  description: string;
  type: 'section' | 'clause' | 'risk' | 'action';
  riskLevel: 'low' | 'medium' | 'high' | 'info';
  children?: FlowchartNode[];
  expanded?: boolean;
}

interface FlowchartViewProps {
  domain: string;
}

const FlowchartView: React.FC<FlowchartViewProps> = ({ domain }) => {
  const [nodes, setNodes] = useState<FlowchartNode[]>([
    {
      id: '1',
      title: 'Terms of Service Structure',
      description: 'Complete breakdown of all terms and conditions',
      type: 'section',
      riskLevel: 'info',
      expanded: true,
      children: [
        {
          id: '1.1',
          title: 'Account Terms',
          description: 'User account creation, management, and termination',
          type: 'section',
          riskLevel: 'medium',
          expanded: false,
          children: [
            {
              id: '1.1.1',
              title: 'Account Creation Requirements',
              description: 'Must provide accurate personal information',
              type: 'clause',
              riskLevel: 'low'
            },
            {
              id: '1.1.2',
              title: 'Account Termination Rights',
              description: 'Service can terminate accounts without notice',
              type: 'risk',
              riskLevel: 'high'
            },
            {
              id: '1.1.3',
              title: 'Data Export Before Termination',
              description: 'Limited time to export data after termination',
              type: 'action',
              riskLevel: 'medium'
            }
          ]
        },
        {
          id: '1.2',
          title: 'Privacy & Data Collection',
          description: 'How personal data is collected, used, and shared',
          type: 'section',
          riskLevel: 'high',
          expanded: false,
          children: [
            {
              id: '1.2.1',
              title: 'Data Collection Scope',
              description: 'Collects personal, behavioral, and biometric data',
              type: 'risk',
              riskLevel: 'high'
            },
            {
              id: '1.2.2',
              title: 'Third-Party Sharing',
              description: 'Data shared with 200+ marketing partners',
              type: 'risk',
              riskLevel: 'high'
            },
            {
              id: '1.2.3',
              title: 'Data Retention Period',
              description: 'Data kept indefinitely unless requested for deletion',
              type: 'risk',
              riskLevel: 'medium'
            }
          ]
        },
        {
          id: '1.3',
          title: 'Payment & Billing',
          description: 'Subscription terms, billing cycles, and refund policies',
          type: 'section',
          riskLevel: 'medium',
          expanded: false,
          children: [
            {
              id: '1.3.1',
              title: 'Automatic Renewal',
              description: 'Subscriptions auto-renew unless cancelled 24h before',
              type: 'risk',
              riskLevel: 'medium'
            },
            {
              id: '1.3.2',
              title: 'Refund Policy',
              description: 'No refunds after 14-day trial period',
              type: 'risk',
              riskLevel: 'high'
            },
            {
              id: '1.3.3',
              title: 'Price Change Notification',
              description: '30-day notice for subscription price increases',
              type: 'clause',
              riskLevel: 'low'
            }
          ]
        },
        {
          id: '1.4',
          title: 'Dispute Resolution',
          description: 'Legal procedures for handling conflicts',
          type: 'section',
          riskLevel: 'high',
          expanded: false,
          children: [
            {
              id: '1.4.1',
              title: 'Mandatory Arbitration',
              description: 'All disputes must go through arbitration',
              type: 'risk',
              riskLevel: 'high'
            },
            {
              id: '1.4.2',
              title: 'Class Action Waiver',
              description: 'Cannot participate in class-action lawsuits',
              type: 'risk',
              riskLevel: 'high'
            },
            {
              id: '1.4.3',
              title: 'Governing Law',
              description: 'Disputes governed by Delaware state law',
              type: 'clause',
              riskLevel: 'low'
            }
          ]
        },
        {
          id: '1.5',
          title: 'Service Limitations',
          description: 'Liability limits and service availability',
          type: 'section',
          riskLevel: 'medium',
          expanded: false,
          children: [
            {
              id: '1.5.1',
              title: 'Limitation of Liability',
              description: 'Company liability limited to $100 maximum',
              type: 'risk',
              riskLevel: 'high'
            },
            {
              id: '1.5.2',
              title: 'Service Uptime Guarantee',
              description: '99.9% uptime guaranteed with credit compensation',
              type: 'clause',
              riskLevel: 'low'
            },
            {
              id: '1.5.3',
              title: 'Force Majeure',
              description: 'No liability for events beyond reasonable control',
              type: 'clause',
              riskLevel: 'low'
            }
          ]
        }
      ]
    }
  ]);

  const toggleNode = (nodeId: string) => {
    const updateNodeExpansion = (nodes: FlowchartNode[]): FlowchartNode[] => {
      return nodes.map(node => {
        if (node.id === nodeId) {
          return { ...node, expanded: !node.expanded };
        }
        if (node.children) {
          return { ...node, children: updateNodeExpansion(node.children) };
        }
        return node;
      });
    };

    setNodes(updateNodeExpansion(nodes));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'section': return <FileText className="h-4 w-4" />;
      case 'clause': return <Info className="h-4 w-4" />;
      case 'risk': return <AlertTriangle className="h-4 w-4" />;
      case 'action': return <CheckCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-blue-600';
    }
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'default';
      default: return 'outline';
    }
  };

  const renderNode = (node: FlowchartNode, depth: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    
    return (
      <div key={node.id} className={`${depth > 0 ? 'ml-6 border-l border-border pl-4' : ''}`}>
        <Card className={`mb-2 ${node.type === 'risk' && node.riskLevel === 'high' ? 'border-red-200' : ''}`}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {hasChildren && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleNode(node.id)}
                    className="p-0 h-auto"
                  >
                    {node.expanded ? 
                      <ChevronDown className="h-3 w-3" /> : 
                      <ChevronRight className="h-3 w-3" />
                    }
                  </Button>
                )}
                <div className={getRiskColor(node.riskLevel)}>
                  {getIcon(node.type)}
                </div>
                <CardTitle className="text-sm">{node.title}</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getRiskBadge(node.riskLevel) as any} className="text-xs">
                  {node.riskLevel}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {node.type}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground">{node.description}</p>
          </CardContent>
        </Card>
        
        {hasChildren && node.expanded && (
          <div className="space-y-1">
            {node.children!.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const expandAll = () => {
    const expandAllNodes = (nodes: FlowchartNode[]): FlowchartNode[] => {
      return nodes.map(node => ({
        ...node,
        expanded: true,
        children: node.children ? expandAllNodes(node.children) : undefined
      }));
    };
    setNodes(expandAllNodes(nodes));
  };

  const collapseAll = () => {
    const collapseAllNodes = (nodes: FlowchartNode[]): FlowchartNode[] => {
      return nodes.map(node => ({
        ...node,
        expanded: false,
        children: node.children ? collapseAllNodes(node.children) : undefined
      }));
    };
    setNodes(collapseAllNodes(nodes));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium">Interactive Terms Flowchart</h3>
            <p className="text-sm text-muted-foreground">Visual breakdown of {domain} terms structure</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={expandAll}>
              Expand All
            </Button>
            <Button variant="outline" size="sm" onClick={collapseAll}>
              Collapse All
            </Button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3 text-red-600" />
            <span>High Risk</span>
          </div>
          <div className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3 text-yellow-600" />
            <span>Medium Risk</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span>Low Risk</span>
          </div>
          <div className="flex items-center gap-1">
            <Info className="h-3 w-3 text-blue-600" />
            <span>Information</span>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {nodes.map(node => renderNode(node))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FlowchartView;