"use client"

import Link from "next/link"
import {
  Plus,
  Sprout,
  ShoppingBag,
  Edit3,
  Trash2,
  AlertCircle,
} from "lucide-react"

const stats = [
  {
    label: "Total Earnings",
    value: "₹24,540",
    trend: "+12.4%",
    desc: "vs last month",
  },
  {
    label: "Active Listings",
    value: "8 Products",
    trend: "0.0%",
    desc: "Stable listings",
  },
  {
    label: "Pending Orders",
    value: "3 Orders",
    trend: "+30.0%",
    desc: "Ready to package",
  },
  {
    label: "Average Rating",
    value: "4.8",
    trend: "+1.2%",
    desc: "Positive buyer feedback",
  },
]

const recentOrders = [
  {
    id: "ORD-9482",
    customer: "Rahul Mehta",
    item: "Organic Tomato Seeds x2",
    amount: "₹598",
    date: "Today, 11:30 AM",
    status: "Processing",
  },
  {
    id: "ORD-9480",
    customer: "Aanya Sen",
    item: "Compost Soil Mix x1",
    amount: "₹599",
    date: "Yesterday",
    status: "Shipped",
  },
  {
    id: "ORD-9475",
    customer: "Kabir Roy",
    item: "Iron Hand Spade x1",
    amount: "₹450",
    date: "2 days ago",
    status: "Delivered",
  },
]

const listingsList = [
  {
    name: "Organic Tomato Seeds",
    stock: 24,
    price: "₹299",
    category: "Seeds",
  },
  {
    name: "Compost Soil Mix",
    stock: 12,
    price: "₹599",
    category: "Soil",
  },
  {
    name: "Hydrating Coco Peat Block",
    stock: 45,
    price: "₹180",
    category: "Soil",
  },
]

export default function SellerDashboard() {
  return (
    <div className="space-y-8">
      {/* Your existing JSX remains exactly the same */}
    </div>
  )
}