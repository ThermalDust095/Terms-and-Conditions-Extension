import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AlertTriangle, Shield, DollarSign, Scale, MessageSquare, Send } from "lucide-react";

export function RiskAnalysis() {
  const riskScore = 78; // Out of 100
  
  const riskCategories = [
    { name: "Privacy & Data", score: 85, icon: Shield, color: "text-red-500" },
    { name: "Financial Terms", score: 65, icon: DollarSign, color: "text-amber-500" },  
    { name: "Legal Disputes", score: 90, icon: Scale, color: "text-red-500" },
    { name: "Service Changes", score: 45, icon: AlertTriangle, color: "text-green-500" }
  ];

  const scenarios = [
    {
      question: "What happens if I want to delete my account?",
      answer: "You can request account deletion, but the company retains your data for 'legitimate business purposes' for up to 7 years. Some data may be permanently retained for legal compliance.",
      risk: "Medium"
    },
    {
      question: "Can I get a refund if I'm not satisfied?", 
      answer: "Refunds are only available within 14 days of purchase. After that, you're locked into the full subscription period with no pro-rated refunds.",
      risk: "High"
    },
    {
      question: "What if they change the terms?",
      answer: "They can change terms with 30 days notice. Continued use means you accept changes. No option to reject changes and keep old terms.",
      risk: "Medium"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overall Risk Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Overall Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Risk Score</span>
              <Badge variant="destructive" className="text-lg px-3 py-1">
                {riskScore}/100
              </Badge>
            </div>
            <Progress value={riskScore} className="h-3" />
            <p className="text-sm text-muted-foreground">
              This service poses significant risks to user privacy and financial flexibility. 
              Consider alternatives or proceed with caution.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Risk Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskCategories.map((category) => (
              <div key={category.name} className="flex items-center gap-3">
                <category.icon className={`h-5 w-5 ${category.color}`} />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span>{category.name}</span>
                    <span className="text-sm text-muted-foreground">{category.score}%</span>
                  </div>
                  <Progress value={category.score} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* What-If Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle>What-If Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {scenarios.map((scenario, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start gap-2">
                  <MessageSquare className="h-4 w-4 mt-1 text-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm">{scenario.question}</p>
                    <div className="mt-2 p-3 bg-muted rounded-lg">
                      <p className="text-sm mb-2">{scenario.answer}</p>
                      <Badge variant={scenario.risk === "High" ? "destructive" : "secondary"} className="text-xs">
                        {scenario.risk} Risk
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Ask Your Own Question */}
            <div className="border-t pt-4">
              <Label htmlFor="question" className="text-sm">Ask Your Own Scenario</Label>
              <div className="flex gap-2 mt-2">
                <Input 
                  id="question"
                  placeholder="e.g., What if they get hacked and my data is stolen?"
                  className="flex-1"
                />
                <Button size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Impact Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Key Concerns for You</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
              <div>
                <p className="text-sm">Your personal data will be shared with advertisers</p>
                <p className="text-xs text-muted-foreground">Impact: Privacy loss, targeted ads</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
              <div>
                <p className="text-sm">Limited refund window creates financial risk</p>
                <p className="text-xs text-muted-foreground">Impact: Potential loss of subscription fees</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
              <div>
                <p className="text-sm">Arbitration clause limits your legal options</p>
                <p className="text-xs text-muted-foreground">Impact: Cannot join class actions, expensive disputes</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}