interface PIIType {
    entity: string;
    label: string;
}

export const PII_TYPE_OPTIONS: PIIType[] = [
    { entity: "ADDRESS", label: "Address" },
    { entity: "AGE", label: "Age" },
    // { entity: "ALL", label: "All" }, // Currently not needed --> perhaps use in future?
    { entity: "AWS_ACCESS_KEY", label: "AWS Access Key" },
    { entity: "AWS_SECRET_KEY", label: "AWS Secret Key" },
    { entity: "BANK_ACCOUNT_NUMBER", label: "Bank Account Number" },
    { entity: "BANK_ROUTING", label: "Bank Routing" },
    { entity: "CA_HEALTH_NUMBER", label: "CA Health Number" },
    { entity: "CA_SOCIAL_INSURANCE_NUMBER", label: "CA Social Insurance Number" },
    { entity: "CREDIT_DEBIT_CVV", label: "Credit Debit CVV" },
    { entity: "CREDIT_DEBIT_EXPIRY", label: "Credit Debit Expiry" },
    { entity: "CREDIT_DEBIT_NUMBER", label: "Credit Debit Number" },
    { entity: "DATE_TIME", label: "Date Time" },
    { entity: "DRIVER_ID", label: "Driver ID" },
    { entity: "EMAIL", label: "Email" },
    { entity: "INTERNATIONAL_BANK_ACCOUNT_NUMBER", label: "International Bank Account Number" },
    { entity: "IN_AADHAAR", label: "IN Aadhaar" },
    { entity: "IN_NREGA", label: "IN NREGA" },
    { entity: "IN_PERMANENT_ACCOUNT_NUMBER", label: "IN Permanent Account Number" },
    { entity: "IN_VOTER_NUMBER", label: "IN Voter Number" },
    { entity: "IP_ADDRESS", label: "IP Address" },
    { entity: "LICENSE_PLATE", label: "License Plate" },
    { entity: "MAC_ADDRESS", label: "MAC Address" },
    { entity: "NAME", label: "Name" },
    { entity: "PASSPORT_NUMBER", label: "Passport Number" },
    { entity: "PASSWORD", label: "Password" },
    { entity: "PHONE", label: "Phone" },
    { entity: "PIN", label: "PIN" },
    { entity: "SSN", label: "SSN" },
    { entity: "SWIFT_CODE", label: "SWIFT Code" },
    { entity: "UK_NATIONAL_HEALTH_SERVICE_NUMBER", label: "UK National Health Service Number" },
    { entity: "UK_NATIONAL_INSURANCE_NUMBER", label: "UK National Insurance Number" },
    { entity: "UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER", label: "UK Unique Taxpayer Reference Number" },
    { entity: "URL", label: "URL" },
    { entity: "USERNAME", label: "Username" },
    { entity: "US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER", label: "US Individual Tax Identification Number" },
    { entity: "VEHICLE_IDENTIFICATION_NUMBER", label: "Vehicle Identification Number" }
]

interface OptionsProps {
    privacySettings: Record<string, boolean>
    onTogglePrivacy: (entity: string) => void
}

export default function Options({privacySettings, onTogglePrivacy}: OptionsProps) {

    // TODO: Implement Toggle/Untoggle All
    // const handleToggleAll = useCallback((checked: boolean) => {
    //     setPrivacySettings(
    //         PII_TYPES.reduce((acc, info) => ({
    //             ...acc,
    //             [info.id]: checked
    //         }), {})
    //     );
    // }, []);

    return (
        <fieldset>
            <legend className="text-lg font-semibold text-slate-900">Privacy Options</legend>
            <p className="max-w-2xl tracking-tight text-slate-700">Select what information you want to remain private</p>
            <div className="mt-4 divide-y divide-slate-300/40 border-t border-b border-slate-300/40 grid grid-cols-2">
                {PII_TYPE_OPTIONS.map((type) => (
                <div key={type.entity} className="relative flex gap-3 py-1 items-center">
                    <div className="flex h-6 shrink-0 items-center">
                        <div className="group flex size-3 grid-cols-1">
                            <input
                                id={`${type.entity}`}
                                name={`${type.entity}`}
                                checked={privacySettings[type.entity]}
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:bg-blue-600 indeterminate:bg-blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                onChange={() => onTogglePrivacy(type.entity)}
                            />
                        </div>
                    </div>
                    <div className="min-w-0 flex-1 text-sm/6">
                        <label htmlFor={`${type.entity}`} className="inline-block rounded-lg px-2 text-sm text-slate-700">
                            {type.label}
                        </label>
                    </div>
                </div>
                ))}
            </div>
        </fieldset>
    )
}
  