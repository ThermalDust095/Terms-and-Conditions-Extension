import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Download, Share2, Copy, Eye, EyeOff, Search, 
  FileText, Shield, AlertTriangle, CheckCircle, Info, ExternalLink,
  Bookmark, BookmarkCheck, Highlight, ZoomIn, ZoomOut
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';

interface Domain {
  id: string;
  name: string;
  type: 'saas' | 'ecommerce' | 'healthcare' | 'fintech' | 'social' | 'default';
  url: string;
  lastUpdated: Date;
  messageCount: number;
  isActive: boolean;
}

interface TermsSection {
  id: string;
  title: string;
  summary: string;
  originalText: string;
  riskLevel: 'low' | 'medium' | 'high' | 'info';
  highlights: string[];
  category: 'privacy' | 'billing' | 'liability' | 'dispute' | 'termination' | 'general';
}

interface DualViewPageProps {
  selectedDomain: Domain | null;
  onBackToChat: () => void;
}

const DualViewPage: React.FC<DualViewPageProps> = ({ selectedDomain, onBackToChat }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarkedSections, setBookmarkedSections] = useState<Set<string>>(new Set());
  const [fontSize, setFontSize] = useState(14);
  const [highlightedText, setHighlightedText] = useState('');
  const [termsData, setTermsData] = useState<TermsSection[]>([]);

  useEffect(() => {
    if (selectedDomain) {
      // Generate mock terms data based on domain type
      const mockData = generateMockTermsData(selectedDomain);
      setTermsData(mockData);
    }
  }, [selectedDomain]);

  const generateMockTermsData = (domain: Domain): TermsSection[] => {
    const baseTerms: TermsSection[] = [
      {
        id: 'privacy',
        title: 'Privacy & Data Collection',
        summary: `We collect your personal information including name, email, browsing behavior, and device data. This information is shared with our marketing partners and used for advertising. You can request deletion of your data, but some information may be retained for legal compliance purposes.`,
        originalText: `"Company may collect, process, store, and share personal information including but not limited to: (a) identifying information such as name, email address, phone number, physical address; (b) technical information including IP address, device identifiers, browser type, operating system; (c) behavioral data including pages visited, time spent, click patterns, search queries; (d) biometric information where permitted by law. Such information may be shared with third-party service providers, advertising partners, analytics companies, and other entities as detailed in our Privacy Policy. Users may request deletion of personal information subject to legal retention requirements and business purposes as defined herein."`,
        riskLevel: 'high',
        highlights: ['biometric information', 'third-party service providers', 'advertising partners', 'legal retention requirements'],
        category: 'privacy'
      },
      {
        id: 'billing',
        title: 'Billing & Auto-Renewal',
        summary: `Your subscription automatically renews unless you cancel at least 24 hours before the next billing cycle. We can change prices with 30 days notice. Refunds are only available within the first 14 days, and no refunds are given for partial months.`,
        originalText: `"Subscription fees are billed in advance on a recurring basis. Unless Customer cancels subscription at least twenty-four (24) hours prior to the end of the current billing period, subscription will automatically renew for successive periods. Company reserves the right to modify subscription fees upon thirty (30) days written notice. Refunds may be issued solely at Company's discretion within fourteen (14) days of initial subscription purchase. No refunds shall be provided for partial billing periods or for subscriptions cancelled after the fourteen (14) day window."`,
        riskLevel: 'medium',
        highlights: ['automatically renew', 'twenty-four (24) hours prior', 'modify subscription fees', 'fourteen (14) days'],
        category: 'billing'
      },
      {
        id: 'termination',
        title: 'Account Termination',
        summary: `We can terminate your account at any time for any reason, including suspected violations of our terms. You have 30 days to download your data after termination. Some content you've posted may remain visible even after account deletion.`,
        originalText: `"Company reserves the right to suspend or terminate User's account and access to the Service at any time, with or without cause, and with or without notice. Upon termination, User's right to use the Service ceases immediately. User shall have thirty (30) days from termination date to export personal data, after which such data may be permanently deleted. User-generated content may remain accessible to other users and may not be removed upon account termination. Company shall have no liability for any loss of data or content resulting from account termination."`,
        riskLevel: 'high',
        highlights: ['with or without cause', 'with or without notice', 'thirty (30) days', 'permanently deleted', 'may remain accessible'],
        category: 'termination'
      },
      {
        id: 'dispute',
        title: 'Dispute Resolution',
        summary: `All legal disputes must be resolved through binding arbitration - you cannot take us to court or join class-action lawsuits. Arbitration takes place in Delaware and follows their state laws.`,
        originalText: `"Any dispute, claim, or controversy arising out of or relating to these Terms or the Service shall be settled by binding arbitration administered by the American Arbitration Association (AAA) in accordance with its Commercial Arbitration Rules. The arbitration shall take place in New Castle County, Delaware. User waives any right to participate in class-action lawsuits or class-wide arbitration. The arbitrator's decision shall be final and binding. This agreement is governed by Delaware state law, excluding conflict of law principles."`,
        riskLevel: 'high',
        highlights: ['binding arbitration', 'waives any right', 'class-action lawsuits', 'final and binding', 'Delaware state law'],
        category: 'dispute'
      },
      {
        id: 'liability',
        title: 'Limitation of Liability',
        summary: `Our liability for any damages is limited to the amount you paid us in the last 12 months, with a maximum of $100. We're not responsible for lost profits, data loss, or indirect damages, even if we knew they might happen.`,
        originalText: `"IN NO EVENT SHALL COMPANY'S TOTAL LIABILITY TO USER FOR ALL DAMAGES, LOSSES, AND CAUSES OF ACTION EXCEED THE AMOUNT PAID BY USER TO COMPANY IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO LIABILITY, OR ONE HUNDRED DOLLARS ($100), WHICHEVER IS LESS. COMPANY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOST PROFITS, LOST DATA, OR BUSINESS INTERRUPTION, EVEN IF COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES."`,
        riskLevel: 'high',
        highlights: ['ONE HUNDRED DOLLARS ($100)', 'SHALL NOT BE LIABLE', 'CONSEQUENTIAL', 'PUNITIVE DAMAGES', 'LOST PROFITS', 'LOST DATA'],
        category: 'liability'
      }
    ];

    // Customize based on domain type
    if (domain.type === 'healthcare') {
      baseTerms.unshift({
        id: 'hipaa',
        title: 'HIPAA Compliance & Medical Data',
        summary: `Your medical information is protected under HIPAA. We only share health data with authorized healthcare providers and for treatment purposes. You have the right to access and correct your medical records.`,
        originalText: `"Protected Health Information (PHI) as defined under the Health Insurance Portability and Accountability Act (HIPAA) shall be handled in accordance with applicable federal regulations. Company may disclose PHI to healthcare providers, insurance companies, and other covered entities solely for treatment, payment, and healthcare operations. Patients maintain rights under HIPAA to access, amend, and request restrictions on use of PHI. Any breach of PHI will be reported in accordance with federal notification requirements."`,
        riskLevel: 'info',
        highlights: ['Protected Health Information', 'HIPAA', 'healthcare providers', 'treatment, payment', 'breach'],
        category: 'privacy'
      });
    }

    if (domain.type === 'fintech') {
      baseTerms.splice(1, 0, {
        id: 'financial',
        title: 'Financial Data & Compliance',
        summary: `Your financial information is encrypted and protected. We comply with banking regulations and may share data with financial institutions for fraud prevention. Investment products carry risk of loss.`,
        originalText: `"Financial data is encrypted using industry-standard AES-256 encryption and stored in compliance with PCI DSS requirements. Company may share financial information with banking partners, credit agencies, and regulatory bodies as required by law. All investment products involve risk of financial loss. Past performance does not guarantee future results. Company is registered with applicable financial regulatory authorities."`,
        riskLevel: 'medium',
        highlights: ['AES-256 encryption', 'PCI DSS', 'banking partners', 'risk of financial loss', 'regulatory authorities'],
        category: 'privacy'
      });
    }

    return baseTerms;
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <AlertTriangle className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'privacy': return <Shield className="h-4 w-4" />;
      case 'billing': return <FileText className="h-4 w-4" />;
      case 'liability': return <AlertTriangle className="h-4 w-4" />;
      case 'dispute': return <FileText className="h-4 w-4" />;
      case 'termination': return <AlertTriangle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const toggleBookmark = (sectionId: string) => {
    const newBookmarks = new Set(bookmarkedSections);
    if (newBookmarks.has(sectionId)) {
      newBookmarks.delete(sectionId);
    } else {
      newBookmarks.add(sectionId);
    }
    setBookmarkedSections(newBookmarks);
  };

  const adjustFontSize = (delta: number) => {
    setFontSize(prev => Math.max(10, Math.min(20, prev + delta)));
  };

  const highlightText = (text: string, highlights: string[], searchTerm: string) => {
    let highlightedText = text;
    
    // Highlight key terms
    highlights.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, `<mark class="bg-yellow-200 text-yellow-900">$1</mark>`);
    });

    // Highlight search term
    if (searchTerm) {
      const searchRegex = new RegExp(`(${searchTerm})`, 'gi');
      highlightedText = highlightedText.replace(searchRegex, `<mark class="bg-blue-200 text-blue-900">$1</mark>`);
    }

    return highlightedText;
  };

  const filteredTerms = termsData.filter(term => 
    searchTerm === '' || 
    term.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.originalText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!selectedDomain) return null;

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBackToChat}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Analysis
            </Button>
            <div className="text-blue-600">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg">Terms & Conditions Dual View</h2>
              <p className="text-sm text-muted-foreground">
                Side-by-side comparison for {selectedDomain.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {selectedDomain.name}
            </Badge>
            <Button variant="outline" size="sm">
              <Download className="h-3 w-3 mr-1" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-3 w-3 mr-1" />
              Share
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search terms and conditions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Font Size:</span>
            <Button variant="outline" size="sm" onClick={() => adjustFontSize(-1)}>
              <ZoomOut className="h-3 w-3" />
            </Button>
            <span className="text-sm w-8 text-center">{fontSize}</span>
            <Button variant="outline" size="sm" onClick={() => adjustFontSize(1)}>
              <ZoomIn className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <Alert className="mt-4">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-sm">
            This comparison shows AI-generated plain language summaries alongside original legal text. 
            Highlighted terms indicate key clauses that may impact your rights.
          </AlertDescription>
        </Alert>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-6">
            {filteredTerms.length === 0 ? (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="mb-2">No matching terms found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or clear the search term to see all sections.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredTerms.map((section, index) => (
                  <Card key={section.id} className="overflow-hidden">
                    <CardHeader className="bg-muted/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded ${getRiskColor(section.riskLevel)}`}>
                            {getCategoryIcon(section.category)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{section.title}</CardTitle>
                            <CardDescription className="flex items-center gap-2">
                              <span>Risk Level:</span>
                              <Badge variant={section.riskLevel === 'high' ? 'destructive' : 
                                           section.riskLevel === 'medium' ? 'secondary' : 'default'}>
                                {section.riskLevel}
                              </Badge>
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toggleBookmark(section.id)}
                          >
                            {bookmarkedSections.has(section.id) ? 
                              <BookmarkCheck className="h-4 w-4 text-blue-600" /> : 
                              <Bookmark className="h-4 w-4" />
                            }
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-0">
                      <div className="grid grid-cols-2 divide-x divide-border">
                        {/* Plain Language Summary */}
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <h4 className="text-sm font-medium">Plain Language Summary</h4>
                          </div>
                          <div 
                            className="text-sm leading-relaxed"
                            style={{ fontSize: `${fontSize}px` }}
                            dangerouslySetInnerHTML={{
                              __html: highlightText(section.summary, section.highlights, searchTerm)
                            }}
                          />
                          
                          {section.highlights.length > 0 && (
                            <div className="mt-4">
                              <h5 className="text-xs font-medium mb-2 text-muted-foreground">Key Terms:</h5>
                              <div className="flex flex-wrap gap-1">
                                {section.highlights.map((highlight, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {highlight}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Original Legal Text */}
                        <div className="p-6 bg-muted/20">
                          <div className="flex items-center gap-2 mb-4">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <h4 className="text-sm font-medium">Original Legal Text</h4>
                            <Button variant="ghost" size="sm" className="ml-auto">
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                          <div 
                            className="text-sm leading-relaxed text-muted-foreground font-mono bg-card p-3 rounded border"
                            style={{ fontSize: `${fontSize - 1}px` }}
                            dangerouslySetInnerHTML={{
                              __html: highlightText(section.originalText, section.highlights, searchTerm)
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Footer Summary */}
      <div className="border-t border-border p-4 bg-muted/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-100 border border-red-200 rounded" />
              <span>High Risk: {filteredTerms.filter(t => t.riskLevel === 'high').length}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded" />
              <span>Medium Risk: {filteredTerms.filter(t => t.riskLevel === 'medium').length}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-100 border border-green-200 rounded" />
              <span>Low Risk: {filteredTerms.filter(t => t.riskLevel === 'low').length}</span>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Showing {filteredTerms.length} of {termsData.length} sections
            {bookmarkedSections.size > 0 && ` • ${bookmarkedSections.size} bookmarked`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DualViewPage;