'use client';

import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import AccountTabs from '../components/AccountTabs';
import { pricingPlans } from '../data';
import { AccountTab } from '../types';

const AccountPage = () => {
    const [accountTab, setAccountTab] = useState<AccountTab>('general');

    return (
        <>
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
        </>
    );
};

export default AccountPage; 