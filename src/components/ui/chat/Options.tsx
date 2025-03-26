interface PIIType {
    entity: string;
    label: string;
}

export const PII_TYPES: PIIType[] = [
    { entity: 'NAME', label: 'Name' },
    { entity: 'EMAIL', label: 'Email' },
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
            <div className="mt-4 divide-y divide-slate-300/40 border-t border-b border-slate-300/40">
                {PII_TYPES.map((type) => (
                <div key={type.entity} className="relative flex gap-3 py-4">
                    <div className="min-w-0 flex-1 text-sm/6">
                        <label htmlFor={`person-${type.entity}`} className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700">
                            {type.label}
                        </label>
                    </div>
                    <div className="flex h-6 shrink-0 items-center">
                        <div className="group grid size-4 grid-cols-1">
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
                </div>
                ))}
            </div>
        </fieldset>
    )
}
  