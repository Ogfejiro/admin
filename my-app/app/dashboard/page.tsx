"use client";

import React from 'react';
import { DollarSign, ShoppingBag, Users, BarChart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const App = () => {
  // Mock data for the dashboard cards
  const cardData = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      icon: DollarSign,
      color: 'bg-indigo-500',
    },
    {
      title: 'Total Sales',
      value: '$23,245.50',
      icon: ShoppingBag,
      color: 'bg-red-500',
    },
    {
      title: 'Total Customers',
      value: '12,250',
      icon: Users,
      color: 'bg-yellow-500',
    },
    {
      title: 'Growth Rate',
      value: '+18.5%',
      icon: BarChart,
      color: 'bg-green-500',
    },
  ];

  // Mock data for the chart
  const chartData = [
    { name: 'Jan', revenue: 4000, sales: 2400 },
    { name: 'Feb', revenue: 3000, sales: 1398 },
    { name: 'Mar', revenue: 2000, sales: 9800 },
    { name: 'Apr', revenue: 2780, sales: 3908 },
    { name: 'May', revenue: 1890, sales: 4800 },
    { name: 'Jun', revenue: 2390, sales: 3800 },
    { name: 'Jul', revenue: 3490, sales: 4300 },
    { name: 'Aug', revenue: 4500, sales: 5000 },
    { name: 'Sep', revenue: 5000, sales: 6500 },
    { name: 'Oct', revenue: 4800, sales: 5900 },
    { name: 'Nov', revenue: 5200, sales: 7000 },
    { name: 'Dec', revenue: 6000, sales: 8500 },
  ];

  // Card component for displaying key metrics
  const DashboardCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className="text-gray-500 font-medium">{title}</div>
        <div className={`p-2 rounded-full text-white ${color}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="mt-4 text-3xl font-bold text-gray-900">{value}</div>
    </div>
  );

  // Custom tooltip component for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200">
          <p className="font-bold text-gray-900 mb-1">{`Month: ${label}`}</p>
          {payload.map((p, index) => (
            <p key={index} style={{ color: p.stroke }} className="text-sm">
              {`${p.name}: ${p.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans antialiased">
      {/* Dashboard Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-lg text-gray-500">Overview of your key metrics</p>
      </header>

      {/* Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cardData.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </section>

      {/* Chart Section */}
      <section className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Revenue and Sales Trend</h2>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="sales" stroke="#ef4444" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default App;
