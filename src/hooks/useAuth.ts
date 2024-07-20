import { LoginSchema } from "@/app/login/login.schema";
import { authService } from "@/services/auth";
import { useStore } from "@/store";
import { OptionSelect } from "@/types/select";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  COOKIE_KEY_ACCESS_TOKEN,
  STORAGE_KEY_ACCESS_TOKEN,
  STORAGE_KEY_USER,
} from "@/constants";
import { deleteCookie, setCookie } from "@/actions/cookie";

export const useAuth = () => {
  const router = useRouter();
  const user = useStore((state) => state.login.user);
  const accessToken = useStore((state) => state.login.accessToken);
  const setUser = useStore((state) => state.login.setUser);
  const setAccessToken = useStore((state) => state.login.setAccessToken);

  const [bases, setBases] = useState<OptionSelect[]>([]);
  const [stores, setStores] = useState<OptionSelect[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getBasesAvailable = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await authService.getBases();

      setIsLoading(false);
      if (response.status === 200 && Array.isArray(response.data)) {
        return setBases(
          response.data.map((item) => ({ value: item.id, label: item.name }))
        );
      }

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

      setIsLoading(false);
      if (response.status === 200 && Array.isArray(response.data)) {
        return setStores(
          response.data.map((item) => ({ value: item.id, label: item.name }))
        );
      }

      toast.error(
        response.data.message || "Não foi possível carregar as lojas"
      );
      setStores([]);
    } catch (error) {
      setIsLoading(false);
      setStores([]);
    }
  };

  const login = async (formData: LoginSchema) => {
    try {
      setIsLoading(true);
      const response = await authService.login({
        username: formData.user,
        password: formData.password,
        base: formData.base,
      });

      setIsLoading(false);
      if (response.status === 201) {
        const data = response.data;
        const userData = {
          id: data.id,
          name: data.user,
          storeId: formData.store,
        };
        window.localStorage.setItem(
          STORAGE_KEY_ACCESS_TOKEN,
          data.access_token
        );
        window.localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(userData));
        setAccessToken(data.access_token);
        setUser(userData);
        setCookie(COOKIE_KEY_ACCESS_TOKEN, data.access_token);
        toast.success("Bem vindo!");
        return router.push("/home");
      }

      toast.error(response.data.message || "Não foi possível concluir o login");
      setStores([]);
    } catch (error) {
      setIsLoading(false);
      setStores([]);
    }
  };

  const logout = async () => {
    window.localStorage.removeItem(STORAGE_KEY_ACCESS_TOKEN);
    window.localStorage.removeItem(STORAGE_KEY_USER);
    setAccessToken(null);
    setUser({ id: null, name: null, storeId: null });
    deleteCookie(COOKIE_KEY_ACCESS_TOKEN);
    router.push("/login");
  };

  return {
    getBasesAvailable,
    bases,
    isLoading,
    login,
    getBaseStores,
    stores,
    user,
    logout,
  };
};
