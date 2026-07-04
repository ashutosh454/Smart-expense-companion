import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Target,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

const forecastData = [
  { month: "Nov", actual: 8500, predicted: null },
  { month: "Dec", actual: null, predicted: 9200 },
  { month: "Jan", actual: null, predicted: 8800 },
  { month: "Feb", actual: null, predicted: 7500 },
  { month: "Mar", actual: null, predicted: 8200 },
];

const categoryPredictions = [
  { category: "Food & Groceries", current: 2500, predicted: 2800, trend: "up", percentage: 12 },
  { category: "Transportation", current: 1200, predicted: 1100, trend: "down", percentage: -8 },
  { category: "Entertainment", current: 800, predicted: 950, trend: "up", percentage: 19 },
  { category: "Utilities", current: 600, predicted: 620, trend: "up", percentage: 3 },
  { category: "Shopping", current: 1500, predicted: 1300, trend: "down", percentage: -13 },
];

const savingsProjection = [
  { month: "Nov", savings: 4500 },
  { month: "Dec", savings: 5200 },
  { month: "Jan", savings: 6100 },
  { month: "Feb", savings: 7500 },
  { month: "Mar", savings: 8800 },
  { month: "Apr", savings: 10200 },
];

const alerts = [
  { type: "warning", message: "Entertainment spending may exceed budget by 19% next month", icon: AlertTriangle },
  { type: "success", message: "On track to save ₹10,200 by April 2026", icon: Target },
  { type: "info", message: "Transportation costs trending down - great job!", icon: TrendingDown },
];

export default function Predictions() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary" />
              Smart Predictions
            </h1>
            <p className="text-muted-foreground mt-1">
              AI-powered insights based on your spending patterns
            </p>
          </div>
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            Updated 2 hours ago
          </Badge>
        </div>

        {/* Alerts Section */}
        <div className="grid gap-4">
          {alerts.map((alert, index) => (
            <Card key={index} className={`border-l-4 shadow-card ${
              alert.type === "warning" ? "border-l-warning" : 
              alert.type === "success" ? "border-l-success" : "border-l-primary"
            }`}>
              <CardContent className="flex items-center gap-4 py-4">
                <div className={`p-2 rounded-full ${
                  alert.type === "warning" ? "bg-warning/10 text-warning" : 
                  alert.type === "success" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"
                }`}>
                  <alert.icon className="w-5 h-5" />
                </div>
                <p className="text-foreground font-medium">{alert.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Spending Forecast */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Spending Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(262, 60%, 75%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(262, 60%, 75%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                <XAxis dataKey="month" stroke="hsl(220, 9%, 46%)" />
                <YAxis stroke="hsl(220, 9%, 46%)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(0, 0%, 100%)', 
                    border: '1px solid hsl(220, 13%, 91%)',
                    borderRadius: '8px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="hsl(262, 83%, 58%)" 
                  fillOpacity={1} 
                  fill="url(#colorActual)" 
                  strokeWidth={2}
                  name="Actual"
                />
                <Area 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="hsl(262, 60%, 75%)" 
                  fillOpacity={1} 
                  fill="url(#colorPredicted)" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Predicted"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Category Predictions */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Category Predictions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categoryPredictions.map((cat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{cat.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">₹{cat.current}</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="font-semibold text-foreground">₹{cat.predicted}</span>
                      <span className={`flex items-center text-sm ${
                        cat.trend === "up" ? "text-destructive" : "text-success"
                      }`}>
                        {cat.trend === "up" ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                        {Math.abs(cat.percentage)}%
                      </span>
                    </div>
                  </div>
                  <Progress 
                    value={Math.min((cat.predicted / 3000) * 100, 100)} 
                    className="h-2"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Savings Projection */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-success" />
                Savings Projection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={savingsProjection}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                  <XAxis dataKey="month" stroke="hsl(220, 9%, 46%)" />
                  <YAxis stroke="hsl(220, 9%, 46%)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(0, 0%, 100%)', 
                      border: '1px solid hsl(220, 13%, 91%)',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar 
                    dataKey="savings" 
                    fill="hsl(142, 76%, 36%)" 
                    radius={[4, 4, 0, 0]}
                    name="Projected Savings"
                  />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-success/10 rounded-lg">
                <p className="text-success font-semibold">
                  You're projected to reach ₹10,200 in savings by April!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Budget Health */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Budget Health Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="hsl(220, 13%, 91%)"
                    strokeWidth="12"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="hsl(262, 83%, 58%)"
                    strokeWidth="12"
                    strokeDasharray={`${78 * 4.4} ${100 * 4.4}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-4xl font-bold text-foreground">78</span>
                  <span className="text-muted-foreground text-sm">Good</span>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">Income Stability</span>
                    <span className="font-semibold text-success">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">Expense Control</span>
                    <span className="font-semibold text-primary">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">Savings Rate</span>
                    <span className="font-semibold text-warning">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
