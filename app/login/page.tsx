'use client'
import { useRouter } from 'next/navigation'

import Image from "next/image";
import logo from '@/public/logo.png'

export default function Login() {
    const router = useRouter()
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-2 md:p-24">
            <form className="w-96 max-w-full h-fit min-h-28 shadow-sm bg-white p-5 flex flex-col gap-4 rounded-lg">
                <hgroup>
                    <Image src={logo} alt="Logo A Principal" width={120} className="m-auto" />
                    <p className="italic text-sm text-center text-black">Faça login utilizando seu usuário do RAD</p>
                </hgroup>
                <fieldset className="block">
                    <label className="block text-black">Usuário</label>
                    <input value="tiago" className="text-black h-10 w-full border-gray-300 border p-1 rounded-lg" />
                </fieldset>
                <fieldset className="block">
                    <label className="block text-black">Senha</label>
                    <input type="password" value="123456" className="text-black h-10 w-full border-gray-300 border p-1 rounded-lg" />
                </fieldset>
                <fieldset className="block">
                    <label className="block text-black">Base</label>
                    <select name="base" className="w-full text-black h-10 p-1 rounded-lg bg-white border border-gray-300">
                        <option value="1">Base 1</option>
                        <option value="2">Base 2</option>
                        <option value="3">Base 3</option>
                        <option value="4">Base 4</option>
                        <option value="5">Base 5</option>
                        <option value="6">Base 6</option>
                        <option value="7">Base 7</option>
                        <option value="8">Base 8</option>
                        <option value="9">Base 9</option>
                        <option value="11">Base 11</option>
                        <option value="12">Base 12</option>
                        <option value="13">Base 13</option>
                        <option value="14">Base 14</option>
                        <option value="15">Base 15</option>
                        <option value="100">Base 100</option>
                    </select>
                </fieldset>
                <button type='button' className="bg-pink-600 h-10 rounded-lg text-white mt-4" onClick={() => router.push('/home')}>Entrar</button>
            </form>
        </main >
    );
}
