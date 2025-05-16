import { ArrowRightIcon } from "lucide-react";
import { Button } from "./ui/button";

const buttonData = [
    { label: "Create Wallet", input: "Create a new wallet named ____" },
    { label: "Wallet", input: "Get my wallets and balances" },
    {
        label: "Quick PortFolio",
        input: "Get me a quick summary of my portfolio",
    },
    {
        label: "Send Native/ETH",
        input: "Send __amount__ ETH to __address__",
    },
    {
        label: "Send Token",
        input: "Send __amount__ of __token__ to __address__",
    },
    {
        label: "Crypto Updates/News",
        input: "Get me latest crypto news and updates ",
    },
    {
        label: "Get a base name",
        input: "My name is __name__, get a base name for me",
    },
];

export default function ShortCuts({ setInput }: { setInput: any }) {
    return (
        <div className="px-4 pb-4 space-x-2 space-y-1 overflow-x-auto">
            {buttonData.map((button, index) => (
                <Button
                    key={index}
                    onClick={() => setInput(button.input)}
                    size="sm"
                    className="ml-auto gap-1.5 h-[30px] bg-gradient-to-r from-[#161D25] to-[#090F17] text-white rounded-sm"
                >
                    {button.label}
                    <ArrowRightIcon className="size-3.5" />
                </Button>
            ))}
        </div>
    );
}
