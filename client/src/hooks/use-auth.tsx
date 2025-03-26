import useLocalStorage from "./use-localstorage";

export default function useAuth() {
    // Retrieve tgId and jwt from local storage
    const [tgId] = useLocalStorage<string>("tgId", "");
    const [jwt] = useLocalStorage<string>("jwt", "");

    if (!tgId || !jwt) {
        // redirect to login page
        window.location.href = "/auth";
    }

    return {
        tgId,
        jwt,
    };
}
