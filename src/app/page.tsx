export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>RENAUD</p>
      <audio controls>
        <source src={`/api/stream`} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </main>
  );
}
