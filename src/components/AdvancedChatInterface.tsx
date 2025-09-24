import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Bot, User, ArrowLeft, Scale, Shield, Globe, Users, FileText, AlertTriangle,
  Eye, EyeOff, BarChart3, Gavel, GitFork, Star, TrendingUp, TrendingDown,
  AlertCircle, CheckCircle, XCircle, Info, Download, Share2, Zap, Brain, GitBranch
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import FlowchartView from './FlowchartView';
import DualViewPage from './DualViewPage';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  metadata?: {
    type?: 'summary' | 'analysis' | 'scenario' | 'litigation' | 'expert';
    data?: any;
  };
}

interface Domain {
  id: string;
  name: string;
  type: 'saas' | 'ecommerce' | 'healthcare' | 'fintech' | 'social' | 'default';
  url: string;
  lastUpdated: Date;
  messageCount: number;
  isActive: boolean;
}

interface TCAnalysis {
  riskScore: number;
  keyTerms: {
    privacy: string[];
    arbitration: string[];
    autoRenewals: string[];
    dataRetention: string[];
    liability: string[];
  };
  redFlags: string[];
  lastAnalyzed: Date;
  sourceUrl: string;
}

interface LitigationData {
  lawsuitCount: number;
  complaintCount: number;
  settlementAmount?: number;
  reputationScore: number;
  recentCases: {
    title: string;
    date: Date;
    status: 'ongoing' | 'settled' | 'dismissed';
    severity: 'low' | 'medium' | 'high';
  }[];
}

interface ExpertReview {
  id: string;
  expert: string;
  rating: number;
  review: string;
  date: Date;
  verified: boolean;
}

interface AdvancedChatInterfaceProps {
  selectedDomain: Domain | null;
  onBackToDomains: () => void;
}

const AdvancedChatInterface: React.FC<AdvancedChatInterfaceProps> = ({ selectedDomain, onBackToDomains }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [showOriginalText, setShowOriginalText] = useState(false);
  const [showDualView, setShowDualView] = useState(false);
  const [tcAnalysis, setTCAnalysis] = useState<TCAnalysis | null>(null);
  const [litigationData, setLitigationData] = useState<LitigationData | null>(null);
  const [expertReviews, setExpertReviews] = useState<ExpertReview[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data generation based on domain type
  useEffect(() => {
    if (selectedDomain) {
      setIsAnalyzing(true);
      
      // Simulate AI analysis delay
      setTimeout(() => {
        // Generate mock T&C analysis
        const analysis: TCAnalysis = generateMockAnalysis(selectedDomain);
        setTCAnalysis(analysis);
        
        // Generate mock litigation data
        const litigation: LitigationData = generateMockLitigation(selectedDomain);
        setLitigationData(litigation);
        
        // Generate mock expert reviews
        const reviews: ExpertReview[] = generateMockReviews(selectedDomain);
        setExpertReviews(reviews);
        
        // Add initial bot message with analysis
        const initialMessage: Message = {
          id: '1',
          content: `I've completed a comprehensive analysis of ${selectedDomain.name}'s Terms & Conditions. Here's what I found:\n\n**Risk Score: ${analysis.riskScore}/100**\n\n**Key Findings:**\n• ${analysis.redFlags.length} potential red flags identified\n• ${analysis.keyTerms.privacy.length} privacy-related clauses\n• ${analysis.keyTerms.arbitration.length} arbitration clauses\n• Risk level: ${analysis.riskScore > 70 ? 'High' : analysis.riskScore > 40 ? 'Medium' : 'Low'}\n\nYou can explore detailed analysis in the tabs above or ask me specific questions about the terms.`,
          sender: 'bot',
          timestamp: new Date(),
          metadata: {
            type: 'analysis',
            data: analysis
          }
        };
        
        setMessages([initialMessage]);
        setIsAnalyzing(false);
      }, 2000);
    }
  }, [selectedDomain]);

  const generateMockAnalysis = (domain: Domain): TCAnalysis => {
    const baseRisk = domain.type === 'healthcare' ? 75 : 
                    domain.type === 'fintech' ? 80 : 
                    domain.type === 'social' ? 65 : 50;
    
    return {
      riskScore: baseRisk + Math.floor(Math.random() * 20) - 10,
      keyTerms: {
        privacy: ['Data collection practices', 'Third-party sharing', 'Cookie usage', 'Personal information retention'],
        arbitration: ['Mandatory arbitration clause', 'Class action waiver', 'Dispute resolution process'],
        autoRenewals: ['Automatic subscription renewal', 'Cancellation policy', 'Refund terms'],
        dataRetention: ['Data storage duration', 'Deletion policies', 'Backup procedures'],
        liability: ['Limitation of liability', 'Indemnification clauses', 'Service availability']
      },
      redFlags: [
        'Broad data collection permissions',
        'Mandatory arbitration with class action waiver',
        'Unilateral terms modification rights',
        'Vague liability limitations'
      ],
      lastAnalyzed: new Date(),
      sourceUrl: `https://${domain.url}/terms`
    };
  };

  const generateMockLitigation = (domain: Domain): LitigationData => {
    return {
      lawsuitCount: Math.floor(Math.random() * 10) + 1,
      complaintCount: Math.floor(Math.random() * 50) + 10,
      settlementAmount: Math.floor(Math.random() * 1000000) + 100000,
      reputationScore: Math.floor(Math.random() * 40) + 60,
      recentCases: [
        {
          title: 'Privacy Policy Violation Class Action',
          date: new Date('2024-01-10'),
          status: 'ongoing',
          severity: 'high'
        },
        {
          title: 'Terms of Service Dispute',
          date: new Date('2023-11-15'),
          status: 'settled',
          severity: 'medium'
        }
      ]
    };
  };

  const generateMockReviews = (domain: Domain): ExpertReview[] => {
    return [
      {
        id: '1',
        expert: 'Dr. Sarah Chen, Privacy Law Expert',
        rating: 3,
        review: 'The privacy policy contains concerning broad data collection clauses. Users should be aware of extensive data sharing with third parties.',
        date: new Date('2024-01-15'),
        verified: true
      },
      {
        id: '2',
        expert: 'Michael Rodriguez, Consumer Rights Attorney',
        rating: 2,
        review: 'Mandatory arbitration clause significantly limits consumer rights. The class action waiver is particularly problematic.',
        date: new Date('2024-01-12'),
        verified: true
      }
    ];
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const query = inputValue.toLowerCase();
    setInputValue('');

    // Simulate AI response with contextual analysis
    setTimeout(() => {
      let botResponse = '';
      let metadata = {};

      // Handle scenario-based questions
      if (query.includes('delete') && query.includes('account')) {
        botResponse = `**Account Deletion Scenario Analysis:**\n\nBased on ${selectedDomain?.name}'s terms:\n\n✅ **Right to Delete:** You can request account deletion\n⚠️ **Data Retention:** Some data may be retained for legal compliance (up to 7 years)\n❌ **Content Ownership:** Posted content may remain on the platform\n⏱️ **Processing Time:** 30-90 days for complete deletion\n\n**Risk Assessment:** Medium - Some data persistence concerns`;
        metadata = { type: 'scenario' };
      } else if (query.includes('refund') || query.includes('cancel')) {
        botResponse = `**Refund Policy Analysis:**\n\n📋 **Cancellation Window:** 14 days from purchase\n💰 **Refund Eligibility:** Partial refunds for unused services\n⚡ **Auto-renewal:** Cancellation must be done 24 hours before renewal\n🔒 **Restrictions:** No refunds for premium features after 7 days of use\n\n**Risk Level:** High - Limited refund options`;
        metadata = { type: 'scenario' };
      } else if (query.includes('privacy') || query.includes('data')) {
        botResponse = `**Privacy Analysis:**\n\nKey concerns with ${selectedDomain?.name}'s data practices:\n\n🔴 **High Risk Areas:**\n• Broad data collection including biometric data\n• Sharing with 200+ third-party partners\n• No clear data deletion timeline\n\n🟡 **Medium Risk:**\n• International data transfers\n• Analytics tracking\n\n🟢 **Positive Aspects:**\n• GDPR compliance\n• User control over marketing preferences`;
        metadata = { type: 'analysis' };
      } else {
        botResponse = `I can help you understand specific aspects of the terms. Try asking about:\n\n• Account deletion procedures\n• Refund and cancellation policies\n• Data privacy practices\n• Arbitration clauses\n• Liability limitations\n\nOr explore the analysis tabs above for detailed breakdowns.`;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        metadata
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-red-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getRiskBadgeVariant = (score: number) => {
    if (score >= 70) return 'destructive';
    if (score >= 40) return 'secondary';
    return 'default';
  };

  if (!selectedDomain) return null;

  // Show dual view page if requested
  if (showDualView) {
    return (
      <DualViewPage 
        selectedDomain={selectedDomain} 
        onBackToChat={() => setShowDualView(false)}
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBackToDomains}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="text-blue-600">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg">AI-Powered T&C Analysis</h2>
              <p className="text-sm text-muted-foreground">Comprehensive terms analysis for {selectedDomain.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {selectedDomain.name}
            </Badge>
            {tcAnalysis && (
              <Badge variant={getRiskBadgeVariant(tcAnalysis.riskScore)} className="text-xs">
                Risk: {tcAnalysis.riskScore}/100
              </Badge>
            )}
          </div>
        </div>

        {/* Analysis Status */}
        {isAnalyzing && (
          <Alert className="mb-4">
            <Zap className="h-4 w-4" />
            <AlertDescription>
              AI is analyzing Terms & Conditions from DOM extraction and cross-referencing with legal databases...
            </AlertDescription>
          </Alert>
        )}

        {/* Quick Stats */}
        {tcAnalysis && litigationData && (
          <div className="grid grid-cols-4 gap-4 mb-4">
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className={`h-4 w-4 ${getRiskColor(tcAnalysis.riskScore)}`} />
                <div>
                  <p className="text-xs text-muted-foreground">Risk Score</p>
                  <p className="text-sm">{tcAnalysis.riskScore}/100</p>
                </div>
              </div>
            </Card>
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <Gavel className="h-4 w-4 text-red-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Active Lawsuits</p>
                  <p className="text-sm">{litigationData.lawsuitCount}</p>
                </div>
              </div>
            </Card>
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-yellow-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Complaints</p>
                  <p className="text-sm">{litigationData.complaintCount}</p>
                </div>
              </div>
            </Card>
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Expert Rating</p>
                  <p className="text-sm">{expertReviews.length > 0 ? `${(expertReviews.reduce((sum, r) => sum + r.rating, 0) / expertReviews.length).toFixed(1)}/5` : 'N/A'}</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Section */}
        <div className="w-1/2 flex flex-col border-r border-border">
          <div className="p-4 border-b border-border">
            <h3 className="font-medium">AI Assistant</h3>
            <p className="text-xs text-muted-foreground">Ask questions about terms, scenarios, or specific clauses</p>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[90%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.sender === 'bot' ? (
                        <Bot className="h-3 w-3" />
                      ) : (
                        <User className="h-3 w-3" />
                      )}
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                      {message.metadata?.type && (
                        <Badge variant="outline" className="text-xs py-0 px-1">
                          {message.metadata.type}
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm whitespace-pre-line">{message.content}</div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about account deletion, refunds, privacy policies..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Analysis Panel */}
        <div className="w-1/2 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
              <TabsTrigger value="litigation">Litigation</TabsTrigger>
              <TabsTrigger value="experts">Expert Reviews</TabsTrigger>
              <TabsTrigger value="flowchart">Flowchart</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="flex-1 overflow-hidden">
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-medium">Terms Summary</h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowOriginalText(!showOriginalText)}
                    >
                      {showOriginalText ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      {showOriginalText ? 'Hide Original' : 'Show Original'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      Export
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => setShowDualView(true)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Dual View
                    </Button>
                  </div>
                </div>
                
                <ScrollArea className="flex-1 p-4">
                  {showOriginalText ? (
                    <div className="grid grid-cols-2 gap-4 h-full">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Plain Language Summary</h4>
                        <div className="text-sm space-y-2 bg-muted/50 p-3 rounded">
                          <p><strong>Data Collection:</strong> The service collects extensive personal data including browsing habits, device information, and biometric data.</p>
                          <p><strong>Dispute Resolution:</strong> All disputes must be resolved through arbitration - you cannot join class-action lawsuits.</p>
                          <p><strong>Service Changes:</strong> Terms can be modified at any time with 30-day notice.</p>
                          <p><strong>Account Termination:</strong> Your account can be terminated for violations with limited appeal options.</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Original Legal Text</h4>
                        <div className="text-xs space-y-2 bg-card p-3 rounded border text-muted-foreground">
                          <p>"User agrees that any dispute arising from or relating to the subject matter of these Terms shall be governed by the laws of Delaware, excluding its conflict of laws provisions..."</p>
                          <p>"Company may collect, process, and share personal information including but not limited to device identifiers, location data, biometric information..."</p>
                          <p>"Company reserves the right to modify these Terms at any time, effective thirty (30) days after posting notice..."</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h4 className="font-medium">Key Terms Breakdown</h4>
                      {tcAnalysis && Object.entries(tcAnalysis.keyTerms).map(([category, terms]) => (
                        <div key={category} className="space-y-2">
                          <h5 className="text-sm font-medium capitalize flex items-center gap-2">
                            {category === 'privacy' && <Shield className="h-3 w-3" />}
                            {category === 'arbitration' && <Gavel className="h-3 w-3" />}
                            {category === 'autoRenewals' && <AlertCircle className="h-3 w-3" />}
                            {category.replace(/([A-Z])/g, ' $1')}
                          </h5>
                          <ul className="text-xs space-y-1">
                            {terms.map((term, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-current rounded-full" />
                                {term}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="risks" className="flex-1 overflow-hidden">
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium">Risk Analysis & Red Flags</h3>
                </div>
                
                <ScrollArea className="flex-1 p-4">
                  {tcAnalysis && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Overall Risk Score</span>
                          <span className={`text-sm font-medium ${getRiskColor(tcAnalysis.riskScore)}`}>
                            {tcAnalysis.riskScore}/100
                          </span>
                        </div>
                        <Progress value={tcAnalysis.riskScore} className="h-2" />
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          Red Flags Identified
                        </h4>
                        <div className="space-y-2">
                          {tcAnalysis.redFlags.map((flag, idx) => (
                            <Alert key={idx} className="border-red-200">
                              <XCircle className="h-4 w-4 text-red-600" />
                              <AlertDescription className="text-sm">
                                {flag}
                              </AlertDescription>
                            </Alert>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">What-If Scenarios</h4>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <AlertCircle className="h-3 w-3 mr-2" />
                            What if I want to delete my account?
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <AlertCircle className="h-3 w-3 mr-2" />
                            What if I need a refund?
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <AlertCircle className="h-3 w-3 mr-2" />
                            What if there's a data breach?
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <AlertCircle className="h-3 w-3 mr-2" />
                            What if I disagree with changes?
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="litigation" className="flex-1 overflow-hidden">
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium">Litigation & Reputation Insights</h3>
                </div>
                
                <ScrollArea className="flex-1 p-4">
                  {litigationData && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Card className="p-3">
                          <h4 className="text-sm font-medium mb-2">Legal Activity</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Active Lawsuits</span>
                              <span className="text-red-600">{litigationData.lawsuitCount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Total Complaints</span>
                              <span>{litigationData.complaintCount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Settlement Amount</span>
                              <span>${(litigationData.settlementAmount! / 1000000).toFixed(1)}M</span>
                            </div>
                          </div>
                        </Card>
                        
                        <Card className="p-3">
                          <h4 className="text-sm font-medium mb-2">Reputation Score</h4>
                          <div className="flex items-center gap-2">
                            <Progress value={litigationData.reputationScore} className="flex-1 h-2" />
                            <span className="text-sm">{litigationData.reputationScore}/100</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Based on consumer reviews and legal disputes
                          </p>
                        </Card>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Recent Legal Cases</h4>
                        <div className="space-y-2">
                          {litigationData.recentCases.map((case_, idx) => (
                            <Card key={idx} className="p-3">
                              <div className="flex items-start justify-between mb-2">
                                <h5 className="text-sm font-medium">{case_.title}</h5>
                                <Badge variant={
                                  case_.severity === 'high' ? 'destructive' :
                                  case_.severity === 'medium' ? 'secondary' : 'default'
                                } className="text-xs">
                                  {case_.severity}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{case_.date.toLocaleDateString()}</span>
                                <span>•</span>
                                <span className="capitalize">{case_.status}</span>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>

                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                          Litigation data is aggregated from public court records and may not reflect all ongoing legal matters.
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="experts" className="flex-1 overflow-hidden">
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium">Expert Reviews & Community</h3>
                </div>
                
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {expertReviews.map((review) => (
                      <Card key={review.id} className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-medium">{review.expert}</h4>
                            {review.verified && (
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{review.review}</p>
                        <p className="text-xs text-muted-foreground">
                          {review.date.toLocaleDateString()}
                        </p>
                      </Card>
                    ))}

                    <Card className="p-4 border-dashed">
                      <div className="text-center">
                        <h4 className="font-medium mb-2">Contribute Your Expertise</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Help the community by sharing your legal expertise or consumer experience
                        </p>
                        <Button size="sm">
                          <Share2 className="h-3 w-3 mr-2" />
                          Add Review
                        </Button>
                      </div>
                    </Card>
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="flowchart" className="flex-1 overflow-hidden">
              <FlowchartView domain={selectedDomain.name} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdvancedChatInterface;