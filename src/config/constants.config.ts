import { TbBrandOpenai } from "react-icons/tb";
import { RiAnthropicFill } from "react-icons/ri";
import { ChatModelGroup } from "@/types/chat";

export const LLM_MODELS: ChatModelGroup[] = [
    {
        label: "OpenAI",
        icon: TbBrandOpenai,
        models: [
            { name: "GPT-3.5 Turbo", value: "gpt-3.5-turbo" },
            { name: "GPT-4.1 Mini", value: "gpt-4.1-mini"}
        ]
    },
    {
        label: "Anthropic",
        icon: RiAnthropicFill,
        models: [
            { name: "Claude 3.7 Sonnet", value: ""}
        ]
    }
]