import axios from "axios";
import { baseUrl } from "./shared";

let timeoutId; // Variable pour stocker l'identifiant de setTimeout
const expiresIn = 3600;
const scheduleTokenRefresh = (expiresIn) => {
  // Nettoyer le timeout existant (s'il y en a un)
  clearTimeout(timeoutId);

  // Planifier le rafraîchissement du token 1 minute avant l'expiration
  const refreshDelay = (expiresIn - 60) * 1000; // Conversion en ms
  timeoutId = setTimeout(() => {
    refreshToken();
  }, refreshDelay);
};

const refreshToken = async () => {
  const url = `${baseUrl}token/refresh`;
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    return;
  }

  try {
    const response = await axios.post(url, { refresh_token: refreshToken });

    // Stocker les nouveaux tokens
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("refreshToken", response.data.refresh_token);

    // Replanifier le prochain rafraîchissement
     
    scheduleTokenRefresh(expiresIn);
  } catch (error) {
    console.error("Erreur lors du rafraîchissement du token :", error);
    // Optionnel : rediriger vers la page de connexion si nécessaire
  }
};

const startTokenService = () => {
  scheduleTokenRefresh(expiresIn);
};

const stopTokenService = () => {
  clearTimeout(timeoutId);
};

export const tokenService = { startTokenService, stopTokenService };
