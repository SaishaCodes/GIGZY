'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Calculator, 
  BookOpen, 
  Wrench,
  Search,
  Filter,
  MapPin,
  Star,
  Calendar,
  DollarSign,
  ArrowRight
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  dailyRate: number;
  weeklyRate?: number;
  deposit?: number;
  location?: string;
  images: string[];
  status: string;
  condition: string;
  totalRentals: number;
  rating: number;
  reviews: number;
  owner: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
  };
}

export default function ResourceMarketplace() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    // Simulated data - in production, this would be an API call
    setResources([
      {
        id: '1',
        title: 'Canon EOS R5 Camera',
        description: 'Professional mirrorless camera with 45MP sensor. Great for photography and videography projects.',
        type: 'CAMERA',
        dailyRate: 35,
        weeklyRate: 200,
        deposit: 100,
        location: 'Dorm A, Room 204',
        images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400'],
        status: 'AVAILABLE',
        condition: 'EXCELLENT',
        totalRentals: 12,
        rating: 4.8,
        reviews: 8,
        owner: {
          id: 'user1',
          name: 'Alex Chen',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
          rating: 4.9,
        },
      },
      {
        id: '2',
        title: 'TI-84 Plus Graphing Calculator',
        description: 'Perfect for calculus and statistics classes. Battery included.',
        type: 'CALCULATOR',
        dailyRate: 5,
        weeklyRate: 25,
        deposit: 50,
        location: 'Library Study Hall',
        images: ['https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400'],
        status: 'AVAILABLE',
        condition: 'GOOD',
        totalRentals: 25,
        rating: 4.6,
        reviews: 15,
        owner: {
          id: 'user2',
          name: 'Sarah Miller',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
          rating: 4.7,
        },
      },
      {
        id: '3',
        title: 'Chemistry Lab Coat & Goggles',
        description: 'Full-size lab coat with safety goggles. Cleaned after each use.',
        type: 'LAB_EQUIPMENT',
        dailyRate: 3,
        weeklyRate: 15,
        deposit: 30,
        location: 'Science Building',
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400'],
        status: 'AVAILABLE',
        condition: 'GOOD',
        totalRentals: 30,
        rating: 4.5,
        reviews: 20,
        owner: {
          id: 'user3',
          name: 'Mike Johnson',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
          rating: 4.8,
        },
      },
      {
        id: '4',
        title: 'Power Drill Toolkit',
        description: 'Complete toolkit with drill, bits, and accessories. Great for DIY projects.',
        type: 'TOOLS',
        dailyRate: 8,
        weeklyRate: 45,
        deposit: 60,
        location: 'Engineering Workshop',
        images: ['https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400'],
        status: 'AVAILABLE',
        condition: 'EXCELLENT',
        totalRentals: 8,
        rating: 4.9,
        reviews: 6,
        owner: {
          id: 'user4',
          name: 'Emily Brown',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
          rating: 4.9,
        },
      },
    ]);
    setLoading(false);
  };

  const resourceTypes = [
    { id: 'CAMERA', label: 'Cameras', icon: Camera },
    { id: 'CALCULATOR', label: 'Calculators', icon: Calculator },
    { id: 'LAB_EQUIPMENT', label: 'Lab Equipment', icon: BookOpen },
    { id: 'TOOLS', label: 'Tools', icon: Wrench },
    { id: 'BOOKS', label: 'Books', icon: BookOpen },
    { id: 'OTHER', label: 'Other', icon: Wrench },
  ];

  const getTypeIcon = (type: string) => {
    const typeObj = resourceTypes.find(t => t.id === type);
    return typeObj ? typeObj.icon : Wrench;
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'EXCELLENT':
        return 'bg-turquoise-500/20 text-turquoise-500';
      case 'GOOD':
        return 'bg-success-500/20 text-success-500';
      case 'FAIR':
        return 'bg-warning-500/20 text-warning-500';
      default:
        return 'bg-dark-600 text-dark-400';
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesType = !selectedType || resource.type === selectedType;
    const matchesSearch = !searchQuery || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-turquoise-600/20 to-turquoise-400/10 border border-turquoise-500/30 rounded-card p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gradient">
              Shared Resource Network
            </h1>
            <p className="text-dark-400 mt-1">
              Borrow and lend items with fellow students
            </p>
          </div>
          <button className="btn btn-primary">
            List Your Item
          </button>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <button className="btn-outline flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Resource Types */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedType(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              !selectedType
                ? 'bg-turquoise-500 text-dark-900'
                : 'bg-dark-700 text-dark-400 hover:bg-dark-600'
            }`}
          >
            All Resources
          </button>
          {resourceTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedType === type.id
                  ? 'bg-turquoise-500 text-dark-900'
                  : 'bg-dark-700 text-dark-400 hover:bg-dark-600'
              }`}
            >
              <type.icon className="w-4 h-4" />
              {type.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Resources Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-dark-700 rounded-card animate-pulse" />
          ))}
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-dark-400">No resources found</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card-hover overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 bg-dark-600 rounded-t-card overflow-hidden">
                <img
                  src={resource.images[0]}
                  alt={resource.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConditionColor(resource.condition)}`}>
                    {resource.condition}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                  <span className="px-2 py-1 text-xs font-medium bg-dark-900/80 backdrop-blur-sm text-white rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current text-turquoise-500" />
                    {resource.rating}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium line-clamp-1">{resource.title}</h3>
                  <span className="flex items-center gap-1 text-xs text-dark-400">
                    <MapPin className="w-3 h-3" />
                    {resource.location?.split(',')[0]}
                  </span>
                </div>

                <p className="text-sm text-dark-400 line-clamp-2 mb-3">
                  {resource.description}
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <img
                    src={resource.owner.avatar}
                    alt={resource.owner.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-xs text-dark-400">{resource.owner.name}</span>
                </div>

                {/* Pricing */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-dark-400">Daily</span>
                    <span className="font-medium text-turquoise-500">
                      ${resource.dailyRate}
                    </span>
                  </div>
                  {resource.weeklyRate && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-dark-400">Weekly</span>
                      <span className="font-medium text-turquoise-500">
                        ${resource.weeklyRate}
                      </span>
                    </div>
                  )}
                  {resource.deposit && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-dark-400">Deposit</span>
                      <span className="font-medium text-warning-500">
                        ${resource.deposit}
                      </span>
                    </div>
                  )}
                </div>

                <button className="w-full btn-outline flex items-center justify-center gap-2">
                  Book Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}