export const getNewsSiteTemplate = `Respond with a JSON object containing news site information.
Extract the news site  from the most recent message. If no specific news site is provided, respond will  news site set to all or twitter.

The response must include:
- site: => The news site name

Example response:
\`\`\`json
{
    "site": "twitter"
}
\`\`\`
{{recentMessages}}
Extract the  address from the most recent message.
Respond with a JSON markdown block containing the news site.`;
