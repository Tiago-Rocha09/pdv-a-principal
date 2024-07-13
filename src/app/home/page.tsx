'use client'

import Image from "next/image";
import logo from '@/images/logo-full.png'
import { FaAddressBook, FaGift, FaRegMoneyBillAlt, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { GiNetworkBars } from "react-icons/gi";
import { TbSettingsCog } from "react-icons/tb";
import { useAuth } from "@/hooks/useAuth";
import { CustomButton } from "@/components/button";
import styles from './styles.module.scss'
import { PageWrapper } from "@/components/pageWrapper";
import { ActionCard } from "./components/actionCard";
import colors from '@/styles/variables.module.scss'

export default function Home() {
    const router = useRouter()
    const { user } = useAuth()
    console.log(user);

    return (
        <PageWrapper>
            <hgroup>
                <Image src={logo} alt="Logo A Principal" width={400} className={styles.logo} />
            </hgroup>
            <div className={styles.container}>
                <ActionCard title="Vendas" icon={<FaRegMoneyBillAlt color="white" size={64} />} action={() => router.push('/vendas')} />
                <ActionCard title="Produtos" icon={<FaGift color="white" size={64} />} action={() => router.push('/produtos')} />
                <ActionCard title="Clientes" icon={<FaUser color="white" size={64} />} action={() => router.push('/clientes')} />
                <ActionCard title="Metas" icon={<GiNetworkBars color="white" size={64} />} action={() => { }} />
                <ActionCard title="CRM" icon={<FaAddressBook color="white" size={64} />} action={() => { }} />
                <ActionCard title="Configurações" icon={<TbSettingsCog color="white" size={64} />} action={() => { }} />
            </div>
            <CustomButton text="Sair" onClick={() => router.push('/login')} bgColor={colors.blueColor} width="24rem" />
        </PageWrapper>
    );
}
