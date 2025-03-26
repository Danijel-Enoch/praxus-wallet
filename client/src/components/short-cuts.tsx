import { Wallet } from "lucide-react";
import { Button } from "./ui/button";

export default function ShortCuts() {
    return (
        <div className="px-4 pb-4 space-x-2 space-y-1 overflow-x-auto">
            <Button size="sm" className="ml-auto gap-1.5 h-[30px]">
                {"Wallet"}
                <Wallet className="size-3.5" />
            </Button>
            <Button size="sm" className="ml-auto gap-1.5 h-[30px]">
                {"Quick PortFolio "}
                <Wallet className="size-3.5" />
            </Button>
            <Button size="sm" className="ml-auto gap-1.5 h-[30px]">
                {"Detailed PortFolio"}
                <Wallet className="size-3.5" />
            </Button>
            <Button size="sm" className="ml-auto gap-1.5 h-[30px]">
                {"Show NFT PortFolio"}
                <Wallet className="size-3.5" />
            </Button>
            <Button size="sm" className="ml-auto gap-1.5 h-[30px]">
                {"Send Native"}
                <Wallet className="size-3.5" />
            </Button>
            <Button size="sm" className="ml-auto gap-1.5 h-[30px]">
                {"Send Token"}
                <Wallet className="size-3.5" />
            </Button>
            <Button size="sm" className="ml-auto gap-1.5 h-[30px]">
                {"I need help "}
                <Wallet className="size-3.5" />
            </Button>
            <Button size="sm" className="ml-auto gap-1.5 h-[30px]">
                {"Swap"}
                <Wallet className="size-3.5" />
            </Button>
            <Button size="sm" className="ml-auto gap-1.5 h-[30px]">
                {"Bridge"}
                <Wallet className="size-3.5" />
            </Button>
            <Button size="sm" className="ml-auto gap-1.5 h-[30px]">
                {"Crypto Updates/News"}
                <Wallet className="size-3.5" />
            </Button>
            <Button size="sm" className="ml-auto gap-1.5 h-[30px]">
                {"my Referral link/code"}
                <Wallet className="size-3.5" />
            </Button>
            <Button size="sm" className="ml-auto gap-1.5 h-[30px]">
                {"Yields"}
                <Wallet className="size-3.5" />
            </Button>
            <Button size="sm" className="ml-auto gap-1.5 h-[30px]">
                {"Newly launched Tokens"}
                <Wallet className="size-3.5" />
            </Button>
            <Button size="sm" className="ml-auto gap-1.5 h-[30px]">
                {"Copy Trade"}
                <Wallet className="size-3.5" />
            </Button>
            <Button size="sm" className="ml-auto gap-1.5 h-[30px]">
                {"Limit Orders"}
                <Wallet className="size-3.5" />
            </Button>
            <Button size="sm" className="ml-auto gap-1.5 h-[30px]">
                {"Contract Security"}
                <Wallet className="size-3.5" />
            </Button>
            <Button size="sm" className="ml-auto gap-1.5 h-[30px]">
                {"DCA(Dollar Cost Average)"}
                <Wallet className="size-3.5" />
            </Button>
        </div>
    );
}
