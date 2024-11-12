import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Users, CreditCard, Building, TrendingUp } from 'lucide-react';

const data = [
  { month: 'Jan', reservations: 65 },
  { month: 'Feb', reservations: 59 },
  { month: 'Mar', reservations: 80 },
  { month: 'Apr', reservations: 81 },
  { month: 'May', reservations: 56 },
  { month: 'Jun', reservations: 55 },
];

const stats = [
  {
    name: 'Total Clients',
    value: '2,543',
    change: '+12.5%',
    icon: Users,
  },
  {
    name: 'Total Revenue',
    value: '€54,234',
    change: '+8.2%',
    icon: CreditCard,
  },
  {
    name: 'Active Parkings',
    value: '124',
    change: '+3.1%',
    icon: Building,
  },
  {
    name: 'Avg. Commission',
    value: '15.4%',
    change: '+2.3%',
    icon: TrendingUp,
  },
];

export default function Analytics() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics Overview</h1>
        <p className="mt-1 text-gray-600">Track your business performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white p-6 rounded-lg border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm font-medium text-green-600">
                  {stat.change}
                </span>
                <span className="text-sm text-gray-600"> vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Reservations Overview
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="reservations" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}