import { PII_TYPE_OPTIONS } from "@/config/options.config"
import { IAppView } from "@/types/settings";

interface ISettings extends IAppView {
    privacySettings: Record<string, boolean>;
    onTogglePrivacy: (entity: string) => void;
}

export default function Settings({privacySettings, onTogglePrivacy, className }: ISettings) {
    
    return (
        <div className={`${className} border-l border-slate-300/40 p-6 bg-slate-50`}>
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
        </div>
    )
}
  