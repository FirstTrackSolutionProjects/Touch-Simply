
const API_URL = import.meta.env.VITE_API_URL; // Backend base URL

const sendContactUs = async (payload) => {
    // Normalize slashes so a Netlify URL ending in `/` does not request
    // `/api//contact` (which API Gateway does not route to the contact handler).
    const contactUrl = `${API_URL.replace(/\/+$/, "")}/contact`;
    const response = await fetch(contactUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
    })
    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
        ? await response.json()
        : { message: await response.text() };
    if (!response.ok) {
        throw new Error(data.message || "Could not send your message.");
    }
    if (!data.success) throw new Error(data.message || "Something Went Wrong!")
    return data?.data;
}

export default sendContactUs;
