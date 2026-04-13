const apiUrl = "http://localhost:3000/payment";

export async function createQRcode(total: number) {
    const response = await fetch(`${apiUrl}/qrcode`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ total }),
    });
    return response.json();
}


