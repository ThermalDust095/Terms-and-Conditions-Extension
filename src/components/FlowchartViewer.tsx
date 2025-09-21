import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { GitBranch, AlertTriangle, CheckCircle, XCircle, Eye, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

interface FlowNode {
  id: string;
  title: string;
  type: 'start' | 'decision' | 'action' | 'risk' | 'end';
  risk: 'low' | 'medium' | 'high';
  description: string;
  children?: FlowNode[];
  expanded?: boolean;
}

export function FlowchartViewer() {
  const [flowData, setFlowData] = useState<FlowNode[]>([
    {
      id: '1',
      title: 'Account Creation',
      type: 'start',
      risk: 'low',
      description: 'User creates account and agrees to terms',
      expanded: true,
      children: [
        {
          id: '1.1',
          title: 'Data Collection Begins',
          type: 'action',
          risk: 'medium',
          description: 'Personal info, browsing data, device info collected',
          children: [
            {
              id: '1.1.1',
              title: 'Third-Party Sharing',
              type: 'risk',
              risk: 'high',
              description: 'Data shared with advertisers and partners'
            }
          ]
        },
        {
          id: '1.2', 
          title: 'Auto-Renewal Setup',
          type: 'action',
          risk: 'medium',
          description: 'Subscription automatically renews annually',
          children: [
            {
              id: '1.2.1',
              title: 'Cancel Before Renewal?',
              type: 'decision',
              risk: 'medium',
              description: 'Must cancel 30+ days before renewal date',
              children: [
                {
                  id: '1.2.1.1',
                  title: 'Cancellation Success',
                  type: 'end',
                  risk: 'low',
                  description: 'Service ends, data retention begins'
                },
                {
                  id: '1.2.1.2',
                  title: 'Automatic Charge',
                  type: 'risk',
                  risk: 'high',
                  description: 'Full annual fee charged, no pro-rated refund'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: '2',
      title: 'Service Usage',
      type: 'action',
      risk: 'medium',
      description: 'Normal service operation',
      expanded: true,
      children: [
        {
          id: '2.1',
          title: 'Dispute Arises?',
          type: 'decision', 
          risk: 'medium',
          description: 'User has complaint or issue with service',
          children: [
            {
              id: '2.1.1',
              title: 'Mandatory Arbitration',
              type: 'risk',
              risk: 'high',
              description: 'Must go to Delaware for binding arbitration',
              children: [
                {
                  id: '2.1.1.1',
                  title: 'Cannot Join Class Action',
                  type: 'risk',
                  risk: 'high',
                  description: 'Individual arbitration only, no class suits'
                }
              ]
            }
          ]
        },
        {
          id: '2.2',
          title: 'Terms Change?',
          type: 'decision',
          risk: 'medium', 
          description: 'Company updates terms of service',
          children: [
            {
              id: '2.2.1',
              title: 'Accept Changes',
              type: 'action',
              risk: 'medium',
              description: 'Continued use = acceptance of new terms'
            },
            {
              id: '2.2.2',
              title: 'Reject Changes',
              type: 'action',
              risk: 'medium',
              description: 'Must cancel service, subject to existing terms'
            }
          ]
        }
      ]
    },
    {
      id: '3',
      title: 'Account Termination',
      type: 'action',
      risk: 'medium',
      description: 'Service ends (user cancels or company terminates)',
      expanded: true,
      children: [
        {
          id: '3.1',
          title: 'Data Retention',
          type: 'risk',
          risk: 'high',
          description: 'Personal data kept for "legitimate business purposes"',
          children: [
            {
              id: '3.1.1',
              title: '7+ Year Retention',
              type: 'risk',
              risk: 'high',
              description: 'Some data kept indefinitely for compliance'
            }
          ]
        }
      ]
    }
  ]);

  const toggleNode = (nodeId: string) => {
    const updateNodes = (nodes: FlowNode[]): FlowNode[] => {
      return nodes.map(node => {
        if (node.id === nodeId) {
          return { ...node, expanded: !node.expanded };
        }
        if (node.children) {
          return { ...node, children: updateNodes(node.children) };
        }
        return node;
      });
    };
    setFlowData(updateNodes(flowData));
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'high': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'medium': return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'start': return 'bg-blue-100 border-blue-300';
      case 'decision': return 'bg-amber-100 border-amber-300'; 
      case 'action': return 'bg-gray-100 border-gray-300';
      case 'risk': return 'bg-red-100 border-red-300';
      case 'end': return 'bg-green-100 border-green-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  const renderNode = (node: FlowNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = node.expanded;

    return (
      <div key={node.id} className="space-y-2">
        <div 
          className={`p-3 border-2 rounded-lg ${getTypeColor(node.type)} cursor-pointer hover:shadow-sm transition-shadow`}
          style={{ marginLeft: `${level * 24}px` }}
          onClick={() => hasChildren && toggleNode(node.id)}
        >
          <div className="flex items-center gap-2">
            {hasChildren && (
              isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
            )}
            {getRiskIcon(node.risk)}
            <h4 className="text-sm">{node.title}</h4>
            <Badge variant="outline" className="text-xs">
              {node.type}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1 ml-6">{node.description}</p>
        </div>

        {hasChildren && isExpanded && (
          <div className="space-y-2">
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const riskSummary = {
    highRisk: 8,
    mediumRisk: 6, 
    lowRisk: 2,
    totalNodes: 16
  };

  return (
    <div className="space-y-6">
      {/* Flowchart Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Terms & Conditions Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl text-red-500">{riskSummary.highRisk}</div>
              <div className="text-sm text-muted-foreground">High Risk</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-amber-500">{riskSummary.mediumRisk}</div>
              <div className="text-sm text-muted-foreground">Medium Risk</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-green-500">{riskSummary.lowRisk}</div>
              <div className="text-sm text-muted-foreground">Low Risk</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">{riskSummary.totalNodes}</div>
              <div className="text-sm text-muted-foreground">Total Steps</div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Expand All
            </Button>
            <Button variant="outline" size="sm">
              Collapse All
            </Button>
            <Button variant="outline" size="sm">
              Export Flow
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Flowchart */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Terms Flow</CardTitle>
          <p className="text-sm text-muted-foreground">
            Click nodes to expand and explore the journey through these terms of service
          </p>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {flowData.map(node => renderNode(node))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Risk Path Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Critical Risk Paths</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-red-200 rounded-lg bg-red-50">
              <h4 className="flex items-center gap-2 text-red-700">
                <XCircle className="h-4 w-4" />
                Highest Risk Path
              </h4>
              <p className="text-sm text-red-600 mt-1">
                Account Creation → Data Collection → Third-Party Sharing → Dispute → Mandatory Arbitration
              </p>
              <p className="text-xs text-red-500 mt-2">
                This path exposes users to maximum privacy and legal risks with limited recourse options.
              </p>
            </div>
            
            <div className="p-4 border border-amber-200 rounded-lg bg-amber-50">
              <h4 className="flex items-center gap-2 text-amber-700">
                <AlertTriangle className="h-4 w-4" />
                Financial Risk Path
              </h4>
              <p className="text-sm text-amber-600 mt-1">
                Account Creation → Auto-Renewal → Miss Cancellation → Automatic Charge
              </p>
              <p className="text-xs text-amber-500 mt-2">
                Users who forget to cancel 30+ days early face full annual charges with no refund option.
              </p>
            </div>

            <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
              <h4 className="flex items-center gap-2 text-blue-700">
                <CheckCircle className="h-4 w-4" />
                Safest Path
              </h4>
              <p className="text-sm text-blue-600 mt-1">
                Account Creation → Set Cancellation Reminder → Cancel 30+ Days Early → Clean Exit
              </p>
              <p className="text-xs text-blue-500 mt-2">
                Proactive cancellation management minimizes financial and data retention risks.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border-2 border-blue-300 rounded"></div>
              <span className="text-sm">Start</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-100 border-2 border-amber-300 rounded"></div>
              <span className="text-sm">Decision</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-100 border-2 border-gray-300 rounded"></div>
              <span className="text-sm">Action</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border-2 border-red-300 rounded"></div>
              <span className="text-sm">Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded"></div>
              <span className="text-sm">End</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}