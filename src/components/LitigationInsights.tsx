import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Scale, TrendingUp, AlertCircle, ExternalLink, Calendar, MapPin } from "lucide-react";

export function LitigationInsights() {
  const litigationData = {
    totalCases: 127,
    activeCases: 23,
    settledCases: 89,
    dismissedCases: 15,
    averageSettlement: "$2.3M",
    riskProbability: 68
  };

  const recentCases = [
    {
      title: "Smith v. TechCorp Class Action",
      type: "Privacy Violation", 
      status: "Active",
      filed: "March 2024",
      court: "N.D. California",
      summary: "Alleges unauthorized sharing of user data with third parties without consent",
      amount: "$50M sought",
      relevance: "High"
    },
    {
      title: "Consumer Protection Bureau Investigation",
      type: "Regulatory",
      status: "Ongoing", 
      filed: "January 2024",
      court: "Federal",
      summary: "Investigation into auto-renewal billing practices and cancellation difficulties",
      amount: "TBD",
      relevance: "High"
    },
    {
      title: "Johnson v. TechCorp",
      type: "Contract Dispute",
      status: "Settled",
      filed: "August 2023", 
      court: "Delaware Superior",
      summary: "Challenge to arbitration clause enforceability in consumer contracts",
      amount: "$1.2M settlement",
      relevance: "Medium"
    }
  ];

  const complaintCategories = [
    { category: "Billing Issues", count: 1247, percentage: 45 },
    { category: "Data Privacy", count: 892, percentage: 32 },
    { category: "Service Termination", count: 445, percentage: 16 },
    { category: "Contract Terms", count: 194, percentage: 7 }
  ];

  return (
    <div className="space-y-6">
      {/* Litigation Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5" />
            Litigation Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl text-red-500">{litigationData.totalCases}</div>
              <div className="text-sm text-muted-foreground">Total Cases</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-amber-500">{litigationData.activeCases}</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-green-500">{litigationData.settledCases}</div>
              <div className="text-sm text-muted-foreground">Settled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-muted-foreground">{litigationData.averageSettlement}</div>
              <div className="text-sm text-muted-foreground">Avg Settlement</div>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Litigation Probability</span>
              <Badge variant="destructive">{litigationData.riskProbability}%</Badge>
            </div>
            <Progress value={litigationData.riskProbability} className="h-3" />
            <p className="text-sm text-muted-foreground">
              Based on current legal challenges and complaint patterns, this company has a high 
              probability of facing additional litigation.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Legal Cases */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Legal Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCases.map((case_item, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="flex items-center gap-2">
                      {case_item.title}
                      <Badge variant={case_item.status === "Active" ? "destructive" : 
                                   case_item.status === "Ongoing" ? "secondary" : "outline"}>
                        {case_item.status}
                      </Badge>
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {case_item.filed}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {case_item.court}
                      </span>
                    </div>
                  </div>
                  <Badge variant={case_item.relevance === "High" ? "destructive" : "secondary"}>
                    {case_item.relevance} Relevance
                  </Badge>
                </div>
                
                <p className="text-sm">{case_item.summary}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">{case_item.type}</Badge>
                    <span className="text-sm">{case_item.amount}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Complaint Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Consumer Complaint Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complaintCategories.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{item.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{item.count} complaints</span>
                    <Badge variant="outline">{item.percentage}%</Badge>
                  </div>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
            <div>
              <p className="text-sm">
                Billing issues represent nearly half of all complaints, indicating systemic 
                problems with auto-renewal and cancellation processes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legal Trend Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Legal Trend Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4>Increasing Risks</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Privacy regulation enforcement trending up</li>
                  <li>• Class action suits against tech companies rising</li>
                  <li>• Consumer protection agency investigations increasing</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4>Regulatory Changes</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• New state privacy laws coming into effect</li>
                  <li>• Stricter auto-renewal regulations</li>
                  <li>• Enhanced arbitration disclosure requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}