import { http } from "@lib/api/axios";
import { apiRoutes } from "@lib/api/endpoints";
import { user, isAuthenticated, isLoadingAuth } from '@lib/utils/auth';

export async function checkSession() {
    isLoadingAuth.set(true);

    try {
        const res = await http.get(apiRoutes.check_session);
        user.set(res.data);
        isAuthenticated.set(true);
    } catch (error: any) {
		if (error.status === 401 || error.status === 403) {
			user.set(null);
			isAuthenticated.set(false);
		} else {
			console.error("Error verificando sesión:", error);
		}
    } finally {
        isLoadingAuth.set(false);
    }
}