export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const dob = searchParams.get("dob");

  if (!dob) {
    return Response.json({ error: "Date of birth is required" }, { status: 400 });
  }

  const date = new Date(dob);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const wikipediaUrl = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`;

  try {
    const res = await fetch(wikipediaUrl);
    if (!res.ok) throw new Error("Failed to fetch Wikipedia data");

    const json = await res.json();
    const allEvents = json?.events || [];

    const formatted = allEvents.map(event => {
      const image = event.pages?.[0]?.thumbnail?.source || null;
      return {
        year: event.year,
        text: event.text,
        image
      };
    });

    return Response.json({ day: formatted });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to fetch historical data" }, { status: 500 });
  }
}
