import CryptoDashboard from "~/components/crypto-dashboard";
import CryptoRealtimeDashboard from "~/components/realtime-dashboard";

export default function RealtimePage() {
  return (
    <div className="container mx-auto bg-black py-10">
      <h1 className="mb-6 text-center text-3xl font-bold text-white">
        Realtime Crypto Dashboard
      </h1>
      <CryptoRealtimeDashboard />
    </div>
  );
}
