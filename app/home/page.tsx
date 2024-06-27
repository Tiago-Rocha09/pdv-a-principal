'use client'

import Image from "next/image";
import logo from '@/public/logo-full.png'
import { FaAddressBook, FaGift, FaRegMoneyBillAlt, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { GiNetworkBars } from "react-icons/gi";
import { TbSettingsCog } from "react-icons/tb";

export default function Home() {
    const router = useRouter()

    return (
        <main className="flex min-h-screen flex-col items-center p-2 md:p-24 gap-8">
            <div className="w-full md:w-fit bg-white pt-8 pb-8 p-1 md:p-8 gap-7 flex flex-col rounded-lg shadow-lg">
                <hgroup>
                    <Image src={logo} alt="Logo A Principal" width={400} className="m-auto" />
                </hgroup>
                <div className="grid w-[540px] max-w-full grid-flow-row grid-cols-3 gap-1 md:gap-4 p-1 md:p-4">
                    <div onClick={() => router.push('/vendas')} className="cursor-pointer min-h-16 bg-[#069] flex flex-col justify-center items-center rounded-lg p-4">
                        <FaRegMoneyBillAlt color="white" size={64} />
                        <p className="text-white text-xs md:text-lg font-bold">Vendas</p>
                    </div>
                    <div onClick={() => router.push('/produtos')} className="cursor-pointer min-h-16 bg-[#069] flex flex-col justify-center items-center rounded-lg p-4">
                        <FaGift color="white" size={64} />
                        <p className="text-white text-xs md:text-lg font-bold">Produtos</p>
                    </div>
                    <div onClick={() => router.push('/clientes')} className="cursor-pointer min-h-16 bg-[#069] flex flex-col justify-center items-center rounded-lg p-4">
                        <FaUser color="white" size={64} />
                        <p className="text-white text-xs md:text-lg font-bold">Clientes</p>
                    </div>
                    <div className="cursor-pointer min-h-16 bg-[#069] flex flex-col justify-center items-center rounded-lg p-4">
                        <GiNetworkBars color="white" size={64} />
                        <p className="text-white text-xs md:text-lg font-bold">Metas</p>
                    </div>
                    <div className="cursor-pointer min-h-16 bg-[#069] flex flex-col justify-center items-center rounded-lg p-4">
                        <FaAddressBook color="white" size={64} />
                        <p className="text-white text-xs md:text-lg font-bold">CRM</p>
                    </div>
                    <div className="cursor-pointer min-h-16 bg-[#069] flex flex-col justify-center items-center rounded-lg p-4">
                        <TbSettingsCog color="white" size={64} />
                        <p className="text-white text-xs md:text-lg font-bold">Configurações</p>
                    </div>
                </div>
                <button type='button' className="w-96 max-w-full m-auto bg-[#069] h-10 rounded-lg text-white mt-4" onClick={() => router.push('/login')}>Sair</button>
            </div>
        </main>
    );
}
