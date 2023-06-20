class UserService {
    async login(token: string) {
        const request = await fetch("/api/login", {
            method: "POST",
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        const response = await request.json();
        localStorage.setItem("userInfo", JSON.stringify(response.userInfo));
        return response;
    }
}
export const userService = new UserService();