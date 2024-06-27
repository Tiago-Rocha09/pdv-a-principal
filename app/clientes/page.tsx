'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Customer() {
    const router = useRouter()

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            Página com o fluxo de cadastro de cliente
            <p className="font-bold cursor-pointer" onClick={() => router.push('/home')}>Voltar</p>
        </main>
    );
}
