import { ArrowRightIcon } from "lucide-react";
import { Button } from "./ui/button";

const buttonData = [
    { label: "Create Wallet", input: "Create a new wallet named ____" },
    { label: "Wallet", input: "Get my wallets and balances" },
    {
        label: "Quick PortFolio",
        input: "Get me a quick summary of my portfolio",
    },
    { label: "Detailed PortFolio", input: "detailed portfolio" },
    { label: "Show NFT PortFolio", input: "show nft portfolio" },
    {
        label: "Send Native",
        input: "Send __amount__ of __native token__  to __address__",
    },
    {
        label: "Send Token",
        input: "Send __amount__ of __token__ to __address__",
    },
    { label: "I need help", input: "I need help on how on how to use Praxus" },
    { label: "Swap", input: "swap" },
    {
        label: "Bridge",
        input: "Bridge my ___name of Token from __from_chain__ to  __to_chain ",
    },
    {
        label: "Crypto Updates/News",
        input: "Get me latest crypto news and updates ",
    },
    { label: "my Referral link/code", input: "my referral link/code" },
    { label: "Yields", input: "yields" },
    { label: "Newly launched Tokens", input: "newly launched tokens" },
    { label: "Copy Trade", input: "copy trade" },
    { label: "Limit Orders", input: "limit orders" },
    { label: "Contract Security", input: "contract security" },
    {
        label: "DCA(Dollar Cost Average)",
        input: "set up a DCA on __address__ token for this __amount__ every __time__",
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
