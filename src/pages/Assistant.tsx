import { useState, useRef, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User,
  Sparkles,
  TrendingUp,
  PiggyBank,
  Receipt,
  Lightbulb
} from "lucide-react";

interface Message {
  id: number;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

const quickPrompts = [
  { icon: TrendingUp, text: "Analyze my spending" },
  { icon: PiggyBank, text: "How can I save more?" },
  { icon: Receipt, text: "Review my expenses" },
  { icon: Lightbulb, text: "Budget tips" },
];

const botResponses: Record<string, string> = {
  "analyze my spending": `Based on your recent transactions, here's what I found:

📊 **Spending Breakdown:**
• Food & Groceries: $2,500 (29%)
• Transportation: $1,200 (14%)
• Entertainment: $800 (9%)
• Shopping: $1,500 (18%)
• Utilities: $600 (7%)
• Others: $2,000 (23%)

💡 **Key Insight:** Your entertainment spending increased by 19% compared to last month. Consider setting a monthly limit to stay on track!`,

  "how can i save more": `Here are personalized savings tips based on your spending patterns:

🎯 **Top 3 Recommendations:**

1. **Cut Entertainment Costs** - You spent $800 this month. Try free alternatives like parks or home movie nights to save ~$300/month.

2. **Meal Planning** - Your food expenses are $2,500. Planning meals could reduce this by 20%, saving you $500/month.

3. **Transportation Hack** - Consider carpooling or public transit 2x per week to save ~$200/month.

💰 **Potential Monthly Savings: $1,000!**`,

  "review my expenses": `📋 **Recent Expense Review:**

| Category | Amount | Status |
|----------|--------|--------|
| Gift | $3,000 | ⚠️ High |
| Petrol | $4,977 | ⚠️ Over budget |
| Fruits | $100 | ✅ Normal |
| Cloths | $8,000 | 🔴 Very High |

🚨 **Alert:** Clothing expenses are unusually high this month. Was this a planned purchase?

Would you like me to help you create a budget plan to balance these expenses?`,

  "budget tips": `💡 **Smart Budget Tips:**

1. **50/30/20 Rule** - Allocate 50% to needs, 30% to wants, 20% to savings.

2. **Envelope Method** - Set cash limits for categories like entertainment and shopping.

3. **No-Spend Days** - Try 2-3 no-spend days per week to boost savings.

4. **Automate Savings** - Set up automatic transfers to your savings account on payday.

5. **Track Everything** - Use this app daily to monitor all expenses!

Would you like me to create a personalized budget based on your income of $61,000?`,
};

function getBotResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  for (const [key, response] of Object.entries(botResponses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  
  return `I understand you're asking about "${message}". 

Based on your financial data:
• Total Balance: $47,923
• Total Income: $61,000
• Total Expenses: $13,077

How can I help you better manage your finances? You can ask me to:
- Analyze your spending patterns
- Suggest ways to save money
- Review specific expense categories
- Provide budget recommendations`;
}

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content: `Hello! 👋 I'm your AI Financial Assistant. 

I can help you:
• 📊 Analyze your spending patterns
• 💰 Find ways to save money
• 📋 Review your expenses
• 🎯 Create budget plans

What would you like to know about your finances today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        type: "bot",
        content: getBotResponse(messageText),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <MessageCircle className="w-8 h-8 text-primary" />
              AI Financial Assistant
            </h1>
            <p className="text-muted-foreground mt-1">
              Ask me anything about your finances
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-success text-sm font-medium">Online</span>
          </div>
        </div>

        <Card className="flex-1 flex flex-col shadow-card overflow-hidden">
          <CardHeader className="border-b border-border py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-base">Finance Bot</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Powered by AI • Always here to help
                </p>
              </div>
            </div>
          </CardHeader>

          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.type === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "gradient-primary"
                    }`}
                  >
                    {message.type === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-muted text-foreground rounded-tl-none"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <span
                      className={`text-xs mt-1 block ${
                        message.type === "user"
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]" />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="border-t border-border p-4">
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {quickPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="flex-shrink-0 gap-2"
                  onClick={() => handleSend(prompt.text)}
                >
                  <prompt.icon className="w-4 h-4" />
                  {prompt.text}
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your finances..."
                className="flex-1"
              />
              <Button 
                onClick={() => handleSend()} 
                disabled={!input.trim() || isTyping}
                className="gradient-primary"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
