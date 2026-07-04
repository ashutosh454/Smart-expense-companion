import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight,
} from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

const transactions = [
  { id: 1, name: "Salary", date: "8th Nov 2025", amount: 10000, type: "income", icon: "💰" },
  { id: 2, name: "Rental", date: "1st Nov 2025", amount: 1000, type: "income", icon: "🏠" },
  { id: 3, name: "Fruits", date: "17th Oct 2025", amount: 100, type: "expense", icon: "🍇" },
  { id: 4, name: "Interest From Saving", date: "8th Oct 2025", amount: 20000, type: "income", icon: "🏦" },
  { id: 5, name: "Petrol", date: "8th Oct 2025", amount: 4977, type: "expense", icon: "⛽" },
];

const pieData = [
  { name: "Total Balance", value: 47923, color: "hsl(262, 83%, 58%)" },
  { name: "Total Expenses", value: 13077, color: "hsl(0, 84%, 60%)" },
  { name: "Total Income", value: 61000, color: "hsl(38, 92%, 50%)" },
];

const statCards = [
  { title: "Total Balance", amount: "₹47,923", icon: Wallet, color: "bg-primary" },
  { title: "Total Income", amount: "₹61,000", icon: TrendingUp, color: "bg-warning" },
  { title: "Total Expenses", amount: "₹13,077", icon: TrendingDown, color: "bg-destructive" },
];

// New data for expenses
const expenses = [
  { id: 1, name: "Shopping", date: "17th Feb 2025", amount: 430, icon: "🛍️" },
  { id: 2, name: "Travel", date: "13th Feb 2025", amount: 670, icon: "✈️" },
  { id: 3, name: "Electricity Bill", date: "11th Feb 2025", amount: 200, icon: "💡" },
  { id: 4, name: "Loan Repayment", date: "10th Feb 2025", amount: 600, icon: "🏦" },
];

const last30DaysExpenses = [
  { name: "Week 1", amount: 420 },
  { name: "Week 2", amount: 680 },
  { name: "Week 3", amount: 230 },
  { name: "Week 4", amount: 750 },
];

// New data for income
const incomeList = [
  { id: 1, name: "Salary", date: "12th Feb 2025", amount: 12000, icon: "💼" },
  { id: 2, name: "Interest from Savings", date: "13th Jan 2025", amount: 9600, icon: "🏦" },
  { id: 3, name: "E-commerce Sales", date: "11th Jan 2025", amount: 11900, icon: "🛒" },
  { id: 4, name: "Graphic Design", date: "10th Jan 2025", amount: 10500, icon: "🎨" },
  { id: 5, name: "Affiliate Marketing", date: "9th Jan 2025", amount: 8000, icon: "📚" },
];

const incomeBySource = [
  { name: "Salary", value: 12000, color: "hsl(262, 83%, 58%)" },
  { name: "Interest from Savings", value: 9600, color: "hsl(0, 84%, 60%)" },
  { name: "E-commerce Sales", value: 11900, color: "hsl(38, 92%, 50%)" },
  { name: "Graphic Design", value: 10500, color: "hsl(220, 70%, 50%)" },
];

export default function Index() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {statCards.map((stat, index) => (
            <Card key={index} className="shadow-card hover:shadow-hover transition-shadow">
              <CardContent className="flex items-center gap-4 p-6">
                <div className={`w-14 h-14 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.amount}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Button variant="outline" size="sm" className="gap-2">
                See All <ArrowRight className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{transaction.icon}</span>
                    <div>
                      <p className="font-medium text-foreground">{transaction.name}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <span
                    className={`font-semibold flex items-center gap-1 ${
                      transaction.type === "income" ? "text-success" : "text-destructive"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"} ₹{transaction.amount.toLocaleString()}
                    {transaction.type === "income" ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Financial Overview */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(0, 0%, 100%)', 
                      border: '1px solid hsl(220, 13%, 91%)',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center mt-4">
                <p className="text-muted-foreground">Total Balance</p>
                <p className="text-3xl font-bold text-foreground">₹47,923</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Expenses Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Expenses List */}
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Expenses</CardTitle>
              <Button variant="outline" size="sm" className="gap-2">
                See All <ArrowRight className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-xl">
                      {expense.icon}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{expense.name}</p>
                      <p className="text-sm text-muted-foreground">{expense.date}</p>
                    </div>
                  </div>
                  <span className="font-semibold flex items-center gap-1 text-destructive">
                    - ₹{expense.amount.toLocaleString()}
                    <TrendingDown className="w-4 h-4" />
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Last 30 Days Expenses Chart */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Last 30 Days Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={last30DaysExpenses}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                  <XAxis dataKey="name" stroke="hsl(220, 9%, 46%)" />
                  <YAxis stroke="hsl(220, 9%, 46%)" />
                  <Tooltip 
                    formatter={(value: number) => [`₹${value}`, 'Amount']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(0, 0%, 100%)', 
                      border: '1px solid hsl(220, 13%, 91%)',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="amount" 
                    fill="hsl(262, 83%, 58%)" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Income Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Last 60 Days Income Chart */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Last 60 Days Income</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={incomeBySource}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {incomeBySource.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(0, 0%, 100%)', 
                      border: '1px solid hsl(220, 13%, 91%)',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center mt-2">
                <p className="text-muted-foreground">Total Income</p>
                <p className="text-3xl font-bold text-foreground">₹98,200</p>
              </div>
            </CardContent>
          </Card>

          {/* Income List */}
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Income</CardTitle>
              <Button variant="outline" size="sm" className="gap-2">
                See All <ArrowRight className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {incomeList.map((income) => (
                <div
                  key={income.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-xl">
                      {income.icon}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{income.name}</p>
                      <p className="text-sm text-muted-foreground">{income.date}</p>
                    </div>
                  </div>
                  <span className="font-semibold flex items-center gap-1 text-success">
                    + ₹{income.amount.toLocaleString()}
                    <TrendingUp className="w-4 h-4" />
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
