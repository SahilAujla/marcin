import React from 'react'

export default function WalletButton({ text, onClick }) {
  return (
    <div className='max-w-md mx-auto'>
      <div className="flex justify-between items-center space-x-12" onClick={onClick}>
        <span className="block px-2 py-4 rounded-lg bg-gradient-to-r from-yellow-300 to-yellow-500 text-xl text-white  cursor-pointer">
          {text}
        </span>
        <img src="metamask.png" alt="metaMask" />
      </div>
    </div>
  )
}
