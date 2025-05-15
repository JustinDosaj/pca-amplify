'use client';

import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import AccountTabs from '../components/AccountTabs';
import DashboardLayout from '../components/DashboardLayout';
import { pricingPlans, mockWorkflowHistory } from '../data';
import { AccountTab } from '../types';

const AccountPage = () => {
    const [accountTab, setAccountTab] = useState<AccountTab>('general');

    return (
        <DashboardLayout workflowHistory={mockWorkflowHistory}>
            <DashboardHeader 
                title="My Account"
                accountTab={accountTab}
                setAccountTab={setAccountTab}
            />
            <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                    <AccountTabs 
                        activeTab={accountTab}
                        pricingPlans={pricingPlans}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AccountPage; 