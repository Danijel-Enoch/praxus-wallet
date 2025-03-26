import { useParams } from "react-router";
import Chat from "@/components/chat";
import type { UUID } from "@elizaos/core";
import useAuth from "@/hooks/use-auth";

export default function AgentRoute() {
    const { agentId } = useParams<{ agentId: UUID }>();

    useAuth();

    if (!agentId) return <div>No data.</div>;

    return <Chat agentId={agentId} />;
}
