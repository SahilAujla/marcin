import React, { createContext, useState, useEffect, useRef } from "react";
import Web3Modal from "web3modal";
import { toast } from "react-toastify";

// ethers
import { providers, Contract, utils } from "ethers";
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from "../src/constants";

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  // state variables
  const web3ModalRef = useRef();

  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [isNetwork, setIsNetwork] = useState(true);
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);

  // helpers

  const checkErrorTypeAndNotify = (error) => {
    console.log("ERRORRRRRRR", error);
    if (error.message.includes("Internal JSON-RPC error")) {
      toast.error(error.data.message);
    } else if (error.message.includes("reverted")) {
      toast.error(error.error.message);
    } else if (
      error.message.includes(
        "MetaMask Tx Signature: User denied transaction signature."
      )
    ) {
      toast.error("Transaction Cancelled");
    } else {
      toast.error(error.message);
    }
  };

  // shorten the address
  const shortenAddress = (address) => {
    return (
      address.substring(0, 6) + "..." + address.substring(address.length - 4)
    );
  };

  const getSigner = async () => {
    const provider = await web3ModalRef.current.connect();

    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setIsWalletConnected(false);
      }
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
      if (chainId !== "80001") {
        toast.error("Please connect to Mumbai Network");
      }
    });

    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();

    if (chainId !== 80001) throw new Error("Change network to Mumbai");

    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();
    setAccount(address);
    return { signer, address };
  };

  const connectWallet = async () => {
    try {
      const { signer, address } = await getSigner();
      setIsWalletConnected(true);
    } catch (error) {
      checkErrorTypeAndNotify(error);
    }
  };

  // Mint NFT
  const mintNFT = async () => {
    setLoading(true);
    try {
      const { signer, address } = await getSigner();
      const contract = new Contract(
        NFT_CONTRACT_ADDRESS,
        NFT_CONTRACT_ABI,
        signer
      );
      const tx = await contract.mint({ value: utils.parseEther("0.01") });
      await tx.wait();
      toast("You successfully minted a bao-bao");
    } catch (error) {
      console.log(error);
      checkErrorTypeAndNotify(error);
    }
    setLoading(false);
  };

  const fetchMetaData = async (url, i) => {
    const obj = {};
    // This is for Image
    const baseUrl =
      "https://ipfs.io/ipfs/QmQwhP1c15cxj49YdtzsgBoEKsCe3HtRmEwV2WvyBvELaj/";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      // console.log("RESPONSE", response);
      const data = await response.json();
      // console.log("DATA", data);
      obj = {
        name: data.name,
        description: data.description,
        image: baseUrl + i + ".png",
      };
    } catch (error) {
      obj = {
        name: "No Name",
        description: "No Description",
        image: "./placeholder.png",
      };
      // console.log("EROROORGGGG", error)
    }
    return obj;
  };

  // Get NFTs
  const getNFTs = async () => {
    // This is for Metadata
    const baseMetadataUrl =
      "https://gateway.pinata.cloud/ipfs/QmPaCfjnS3dBGKbnHKM5TauxiY2b1bLmUaAeQgx9kLd88a/";

    const items = [];

    try {
      const { signer, address } = await getSigner();
      const contract = new Contract(
        NFT_CONTRACT_ADDRESS,
        NFT_CONTRACT_ABI,
        signer
      );
      const nftsBalance = await contract.balanceOf(address);
      for (let i = 0; i < nftsBalance; i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(address, i);
        let url = baseMetadataUrl + Number(tokenId) + ".json";
        const o = await fetchMetaData(url, tokenId);
        items.push(o);
      }
      setResults(items);
    } catch (error) {
      checkErrorTypeAndNotify(error);
    }
  };

  useEffect(() => {
    console.log("Setting up web3 modal");
    web3ModalRef.current = new Web3Modal({
      network: "Mumbai",
      providerOptions: {},
    });
    connectWallet();
    getNFTs();
  }, [isWalletConnected]);

  return (
    <MainContext.Provider
      value={{
        isWalletConnected,
        account,
        results,
        loading,
        connectWallet,
        getSigner,
        mintNFT,
        setLoading,
        shortenAddress,
        checkErrorTypeAndNotify,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
