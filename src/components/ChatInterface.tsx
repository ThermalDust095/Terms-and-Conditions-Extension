import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ArrowLeft, Scale, Shield, Globe, Users, FileText, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  metadata?: any;
}

interface ChatConfig {
  domain: string;
  type: 'saas' | 'ecommerce' | 'healthcare' | 'fintech' | 'social' | 'default';
  title: string;
  subtitle: string;
  primaryColor: string;
  icon: React.ReactNode;
  features: string[];
  placeholder: string;
  initialMessages: Message[];
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

interface ChatInterfaceProps {
  selectedDomain: Domain | null;
  onBackToDomains: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ selectedDomain, onBackToDomains }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [chatConfig, setChatConfig] = useState<ChatConfig | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Terms and Conditions domain detection with if clauses
  const detectDomainType = (domain: Domain): ChatConfig => {
    // SaaS Platform Terms
    if (domain.type === 'saas' || domain.url.includes('saas') || domain.url.includes('app') || 
        domain.url.includes('platform') || domain.url.includes('software')) {
      return {
        domain: domain.url,
        type: 'saas',
        title: 'SaaS Terms Assistant',
        subtitle: 'Help with software licensing, usage policies, and service terms',
        primaryColor: 'text-blue-600',
        icon: <Scale className="h-5 w-5" />,
        features: ['Service Terms', 'Data Processing', 'Usage Limits', 'Compliance'],
        placeholder: 'Ask about service terms, data usage, licensing, or compliance...',
        initialMessages: [
          {
            id: '1',
            content: 'Welcome! I\'m here to help you understand our Terms of Service, Privacy Policy, and usage guidelines. I can explain software licensing, data processing policies, service limitations, and compliance requirements. What would you like to know about our terms?',
            sender: 'bot',
            timestamp: new Date()
          }
        ]
      };
    }
    
    // E-commerce Terms
    if (domain.type === 'ecommerce' || domain.url.includes('shop') || domain.url.includes('store') || 
        domain.url.includes('commerce') || domain.url.includes('retail') || domain.url.includes('buy')) {
      return {
        domain: domain.url,
        type: 'ecommerce',
        title: 'E-commerce Terms Assistant',
        subtitle: 'Help with purchase terms, returns, shipping, and consumer rights',
        primaryColor: 'text-green-600',
        icon: <Globe className="h-5 w-5" />,
        features: ['Purchase Terms', 'Return Policy', 'Shipping', 'Consumer Rights'],
        placeholder: 'Ask about purchase terms, returns, shipping policies, or warranties...',
        initialMessages: [
          {
            id: '1',
            content: 'Hello! I can help you understand our Terms of Sale, Return Policy, Shipping Terms, and Consumer Rights. Whether you have questions about purchases, refunds, warranties, or delivery policies, I\'m here to provide clear explanations. What would you like to know?',
            sender: 'bot',
            timestamp: new Date()
          }
        ]
      };
    }
    
    // Healthcare Terms
    if (domain.type === 'healthcare' || domain.url.includes('health') || domain.url.includes('medical') || 
        domain.url.includes('clinic') || domain.url.includes('hospital') || domain.url.includes('pharma')) {
      return {
        domain: domain.url,
        type: 'healthcare',
        title: 'Healthcare Terms Assistant',
        subtitle: 'Help with HIPAA compliance, medical terms, and patient rights',
        primaryColor: 'text-red-600',
        icon: <Shield className="h-5 w-5" />,
        features: ['HIPAA Compliance', 'Patient Rights', 'Medical Terms', 'Privacy'],
        placeholder: 'Ask about HIPAA, patient rights, medical policies, or privacy terms...',
        initialMessages: [
          {
            id: '1',
            content: 'Welcome to our healthcare terms assistant. I can help you understand HIPAA compliance, patient rights, medical service terms, privacy policies, and healthcare regulations. Your privacy and understanding of your rights are our priority. How can I assist you?',
            sender: 'bot',
            timestamp: new Date()
          }
        ]
      };
    }
    
    // FinTech Terms
    if (domain.type === 'fintech' || domain.url.includes('bank') || domain.url.includes('finance') || 
        domain.url.includes('payment') || domain.url.includes('crypto') || domain.url.includes('invest')) {
      return {
        domain: domain.url,
        type: 'fintech',
        title: 'FinTech Terms Assistant',
        subtitle: 'Help with financial terms, regulations, and compliance requirements',
        primaryColor: 'text-purple-600',
        icon: <Shield className="h-5 w-5" />,
        features: ['Financial Terms', 'Compliance', 'Risk Disclosure', 'Regulations'],
        placeholder: 'Ask about financial terms, regulations, compliance, or risk disclosures...',
        initialMessages: [
          {
            id: '1',
            content: 'Hello! I\'m here to help you understand our financial terms, regulatory compliance, risk disclosures, and investment policies. I can explain complex financial language in simple terms and ensure you understand your rights and obligations. What financial terms can I clarify for you?',
            sender: 'bot',
            timestamp: new Date()
          }
        ]
      };
    }
    
    // Social Media Terms
    if (domain.type === 'social' || domain.url.includes('social') || domain.url.includes('community') || 
        domain.url.includes('forum') || domain.url.includes('network') || domain.url.includes('connect')) {
      return {
        domain: domain.url,
        type: 'social',
        title: 'Social Media Terms Assistant',
        subtitle: 'Help with community guidelines, content policies, and user rights',
        primaryColor: 'text-pink-600',
        icon: <Users className="h-5 w-5" />,
        features: ['Community Guidelines', 'Content Policy', 'User Rights', 'Moderation'],
        placeholder: 'Ask about community guidelines, content policies, or user rights...',
        initialMessages: [
          {
            id: '1',
            content: 'Welcome to our community terms assistant! I can help you understand our Community Guidelines, Content Policy, user rights, moderation policies, and acceptable use terms. I\'m here to ensure you have a safe and positive experience. What would you like to know about our community rules?',
            sender: 'bot',
            timestamp: new Date()
          }
        ]
      };
    }
    
    // Default Terms Assistant for unspecified domains
    return {
      domain: domain.url,
      type: 'default',
      title: 'Terms & Conditions Assistant',
      subtitle: 'Help with general terms, policies, and legal documents',
      primaryColor: 'text-gray-600',
      icon: <FileText className="h-5 w-5" />,
      features: ['Terms of Service', 'Privacy Policy', 'Legal Terms', 'User Rights'],
      placeholder: 'Ask about our terms of service, privacy policy, or any legal questions...',
      initialMessages: [
        {
          id: '1',
          content: 'Hello! I\'m your Terms & Conditions assistant. I can help you understand our Terms of Service, Privacy Policy, and other legal documents. I\'m here to make complex legal language clear and answer any questions about your rights and our policies. How can I help you today?',
          sender: 'bot',
          timestamp: new Date()
        }
      ]
    };
  };

  // Initialize chat when domain is selected
  useEffect(() => {
    if (selectedDomain) {
      const config = detectDomainType(selectedDomain);
      setChatConfig(config);
      setMessages(config.initialMessages);
    }
  }, [selectedDomain]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || !chatConfig) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response based on domain type for terms and conditions
    setTimeout(() => {
      let botResponse = '';
      
      if (chatConfig.type === 'saas') {
        botResponse = 'I can help clarify our service terms, data processing policies, usage limitations, or compliance requirements. Could you be more specific about which aspect of our terms you\'d like me to explain?';
      } else if (chatConfig.type === 'ecommerce') {
        botResponse = 'I can explain our purchase terms, return policy, shipping conditions, or warranty information. Which specific policy would you like me to clarify for you?';
      } else if (chatConfig.type === 'healthcare') {
        botResponse = 'I can help you understand HIPAA compliance, patient rights, medical service terms, or our privacy policies. What healthcare-related terms would you like me to explain?';
      } else if (chatConfig.type === 'fintech') {
        botResponse = 'I can clarify financial terms, regulatory compliance, risk disclosures, or investment policies. Which financial aspect would you like me to explain in more detail?';
      } else if (chatConfig.type === 'social') {
        botResponse = 'I can help you understand our community guidelines, content policies, user rights, or moderation procedures. What community-related terms would you like clarification on?';
      } else {
        botResponse = 'I can help explain our Terms of Service, Privacy Policy, or any other legal documents. What specific terms or policies would you like me to clarify?';
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
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

  if (!chatConfig || !selectedDomain) return null;

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
            <div className={`${chatConfig.primaryColor}`}>
              {chatConfig.icon}
            </div>
            <div>
              <h2 className="text-lg font-medium">{chatConfig.title}</h2>
              <p className="text-sm text-muted-foreground">{chatConfig.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {selectedDomain.name}
            </Badge>
            <Badge variant={selectedDomain.isActive ? 'default' : 'secondary'} className="text-xs">
              {selectedDomain.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>
        
        {/* Domain Info */}
        <div className="bg-muted/50 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span className="text-sm">Legal Information Assistant</span>
          </div>
          <p className="text-xs text-muted-foreground">
            This AI assistant helps users understand terms and conditions. Responses are for informational purposes only and do not constitute legal advice.
          </p>
        </div>
        
        {/* Features */}
        <div className="flex gap-2 flex-wrap">
          {chatConfig.features.map((feature) => (
            <Badge key={feature} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground ml-auto'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.sender === 'bot' ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={chatConfig.placeholder}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;