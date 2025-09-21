import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Progress } from "./components/ui/progress";
import { Separator } from "./components/ui/separator";
import { Alert, AlertDescription } from "./components/ui/alert";
import { 
  FileText, 
  Globe,
  AlertTriangle,
  XCircle,
  DollarSign,
  Scale,
  Shield,
  ExternalLink,
  Eye
} from "lucide-react";

export default function App() {
  const currentSite = {
    domain: "techcorp.com",
    name: "TechCorp Cloud Services",
    lastScanned: "2 hours ago",
    riskScore: 78,
    status: "High Risk"
  };

  const riskBreakdown = [
    { category: "Privacy & Data", score: 85, icon: Shield, urgent: true },
    { category: "Financial Terms", score: 65, icon: DollarSign, urgent: false },
    { category: "Legal Disputes", score: 90, icon: Scale, urgent: true },
  ];

  const problematicClauses = [
    {
      type: "Privacy Risk",
      severity: "high",
      issue: "Your data will be shared with third-party advertisers",
      impact: "Loss of privacy, targeted advertising"
    },
    {
      type: "Legal Risk", 
      severity: "high",
      issue: "Mandatory arbitration in Delaware only",
      impact: "Cannot join class-action lawsuits"
    },
    {
      type: "Financial Risk",
      severity: "medium", 
      issue: "Auto-renewal with 30-day cancellation requirement",
      impact: "Risk of unwanted charges"
    },
    {
      type: "Data Risk",
      severity: "high",
      issue: "Data retained for 7+ years after deletion",
      impact: "Permanent privacy exposure"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-500 bg-red-50 border-red-200';
      case 'medium': return 'text-amber-500 bg-amber-50 border-amber-200';
      default: return 'text-gray-500 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="w-80 max-h-96 bg-background overflow-y-auto">
      {/* Extension Header */}
      <div className="sticky top-0 bg-background border-b p-3 z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-6 w-6 bg-primary rounded flex items-center justify-center">
            <FileText className="h-3 w-3 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm">T&C AI Analyzer</h1>
          </div>
        </div>

        {/* Current Site */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-3 w-3 text-muted-foreground" />
            <div>
              <h3 className="text-xs">{currentSite.name}</h3>
              <p className="text-xs text-muted-foreground">{currentSite.domain}</p>
            </div>
          </div>
          <Badge variant="destructive" className="text-xs">
            {currentSite.status}
          </Badge>
        </div>
      </div>

      <div className="p-3 space-y-3">
        {/* Risk Score */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs">Overall Risk</span>
              <Badge variant="destructive" className="text-sm">
                {currentSite.riskScore}/100
              </Badge>
            </div>
            <Progress value={currentSite.riskScore} className="h-2 mb-2" />
            
            {/* Risk Breakdown */}
            <div className="space-y-1">
              {riskBreakdown.map((risk) => (
                <div key={risk.category} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <risk.icon className="h-3 w-3" />
                    <span>{risk.category}</span>
                    {risk.urgent && <XCircle className="h-3 w-3 text-red-500" />}
                  </div>
                  <span className={risk.score >= 80 ? 'text-red-500' : risk.score >= 60 ? 'text-amber-500' : 'text-green-500'}>
                    {risk.score}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Problematic Issues */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">⚠️ Major Issues Found</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {problematicClauses.map((clause, index) => (
              <div key={index} className={`p-2 rounded border text-xs ${getSeverityColor(clause.severity)}`}>
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="outline" className="text-xs h-5">
                    {clause.type}
                  </Badge>
                  {clause.severity === "high" && <XCircle className="h-3 w-3" />}
                </div>
                <p className="text-xs mb-1">{clause.issue}</p>
                <p className="text-xs opacity-75">Impact: {clause.impact}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Recommendation */}
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            <strong>Recommendation:</strong> High privacy and legal risks detected. 
            Consider alternatives or proceed with extreme caution.
          </AlertDescription>
        </Alert>

        <Separator />

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 text-xs">
            <Eye className="h-3 w-3 mr-1" />
            Full Report
          </Button>
          <Button variant="outline" size="sm" className="flex-1 text-xs">
            <ExternalLink className="h-3 w-3 mr-1" />
            Website
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Last scanned: {currentSite.lastScanned}
          </p>
          <Button variant="link" size="sm" className="text-xs p-0 h-auto">
            Visit tcanalyzer.com for detailed analysis
          </Button>
        </div>
      </div>
    </div>
  );
}