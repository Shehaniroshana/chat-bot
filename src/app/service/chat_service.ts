export async function getChatResponse(prompt: string): Promise<string> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const apiKey:string=""; // Replace with your actual API key
    let responseText = "No response";
  
    const raw = JSON.stringify({
      "contents": [
        {
          "parts": [
            {
              "text": prompt,
            }
          ]
        }
      ]
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect
    };
  
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, requestOptions);
      const result = await response.json();  
      responseText = result.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  
    return responseText;
  }
  