"use client";

import React, { useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";

// Define type for each report row
type ReportRow = {
  id: number;
  month: string;
  sales: number;
  success: number;
  pending: number;
  name: string;
  state: string;
  time: string;
};

const reportData: ReportRow[] = [
  { id: 1, month: "Jan", sales: 2500, success: 3500, pending: 1000, name: "Adewale Okon", state: "Lagos", time: "09:30 AM" },
  { id: 2, month: "Feb", sales: 3000, success: 4200, pending: 800, name: "Bisi Adebayo", state: "Oyo", time: "11:15 AM" },
  { id: 3, month: "Mar", sales: 4500, success: 5300, pending: 1200, name: "Chinedu Eze", state: "Enugu", time: "02:00 PM" },
  { id: 4, month: "Apr", sales: 4000, success: 4900, pending: 900, name: "Fatima Musa", state: "Kano", time: "04:45 PM" },
  { id: 5, month: "May", sales: 5000, success: 5700, pending: 1500, name: "Dele Olaniyan", state: "Lagos", time: "10:00 AM" },
  { id: 6, month: "Jun", sales: 6000, success: 6900, pending: 1100, name: "Amaka Obi", state: "Anambra", time: "01:30 PM" },
  { id: 7, month: "Jul", sales: 5500, success: 6200, pending: 1300, name: "Ibrahim Bala", state: "Kaduna", time: "08:00 AM" },
  { id: 8, month: "Aug", sales: 6500, success: 7500, pending: 1000, name: "Sade Yusuf", state: "Oyo", time: "12:00 PM" },
  { id: 9, month: "Sep", sales: 7000, success: 7600, pending: 1400, name: "Tunde Olatunji", state: "Ogun", time: "03:00 PM" },
  { id: 10, month: "Oct", sales: 6800, success: 7700, pending: 1100, name: "Blessing Okoro", state: "Rivers", time: "05:30 PM" },
  { id: 11, month: "Nov", sales: 7500, success: 8300, pending: 1200, name: "Emeka Okonkwo", state: "Imo", time: "09:00 AM" },
  { id: 12, month: "Dec", sales: 8000, success: 8500, pending: 1500, name: "Ngozi Dike", state: "Abuja", time: "10:45 AM" },
];

// Only allow sorting on certain keys
type SortKey = keyof Pick<ReportRow, "month" | "name" | "state" | "time" | "sales" | "success" | "pending">;
type SortDirection = "asc" | "desc";

const ReportPage: React.FC = () => {
  const { theme } = useTheme();
  const [data] = useState<ReportRow[]>(reportData);
  const [sortKey, setSortKey] = useState<SortKey>("month");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [filterText, setFilterText] = useState<string>("");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const filteredData = sortedData.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filterText.toLowerCase())
    )
  );

  const getSortIcon = (key: SortKey) => {
    if (sortKey !== key) return null;
    return sortDirection === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-4 sm:p-8 font-sans antialiased">
      <header className="mb-6 md:mb-10 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-50">
            Tabular Report
          </h1>
          <p className="mt-1 text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-400">
            A detailed breakdown of monthly metrics
          </p>
        </div>
        <div className="w-full md:w-auto">
          <Input
            type="text"
            placeholder="Filter by name, state, or time..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full md:max-w-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700"
          />
        </div>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {(["month", "name", "state", "time", "sales", "success", "pending"] as SortKey[]).map((key) => (
                <th
                  key={key}
                  className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  <Button
                    variant="ghost"
                    onClick={() => handleSort(key)}
                    className="flex items-center gap-1 dark:hover:bg-gray-600 dark:text-gray-300"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)} {getSortIcon(key)}
                  </Button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">
                  {row.month}
                </td>
                <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">
                  {row.name}
                </td>
                <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">
                  {row.state}
                </td>
                <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">
                  {row.time}
                </td>
                <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-400">
                  ${row.sales.toLocaleString()}
                </td>
                <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">
                  ${row.success.toLocaleString()}
                </td>
                <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-yellow-600 dark:text-yellow-400">
                  ${row.pending.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">No results found.</div>
        )}
      </div>
    </div>
  );
};

export default ReportPage;
