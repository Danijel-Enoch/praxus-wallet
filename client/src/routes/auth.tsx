import { Button } from "@/components/ui/button";
import useLocalStorage from "@/hooks/use-localstorage";
import { useEffect } from "react";
import { useLocation } from "react-router";

export default function AuthRoute() {
    const location = useLocation();

    // Parse query parameters
    const searchParams = new URLSearchParams(location.search);
    const tgId = searchParams.get("tgId");
    const jwt = searchParams.get("jwt");

    if (!tgId || !jwt) {
        return (
            <div className="flex flex-col items-center p-5">
                <div className="mb-3 text-lg text-gray-700 font-semibold">
                    {" "}
                    Unable to fetch Passkey{" "}
                </div>
                <Button
                    onClick={() =>
                        (window.location.href = "https://t.me/praxus_bot")
                    }
                >
                    Connect Tg
                </Button>
            </div>
        );
    }

    const [, setTgId] = useLocalStorage("tgId", tgId);
    const [, setJwt] = useLocalStorage("jwt", jwt);

    useEffect(() => {
        if (tgId && jwt) {
            setJwt(jwt);
            setTgId(tgId);
        }
    }, [tgId, jwt]);

    // Redirect to home page
    window.location.href = "/chat/b850bc30-45f8-0041-a00a-83df46d8555d";
}
