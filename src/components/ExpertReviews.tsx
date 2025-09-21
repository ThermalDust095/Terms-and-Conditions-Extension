import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { Star, ThumbsUp, ThumbsDown, MessageSquare, Send, Award } from "lucide-react";

export function ExpertReviews() {
  const expertReviews = [
    {
      expert: {
        name: "Dr. Sarah Chen",
        title: "Privacy Law Professor, Stanford Law",
        avatar: "/api/placeholder/40/40",
        credentials: "JD, Harvard Law",
        rating: 4.9,
        verified: true
      },
      review: {
        rating: 2,
        date: "December 18, 2024",
        content: "This terms of service contains several concerning provisions. The data sharing clause is overly broad and the arbitration requirement severely limits consumer rights. I'd recommend users carefully consider whether they need this service.",
        helpful: 142,
        notHelpful: 8,
        keyPoints: [
          "Arbitration clause is enforceable but consumer-unfriendly",
          "Data sharing provisions exceed industry norms",
          "Limited liability clauses may not hold up in all jurisdictions"
        ]
      }
    },
    {
      expert: {
        name: "Michael Rodriguez", 
        title: "Consumer Rights Attorney",
        avatar: "/api/placeholder/40/40",
        credentials: "JD, Columbia Law",
        rating: 4.7,
        verified: true
      },
      review: {
        rating: 1,
        date: "December 15, 2024", 
        content: "From a consumer protection standpoint, these terms are problematic. The auto-renewal clause combined with limited refund policy creates a 'gotcha' situation for consumers. The dispute resolution process heavily favors the company.",
        helpful: 98,
        notHelpful: 12,
        keyPoints: [
          "Auto-renewal terms may violate state consumer protection laws",
          "Refund policy is more restrictive than industry standard", 
          "Delaware arbitration requirement creates geographic barrier"
        ]
      }
    },
    {
      expert: {
        name: "Prof. James Wilson",
        title: "Tech Policy Researcher, MIT",
        avatar: "/api/placeholder/40/40", 
        credentials: "PhD, Computer Science",
        rating: 4.8,
        verified: true
      },
      review: {
        rating: 3,
        date: "December 10, 2024",
        content: "The technical aspects of data collection are concerning but not unusual for this industry. However, the lack of granular privacy controls and the broad data sharing permissions put user privacy at risk.",
        helpful: 87,
        notHelpful: 5,
        keyPoints: [
          "Data collection scope is extensive but disclosed",
          "Third-party sharing lacks user control mechanisms",
          "Data retention periods are longer than necessary"
        ]
      }
    }
  ];

  const communityStats = {
    totalReviews: 247,
    averageRating: 2.1,
    expertReviews: 8,
    communityReviews: 239
  };

  return (
    <div className="space-y-6">
      {/* Community Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Community Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl">{communityStats.totalReviews}</div>
              <div className="text-sm text-muted-foreground">Total Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-red-500">{communityStats.averageRating}/5</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-blue-500">{communityStats.expertReviews}</div>
              <div className="text-sm text-muted-foreground">Expert Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">{communityStats.communityReviews}</div>
              <div className="text-sm text-muted-foreground">Community</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expert Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Verified Expert Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {expertReviews.map((item, index) => (
              <div key={index} className="space-y-4">
                {/* Expert Info */}
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={item.expert.avatar} alt={item.expert.name} />
                    <AvatarFallback>
                      {item.expert.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4>{item.expert.name}</h4>
                      {item.expert.verified && (
                        <Badge variant="secondary" className="text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          Verified Expert
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{item.expert.title}</p>
                    <p className="text-xs text-muted-foreground">{item.expert.credentials}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star 
                          key={star} 
                          className={`h-3 w-3 ${star <= item.review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-2">{item.review.date}</span>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="space-y-3">
                  <p className="text-sm">{item.review.content}</p>
                  
                  {/* Key Points */}
                  <div>
                    <h5 className="text-sm mb-2">Key Legal Points:</h5>
                    <ul className="space-y-1">
                      {item.review.keyPoints.map((point, pointIndex) => (
                        <li key={pointIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Review Actions */}
                  <div className="flex items-center gap-4 pt-2">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful ({item.review.helpful})
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      Not Helpful ({item.review.notHelpful})
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
                
                {index < expertReviews.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community Contributions */}
      <Card>
        <CardHeader>
          <CardTitle>Community Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">@legal_eagle</span>
                    <Badge variant="outline" className="text-xs">Community</Badge>
                  </div>
                  <p className="text-sm mt-1">
                    Found a clause buried in section 12.3 about data retention that wasn't mentioned in the summary. They keep deleted data for "business purposes" indefinitely.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      23
                    </Button>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>TC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">@tech_consumer</span>
                    <Badge variant="outline" className="text-xs">Community</Badge>
                  </div>
                  <p className="text-sm mt-1">
                    Tried to cancel my subscription and hit multiple roadblocks. The "30 day notice" requirement isn't clearly communicated during signup.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      31
                    </Button>
                    <span className="text-xs text-muted-foreground">1 day ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contribute Your Review */}
      <Card>
        <CardHeader>
          <CardTitle>Share Your Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Your Rating:</span>
              <div className="flex gap-1">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-gray-300 hover:text-yellow-400 cursor-pointer" />
                ))}
              </div>
            </div>
            <Textarea 
              placeholder="Share your experience with these terms of service. Did you encounter any issues? What should other users know?"
              className="min-h-24"
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                Your review will help other users make informed decisions
              </p>
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Submit Review
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}