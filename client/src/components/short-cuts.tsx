import { Wallet } from "lucide-react";
import { Button } from "./ui/button";

const buttonData = [
    { label: "Wallet", input: "fetch my wallets and balances" },
    { label: "Quick PortFolio", input: "quick portfolio" },
    { label: "Detailed PortFolio", input: "detailed portfolio" },
    { label: "Show NFT PortFolio", input: "show nft portfolio" },
    { label: "Send Native", input: "send native" },
    { label: "Send Token", input: "send token" },
    { label: "I need help", input: "i need help" },
    { label: "Swap", input: "swap" },
    { label: "Bridge", input: "bridge" },
    { label: "Crypto Updates/News", input: "crypto updates/news" },
    { label: "my Referral link/code", input: "my referral link/code" },
    { label: "Yields", input: "yields" },
    { label: "Newly launched Tokens", input: "newly launched tokens" },
    { label: "Copy Trade", input: "copy trade" },
    { label: "Limit Orders", input: "limit orders" },
    { label: "Contract Security", input: "contract security" },
    { label: "DCA(Dollar Cost Average)", input: "dca(dollar cost average)" },
];

export default function ShortCuts({ setInput }: { setInput: any }) {
    return (
        <div className="px-4 pb-4 space-x-2 space-y-1 overflow-x-auto">
            {buttonData.map((button, index) => (
                <Button
                    key={index}
                    onClick={() => setInput(button.input)}
                    size="sm"
                    className="ml-auto gap-1.5 h-[30px]"
                >
                    {button.label}
                    <Wallet className="size-3.5" />
                </Button>
            ))}
        </div>
    );
}
