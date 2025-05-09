import { createClient } from "@supabase/supabase-js";
import { Database } from "./types";
const supabaseUrl = "https://fwcoqorxtlxlnlxaikfd.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3Y29xb3J4dGx4bG5seGFpa2ZkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mjc2MDMxNywiZXhwIjoyMDU4MzM2MzE3fQ.CmPEQi-y8XJQX0mvgmux7dnLv1QAsHPf8SbJhxRk4rQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function createUser(walletAddress: string, chatId: string) {
    // First check if user exists
    const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("address", walletAddress)
        .single();

    if (fetchError && fetchError.code !== "PGRST116") {
        // PGRST116 is "not found" error
        console.error("Error checking existing user:", fetchError);
        throw fetchError;
    }

    if (existingUser) {
        return [existingUser];
    }

    // If user doesn't exist, create new user
    const { data, error } = await supabase
        .from("users")
        .upsert([{ address: walletAddress, chat_id: chatId }])
        .select("*");

    if (error) {
        console.error("Error creating user:", error);
        throw error;
    }

    return data;
}

export async function updateUserPoints(walletAddress: string, points: number) {
    // First get the current points
    const { data: currentData, error: fetchError } = await supabase
        .from("users")
        .select("points")
        .eq("address", walletAddress)
        .single();

    if (fetchError) {
        console.error("Error fetching user points:", fetchError);
        throw fetchError;
    }

    const newPoints = (currentData?.points || 0) + points;

    // Then update with the new total
    const { data, error } = await supabase
        .from("users")
        .update({ points: newPoints })
        .eq("address", walletAddress)
        .select();

    if (error) {
        console.error("Error updating user points:", error);
        throw error;
    }

    return data;
}
