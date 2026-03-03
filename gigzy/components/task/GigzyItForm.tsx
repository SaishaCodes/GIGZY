'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  DollarSign, 
  Clock, 
  Zap, 
  Upload,
  Check,
  X,
  Loader2,
  ChevronDown,
  Calendar
} from 'lucide-react';
import { COMMUNITY_CATEGORIES } from '@/types';
import { taskApi } from '@/lib/api';
import toast from 'react-hot-toast';

const gigzyItSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.string().min(1, 'Select a category'),
  urgency: z.enum(['NORMAL', 'URGENT', 'ASAP']).default('NORMAL'),
  locationAddress: z.string().min(3, 'Enter a valid address'),
  locationLat: z.number().optional(),
  locationLng: z.number().optional(),
  budgetMin: z.number().min(5, 'Minimum budget is $5'),
  budgetMax: z.number().min(5, 'Minimum budget is $5'),
  duration: z.number().optional(),
  scheduledAt: z.date().optional().nullable(),
  instantHire: z.boolean().default(false),
  instantHirePrice: z.number().optional(),
});

type GigzyItFormData = z.infer<typeof gigzyItSchema>;

export default function GigzyItForm() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [useInstantHire, setUseInstantHire] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<GigzyItFormData>({
    resolver: zodResolver(gigzyItSchema),
    defaultValues: {
      urgency: 'NORMAL',
      budgetMin: 15,
      budgetMax: 25,
      instantHire: false,
    },
  });

  const selectedCategory = watch('category');
  const budgetMin = watch('budgetMin');
  const budgetMax = watch('budgetMax');
  const urgency = watch('urgency');

  const calculatePlatformFee = (amount: number) => {
    return Math.round(amount * 0.15 * 100) / 100; // 15% platform fee
  };

  const getUrgencyMultiplier = () => {
    switch (urgency) {
      case 'ASAP':
        return 1.5;
      case 'URGENT':
        return 1.25;
      default:
        return 1;
    }
  };

  const onSubmit = async (data: GigzyItFormData) => {
    try {
      setLoading(true);

      // Get user's location (simulated)
      const userLocation = { lat: 40.7128, lng: -74.0060 };

      const taskData = {
        ...data,
        locationLat: userLocation.lat,
        locationLng: userLocation.lng,
        instantHirePrice: data.instantHire ? data.budgetMax : undefined,
        scheduledAt: data.scheduledAt?.toISOString(),
      };

      const response = await taskApi.createTask(taskData);

      if (response.success) {
        toast.success('Task posted successfully!');
        reset();
        setStep(1);
      } else {
        toast.error(response.error || 'Failed to post task');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-800 border border-dark-600 rounded-card overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-seeker-600/20 to-seeker-400/10 border-b border-dark-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gradient-seeker">
                Gigzy It! 🚀
              </h2>
              <p className="text-dark-400 text-sm mt-1">
                Post your task and find the perfect provider
              </p>
            </div>
            <button className="text-dark-400 hover:text-dark-300">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-6">
            {['Details', 'Location', 'Budget', 'Review'].map((label, index) => (
              <div key={label} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    step > index + 1
                      ? 'bg-seeker-500 text-white'
                      : step === index + 1
                      ? 'bg-seeker-500/20 border-2 border-seeker-500 text-seeker-500'
                      : 'bg-dark-600 text-dark-400'
                  }`}
                >
                  {step > index + 1 ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`ml-2 text-sm ${
                    step >= index + 1 ? 'text-seeker-500' : 'text-dark-400'
                  }`}
                >
                  {label}
                </span>
                {index < 3 && (
                  <div
                    className={`w-12 h-0.5 mx-2 ${
                      step > index + 1 ? 'bg-seeker-500' : 'bg-dark-600'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Details */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Task Title *
                  </label>
                  <input
                    {...register('title')}
                    type="text"
                    placeholder="e.g., Need help with Calculus homework"
                    className="input-field"
                  />
                  {errors.title && (
                    <p className="text-error-500 text-xs mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description *
                  </label>
                  <textarea
                    {...register('description')}
                    placeholder="Describe your task in detail..."
                    rows={4}
                    className="input-field resize-none"
                  />
                  {errors.description && (
                    <p className="text-error-500 text-xs mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category *
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {COMMUNITY_CATEGORIES.slice(0, 8).map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setValue('category', category.id)}
                        className={`p-3 rounded-card text-center transition-all ${
                          selectedCategory === category.id
                            ? 'bg-seeker-500/20 border-2 border-seeker-500'
                            : 'bg-dark-600 border border-dark-500 hover:border-dark-400'
                        }`}
                      >
                        <span className="text-xl block mb-1">{category.icon}</span>
                        <span className="text-xs text-dark-300 line-clamp-1">
                          {category.name.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                  {errors.category && (
                    <p className="text-error-500 text-xs mt-1">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Urgency Level
                  </label>
                  <div className="flex gap-3">
                    {[
                      { value: 'NORMAL', label: 'Normal', icon: Clock },
                      { value: 'URGENT', label: 'Urgent', icon: Zap },
                      { value: 'ASAP', label: 'ASAP', icon: Zap },
                    ].map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setValue('urgency', value as any)}
                        className={`flex-1 p-3 rounded-card flex items-center justify-center gap-2 transition-all ${
                          urgency === value
                            ? value === 'ASAP'
                              ? 'bg-error-500/20 border-2 border-error-500 text-error-500'
                              : value === 'URGENT'
                              ? 'bg-warning-500/20 border-2 border-warning-500 text-warning-500'
                              : 'bg-seeker-500/20 border-2 border-seeker-500 text-seeker-500'
                            : 'bg-dark-600 border border-dark-500 text-dark-400 hover:border-dark-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Duration (minutes)
                  </label>
                  <input
                    {...register('duration', { valueAsNumber: true })}
                    type="number"
                    placeholder="e.g., 60"
                    className="input-field"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Location Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
                    <input
                      {...register('locationAddress')}
                      type="text"
                      placeholder="Enter address or location"
                      className="input-field pl-10"
                    />
                  </div>
                  {errors.locationAddress && (
                    <p className="text-error-500 text-xs mt-1">
                      {errors.locationAddress.message}
                    </p>
                  )}
                </div>

                <div className="bg-dark-700 rounded-card h-64 flex items-center justify-center">
                  <div className="text-center text-dark-400">
                    <MapPin className="w-12 h-12 mx-auto mb-2 text-dark-500" />
                    <p>Map placeholder</p>
                    <p className="text-sm">Click to pin your location</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Schedule (Optional)
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="input-field flex items-center gap-2"
                  >
                    <Calendar className="w-5 h-5 text-dark-400" />
                    <span className="text-dark-400">Select date and time</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Budget */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Budget Range *
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
                        <input
                          {...register('budgetMin', { valueAsNumber: true })}
                          type="number"
                          placeholder="Min"
                          className="input-field pl-10"
                        />
                      </div>
                    </div>
                    <span className="text-dark-400">to</span>
                    <div className="flex-1">
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
                        <input
                          {...register('budgetMax', { valueAsNumber: true })}
                          type="number"
                          placeholder="Max"
                          className="input-field pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  {errors.budgetMin && (
                    <p className="text-error-500 text-xs mt-1">
                      {errors.budgetMin.message}
                    </p>
                  )}
                </div>

                {/* Budget Slider */}
                <div>
                  <input
                    type="range"
                    min="5"
                    max="200"
                    value={budgetMax || 25}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setValue('budgetMax', value);
                      if (budgetMin > value) {
                        setValue('budgetMin', value);
                      }
                    }}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-dark-400 mt-1">
                    <span>$5</span>
                    <span>$200+</span>
                  </div>
                </div>

                {/* Instant Hire Option */}
                <div className="bg-dark-700 rounded-card p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">Instant Hire</h4>
                      <p className="text-xs text-dark-400">
                        Skip bidding, set a fixed price for immediate acceptance
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setUseInstantHire(!useInstantHire);
                        setValue('instantHire', !useInstantHire);
                      }}
                      className={`w-12 h-6 rounded-full transition-all ${
                        useInstantHire ? 'bg-seeker-500' : 'bg-dark-500'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                          useInstantHire ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Fee Breakdown */}
                <div className="bg-dark-700 rounded-card p-4 space-y-2">
                  <h4 className="font-medium text-sm mb-3">Fee Breakdown</h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-400">Task Budget</span>
                    <span>{formatPrice(budgetMax || 0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-400">Platform Fee (15%)</span>
                    <span className="text-warning-500">
                      {formatPrice(calculatePlatformFee(budgetMax || 0))}
                    </span>
                  </div>
                  {urgency !== 'NORMAL' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-dark-400">
                        Urgency Surcharge ({Math.round((getUrgencyMultiplier() - 1) * 100)}%)
                      </span>
                      <span className="text-seeker-500">
                        {formatPrice((budgetMax || 0) * (getUrgencyMultiplier() - 1))}
                      </span>
                    </div>
                  )}
                  <div className="border-t border-dark-500 pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span className="text-seeker-500">
                        {formatPrice((budgetMax || 0) * getUrgencyMultiplier())}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="bg-dark-700 rounded-card p-4">
                  <h4 className="font-medium mb-3">Task Summary</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs text-dark-400">Title</span>
                      <p className="text-sm">{watch('title')}</p>
                    </div>
                    <div>
                      <span className="text-xs text-dark-400">Description</span>
                      <p className="text-sm line-clamp-2">{watch('description')}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-dark-400">Category</span>
                        <p className="text-sm">{watch('category')}</p>
                      </div>
                      <div>
                        <span className="text-xs text-dark-400">Urgency</span>
                        <p className="text-sm">{watch('urgency')}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-dark-400">Location</span>
                        <p className="text-sm">{watch('locationAddress')}</p>
                      </div>
                      <div>
                        <span className="text-xs text-dark-400">Budget</span>
                        <p className="text-sm font-medium text-seeker-500">
                          ${budgetMin} - ${budgetMax}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Confirmation */}
                <div className="bg-seeker-500/10 border border-seeker-500/30 rounded-card p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-seeker-500/20 rounded-full">
                      <DollarSign className="w-5 h-5 text-seeker-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Payment will be held in escrow
                      </p>
                      <p className="text-xs text-dark-400">
                        Funds released when you mark the task as completed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trust & Safety */}
                <div className="bg-dark-700 rounded-card p-4">
                  <h4 className="font-medium text-sm mb-3">Trust & Safety</h4>
                  <div className="space-y-2 text-xs text-dark-400">
                    <p>✓ All providers are verified students</p>
                    <p>✓ Secure escrow payment system</p>
                    <p>✓ Dispute resolution support available</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4 border-t border-dark-600">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              className="btn-outline px-6 py-2"
            >
              Back
            </button>
            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn btn-seeker px-6 py-2"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="btn btn-seeker px-6 py-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Posting...
                  </>
                ) : (
                  'Post Task'
                )}
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}