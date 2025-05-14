export const buyBasenameTemplate = `
Task: Extract username and blockchain address information from the conversation to purchase a basename.

Recent conversation:
{{recentMessages}}

Instructions: Based on the conversation, extract:
1. The desired username for the basename
2. The blockchain address to associate with the basename

Response format should be in JSON:
{
    "username": "desired username",
    "address": "blockchain address"
}`;
