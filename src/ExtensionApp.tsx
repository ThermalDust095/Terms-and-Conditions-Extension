import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Progress } from "./components/ui/progress";
import { Separator } from "./components/ui/separator";
import { Alert, AlertDescription } from "./components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { 
  FileText, 
  Globe,
  AlertTriangle,
  XCircle,
  DollarSign,
  Scale,
  Shield,
  ExternalLink,
  Eye,
  Scan,
  RefreshCw
} from "lucide-react";

// Import other components
import { TermsSummary } from "./components/TermsSummary";
import { RiskAnalysis } from "./components/RiskAnalysis";
import { FlowchartViewer } from "./components/FlowchartViewer";
import { LitigationInsights } from "./components/LitigationInsights";
import { ExpertReviews } from "./components/ExpertReviews";

interface SiteData {
  domain: string;
  name: string;
  lastScanned: string;
  riskScore: number;
  status: string;
  hasTerms: boolean;
  termsUrl?: string;
}

export default function ExtensionApp() {
  const [currentSite, setCurrentSite] = useState<SiteData | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Get current tab information
    getCurrentTab();
  }, []);

  const getCurrentTab = async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab?.url) {
        const url = new URL(tab.url);
        const domain = url.hostname;
        
        // Check if we have cached data for this site
        const cachedData = await chrome.storage.local.get([domain]);
        
        if (cachedData[domain]) {
          setCurrentSite(cachedData[domain]);
        } else {
          // Set basic site info
          setCurrentSite({
            domain,
            name: domain.replace('www.', '').split('.')[0].toUpperCase(),
            lastScanned: 'Never',
            riskScore: 0,
            status: 'Not Analyzed',
            hasTerms: false
          });
        }
      }
    } catch (error) {
      console.error('Error getting current tab:', error);
    }
  };

  const scanCurrentSite = async () => {
    if (!currentSite) return;
    
    setIsScanning(true);
    
    try {
      // Inject content script to scan for terms
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (tab.id) {
        const results = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: scanForTermsAndConditions,
        });

        if (results[0]?.result) {
          const scanResult = results[0].result;
          
          // Simulate AI analysis (in a real extension, this would call an API)
          const analysisResult = await simulateAIAnalysis(scanResult);
          
          const updatedSite: SiteData = {
            ...currentSite,
            ...analysisResult,
            lastScanned: new Date().toLocaleString(),
          };
          
          // Cache the results
          await chrome.storage.local.set({ [currentSite.domain]: updatedSite });
          setCurrentSite(updatedSite);
        }
      }
    } catch (error) {
      console.error('Error scanning site:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const simulateAIAnalysis = async (scanResult: any): Promise<Partial<SiteData>> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis based on scan results
    const hasTerms = scanResult.termsLinks.length > 0;
    const riskScore = hasTerms ? Math.floor(Math.random() * 40) + 60 : 0; // 60-100 for sites with terms
    
    return {
      hasTerms,
      termsUrl: scanResult.termsLinks[0]?.href,
      riskScore,
      status: riskScore > 80 ? 'High Risk' : riskScore > 50 ? 'Medium Risk' : riskScore > 0 ? 'Low Risk' : 'No Terms Found'
    };
  };

  const riskBreakdown = [
    { category: "Privacy & Data", score: 85, icon: Shield, urgent: true },
    { category: "Financial Terms", score: 65, icon: DollarSign, urgent: false },
    { category: "Legal Disputes", score: 90, icon: Scale, urgent: true },
  ];

  const problematicClauses = [
    {
      type: "Privacy Risk",
      severity: "high" as const,
      issue: "Your data will be shared with third-party advertisers",
      impact: "Loss of privacy, targeted advertising"
    },
    {
      type: "Legal Risk", 
      severity: "high" as const,
      issue: "Mandatory arbitration in Delaware only",
      impact: "Cannot join class-action lawsuits"
    },
    {
      type: "Financial Risk",
      severity: "medium" as const, 
      issue: "Auto-renewal with 30-day cancellation requirement",
      impact: "Risk of unwanted charges"
    },
    {
      type: "Data Risk",
      severity: "high" as const,
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

  if (!currentSite) {
    return (
      <div className="w-80 max-h-96 bg-background p-4 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 max-h-96 bg-background overflow-hidden">
      {/* Extension Header */}
      <div className="sticky top-0 bg-background border-b p-3 z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-6 w-6 bg-primary rounded flex items-center justify-center">
            <FileText className="h-3 w-3 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-medium">T&C AI Analyzer</h1>
          </div>
        </div>

        {/* Current Site */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Globe className="h-3 w-3 text-muted-foreground" />
            <div>
              <h3 className="text-xs font-medium">{currentSite.name}</h3>
              <p className="text-xs text-muted-foreground">{currentSite.domain}</p>
            </div>
          </div>
          <Badge variant={currentSite.status === "High Risk" ? "destructive" : "secondary"} className="text-xs">
            {currentSite.status}
          </Badge>
        </div>

        {/* Scan Button */}
        <Button 
          onClick={scanCurrentSite} 
          disabled={isScanning}
          className="w-full text-xs h-8"
          size="sm"
        >
          {isScanning ? (
            <>
              <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Scan className="h-3 w-3 mr-1" />
              Scan This Site
            </>
          )}
        </Button>
      </div>

      {currentSite.hasTerms ? (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-3 mx-3 mt-2">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="analysis" className="text-xs">Analysis</TabsTrigger>
            <TabsTrigger value="details" className="text-xs">Details</TabsTrigger>
          </TabsList>

          <div className="overflow-y-auto" style={{ height: 'calc(100% - 120px)' }}>
            <TabsContent value="overview" className="p-3 space-y-3 mt-0">
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

              {/* Quick Recommendation */}
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  <strong>Recommendation:</strong> High privacy and legal risks detected. 
                  Consider alternatives or proceed with extreme caution.
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="analysis" className="p-3 space-y-3 mt-0">
              {/* Flagged Clauses */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">⚠️ Major Issues Found</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {problematicClauses.slice(0, 2).map((clause, index) => (
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
            </TabsContent>

            <TabsContent value="details" className="p-3 space-y-3 mt-0">
              <div className="text-xs text-muted-foreground space-y-2">
                <p><strong>Last Scanned:</strong> {currentSite.lastScanned}</p>
                {currentSite.termsUrl && (
                  <p><strong>Terms URL:</strong> <a href={currentSite.termsUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View Terms</a></p>
                )}
                <p><strong>Analysis Method:</strong> AI-powered content analysis</p>
                <p><strong>Confidence:</strong> 94%</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      ) : (
        <div className="p-3 text-center">
          <div className="py-8">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-sm font-medium mb-2">No Terms Found</h3>
            <p className="text-xs text-muted-foreground mb-4">
              {currentSite.lastScanned === 'Never' 
                ? 'Click "Scan This Site" to analyze terms and conditions'
                : 'No terms and conditions were found on this site'
              }
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t p-2 bg-background">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 text-xs h-7">
            <Eye className="h-3 w-3 mr-1" />
            Full Report
          </Button>
          <Button variant="outline" size="sm" className="flex-1 text-xs h-7">
            <ExternalLink className="h-3 w-3 mr-1" />
            Website
          </Button>
        </div>
      </div>
    </div>
  );
}

// Function to be injected into the page
function scanForTermsAndConditions() {
  const termsKeywords = [
    'terms of service', 'terms and conditions', 'terms of use', 'user agreement',
    'privacy policy', 'legal', 'terms', 'conditions', 'agreement', 'policy'
  ];

  const links = Array.from(document.querySelectorAll('a[href]'));
  const termsLinks = links.filter(link => {
    const text = link.textContent?.toLowerCase() || '';
    const href = link.getAttribute('href')?.toLowerCase() || '';
    
    return termsKeywords.some(keyword => 
      text.includes(keyword) || href.includes(keyword.replace(/\s+/g, ''))
    );
  });

  // Look for terms content on the current page
  const pageText = document.body.textContent?.toLowerCase() || '';
  const hasTermsContent = termsKeywords.some(keyword => pageText.includes(keyword));

  return {
    termsLinks: termsLinks.map(link => ({
      text: link.textContent?.trim(),
      href: link.href
    })),
    hasTermsContent,
    pageTitle: document.title,
    url: window.location.href
  };
}