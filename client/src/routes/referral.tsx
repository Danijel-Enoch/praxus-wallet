import { useParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Referral() {
    const { address } = useParams<{ address: string }>();
    const { toast } = useToast();

    const addPointsMutation = useMutation({
        mutationFn: () => apiClient.addpoints(address!, 100), // Adding 100 points as an example
        onSuccess: () => {
            toast({
                title: "Success",
                description: "Points added successfully!",
            });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message || "Failed to add points",
                variant: "destructive",
            });
        },
    });

    useEffect(() => {
        if (address) {
            addPointsMutation.mutate();
        }
    }, [address]); // Run once when address is available

    if (!address) {
        return (
            <div className="text-red-500">Error: No referral address found</div>
        );
    }

    return <div>This is the referral page</div>;
}
