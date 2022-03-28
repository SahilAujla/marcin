import Link from "next/link";
import GradientButton from './GradientButton';
import { useContext } from "react";
import { MainContext } from "../../context/mainContext";

export default function NavigationBar() {
  const { connectWallet, isWalletConnected, account, shortenAddress } = useContext(MainContext);

  return (

    <div className="flex justify-end p-4 items-center space-x-8 ">
      <Link href="/" >
        <span className="text-xl text-white cursor-pointer">Home</span>
      </Link>

      <Link href="/profile" >
        <span className="text-xl text-white cursor-pointer">Inventory</span>
      </Link>
      <div className="w-64">
        <GradientButton text={isWalletConnected ? shortenAddress(account) : "Connect"} onClick={connectWallet} />
      </div>
    </div>

  );
}
