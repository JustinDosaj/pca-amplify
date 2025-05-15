import React from 'react';
import { Button } from '@/components/ui/Button';
import { AccountTab, PricingPlan } from '../types';
import { 
    TrashIcon, 
    ArrowUpIcon, 
    XMarkIcon, 
    CheckCircleIcon,
    ChartBarIcon,
    ClockIcon,
    CreditCardIcon,
    EnvelopeIcon,
    InformationCircleIcon
} from '@heroicons/react/24/outline';

interface AccountTabsProps {
    activeTab: AccountTab;
    pricingPlans: PricingPlan[];
}

const AccountTabs = ({ activeTab, pricingPlans }: AccountTabsProps) => {
    // General Tab Content
    if (activeTab === 'general') {
        return (
            <div className="space-y-6">
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                    <h2 className="text-lg font-medium text-slate-900 mb-4">Account Information</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    defaultValue="John Doe" 
                                    className="flex-1 px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                />
                                <Button color="blue">Save</Button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <input type="email" value="john.doe@example.com" className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50" readOnly />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Account Type</label>
                            <input type="text" value="Free Plan" className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50" readOnly />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 p-6">
                    <h2 className="text-lg font-medium mb-4 text-red-600">Danger Zone</h2>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-slate-900">Delete Account</h3>
                            <p className="text-sm text-slate-500">Permanently delete your account and all associated data</p>
                        </div>
                        <Button color="slate" variant="outline" className="flex items-center gap-2">
                            <TrashIcon className="h-5 w-5" />
                            Delete Account
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Billing Tab Content
    if (activeTab === 'billing') {
        return (
            <div className="space-y-6">
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-medium text-slate-900">Current Plan</h2>
                            <p className="text-sm text-slate-500 mt-1">Free Plan - 100 tokens/month</p>
                        </div>
                        <Button color="blue" className="flex items-center gap-2">
                            <ArrowUpIcon className="h-5 w-5" />
                            Upgrade Plan
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        {pricingPlans.map((plan) => (
                            <div key={plan.name} className="border border-slate-200 rounded-lg p-6 hover:border-blue-500 transition-colors">
                                <h3 className="text-lg font-medium text-slate-900">{plan.name}</h3>
                                <div className="mt-2">
                                    <span className="text-3xl font-bold">${plan.price}</span>
                                    <span className="text-slate-500">/month</span>
                                </div>
                                <p className="text-sm text-slate-500 mt-2">{plan.tokens} tokens/month</p>
                                <ul className="mt-4 space-y-2">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center text-sm text-slate-600">
                                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Button 
                                    color={'slate'} 
                                    variant="outline"
                                    className="w-full mt-6"
                                >
                                    {plan.name === 'Free' ? 'Current Plan' : 'Select Plan'}
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-slate-900">Cancel Subscription</h3>
                                <p className="text-sm text-slate-500 mt-1">Cancel your current subscription plan</p>
                            </div>
                            <Button color="slate" variant="outline" className="flex items-center gap-2">
                                <XMarkIcon className="h-5 w-5" />
                                Cancel Subscription
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Usage Tab Content
    if (activeTab === 'usage') {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg border border-slate-200 p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <ChartBarIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-slate-500">Total Credits</h3>
                                <p className="text-2xl font-semibold text-slate-900">88</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-slate-200 p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <ClockIcon className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-slate-500">Workflows Run</h3>
                                <p className="text-2xl font-semibold text-slate-900">12</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-slate-200 p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <CreditCardIcon className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-slate-500">Storage Used</h3>
                                <p className="text-2xl font-semibold text-slate-900">0 / 0.5 GB</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 p-6">
                    <h2 className="text-lg font-medium text-slate-900 mb-4">Usage History</h2>
                    <div className="h-64">
                        {/* Placeholder for chart - you can integrate a charting library here */}
                        <div className="h-full flex items-center justify-center text-slate-500">
                            Usage trend chart will be displayed here
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Earn Credits Tab Content
    if (activeTab === 'earn') {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg border border-slate-200 p-6">
                        <h2 className="text-lg font-medium text-slate-900 mb-4">Your Referral Link</h2>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                value="https://yourapp.com/ref/JOHN123" 
                                className="flex-1 px-3 py-2 border border-slate-200 rounded-md bg-slate-50" 
                                readOnly 
                            />
                            <Button color="slate" variant="outline">Copy</Button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-slate-200 p-6">
                        <h2 className="text-lg font-medium text-slate-900 mb-4">Referral Stats</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-slate-500">Total Credits Earned</p>
                                <p className="text-2xl font-semibold text-slate-900">50</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Friends Recruited</p>
                                <p className="text-2xl font-semibold text-slate-900">3</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 p-6">
                    <h2 className="text-lg font-medium text-slate-900 mb-4">Invite Friends</h2>
                    <div className="flex gap-2">
                        <input 
                            type="email" 
                            placeholder="Enter friend's email" 
                            className="flex-1 px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        />
                        <Button color="blue" className="flex items-center gap-2">
                            <EnvelopeIcon className="h-5 w-5" />
                            Send Invite
                        </Button>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 p-6">
                    <h2 className="text-lg font-medium text-slate-900 mb-4">Program Details</h2>
                    <div className="prose prose-sm text-slate-600">
                        <p>Earn credits by inviting friends to join our platform. For each friend who signs up using your referral link:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>You will receive 10 credits when they sign up</li>
                            <li>You will receive 5 credits for each workflow they run</li>
                            <li>Your friend will receive 5 bonus credits on signup</li>
                        </ul>
                        <div className="mt-4 p-4 bg-slate-50 rounded-md">
                            <p className="text-sm text-slate-500">
                                <InformationCircleIcon className="h-5 w-5 inline-block mr-1" />
                                Credits earned through referrals never expire and can be used for any workflow.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default AccountTabs; 