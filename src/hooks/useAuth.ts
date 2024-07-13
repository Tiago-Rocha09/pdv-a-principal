import { LoginSchema } from "@/app/login/login.schema";
import { authService } from "@/services/auth";
import { useStore } from "@/store";
import { OptionSelect } from "@/types/select";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { STORAGE_KEY_ACCESS_TOKEN, STORAGE_KEY_USER } from "@/constants";

export const useAuth = () => {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const accessToken = useStore((state) => state.accessToken);
  const setUser = useStore((state) => state.setUser);
  const setAccessToken = useStore((state) => state.setAccessToken);
  console.log(user);
  console.log(accessToken);

  const [bases, setBases] = useState<OptionSelect[]>([]);
  const [stores, setStores] = useState<OptionSelect[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getBasesAvailable = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await authService.getBases();
      console.log(response);

      setIsLoading(false);
      if (response.status === 200 && Array.isArray(response.data)) {
        return setBases(
          response.data.map((item) => ({ value: item.id, label: item.name }))
        );
      }
      console.log(
        response.data.message || "Não foi possível carregar as bases"
      );

      toast.error(
        response.data.message || "Não foi possível carregar as bases"
      );
      setBases([]);
    } catch (error) {
      setIsLoading(false);
      setBases([]);
    }
  }, []);

  const getBaseStores = async (base: number) => {
    try {
      setIsLoading(true);
      const response = await authService.getBaseStores(base);
      console.log(response);

      setIsLoading(false);
      if (response.status === 200 && Array.isArray(response.data)) {
        return setStores(
          response.data.map((item) => ({ value: item.id, label: item.name }))
        );
      }
      console.log(
        response.data.message || "Não foi possível carregar as lojas"
      );

      toast.error(
        response.data.message || "Não foi possível carregar as lojas"
      );
      setStores([]);
    } catch (error) {
      setIsLoading(false);
      setStores([]);
    }
  };

  const login = async (data: LoginSchema) => {
    try {
      setIsLoading(true);
      const response = await authService.login({
        username: data.user,
        password: data.password,
        base: data.base,
      });
      console.log(response);

      setIsLoading(false);
      if (response.status === 201) {
        const data = response.data;
        const userData = {
          id: data.id,
          name: data.user,
        };
        window.localStorage.setItem(
          STORAGE_KEY_ACCESS_TOKEN,
          data.access_token
        );
        window.localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(userData));
        setAccessToken(data.access_token);
        setUser(userData);
        toast.success("Bem vindo!");
        return router.push("/home");
      }
      console.log(response.data.message || "Não foi possível concluir o login");

      toast.error(response.data.message || "Não foi possível concluir o login");
      setStores([]);
    } catch (error) {
      setIsLoading(false);
      setStores([]);
    }
  };

  return { getBasesAvailable, bases, isLoading, login, getBaseStores, stores, user };
};
