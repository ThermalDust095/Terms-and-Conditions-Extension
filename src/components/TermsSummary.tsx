import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { AlertTriangle, CheckCircle, XCircle, Eye, EyeOff } from "lucide-react";

export function TermsSummary() {
  const summary = {
    keyPoints: [
      "Data is shared with third-party advertisers and analytics companies",
      "Account can be terminated at any time without notice",
      "Arbitration clause prevents class-action lawsuits", 
      "Auto-renewal billing every 12 months unless cancelled",
      "Limited refund policy - no refunds after 14 days"
    ],
    riskLevel: "High",
    lastUpdated: "December 15, 2024",
    wordCount: 8742,
    readTime: "22 minutes"
  };

  const flaggedClauses = [
    {
      type: "Privacy Risk",
      severity: "high",
      text: "We may share your personal information with our affiliates, service providers, and business partners for marketing purposes.",
      explanation: "Your data could be shared widely for advertising without explicit consent for each use."
    },
    {
      type: "Billing Risk", 
      severity: "medium",
      text: "Your subscription will automatically renew unless you cancel at least 30 days before renewal.",
      explanation: "Easy to forget cancellation deadline, leading to unwanted charges."
    },
    {
      type: "Legal Risk",
      severity: "high", 
      text: "Any disputes must be resolved through binding arbitration in Delaware.",
      explanation: "You cannot join class-action lawsuits and must travel to Delaware for legal disputes."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>AI Summary</CardTitle>
            <Badge variant={summary.riskLevel === "High" ? "destructive" : "secondary"}>
              {summary.riskLevel} Risk
            </Badge>
          </div>
          <div className="flex gap-4">
            <span className="text-muted-foreground">{summary.wordCount} words</span>
            <span className="text-muted-foreground">{summary.readTime} read</span>
            <span className="text-muted-foreground">Updated {summary.lastUpdated}</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2">Key Points You Should Know:</h3>
              <ul className="space-y-2">
                {summary.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Separator />
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                This service has concerning clauses around data sharing and dispute resolution. Consider alternatives if privacy is important to you.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Flagged Clauses */}
      <Card>
        <CardHeader>
          <CardTitle>Flagged Clauses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {flaggedClauses.map((clause, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant={clause.severity === "high" ? "destructive" : "secondary"}>
                    {clause.type}
                  </Badge>
                  {clause.severity === "high" ? (
                    <XCircle className="h-4 w-4 text-destructive" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  )}
                </div>
                <blockquote className="border-l-4 border-muted pl-4 italic text-muted-foreground">
                  "{clause.text}"
                </blockquote>
                <p className="text-sm">{clause.explanation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dual View Toggle */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Document Comparison</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Show Original
              </Button>
              <Button variant="outline" size="sm">
                <EyeOff className="h-4 w-4 mr-2" />
                Hide Legalese
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="mb-2">Plain Language</h4>
              <ScrollArea className="h-48 border rounded p-3">
                <p className="text-sm">
                  This service collects your personal information including your name, email, 
                  browsing history, and device information. They share this data with advertising 
                  companies to show you targeted ads. If you have a dispute, you must go to 
                  arbitration in Delaware - you cannot sue them in court or join a class action 
                  lawsuit. Your subscription automatically renews each year unless you remember 
                  to cancel 30 days early.
                </p>
              </ScrollArea>
            </div>
            <div>
              <h4 className="mb-2">Original Legal Text</h4>
              <ScrollArea className="h-48 border rounded p-3">
                <p className="text-sm text-muted-foreground">
                  "Company may collect, use, and disclose Personal Information for the purposes 
                  of providing and improving the Services, including sharing with third-party 
                  service providers, affiliates, and business partners. Any claim or dispute 
                  arising under this Agreement shall be resolved by binding arbitration in 
                  accordance with the Commercial Arbitration Rules of the American Arbitration 
                  Association, with the arbitration taking place in Delaware..."
                </p>
              </ScrollArea>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}